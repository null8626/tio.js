import { notEqual, strict } from 'node:assert';
import test from 'fast-fail';
import tio from './dist/index.js';

let output;

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
