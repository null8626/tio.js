import { request } from 'node:https';
import { deflateRawSync, gunzipSync } from 'node:zlib';
import { randomBytes } from 'node:crypto';

const getRequestBody = (c, l) =>
  deflateRawSync(
    Buffer.from(
      `Vlang\0${1}\0${l}\0VTIO_OPTIONS\0${0}\0F.code.tio\0${
        c.length
      }\0${c}F.input.tio\0${0}\0Vargs\0${0}\0R`,
      'binary'
    ),
    { level: 9 }
  );

/**
 * @typedef {Object} TioResponse
 * @property {string} output The code output.
 * @property {string} language The language used.
 * @property {boolean} timedOut A boolean to check if the request timed out.
 * @property {number} realTime How long the code runs real time.
 * @property {number} userTime How long the code runs user time.
 * @property {number} sysTime How long the code runs system time.
 * @property {number} CPUshare The code's CPU share.
 * @property {number} exitCode The script's exit code.
 */

let runURL = null;
let languages = null;
let defaultTimeout = null;
let defaultLanguage = 'javascript-node';

/**
 * Does a simple GET request to the TIO page. Used primarily for scraping.
 * @param {string} [path] The request path.
 * @returns {Promise<string>} The request response.
 */
function requestText(path) {
  return new Promise((resolve) => {
    request(
      {
        method: 'GET',
        host: 'tio.run',
        path: path ?? '/'
      },
      (response) => {
        let str = '';

        response.on('data', (data) => {
          str += data;
        });
        response.once('end', () => resolve(str));
      }
    ).end();
  });
}

/**
 * Handles if a language is available to use or not.
 * @async
 * @returns {Promise<string>} The resolved language.
 */
async function resolveLanguage(language) {
  if (language !== undefined && typeof language !== 'string')
    throw new TypeError("Argument 'language' must be of type string.");

  language = language !== undefined ? language.toLowerCase() : defaultLanguage;

  if (language === defaultLanguage) return language;

  if (languages === null) languages = await languages_();

  if (!languages.includes(language))
    throw new Error(
      "Unsupported/Invalid language provided, a list of supported languages can be requested with 'tio.languages()'."
    );

  return language;
}

/**
 * Prepares the request.
 * @async
 * @returns {Promise<void>}
 */
async function prepare() {
  if (runURL !== null) return;

  const scrapeResponse = await requestText();
  const frontendJSURL = scrapeResponse.match(
    /<script src="(\/static\/[0-9a-f]+-frontend\.js)" defer><\/script>/
  )?.[1];

  if (frontendJSURL === undefined)
    throw new Error(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    );

  const frontendJS = await requestText(frontendJSURL);

  runURL = frontendJS.match(
    /^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m
  )?.[1];

  if (runURL === undefined) {
    runURL = null;

    throw new Error(
      'An error occurred while scraping tio.run. Please try again later or report this bug to the developer.'
    );
  }
}

/**
 * Fetches all the available languages.
 * @async
 * @returns {Promise<string[]>} The list of available languages.
 */
async function languages_() {
  if (languages === null)
    languages = Object.keys(
      JSON.parse(await requestText('/languages.json'))
    ).map((x) => x.toLowerCase());

  return languages;
}

/**
 * Sets the default language.
 * @async
 * @param {string} language The language to use as default.
 * @returns {Promise<void>}
 */
async function setDefaultLanguage(language) {
  if (typeof language !== 'string')
    throw new TypeError("Argument 'language' must be of type string.");

  language = language.toLowerCase();

  if (language === defaultLanguage) return;

  language = await resolveLanguage(language);
  defaultLanguage = language;
}

/**
 * Returns the default language.
 * @returns {string}
 */
function getDefaultLanguage() {
  return defaultLanguage;
}

/**
 * Sets the default timeout for the library.
 * @param {number | null} [timeout] The new default timeout (in ms) or null to disable it.
 * @returns {void}
 */
function setDefaultTimeout(timeout) {
  if (timeout == undefined) {
    defaultTimeout = null;

    return;
  }

  if (!Number.isInteger(timeout))
    throw new TypeError("Argument 'timeout' must be an integer.");
  if (timeout < 500)
    throw new RangeError(
      "Argument 'timeout' must be greater than or equal to 500."
    );

  defaultTimeout = parseInt(timeout);
}

/**
 * Returns the default timeout used by the library.
 * @returns {number | null} A number (in ms) or null if not set.
 */
function getDefaultTimeout() {
  return defaultTimeout;
}

const version = require('./package.json').version;

export {
  languages_ as languages,
  setDefaultLanguage,
  getDefaultLanguage,
  setDefaultTimeout,
  getDefaultTimeout,
  version
};

/**
 * Evaluates code through the TryItOnline API.
 * @async
 * @param {string} code The code to run.
 * @param {string} [language] The programming language to use. Uses the default language if not specified.
 * @param {number} [timeout] After how much time should the code execution timeout. (in ms)
 * @returns {Promise<TioResponse>} The code response.
 */
async function tioRun(code, language, timeout) {
  if (typeof code !== 'string')
    throw new TypeError("Argument 'code' must be of type string.");
  if (timeout !== undefined) {
    if (!Number.isInteger(timeout))
      throw new TypeError("Argument 'timeout' must be an integer.");
    if (timeout < 500)
      throw new RangeError(
        "Argument 'timeout' must be greater than or equal to 500."
      );
  } else if (defaultTimeout !== null) timeout = defaultTimeout;

  language = await resolveLanguage(language);

  await prepare();

  let response = await new Promise((resolve) => {
    const currentRequest = request(
      {
        host: 'tio.run',
        path: `/cgi-bin/static/${runURL}/${randomBytes(16).toString('hex')}`,
        method: 'POST'
      },
      (resp) => {
        let buf = Buffer.alloc(0);

        resp.on('data', (d) => {
          buf = Buffer.concat([buf, d]);
        });
        resp.once('end', () => resolve(gunzipSync(buf).toString()));
      }
    );

    if (timeout !== undefined)
      currentRequest.setTimeout(timeout, () => {
        if (!currentRequest.destroyed) currentRequest.destroy();

        resolve(null);
      });

    currentRequest.end(getRequestBody(code, language));
  });

  if (response === null) {
    // The website formats this as in seconds.
    const timeoutInSecs = timeout / 1000;

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

  response = response.replace(
    new RegExp(
      response.slice(-16).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
      'g'
    ),
    ''
  );

  const split = response.split('\n');
  const [realTime, userTime, sysTime, CPUshare, exitCode] = split
    .slice(-5)
    .map((x) => parseInt(x.slice(11, ...(/[^\d]$/.test(x) ? [-2] : []))));

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

export default tioRun;
