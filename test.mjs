import { notEqual, strict } from 'node:assert';
import { test } from 'fast-fail';

let tio;
let output;

test('importing the tio module', async () => {
  tio = await import('./index.js');
  tio = tio?.default; // this is stupid but at least it fixes the problemo
  notEqual(tio, null);
});

test('evaluating a simple Hello, World in JavaScript', async () => {
  const { output } = await tio("console.log('Hello, World!');");
  strict.equal(output, 'Hello, World!');
});

test('setting the default language to Python 3', async () => {
  tio.defaultLanguage = 'python3';
  strict.equal(tio.defaultLanguage, 'python3');
});

test('evaluating a simple Hello, World in Python 3', async () => {
  const { output } = await tio("print('Hello, World!')");
  strict.equal(output, 'Hello, World!');
});

test('evaluating an infinite loop', async () => {
  const { output, timedOut } = await tio('for (;;);', 'javascript-node', 10000);

  strict.equal(timedOut, true);
  strict.equal(output, 'Request timed out after 10000ms');
});

test('evaluating an infinite loop using defaultTimeout', async () => {
  tio.defaultTimeout = 10000;

  const { output, timedOut } = await tio('for (;;);', 'javascript-node');

  strict.equal(timedOut, true);
  strict.equal(output, 'Request timed out after 10000ms');
});
