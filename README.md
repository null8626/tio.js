# tio.js [![CI][ci-image]][ci-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![prettier][prettier-image]][prettier-url]

[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[npm-image]: https://img.shields.io/npm/v/tio.js.svg
[npm-url]: https://npmjs.org/package/tio.js
[downloads-image]: https://img.shields.io/npm/dm/tio.js.svg
[downloads-url]: https://npmjs.org/package/tio.js

Evaluate code in a sandboxed environment everywhere with [Node.js](https://npmjs.org/package/tio.js) or [Deno](https://deno.land/x/tio).

### [Node.js](https://npmjs.org/package/tio.js)

In the shell, do:

```shell
npm i tio.js
```

In your source:

```ts
import tio from 'tio.js';
```

### [Deno](https://deno.land/x/tio)

In your source:

```ts
import tio from 'https://deno.land/x/tio@v3.0.2/mod.ts';
```

# Examples

## Getting a list of available languages

```js
console.log(tio.languages);
```

## Evaluating a string

Evaluating a string is really simple.

```js
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
  output: 'Hello, World!\n',
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
tio.defaultLanguage = 'python3';

const response = await tio('print("Hello, World!")');

console.log(response);
```

## Timeouts

Use this to contain scripts that runs longer than it should've been. **(e.g. infinite loop)**

```js
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
tio.defaultTimeout = 10000;

const response = await tio('for (;;);', 'javascript-node');

console.log(response); // Does the same as the example before.
```
