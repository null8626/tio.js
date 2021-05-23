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
    const response = await tio(`console.log("Hello, World!");`, `javascript-node`);
    console.log(response);
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