import { deflateRawSync, gunzip, gunzipSync } from 'node:zlib';
import { randomBytes } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { inspect } from 'node:util';

import languages from './languages.js';
import type { TioLanguage } from './languages';

export interface TioResponse {
  readonly output: string;
  readonly language: TioLanguage;
  readonly timedOut: boolean;
  readonly realTime: number;
  readonly userTime: number;
  readonly sysTime: number;
  readonly CPUshare: number;
  readonly exitCode: number;
}

// embrace rust <3
export type Option<T> = T | undefined | null;

export class TioError extends Error {
  public constructor(message: string) {
    super(message);

    this.name = `TioError: ${message}`;
  }
}

export class TioHttpError extends TioError {
  public status: number;
  public statusText: string;

  public constructor(response: Response) {
    super(`[HTTP ${response.status}: ${response.statusText}]`);

    this.status = response.status;
    this.statusText = response.statusText;
  }
}

const ESCAPE_REGEX: RegExp = /[-/\\^$*+?.()|[\]{}]/g;
const SCRIPT_REGEX: RegExp = /<script src="(\/static\/[0-9a-f]+-frontend\.js)" defer><\/script>/;
const RUNURL_REGEX: RegExp = /^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m;

const version: '2.2.0' = '2.2.0';

let runURL: Option<string> = null;
let _defaultTimeout: Option<number> = null;
let _defaultLanguage: TioLanguage = 'javascript-node';
let nextRefresh: number = 0;

async function requestText(path: string): Promise<string> {
  const response: Response = await fetch(`https://tio.run${path}`);

  if (response.status >= 400) {
    throw new TioHttpError(response);
  }

  return await response.text();
}

async function prepare(): Promise<void> {
  if (runURL !== null && Date.now() < nextRefresh) {
    return;
  }

  const scrapeResponse: string = await requestText('/');
  const frontendJSURL: Option<string> = scrapeResponse.match(SCRIPT_REGEX)?.[1];

  if (frontendJSURL == null) {
    throw new TioError('An error occurred while scraping tio.run. Please try again later or report this bug to the developer.');
  }

  const frontendJS: string = await requestText(frontendJSURL);

  runURL = frontendJS.match(RUNURL_REGEX)?.[1];

  if (runURL == null) {
    runURL = null;

    throw new TioError('An error occurred while scraping tio.run. Please try again later or report this bug to the developer.');
  }

  nextRefresh = Date.now() + 850000;
}

async function evaluate(code: string, language: TioLanguage): Promise<Option<string>> {
  const ac: AbortController = new AbortController();
  let timedOut: boolean = false;

  if (_defaultTimeout !== null) {
    setTimeout(() => {
      ac.abort();
      timedOut = true;
    }, _defaultTimeout);
  }

  const response: Response = await fetch(`https://tio.run/cgi-bin/static/${runURL}/${randomBytes(16).toString('hex')}`, {
    method: 'POST',
    body: deflateRawSync(
      Buffer.from(`Vlang\0\x31\0${language}\0VTIO_OPTIONS\0\x30\0F.code.tio\0${code.length}\0${code}F.input.tio\0\x30\0Vargs\0\x30\0R`),
      { level: 9 }
    ),
    signal: ac.signal
  });

  // @ts-ignore: this CAN evaluate to true.
  if (timedOut === true) {
    return null;
  } else if (response.status >= 400) {
    throw new TioHttpError(response);
  }

  return gunzipSync(Buffer.from(await response.arrayBuffer())).toString();
}

async function tioRun(code: string, language: Option<TioLanguage>, timeout: Option<number>): Promise<TioResponse> {
  if (typeof timeout === 'number' && (!Number.isSafeInteger(timeout) || timeout < 500)) {
    throw new TioError('Timeout must be a valid integer. and it must be greater or equal to 500.');
  } else if (_defaultTimeout == null || typeof timeout !== 'number') {
    timeout = _defaultTimeout;
  }

  if (language != null && language !== _defaultLanguage && !languages.includes(language)) {
    throw new TioError('Unsupported/Invalid language provided, a list of supported languages can be requested with `await tio.languages()`.');
  }

  language ??= _defaultLanguage;

  await prepare();

  let result: Option<string> = await evaluate(code, language);

  if (result === null) {
    // The website formats this as in seconds.
    const timeoutInSecs: number = timeout! / 1000;

    return {
      output: `Request timed out after ${timeout}ms`,
      language,
      timedOut: true,
      realTime: timeoutInSecs,
      userTime: timeoutInSecs,
      sysTime: timeoutInSecs,
      CPUshare: 0,
      exitCode: 0
    };
  }

  result = result!.replace(new RegExp(result!.slice(-16).replace(ESCAPE_REGEX, '\\$&'), 'g'), '');

  const split: string[] = result.split('\n');
  const [realTime, userTime, sysTime, CPUshare, exitCode] = split.slice(-5).map((x: string) => {
    if (/[^\d]$/.test(x)) {
      return Number(x.slice(11, -2));
    }

    return Number(x.slice(11));
  });

  return {
    output: split.slice(0, -5).join('\n').trim(),
    language,
    timedOut: false,
    realTime,
    userTime,
    sysTime,
    CPUshare,
    exitCode
  };
}

Object.assign(tioRun, {
  languages,

  get defaultLanguage(): TioLanguage {
    return _defaultLanguage;
  },

  set defaultLanguage(lang: TioLanguage) {
    _defaultLanguage = lang;
  },

  get defaultTimeout(): Option<number> {
    return _defaultTimeout;
  },

  set defaultTimeout(timeout: Option<number>) {
    if (typeof timeout === 'number' && (!Number.isSafeInteger(timeout) || timeout < 500)) {
      throw new TioError('Timeout must be a valid integer. and it must be greater or equal to 500.');
    }

    _defaultTimeout = timeout;
  },

  version
});

export default tioRun;
