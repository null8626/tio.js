/**
 * @name tio.js
 * @description A small TypeScript library that lets you evaluate code in a sandboxed environment everywhere with TryItOnline.
 * @copyright Copyright (c) 2021-2024 null8626
 * @license MIT
 * @author null8626
 * @version 4.0.3
 */

import { deflateRaw, gunzip } from 'node:zlib'
import { inspect, promisify } from 'node:util'
import { randomBytes } from 'node:crypto'
import { Buffer } from 'node:buffer'

import Timeout from './timeout.js'
import languages from './languages.js'
import { TioError, TioHttpError } from './error.js'
import { validStringArray, requestText } from './util.js'
import type { Tio, TioLanguage, TioOptions, TioResponse } from '../typings'

const SCRIPT_REGEX =
  /<script src="(\/static\/[0-9a-f]+-frontend\.js)" defer><\/script>/
const RUNURL_REGEX = /^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m
const DEBUG_REGEX =
  /([\s\S]*)Real time: ([\d.]+) s\nUser time: ([\d.]+) s\nSys\. time: ([\d.]+) s\nCPU share: ([\d.]+) %\nExit code: (\d+)$/

const deflateRawAsync = promisify(deflateRaw)
const gunzipAsync = promisify(gunzip)

let runURL: string | null = null
let nextRefresh = 0

let defaultLanguage: TioLanguage = 'javascript-node'
let defaultTimeout = Infinity
let defaultCflags: string[] = []
let defaultArgv: string[] = []
let refreshTimeout = 850000

async function prepare(): Promise<void> {
  if (runURL !== null && Date.now() < nextRefresh) {
    return
  }

  const scrapeResponse = await requestText('/')
  const frontendJSURL = scrapeResponse.match(SCRIPT_REGEX)?.[1]

  if (frontendJSURL === undefined) {
    throw new TioError(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    )
  }

  const frontendJS = await requestText(frontendJSURL)
  const newRunURL = frontendJS.match(RUNURL_REGEX)?.[1]

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
  const ab = new AbortController()
  const cflags = options.cflags!.map(f => `${f}\0`).join('')
  const argv = options.argv!.map(a => `${a}\0`).join('')

  const response = await fetch(
    `https://tio.run/cgi-bin/static/${runURL}/${randomBytes(16).toString(
      'hex'
    )}`,
    {
      method: 'POST',
      body: await deflateRawAsync(
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

  let data = null

  if (options.timeout === Infinity) {
    data = await response.arrayBuffer()
  } else {
    const tm = new Timeout(options.timeout!)

    data = await Promise.race([response.arrayBuffer(), tm.promise])

    if (data === null) {
      ab.abort()
      return null
    }

    tm.cancel()
  }

  return (await gunzipAsync(data)).toString()
}

/**
 * The optional options to be passed onto tio().
 * @typedef {object} TioOptions
 * @property {string} [language] - The preferred language ID.
 * @property {number} [timeout] - How much milliseconds for the client to wait before the request times out. Great for surpressing infinite loops. Defaults to Infinity.
 * @property {string[]} [cflags] - Extra arguments to be passed onto the compiler (Only works in compiled languages).
 * @property {string[]} [argv] - Custom command-line arguments.
 * @public
 */

/**
 * The evaluated response.
 * @typedef {object} TioResponse
 * @property {string} output - The output from the command line.
 * @property {boolean} timedOut - Whether the request timed out or not.
 * @property {number} realTime - The time it takes to evaluate the code in real-time.
 * @property {number} userTime - The time it takes to evaluate the code in user-time.
 * @property {number} sysTime - The time it takes to evaluate the code in system-time.
 * @property {number} CPUshare - The CPU share percentage value.
 * @property {number} exitCode - The program's exit code.
 * @public
 */

/**
 * Evaluates a code.
 * @param {string} code - The source code to be evaluated.
 * @param {TioOptions} [options] - The opional options to be passed in to override the default options.
 * @returns {Promise<TioResponse>} The evaluated response.
 * @async
 * @throws {TioError} The user supplied invalid arguments or the client couldn't scrape tio.run.
 * @throws {TioHttpError} The client received an invalid HTTP response from the tio.run servers. This is usually not expected.
 * @public
 * @see {@link https://github.com/null8626/tio.js#examples}
 * @example await tio('console.log("Hello, World!");')
 * @example await tio('print("Hello, World!")', { language: 'python3' })
 * @example await tio('console.log("Hello, World!");', { timeout: 2000 })
 * @example await tio('console.log(process.argv.slice(2).join(", "));', { argv: ['Hello', 'World!'] })
 */
const tio: Tio = <Tio>(async (
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

  const result = await evaluate(code, options)

  if (result === null) {
    const timeoutInSecs = options.timeout! / 1000

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

  const s = result.substring(16).split(result.substring(0, 16))
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
})

Object.defineProperties(tio, {
  languages: {
    configurable: false,
    enumerable: true,
    writable: false,
    value: languages
  },
  
  defaultLanguage: {
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
  },
  
  defaultTimeout: {
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
  },
  
  defaultCflags: {
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
  },
  
  defaultArgv: {
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
  },
  
  refreshTimeout: {
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
  }
})

export default tio
