"use strict";

const { request } = require('https');
const { deflateRawSync, gunzipSync } = require('zlib');
const { randomBytes } = require('crypto');
const getRequestBody = (c, l) => deflateRawSync(Buffer.from(`Vlang\0${1}\0${l}\0VTIO_OPTIONS\0${0}\0F.code.tio\0${c.length}\0${c}F.input.tio\0${0}\0Vargs\0${0}\0R`, 'binary'), { level: 9 });

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
 * @async
 * Does a simple GET request to the TIO page. Used primarily for scraping.
 * @param {string} [path] The request path.
 * @returns {Promise<string>} The request response.
 */
function requestText(path) {
    return new Promise(resolve => {
        request({
            method: 'GET',
            host: 'tio.run',
            path: path || '/'
        }, response => {
            let str = '';
            response.on('data', data => str += data);
            response.once('end', () => resolve(str));
        }).end();
    });
}

/**
 * @async
 * Handles if a language is available to use or not.
 * @returns {Promise<string>} The resolved language.
 */
async function resolveLanguage(language) {
    if (language && typeof language !== 'string')
        throw new TypeError("'language' must be a string.");

    language = language ? language.toLowerCase() : defaultLanguage;
    if (language === defaultLanguage) return language;
    else if (!languages) languages = Object.keys(JSON.parse(await requestText('/languages.json'))).map(x => x.toLowerCase());
    if (languages.includes(language)) return language;
    
    throw new TypeError(`Invalid language. List of all listed languages are in "await tio.languages();"`);
}

/**
 * @async
 * Prepares the request.
 * @returns {Promise<void>}
 */
async function prepare() {
    if (runURL) return;
    const scrapeResponse = await requestText();
    const frontendJSurl = scrapeResponse.match(/<script src="(\/static\/[0-9a-f]+-frontend\.js)" defer><\/script>/)[1];
    if (!frontendJSurl) throw new Error('An error occurred while scraping tio.run. Please try again later or report to the developer about this bug.');
    const frontendJS = await requestText(frontendJSurl);
    runURL = frontendJS.match(/^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m)[1];
    
    if (!runURL) throw new Error('An error occurred while scraping tio.run. Please try again later or report to the developer about this bug.');
}

module.exports = Object.assign(
    /**
     * @async
     * Evaluates code through the TryItOnline API.
     * @param {string} code The code to run.
     * @param {string} [language] The programming language to use. Uses the default language if not specified.
     * @param {number} [timeout] After how much time should the code execution timeout. (in ms)
     * @returns {Promise<TioResponse>} The code response.
     */
    async (code, language, timeout) => {
        if (typeof code !== 'string')
            throw new TypeError("'code' must be a string.");
        if (timeout && !Number.isInteger(timeout))
            throw new TypeError("'timeout' must be a number.");
        else if (timeout && timeout < 500)
            throw new TypeError("'timeout' must be longer than 500 ms.");
        else if (!timeout && defaultTimeout)
            timeout = defaultTimeout;

        language = await resolveLanguage(language);
        await prepare();
        let response = await new Promise(resolve => {
            const currentRequest = request({
                host: 'tio.run',
                path: `/cgi-bin/static/${runURL}/${randomBytes(16).toString('hex')}`,
                method: 'POST'
            }, resp => {
                let buf = Buffer.alloc(0);
                resp.on('data', d => buf = Buffer.concat([buf, d]));
                resp.once('end', () => resolve(gunzipSync(buf).toString()));
            });
            
            if (timeout)
                currentRequest.setTimeout(timeout, () => {
                    if (!currentRequest.destroyed) currentRequest.destroy();
                    resolve(null);
                });

            currentRequest.end(getRequestBody(
                unescape(encodeURIComponent(code)),
                unescape(encodeURIComponent(language))
            ));
        });

        if (!response)
            return {
                output: `Request timed out after ${timeout}ms`,
                language,
                timedOut: true,
                realTime: timeout / 1000, // the website formats this as in seconds
                userTime: timeout / 1000,
                sysTime: timeout / 1000,
                CPUshare: 0,
                exitCode: 0
            };

        response = response.replace(new RegExp(response.slice(-16).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), '');
        const split = response.split('\n');
        const [ realTime, userTime, sysTime, CPUshare, exitCode ] = split.slice(-5).map(x => Number(x.slice(11, ...(/[^\d]$/.test(x) ? [-2] : []))));
        return {
            output: split.slice(0, -5).join('\n').trim(),
            language,
            timedOut: false,
            realTime,
            userTime,
            sysTime,
            CPUshare,
            exitCode,
        };
    },
{
    /**
     * @async
     * Sets the default language.
     * @param {string} language Language to use as default.
     * @returns {Promise<void>}
     */
    setDefaultLanguage: async (language) => {
        language = language.toLowerCase();
        if (language === defaultLanguage) return;
        language = await resolveLanguage(language);
        defaultLanguage = language;
    },
    
    /**
     * Returns the default language to use if language parameter is not provided.
     * @returns {string}
     */
    getDefaultLanguage: () => defaultLanguage,
    
    /**
     * @async
     * Fetches all the available languages.
     * @returns {string[]} The list of available languages.
     */
    languages: async () => {
        if (!languages) languages = Object.keys(JSON.parse(await requestText('/languages.json'))).map(x => x.toLowerCase());
        return languages;
    },

    /**
     * Returns the default timeout used by the library.
     * @returns {number|null} A number (in ms) or null if not set.
     */
    getDefaultTimeout: () => {
        return defaultTimeout;
    },

    /**
     * Sets the default timeout for the library.
     * @param {number|null} [timeout] The new default timeout (in ms) or null to disable it.
     * @returns {void}
     */
    setDefaultTimeout: (timeout) => {
        if (!timeout) {
            defaultTimeout = null;
            return;
        }

        if (!Number.isInteger(timeout))
            throw new TypeError("'timeout' must be a number");
        else if (timeout < 500)
            throw new TypeError("'timeout' must be longer than 500 ms.");
        defaultTimeout = Number(timeout);
    },
    
    version: require('./package.json').version
});