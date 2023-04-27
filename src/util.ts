import { TioHttpError } from './error.js'

export function validStringArray(arr?: string[]): boolean {
  return (
    Array.isArray(arr) &&
    arr.every(elem => typeof elem === 'string' && elem.length > 0)
  )
}

export async function requestText(path: string): Promise<string> {
  const response: Response = await fetch(`https://tio.run${path}`)

  if (response.status >= 400) {
    throw new TioHttpError(response)
  }

  return await response.text()
}
