# [tio.js][npm-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![code style: prettier][prettier-image]][prettier-url] [![Build Status][ci-image]][ci-url] [![npm vulnerabilities][npm-vulnerabilities-image]][npm-vulnerabilities-url] [![github vulnerabilities][github-vulnerabilities-image]][github-url] [![languages][languages-image]][github-url] [![npms.io popularity score][npms-io-popularity-image]][npms-io-url] [![npms.io quality score][npms-io-quality-image]][npms-io-url] [![npms.io maintenance score][npms-io-maintenance-image]][npms-io-url] [![npms.io final score][npms-io-final-image]][npms-io-url] [![libraries.io dependents][libraries-io-dependents-image]][libraries-io-url] [![libraries.io score][libraries-io-score-image]][libraries-io-url] [![github code size][github-code-size-image]][github-url] [![license][github-license-image]][github-license-url] [![BLAZINGLY FAST!!!][blazingly-fast-image]][blazingly-fast-url]

[npm-image]: https://img.shields.io/npm/v/tio.js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/tio.js
[downloads-image]: https://img.shields.io/npm/dm/tio.js.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/tio.js
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[ci-image]: https://github.com/null8626/tio.js/workflows/CI/badge.svg
[ci-url]: https://github.com/null8626/tio.js/actions
[npm-vulnerabilities-image]: https://img.shields.io/snyk/vulnerabilities/npm/tio.js?style=flat-square
[npm-vulnerabilities-url]: https://snyk.io/advisor/npm-package/tio.js
[github-vulnerabilities-image]: https://img.shields.io/snyk/vulnerabilities/github/null8626/tio.js?style=flat-square
[languages-image]: https://img.shields.io/github/languages/top/null8626/tio.js?style=flat-square
[npms-io-url]: https://npms.io/search?q=tio.js
[npms-io-popularity-image]: https://img.shields.io/npms-io/popularity-score/tio.js?style=flat-square
[npms-io-quality-image]: https://img.shields.io/npms-io/quality-score/tio.js?style=flat-square
[npms-io-maintenance-image]: https://img.shields.io/npms-io/maintenance-score/tio.js?style=flat-square
[npms-io-final-image]: https://img.shields.io/npms-io/final-score/tio.js?style=flat-square
[libraries-io-dependents-image]: https://img.shields.io/librariesio/dependents/npm/tio.js?style=flat-square
[libraries-io-score-image]: https://img.shields.io/librariesio/sourcerank/npm/tio.js?style=flat-square
[libraries-io-url]: https://libraries.io/npm/tio.js
[github-url]: https://github.com/null8626/tio.js
[github-code-size-image]: https://img.shields.io/github/languages/code-size/null8626/tio.js?style=flat-square
[github-license-image]: https://img.shields.io/npm/l/tio.js?style=flat-square
[github-license-url]: https://github.com/null8626/tio.js/blob/main/LICENSE
[blazingly-fast-image]: https://img.shields.io/badge/speed-BLAZINGLY%20FAST!!!%20%F0%9F%94%A5%F0%9F%9A%80%F0%9F%92%AA%F0%9F%98%8E-brightgreen.svg?style=flat-square
[blazingly-fast-url]: https://twitter.com/acdlite/status/974390255393505280

A small TypeScript library that lets you evaluate code in a sandboxed environment everywhere.

## Installation

<details>
<summary>Node.js</summary>

In your shell:

```console
$ npm install tio.js
```

In your code:

```js
import tio from 'tio.js'
```

</details>
<details>
<summary>Deno</summary>

In your code:

```js
import tio from 'npm:tio.js'
```

</details>
<details>
<summary>Bun</summary>

In your shell:

```console
$ bun install tio.js
```

In your code:

```js
import tio from 'tio.js'
```

</details>

## Examples

<details>
<summary>Getting a list of available languages</summary>

```js
console.log(tio.languages)
```

</details>
<details>
<summary>Evaluating a string</summary>

Evaluating a string is really simple.

```js
// Evaluate a code (Node.js is the default language).
let response = await tio('console.log("Hello, World!");')

console.log(response)

// Evaluate a code from another programming language (e.g. Python).
response = await tio('print("Hello, World!")', 'python3')

console.log(response)
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

</details>
<details>
<summary>Setting a default language</summary>

Set a default language so you don't have to repeat the same arguments all over again.

```js
tio.defaultLanguage = 'python3'

const response = await tio('print("Hello, World!")')

console.log(response)
```

</details>
<details>
<summary>Timeouts</summary>

Use this to contain scripts that runs longer than it should've been. **(e.g. infinite loop)**

```js
// Make the response time out after waiting for 10000 ms (10 seconds).
const response = await tio('for (;;);', 'javascript-node', 10000)

console.log(response)
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

</details>
<details>
<summary>Setting a default timeout</summary>

Just like setting a default language beforehand, you can set default timeouts so you don't have to enter the same arguments again.

```js
tio.defaultTimeout = 10000

const response = await tio('for (;;);', 'javascript-node')

console.log(response) // Does the same as the example before.
```

</details>