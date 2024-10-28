import { deflateRawSync, gunzipSync } from 'node:zlib'
import { randomBytes } from 'node:crypto'
import { Buffer } from 'node:buffer'
import { inspect } from 'node:util'

import Timeout from './timeout.js'
import languages from './languages.js'
import { TioError, TioHttpError } from './error.js'
import { validStringArray, requestText } from './util.js'
import type { Tio, TioLanguage, TioOptions, TioResponse } from '../typings'

const SCRIPT_REGEX: RegExp =
  /<script src="(\/static\/[0-9a-f]+-frontend.js)" defer><\/script>/
const RUNURL_REGEX: RegExp = /^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m
const DEBUG_REGEX: RegExp =
  /([\s\S]*)Real time: ([\d.]+) s\nUser time: ([\d.]+) s\nSys. time: ([\d.]+) s\nCPU share: ([\d.]+) %\nExit code: (\d+)$/

let runURL: string | null = null

let defaultLanguage: TioLanguage = 'javascript-node'
let defaultTimeout: number = Infinity
let defaultCflags: string[] = []
let defaultArgv: string[] = []
let refreshTimeout: number = 850000
let nextRefresh: number = 0

async function prepare(): Promise<void> {
  if (runURL !== null && Date.now() < nextRefresh) {
    return
  }

  const scrapeResponse: string = await requestText('/')
  const frontendJSURL: string | undefined =
    scrapeResponse.match(SCRIPT_REGEX)?.[1]

  if (frontendJSURL === undefined) {
    throw new TioError(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    )
  }

  const frontendJS: string = await requestText(frontendJSURL)
  const newRunURL: string | undefined = frontendJS.match(RUNURL_REGEX)?.[1]

  if (newRunURL === undefined) {
    throw new TioError(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    )
  }

  runURL = newRunURL
  nextRefresh = Date.now() + refreshTimeout
}

async function evaluate(
  code: string,
  options: TioOptions
): Promise<string | null> {
  const ab: AbortController = new AbortController()
  const cflags: string = options.cflags!.map(f => `${f}\0`).join('')
  const argv: string = options.argv!.map(a => `${a}\0`).join('')

  const response: Response = await fetch(
    `https://tio.run/cgi-bin/static/${runURL}/${randomBytes(16).toString(
      'hex'
    )}`,
    {
      method: 'POST',
      body: deflateRawSync(
        `Vargs\0${
          options.argv!.length
        }\0${argv}Vlang\0\x31\0${options.language!}\0VTIO_CFLAGS\0${
          options.cflags!.length
        }\0${cflags}VTIO_OPTIONS\0\x30\0F.code.tio\0${
          code.length
        }\0${code}F.input.tio\0\x30\0R`,
        { level: 9 }
      ),
      signal: ab.signal
    }
  )

  if (response.status >= 400) {
    throw new TioHttpError(response)
  }

  let data: ArrayBuffer | null = null

  if (options.timeout === Infinity) {
    data = await response.arrayBuffer()
  } else {
    const tm: Timeout = new Timeout(options.timeout!)

    data = await Promise.race([response.arrayBuffer(), tm.promise])

    if (data === null) {
      ab.abort()
      return null
    }

    tm.cancel()
  }

  return gunzipSync(data).toString()
}

// @ts-ignore
const tio: Tio = async (
  code: string,
  options?: TioOptions
): Promise<TioResponse> => {
  options ??= {}

  if (
    'timeout' in options &&
    (!Number.isSafeInteger(options.timeout) || options.timeout! < 500)
  ) {
    throw new TioError(
      `Timeout must be a valid integer and it's value must be 500 or greater. Got ${inspect(
        options.timeout
      )}`
    )
  } else if (
    'language' in options &&
    options.language !== defaultLanguage &&
    !languages.includes(options.language!)
  ) {
    throw new TioError(
      `Unsupported/invalid language ID provided (Got ${inspect(
        options.language
      )}), a list of supported language IDs can be seen in \`tio.languages\`.`
    )
  } else if ('cflags' in options && !validStringArray(options.cflags)) {
    throw new TioError(
      `Compiler flags must be a valid array of strings. Got ${inspect(
        options.cflags
      )}`
    )
  } else if ('argv' in options && !validStringArray(options.argv)) {
    throw new TioError(
      `Command-line arguments must be a valid array of strings. Got ${inspect(
        options.argv
      )}`
    )
  }

  options = Object.assign(
    {
      language: defaultLanguage,
      timeout: defaultTimeout,
      cflags: defaultCflags,
      argv: defaultArgv
    },
    options
  )

  await prepare()

  const result: string | null = await evaluate(code, options)

  if (result === null) {
    // The website formats this as in seconds.
    const timeoutInSecs: number = options.timeout! / 1000

    return Object.freeze({
      output: `Request timed out after ${options.timeout}ms`,
      timedOut: true,
      realTime: timeoutInSecs,
      userTime: timeoutInSecs,
      sysTime: timeoutInSecs,
      CPUshare: 0,
      exitCode: 124
    })
  }

  const s: string[] = result.substring(16).split(result.substring(0, 16))
  const [debug, realTime, userTime, sysTime, CPUshare, exitCode] = s[1]
    .match(DEBUG_REGEX)!
    .slice(1)

  return Object.freeze({
    output: s[0] || debug,
    timedOut: false,
    realTime: parseFloat(realTime),
    userTime: parseFloat(userTime),
    sysTime: parseFloat(sysTime),
    CPUshare: parseFloat(CPUshare),
    exitCode: parseInt(exitCode)
  })
}

Object.defineProperty(tio, 'languages', {
  configurable: false,
  enumerable: true,
  writable: false,
  value: languages
})

Object.defineProperty(tio, 'defaultLanguage', {
  configurable: false,
  enumerable: true,

  get(): TioLanguage {
    return defaultLanguage
  },

  set(lang: TioLanguage) {
    if (lang !== defaultLanguage && !languages.includes(lang)) {
      throw new TioError(
        `Unsupported/invalid language ID provided (${lang}), a list of supported language IDs can be seen in \`tio.languages\`.`
      )
    }

    defaultLanguage = lang
  }
})

Object.defineProperty(tio, 'defaultTimeout', {
  configurable: false,
  enumerable: true,

  get(): number {
    return defaultTimeout
  },

  set(timeout: number) {
    if (!Number.isSafeInteger(timeout) || timeout < 500) {
      throw new TioError(
        `Timeout must be a valid integer and it's value must be 500 or greater. Got ${inspect(
          timeout
        )}`
      )
    }

    defaultTimeout = timeout
  }
})

Object.defineProperty(tio, 'defaultCflags', {
  configurable: false,
  enumerable: true,

  get(): string[] {
    return defaultCflags
  },

  set(cflags: string[]) {
    if (!validStringArray(cflags)) {
      throw new TioError(
        `Compiler flags must be a valid array of strings. Got ${inspect(
          cflags
        )}`
      )
    }

    defaultCflags = cflags
  }
})

Object.defineProperty(tio, 'defaultArgv', {
  configurable: false,
  enumerable: true,

  get(): string[] {
    return defaultArgv
  },

  set(argv: string[]) {
    if (!validStringArray(argv)) {
      throw new TioError(
        `Command-line arguments must be a valid array of strings. Got ${inspect(
          argv
        )}`
      )
    }

    defaultArgv = argv
  }
})

Object.defineProperty(tio, 'refreshTimeout', {
  configurable: false,
  enumerable: true,

  get(): number {
    return refreshTimeout
  },

  set(timeout: number) {
    if (!Number.isSafeInteger(timeout) || timeout < 500000) {
      throw new TioError(
        `Refresh timeout must be a valid integer and it's value must be 500000 or greater. Got ${inspect(
          timeout
        )}`
      )
    }

    refreshTimeout = timeout
  }
})

export default tio
