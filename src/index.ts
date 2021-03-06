import Timeout from './timeout';
import languages, { TioLanguage } from './languages';
import {
  randomHex,
  requestText,
  RUNURL_REGEX,
  SCRIPT_REGEX,
  TioError,
  TioHttpError,
  version
} from './main';
import { deflateRawSync, gunzipSync } from 'node:zlib';
import { Option, Tio, TioResponse } from './typings';

let runURL: Option<string> = null;
let defaultTimeout: Option<number> = null;
let defaultLanguage: TioLanguage = 'javascript-node';
let refreshTimeout: number = 850000;
let nextRefresh: number = 0;

async function prepare(): Promise<void> {
  if (runURL !== null && Date.now() < nextRefresh) {
    return;
  }

  const scrapeResponse: string = await requestText('/');
  const frontendJSURL: Option<string> = scrapeResponse.match(SCRIPT_REGEX)?.[1];

  if (frontendJSURL == null) {
    throw new TioError(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    );
  }

  const frontendJS: string = await requestText(frontendJSURL);

  runURL = frontendJS.match(RUNURL_REGEX)?.[1];

  if (runURL == null) {
    runURL = null;

    throw new TioError(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    );
  }

  nextRefresh = Date.now() + refreshTimeout;
}

async function evaluate(
  code: string,
  language: TioLanguage,
  timeout: Option<number>
): Promise<Option<string>> {
  const ab: AbortController = new AbortController();
  const hex: string = await randomHex(16);

  const response: Response = await fetch(
    `https://tio.run/cgi-bin/static/${runURL}/${hex}`,
    {
      method: 'POST',
      body: deflateRawSync(
        `Vlang\0\x31\0${language}\0VTIO_OPTIONS\0\x30\0F.code.tio\0${code.length}\0${code}F.input.tio\0\x30\0Vargs\0\x30\0R`,
        {
          level: 9
        }
      ),
      signal: ab.signal
    }
  );

  if (response.status >= 400) {
    throw new TioHttpError(response);
  }

  let data: Option<ArrayBuffer> = null;

  if (timeout === null) {
    data = await response.arrayBuffer();
  } else {
    const tm: Timeout = new Timeout(timeout!);

    data = await Promise.race([response.arrayBuffer(), tm.promise]);

    if (data !== null) {
      tm.cancel();
    } else {
      ab.abort();
      return null;
    }
  }

  return gunzipSync(data).toString();
}

// @ts-ignore
const tio: Tio = async (
  code: string,
  language: Option<TioLanguage> = null,
  timeout: Option<number> = null
): Promise<TioResponse> => {
  if (
    typeof timeout === 'number' &&
    (!Number.isSafeInteger(timeout) || timeout < 500)
  ) {
    throw new TioError(
      'Timeout must be a valid integer. and it must be greater or equal to 500.'
    );
  } else if (
    language != null &&
    language !== defaultLanguage &&
    !languages.includes(language)
  ) {
    throw new TioError(
      'Unsupported/Invalid language provided, a list of supported languages can be requested with `tio.languages`.'
    );
  }

  timeout ??= defaultTimeout;
  language ??= defaultLanguage;

  await prepare();

  const result: Option<string> = await evaluate(code, language, timeout);

  if (result === null) {
    // The website formats this as in seconds.
    const timeoutInSecs: number = timeout! / 1000;

    return Object.freeze({
      output: `Request timed out after ${timeout}ms`,
      language,
      timedOut: true,
      realTime: timeoutInSecs,
      userTime: timeoutInSecs,
      sysTime: timeoutInSecs,
      CPUshare: 0,
      exitCode: 0
    });
  }

  const s: string[] = result!.replaceAll(result!.slice(-16), '').split('\n');
  const output: string = s.slice(0, -5).join('\n');
  const [realTime, userTime, sysTime, CPUshare, exitCode] = s
    .slice(-5)
    .map((x: string) => parseFloat(x.slice(11).split(' ')[0]));

  return Object.freeze({
    output,
    language,
    timedOut: false,
    realTime,
    userTime,
    sysTime,
    CPUshare,
    exitCode
  });
};

Object.defineProperty(tio, 'languages', {
  configurable: false,
  enumerable: true,
  writable: false,
  value: languages
});

Object.defineProperty(tio, 'version', {
  configurable: false,
  enumerable: true,
  writable: false,
  value: version
});

Object.defineProperty(tio, 'defaultLanguage', {
  configurable: false,
  enumerable: true,

  get(): TioLanguage {
    return defaultLanguage;
  },

  set(lang: TioLanguage) {
    if (lang != null && lang !== defaultLanguage && !languages.includes(lang)) {
      throw new TioError(
        'Unsupported/Invalid language provided, a list of supported languages can be requested with `await tio.languages()`.'
      );
    }

    defaultLanguage = lang;
  }
});

Object.defineProperty(tio, 'defaultTimeout', {
  configurable: false,
  enumerable: true,

  get(): Option<number> {
    return defaultTimeout;
  },

  set(timeout: Option<number>) {
    if (
      typeof timeout === 'number' &&
      (!Number.isSafeInteger(timeout) || timeout < 500)
    ) {
      throw new TioError(
        'Timeout must be a valid integer. and it must be greater or equal to 500.'
      );
    }

    defaultTimeout = timeout;
  }
});

Object.defineProperty(tio, 'refreshTimeout', {
  configurable: false,
  enumerable: true,

  get(): number {
    return refreshTimeout;
  },

  set(timeout: number) {
    if (
      timeout !== Infinity &&
      (!Number.isSafeInteger(timeout) || timeout < 500000)
    ) {
      throw new TioError(
        'Refresh timeout must be a valid integer. and it must be greater or equal to 500000.'
      );
    }

    refreshTimeout = timeout;
  }
});

export default tio;
