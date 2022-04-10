import { Client, errors } from "undici";
import { deflateRawSync, gunzipSync } from "node:zlib";
import { randomBytes } from "node:crypto";
import type { ResponseData } from "undici/types/dispatcher";
import { Buffer } from "node:buffer";

export interface TioResponse {
  readonly output: string;
  readonly language: string;
  readonly timedOut: boolean;
  readonly realTime: number;
  readonly userTime: number;
  readonly sysTime: number;
  readonly CPUshare: number;
  readonly exitCode: number;
}

// embrace rust <3
export type Option<T> = T | undefined | null;

let runURL: Option<string> = null;
let languages: Option<string[]> = null;
let defaultTimeout: Option<number> = null;
let defaultLanguage: string = "javascript-node";
let nextRefresh: number = 0;

function createRequestBody(code: string, language: string): Buffer {
  return deflateRawSync(
    Buffer.from(`Vlang\0\x31\0${language}\0VTIO_OPTIONS\0\x30\0F.code.tio\0${code.length}\0${code}F.input.tio\0\x30\0Vargs\0\x30\0R`),
    { level: 9 }
  );
}

function requestText(path: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const client: Client = new Client("https://tio.run:443");

    const response: ResponseData = await client.request({
      path,
      method: "GET"
    });

    if (response.statusCode >= 400) {
      const error: Error = new Error(`Received invalid status code: ${response.statusCode} from the server.`);
      return client.destroy(error, () => reject(error));
    }

    resolve(await response.body.text());
  });
}

async function fetchLanguages(): Promise<string[]> {
  if (languages === null) {
    languages = Object.keys(JSON.parse(await requestText("/languages.json"))).map((x: string): string => x.toLowerCase());
  }

  return languages!;
}

async function resolveLanguage(language: Option<string>): Promise<string> {
  language = language?.toLowerCase() ?? defaultLanguage;

  if (language === defaultLanguage) {
    return language;
  } else if (languages === null) {
    languages = await fetchLanguages();
  }

  if (!languages!.includes(language)) {
    throw new Error("Unsupported/Invalid language provided, a list of supported languages can be requested with `await tio.languages()`.");
  }

  return language;
}

async function prepare(): Promise<void> {
  if (runURL !== null && Date.now() < nextRefresh) {
    return;
  }

  const scrapeResponse: string = await requestText("/");
  const frontendJSURL: Option<string> = scrapeResponse.match(/<script src="(\/static\/[0-9a-f]+-frontend\.js)" defer><\/script>/)?.[1];

  if (frontendJSURL == null) {
    throw new Error("An error occurred while scraping tio.run. Please try again later or report this bug to the developer.");
  }

  const frontendJS: string = await requestText(frontendJSURL);

  runURL = frontendJS.match(/^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m)?.[1];

  if (runURL == null) {
    runURL = null;

    throw new Error("An error occurred while scraping tio.run. Please try again later or report this bug to the developer.");
  }
  
  nextRefresh = Date.now() + 850000;
}

async function setDefaultLanguage(language: string): Promise<void> {
  if ((language = language.toLowerCase()) === defaultLanguage) {
    return;
  }

  defaultLanguage = language = await resolveLanguage(language);
}

function getDefaultLanguage(): string {
  return defaultLanguage;
}

function setDefaultTimeout(timeout: Option<number>): void {
  if (typeof timeout === "number" && !Number.isInteger(timeout)) {
    throw new TypeError("Timeout must be a valid integer.");
  } else if (typeof timeout === "number" && timeout < 500) {
    throw new RangeError("Timeout must be greater or equal to 500.");
  }

  defaultTimeout = timeout;
}

function getDefaultTimeout(): Option<number> {
  return defaultTimeout;
}

const version: string = "2.1.0";

async function tioRun(code: string, language: Option<string>, timeout: Option<number>): Promise<TioResponse> {
  if (typeof timeout === "number" && !Number.isInteger(timeout)) {
    throw new TypeError("Timeout must be a valid integer.");
  } else if (typeof timeout === "number" && timeout < 500) {
    throw new RangeError("Timeout must be greater or equal to 500.");
  } else if (defaultTimeout != null && typeof timeout !== "number") {
    timeout = defaultTimeout;
  }

  language = await resolveLanguage(language);

  await prepare();

  let timedOut: boolean = false;

  let result: Option<string> = await new Promise(async (resolve, reject) => {
    const client: Client = new Client("https://tio.run:443");

    const response: ResponseData = await client.request({
      path: `/cgi-bin/static/${runURL}/${randomBytes(16).toString("hex")}`,
      method: "POST",
      body: createRequestBody(code, language!),
      bodyTimeout: timeout ?? 0
    });

    let error: Option<Error> = null;

    if (response.statusCode >= 400) {
      error = new Error(`Received invalid status code: ${response.statusCode} from the server.`);
      await client.destroy(error);
    }

    let output: Buffer = Buffer.alloc(0);

    response.body
      .on("error", async (err: Error) => {
        if (err instanceof errors.BodyTimeoutError) {
          timedOut = true;
        }

        error = err;
      })
      .on("data", (chunk: Buffer) => {
        output = Buffer.concat([output, chunk]);
      })
      .on("close", () => client.close(() => error ? timedOut ? resolve(null) : reject(error) : resolve(gunzipSync(output).toString())));
  });

  if (result == null) {
    // The website formats this as in seconds.
    const timeoutInSecs: number = timeout! / 1000;

    return {
      output: `Request timed out after ${timeout}ms`,
      language,
      timedOut,
      realTime: timeoutInSecs,
      userTime: timeoutInSecs,
      sysTime: timeoutInSecs,
      CPUshare: 0,
      exitCode: 0
    };
  }

  result = result.replace(new RegExp(result.slice(-16).replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), "");

  const split: string[] = result.split("\n");
  const [realTime, userTime, sysTime, CPUshare, exitCode] = split.slice(-5).map((x: string) => {
    if (/[^\d]$/.test(x)) {
      return parseInt(x.slice(11, -2));
    }

    return parseInt(x.slice(11));
  });

  return {
    output: split.slice(0, -5).join("\n").trim(),
    language,
    timedOut,
    realTime,
    userTime,
    sysTime,
    CPUshare,
    exitCode
  };
}

Object.assign(tioRun, { languages: fetchLanguages, setDefaultLanguage, getDefaultLanguage, setDefaultTimeout, getDefaultTimeout, version });

export default tioRun;
