# tio.js

Unofficial Node.js wrapper for the _TryItOnline_ ([tio.run](https://tio.run)) API.

```console
$ npm i tio.js
```

| ⚠️ WARNING: This is an ES module and can't be imported with CommonJS's `require()`. If you want to use the CommonJS version, revert to version `1.1.0`. |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ |

# Examples

## Getting a list of available languages

```js
import tio from 'tio.js';

const languages = await tio.languages();

console.log(languages);
```

## Evaluating a string

Evaluating a string is really simple.

```js
import tio from 'tio.js';

// Evaluate a code (Node.js is the default language).
let response = await tio('console.log("Hello, World!");');

console.log(response);

// Evaluate a code from another programming language (e.g. Python).
response = await tio('print("Hello, World!")', 'python3');

console.log(response);
```

**Console output (for the first `console.log`):**

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
import tio from 'tio.js';

await tio.setDefaultLanguage('python3');

console.log(tio.getDefaultLanguage()); // python3

const response = await tio('print("Hello, World!")');

console.log(response);
```

## Timeouts

Use this to contain scripts that runs longer than it should've been. **(e.g. infinite loop)**

```js
import tio from 'tio.js';

// Make the response time out after waiting for 10000 ms (10 seconds).
const response = await tio('for (;;);', 'javascript-node', 10000);

console.log(response);
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

Just like setting a default language beforehand, you can set default timeouts so you don't have to enter the same arguments again.

```js
import tio from 'tio.js';

tio.setDefaultTimeout(10000);

console.log(tio.getDefaultTimeout()); // 10000

const response = await tio('for (;;);', 'javascript-node');

console.log(response); // Does the same as the example before.
```
