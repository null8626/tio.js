import { deepStrictEqual, rejects, throws, strictEqual } from 'node:assert'
import { it } from 'node:test'
import tio from './src/index'

function testTioAttribute<T>(
  key: string,
  defaultVariation: T,
  newVariation: T
) {
  deepStrictEqual((tio as any)[key], defaultVariation)
  ;(tio as any)[key] = newVariation

  deepStrictEqual((tio as any)[key], newVariation)
  ;(tio as any)[key] = defaultVariation
}

it('works with the timeout option', async () => {
  testTioAttribute('defaultTimeout', Infinity, 2000)

  const invalidValues = [NaN, 0, -5, 'test', null, undefined]

  for (const invalidValue of invalidValues) {
    await rejects(
      () =>
        tio("console.log('Hello, World!');", {
          timeout: invalidValue as any
        }),
      { name: 'TioError' }
    )

    throws(
      () => {
        tio.defaultTimeout = invalidValue as any
      },
      { name: 'TioError' }
    )
  }
})

it('works with the language option', async () => {
  testTioAttribute('defaultLanguage', 'javascript-node', 'python3')

  const invalidValues = [0, 'test', null, undefined]

  for (const invalidValue of invalidValues) {
    await rejects(
      () =>
        tio("console.log('Hello, World!');", {
          language: invalidValue as any
        }),
      { name: 'TioError' }
    )

    throws(
      () => {
        tio.defaultLanguage = invalidValue as any
      },
      { name: 'TioError' }
    )
  }
})

it('works with the cflags and argv options', async () => {
  const invalidValues = [
    0,
    'test',
    null,
    undefined,
    {},
    [''],
    ['hello', '', 'world'],
    ['hello', 2, 'world'],
    [undefined, null, 'hello']
  ]
  const options = ['cflags', 'argv']

  for (const option of options) {
    const defaultOptionKey = `default${option.replace(/\b\w/g, char => char.toUpperCase())}`

    testTioAttribute(defaultOptionKey, [], ['test', 'test 2'])

    for (const invalidValue of invalidValues) {
      await rejects(
        () => tio("console.log('Hello, World!');", { [option]: invalidValue }),
        { name: 'TioError' }
      )

      throws(
        () => {
          ;(tio as any)[defaultOptionKey] = invalidValue
        },
        { name: 'TioError' }
      )
    }
  }
})

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

it('works with empty outputs', async () => {
  const { output } = await tio('')

  strictEqual(output, '\n')
})
