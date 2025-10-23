import { TioHttpError } from './error.js'

export function validStringArray(arr?: string[]): boolean {
  return (
    Array.isArray(arr) &&
    arr.every(elem => typeof elem === 'string' && elem.length)
  )
}

export async function request(
  path: string,
  options?: RequestInit
): Promise<Response> {
  const response: Response = await fetch(`https://tio.run${path}`, options)

  /* node:coverage ignore next 3 */
  if (!response.ok) {
    throw new TioHttpError(response)
  }

  return response
}

export class Timeout {
  #t: NodeJS.Timeout | null
  readonly promise: Promise<null>

  constructor(ab: AbortController, tm?: number) {
    this.#t = null
    this.promise = new Promise(resolve => {
      ab.signal.addEventListener('abort', () => {
        if (this.#t !== null) {
          clearTimeout(this.#t)

          this.#t = null
        }

        resolve(null)
      })

      if (tm && tm !== Infinity) {
        this.#t = setTimeout(() => {
          resolve(null)
        }, tm)
      }
    })
  }
}
