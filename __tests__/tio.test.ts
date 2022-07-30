import tio from '../src/index'

it('outputs Hello, World in JavaScript', async () => {
  const { output } = await tio("console.log('Hello, World!');")

  expect(output).toBe('Hello, World!\n')
})

it('outputs Hello, World in Python 3', async () => {
  tio.defaultLanguage = 'python3'
  const { output } = await tio("print('Hello, World!')")

  expect(output).toBe('Hello, World!\n')
})

it('surpresses an infinite loop', async () => {
  const { output, timedOut } = await tio('for (;;);', 'javascript-node', 2000)

  expect(timedOut).toBe(true)
  expect(output).toBe('Request timed out after 2000ms')
})
