# tio.js

Unofficial node.js wrapper for the *TryItOnline* \([tio.run](https://tio.run)\) API.

```bash
$ npm i tio.js
```

# Usage
Simple usage for the library:

```js
const tio = require('tio.js');

(async () => {
    // evaluate a code (node.js is default)
    let response = await tio('console.log("Hello, World!");');
    console.log(response);
    
    // evaluate a code from another programming language (e.g: python)
    response = await tio('print("Hello, World!")', 'python3');
    console.log(response);
    
    // get a list of avaliable languages
    const languages = await tio.languages();
    console.log(languages);
})();
```

## Setting a default language
Set a default language so you don't have to repeat the same arguments all over again.

```js
const tio = require('tio.js');

(async () => {
    await tio.setDefaultLanguage('python3');
    console.log(tio.getDefaultLanguage()); // python3
    
    const response = await tio(`print('Hello, World!')`);
    console.log(response);
})();
```

## Sample response
This is the sample response whenever you ran `await tio(...);`.

```js
{
    output: 'Hello, World!',
    language: 'language-here',
    realTime: 0.069,
    userTime: 0.069,
    sysTime: 0.069,
    CPUshare: 99.99,
    exitCode: 0
}
```