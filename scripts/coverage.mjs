'use strict'

import { exec, execSync } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const ROOT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')
const EXEC_OPTIONS = {
  cwd: ROOT_DIR
}
const XML_CLOSING_TAG = String.fromCodePoint(
  0x3c,
  0x2f,
  0x74,
  0x65,
  0x73,
  0x74,
  0x73,
  0x75,
  0x69,
  0x74,
  0x65,
  0x73,
  0x3e
)

const execute = promisify(exec)

try {
  execSync('npx tsc', EXEC_OPTIONS)

  const output = execSync(
    'npx c8 node --test --test-reporter=junit',
    EXEC_OPTIONS
  )
    .toString()
    .trim()
  const segments = output.split(XML_CLOSING_TAG)

  const xml = (
    segments.slice(0, -1).join(XML_CLOSING_TAG).trim() + XML_CLOSING_TAG
  ).replaceAll('&amp;quot;', '&quot;')
  const coverage = segments[segments.length - 1].trim()

  await Promise.all([
    writeFile(join(ROOT_DIR, 'junit.xml'), xml),
    execute('npx c8 report --reporter=lcov', EXEC_OPTIONS)
  ])

  console.log(coverage)
} catch (err) {
  if (!err.message?.startsWith('Command failed: ')) {
    throw err
  }

  process.exit(err.status)
}
