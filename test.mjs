import { notEqual, strict } from 'node:assert';
import test from 'fast-fail';

let tio;
let output;

test('importing the tio module', async () => {
  tio = await import('./dist/index.js');
  tio = tio?.default; // this is stupid but at least it fixes the problemo
  notEqual(tio, null);
});

test('evaluating a simple Hello, World in JavaScript', async () => {
  const { output } = await tio("console.log('Hello, World!');");
  strict.equal(output, 'Hello, World!\n');
});

test('evaluating a simple Hello, World in Python 3', async () => {
  tio.defaultLanguage = 'python3';
  const { output } = await tio("print('Hello, World!')");
  strict.equal(output, 'Hello, World!\n');
});

test('evaluating an infinite loop', async () => {
  const { output, timedOut } = await tio('for (;;);', 'javascript-node', 2000);

  strict.equal(timedOut, true);
  strict.equal(output, 'Request timed out after 2000ms');
});

test('evaluating an infinite loop using defaultTimeout', async () => {
  tio.defaultTimeout = 2000;

  const { output, timedOut } = await tio('for (;;);', 'javascript-node');

  strict.equal(timedOut, true);
  strict.equal(output, 'Request timed out after 2000ms');
});
