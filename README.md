# tio.js

Unofficial node.js wrapper for the *TryItOnline* \([tio.run](https://tio.run)\) API.

```bash
$ npm i tio.js
```

# Examples

## Getting a list of available languages
```js
const tio = require('tio.js');

(async () => {
    const languages = await tio.languages();
    console.log(languages);
})();
```

## Evaluating a string
Evaluating a string is really simple.

```js
const tio = require('tio.js');

(async () => {
    // evaluate a code (node.js is the default language)
    let response = await tio('console.log("Hello, World!");');
    console.log(response);
    
    // evaluate a code from another programming language (e.g: python)
    response = await tio('print("Hello, World!")', 'python3');
    console.log(response);
})();
```
**Console output (for the first console.log):**
```js
{
    output: 'Hello, World!',
    language: 'javascript-node',
    timedOut: false,
    realTime: 0.069,
    userTime: 0.069,
    sysTime: 0.069,
    CPUshare: 99.99,
    exitCode: 0
}
```

## Setting a default language
Set a default language so you don't have to repeat the same arguments all over again.

```js
const tio = require('tio.js');

(async () => {
    await tio.setDefaultLanguage('python3');
    console.log(tio.getDefaultLanguage()); // python3
    
    const response = await tio('print("Hello, World!")');
    console.log(response);
})();
```

## Timeouts!
Use this to contain scripts that runs longer than it should've been! **(e.g: infinite loop)**

```js
const tio = require('tio.js');

(async () => {
    // make the response time out after waiting for 10000 ms (10 seconds)
    const response = await tio('for (;;);', 'javascript-node', 10000);
    console.log(response);
})();
```
**Console output:**
```js
{
    output: 'Request timed out after 10000ms',
    language: 'javascript-node',
    timedOut: true,
    realTime: 10,
    userTime: 10,
    sysTime: 10,
    CPUshare: 0,
    exitCode: 0
}
```

## Setting a default timeout
Just like setting a default language beforehand, you can set default timeouts so you don't have to enter the same arguments again!

```js
const tio = require('tio.js');

tio.setDefaultTimeout(10000);
console.log(tio.getDefaultTimeout()); // 10000

(async () => {
    const response = await tio('for (;;);', 'javascript-node');
    console.log(response); // does the same as the example before
})();
```