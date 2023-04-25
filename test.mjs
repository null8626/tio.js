import { strictEqual } from 'node:assert'
import { it } from 'node:test'

import tio from './dist/index.js'

it('outputs Hello, World in JavaScript', async () => {
  const { output } = await tio("console.log('Hello, World!');")

  strictEqual(output, 'Hello, World!\n')
})

it('outputs Hello, World in Python 3', async () => {
  tio.defaultLanguage = 'python3'
  const { output } = await tio("print('Hello, World!')")

  strictEqual(output, 'Hello, World!\n')
})

it('surpresses an infinite loop', async () => {
  const { output, timedOut } = await tio('for (;;);', {
    language: 'javascript-node',
    timeout: 2000
  })

  strictEqual(timedOut, true)
  strictEqual(output, 'Request timed out after 2000ms')
})
