const { request, get } = require('https');
const { deflateRawSync, gunzipSync } = require('zlib');
const { randomBytes } = require('crypto');
const getRequestBody = (c, l) => deflateRawSync(Buffer.from([
    `Vlang`, 1, l, 'VTIO_OPTIONS', 0, 'F.code.tio', c.length, `${c}F.input.tio`, 0, 'Vargs', 0, 'R'
].join('\0'), 'binary'), { level: 9 });

/**
 * @typedef {Object} TioResponse
 * @property {string} output The code output.
 * @property {string} language The language used.
 * @property {number} realTime How long the code runs real time.
 * @property {number} userTime How long the code runs user time.
 * @property {number} sysTime How long the code runs sys. time.
 * @property {number} CPUshare The code's CPU share.
 * @property {number} exitCode The script's exit code.
 */

var runURL = null;
var languages = null;
var defaultLanguage = 'javascript-node';
var nextRequest = null;

/**
 * @async
 * Does a simple GET request to the TIO page. Used primarily for scraping.
 * @param {string} path Optional. The request path.
 * @returns {string} The request response.
 */
function requestText(path) {
    return new Promise(resolve => {
        get(`https://tio.run${path || '/'}`, response => {
            let str = '';
            response.on('data', data => str += data);
            response.once('end', () => resolve(str));
        });
    });
}

/**
 * @async
 * Handles if a language is available to use or not.
 * @returns {string} The parsed language.
 */
async function resolveLanguage(language) {
    if (!languages) {
        const response = JSON.parse(await requestText('/languages.json'));
        languages = {};
        
        for (const entry of Object.entries(response))
            languages[entry[1].name] = entry[0];
    }
    
    if (languages[language]) return languages[language];
    else if (Object.values(languages).includes(language)) return language;
    
    throw new TypeError(`Invalid language.`);
}

/**
 * @async
 * Gets the run URL by scraping the website's backend.
 * @returns {void}
 */
async function getRunURL() {
    if (runURL) return;
    const scrapeResponse = await requestText();
    const frontendJSurl = scrapeResponse.match(/<script src="(\/static\/[0-9a-f]+\-frontend.js)" defer><\/script>/)[1];
    const frontendJS = await requestText(frontendJSurl);
    runURL = frontendJS.match(/^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m)[1];
}

module.exports = Object.assign(
    /**
     * @async
     * Evaluates code through the TryItOnline API.
     * @param {string} code The code to run.
     * @param {string} language The programming language to use. Uses the default language if not specified.
     * @returns {Promise<TioResponse>} The code response.
     */
    async (code, language) => {
        if (!code || typeof code !== 'string')
            throw new TypeError(`Code is missing.`);
        
        const delayAmount = nextRequest ? nextRequest - Math.round(new Date().getTime() / 1000) : 0;
        if (delayAmount > 0)
            await new Promise(end => setTimeout(end, delayAmount * 1000));
        
        language = language ? language.toLowerCase() : defaultLanguage;
        if (language !== defaultLanguage)
            language = await resolveLanguage(language);
        
        await getRunURL();
        let response = await new Promise(resolve => {
            const randomStuff = randomBytes(16).toString('hex');
            
            request({
                host: `tio.run`,
                path: `/cgi-bin/static/${runURL}/${randomStuff}`,
                method: 'POST'
            }, resp => {
                let buf = Buffer.alloc(0);
                resp.on('data', d => buf = Buffer.concat([buf, d]));
                resp.once('end', () => resolve(gunzipSync(buf).toString()));
            }).end(getRequestBody(
                unescape(encodeURIComponent(code)),
                unescape(encodeURIComponent(language))
            ));
        });
        
        nextRequest = Math.round(new Date().getTime() / 1000) + 2;
        response = response.replace(new RegExp(response.slice(-16).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), '');
        
        const split = response.split('\n');
        const debug = split.slice(-5).map(x => Number(x.slice(11, ...(/[^\d]$/.test(x) ? [-2] : []))));
        return {
            output: split.slice(0, -5).join('\n').trim(),
            language,
            realTime: debug[0],
            userTime: debug[1],
            sysTime: debug[2],
            CPUshare: debug[3],
            exitCode: debug[4]
        };
    },
{
    /**
     * @async
     * Sets the default language.
     * @param {string} language Language to use from.
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
    
    version: require('./package.json').version
});