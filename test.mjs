import { strictEqual } from 'node:assert'
import { it } from 'node:test'

import tio from './dist/index.js'

it('outputs "Hello, World!" in JavaScript', async () => {
  const { output } = await tio("console.log('Hello, World!');")

  strictEqual(output, 'Hello, World!\n')
})

it('outputs "Hello, World!" in Python 3', async () => {
  const { output } = await tio("print('Hello, World!')", {
    language: 'python3'
  })

  strictEqual(output, 'Hello, World!\n')
})

it('surpresses an infinite loop', async () => {
  const { output, timedOut } = await tio('for (;;);', {
    timeout: 2000
  })

  strictEqual(timedOut, true)
  strictEqual(output, 'Request timed out after 2000ms')
})

it('works with custom compiler flags', async () => {
  const code = `
  fn main() {
    #[cfg(feature = "something")]
    println!("this will be printed");
  }
  `

  const { output } = await tio(code, {
    language: 'rust',
    cflags: ['--cfg', 'feature="something"']
  })

  strictEqual(output, 'this will be printed\n')
})

it('works with custom command-line arguments', async () => {
  const { output } = await tio(
    'console.log(process.argv.slice(2).join(", "))',
    {
      argv: ['Hello', 'World!']
    }
  )

  strictEqual(output, 'Hello, World!\n')
})
