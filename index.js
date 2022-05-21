import { deflateRawSync, gunzipSync } from 'node:zlib';
import { randomBytes } from 'node:crypto';
import { Buffer } from 'node:buffer';
import languages from './languages.js';
export class TioError extends Error {
    constructor(message) {
        super(message);
        this.name = `TioError: ${message}`;
    }
}
export class TioHttpError extends TioError {
    status;
    statusText;
    constructor(response) {
        super(`[HTTP ${response.status}: ${response.statusText}]`);
        this.status = response.status;
        this.statusText = response.statusText;
    }
}
const ESCAPE_REGEX = /[-/\\^$*+?.()|[\]{}]/g;
const SCRIPT_REGEX = /<script src="(\/static\/[0-9a-f]+-frontend\.js)" defer><\/script>/;
const RUNURL_REGEX = /^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m;
const version = '2.2.0';
let runURL = null;
let _defaultTimeout = null;
let _defaultLanguage = 'javascript-node';
let nextRefresh = 0;
async function requestText(path) {
    const response = await fetch(`https://tio.run${path}`);
    if (response.status >= 400) {
        throw new TioHttpError(response);
    }
    return await response.text();
}
async function prepare() {
    if (runURL !== null && Date.now() < nextRefresh) {
        return;
    }
    const scrapeResponse = await requestText('/');
    const frontendJSURL = scrapeResponse.match(SCRIPT_REGEX)?.[1];
    if (frontendJSURL == null) {
        throw new TioError('An error occurred while scraping tio.run. Please try again later or report this bug to the developer.');
    }
    const frontendJS = await requestText(frontendJSURL);
    runURL = frontendJS.match(RUNURL_REGEX)?.[1];
    if (runURL == null) {
        runURL = null;
        throw new TioError('An error occurred while scraping tio.run. Please try again later or report this bug to the developer.');
    }
    nextRefresh = Date.now() + 850000;
}
async function evaluate(code, language) {
    const ac = new AbortController();
    let timedOut = false;
    if (_defaultTimeout !== null) {
        setTimeout(() => {
            ac.abort();
            timedOut = true;
        }, _defaultTimeout);
    }
    const response = await fetch(`https://tio.run/cgi-bin/static/${runURL}/${randomBytes(16).toString('hex')}`, {
        method: 'POST',
        body: deflateRawSync(Buffer.from(`Vlang\0\x31\0${language}\0VTIO_OPTIONS\0\x30\0F.code.tio\0${code.length}\0${code}F.input.tio\0\x30\0Vargs\0\x30\0R`), { level: 9 }),
        signal: ac.signal
    });
    if (timedOut === true) {
        return null;
    }
    else if (response.status >= 400) {
        throw new TioHttpError(response);
    }
    return gunzipSync(Buffer.from(await response.arrayBuffer())).toString();
}
async function tioRun(code, language, timeout) {
    if (typeof timeout === 'number' && (!Number.isSafeInteger(timeout) || timeout < 500)) {
        throw new TioError('Timeout must be a valid integer. and it must be greater or equal to 500.');
    }
    else if (_defaultTimeout == null || typeof timeout !== 'number') {
        timeout = _defaultTimeout;
    }
    if (language != null && language !== _defaultLanguage && !languages.includes(language)) {
        throw new TioError('Unsupported/Invalid language provided, a list of supported languages can be requested with `await tio.languages()`.');
    }
    language ??= _defaultLanguage;
    await prepare();
    let result = await evaluate(code, language);
    if (result === null) {
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
    result = result.replace(new RegExp(result.slice(-16).replace(ESCAPE_REGEX, '\\$&'), 'g'), '');
    const split = result.split('\n');
    const [realTime, userTime, sysTime, CPUshare, exitCode] = split.slice(-5).map((x) => {
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
    get defaultLanguage() {
        return _defaultLanguage;
    },
    set defaultLanguage(lang) {
        _defaultLanguage = lang;
    },
    get defaultTimeout() {
        return _defaultTimeout;
    },
    set defaultTimeout(timeout) {
        if (typeof timeout === 'number' && (!Number.isSafeInteger(timeout) || timeout < 500)) {
            throw new TioError('Timeout must be a valid integer. and it must be greater or equal to 500.');
        }
        _defaultTimeout = timeout;
    },
    version
});
export default tioRun;
