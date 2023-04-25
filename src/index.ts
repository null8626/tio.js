import { deflateRawSync, gunzipSync } from 'node:zlib'
import { randomBytes } from 'node:crypto'
import { Buffer } from 'node:buffer'

import Timeout from './timeout.js'
import languages from './languages.js'
import type { Option, Tio, TioLanguage, TioResponse } from '../typings'

const SCRIPT_REGEX: RegExp =
  /<script src="(\/static\/[0-9a-f]+-frontend\.js)" defer><\/script>/
const RUNURL_REGEX: RegExp = /^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m
const DEBUG_REGEX: RegExp =
  /([\s\S]*)Real time\: ([\d\.]+) s\nUser time\: ([\d\.]+) s\nSys\. time\: ([\d\.]+) s\nCPU share\: ([\d\.]+) %\nExit code\: (\d+)$/

let runURL: Option<string> = null
let defaultTimeout: number = Infinity
let defaultLanguage: TioLanguage = 'javascript-node'
let refreshTimeout: number = 850000
let nextRefresh: number = 0

class TioError extends Error {
  public constructor(message: string) {
    super(message)

    this.name = `TioError: ${message}`
  }
}

class TioHttpError extends TioError {
  public status: number
  public statusText: string

  public constructor(response: Response) {
    super(`[HTTP ${response.status}: ${response.statusText}]`)

    this.status = response.status
    this.statusText = response.statusText
  }
}

async function requestText(path: string): Promise<string> {
  const response: Response = await fetch(`https://tio.run${path}`)

  if (response.status >= 400) {
    throw new TioHttpError(response)
  }

  return await response.text()
}

async function prepare(): Promise<void> {
  if (runURL !== null && Date.now() < nextRefresh) {
    return
  }

  const scrapeResponse: string = await requestText('/')
  const frontendJSURL: Option<string> = scrapeResponse.match(SCRIPT_REGEX)?.[1]

  if (frontendJSURL == null) {
    throw new TioError(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    )
  }

  const frontendJS: string = await requestText(frontendJSURL)

  runURL = frontendJS.match(RUNURL_REGEX)?.[1]

  if (runURL == null) {
    runURL = null

    throw new TioError(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    )
  }

  nextRefresh = Date.now() + refreshTimeout
}

async function evaluate(
  code: string,
  language: TioLanguage,
  timeout: Option<number>
): Promise<Option<string>> {
  const ab: AbortController = new AbortController()

  const response: Response = await fetch(
    `https://tio.run/cgi-bin/static/${runURL}/${randomBytes(16).toString(
      'hex'
    )}`,
    {
      method: 'POST',
      body: deflateRawSync(
        `Vlang\0\x31\0${language}\0VTIO_OPTIONS\0\x30\0F.code.tio\0${code.length}\0${code}F.input.tio\0\x30\0Vargs\0\x30\0R`,
        { level: 9 }
      ),
      signal: ab.signal
    }
  )

  if (response.status >= 400) {
    throw new TioHttpError(response)
  }

  let data: Option<ArrayBuffer> = null

  if (timeout === Infinity) {
    data = await response.arrayBuffer()
  } else {
    const tm: Timeout = new Timeout(timeout!)

    data = await Promise.race([response.arrayBuffer(), tm.promise])

    if (data !== null) {
      tm.cancel()
    } else {
      ab.abort()
      return null
    }
  }

  return gunzipSync(data).toString()
}

// @ts-ignore
const tio: Tio = async (
  code: string,
  language: Option<TioLanguage> = null,
  timeout: Option<number> = null
): Promise<TioResponse> => {
  if (timeout !== null && (!Number.isSafeInteger(timeout) || timeout < 500)) {
    throw new TioError(
      `Timeout must be a valid integer and it's value must be 500 or greater. Got ${timeout}`
    )
  } else if (
    language != null &&
    language !== defaultLanguage &&
    !languages.includes(language)
  ) {
    throw new TioError(
      `Unsupported/invalid language ID provided (${language}), a list of supported language IDs can be seen in \`tio.languages\`.`
    )
  }

  timeout ??= defaultTimeout
  language ??= defaultLanguage

  await prepare()

  const result: Option<string> = await evaluate(code, language, timeout)

  if (result === null) {
    // The website formats this as in seconds.
    const timeoutInSecs: number = timeout / 1000

    return Object.freeze({
      output: `Request timed out after ${timeout}ms`,
      language,
      timedOut: true,
      realTime: timeoutInSecs,
      userTime: timeoutInSecs,
      sysTime: timeoutInSecs,
      CPUshare: 0,
      exitCode: 124
    })
  }

  const s: string[] = result!.substring(16).split(result!.substring(0, 16))
  const [debug, realTime, userTime, sysTime, CPUshare, exitCode] = s[1]
    .match(DEBUG_REGEX)!
    .slice(1)

  return Object.freeze({
    output: s[0] || debug,
    language,
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
    if (lang != null && lang !== defaultLanguage && !languages.includes(lang)) {
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
        `Timeout must be a valid integer and it's value must be 500 or greater. Got ${timeout}`
      )
    }

    defaultTimeout = timeout
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
        `Refresh timeout must be a valid integer and it's value must be 500000 or greater. Got ${timeout}`
      )
    }

    refreshTimeout = timeout
  }
})

export default tio
