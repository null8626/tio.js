/**
 * An error coming from tio.js.
 * This can happen if the user supplied invalid arguments or the client couldn't scrape tio.run.
 * @public
 */
export class TioError extends Error {
  constructor(message: string) {
    super(message)

    this.name = `TioError: ${message}`

    Object.setPrototypeOf(this, TioError.prototype)
  }
}

/* node:coverage ignore next 18 */
/**
 * An HTTP-related error coming from tio.js.
 * This can happen if the client received an invalid HTTP response from the tio.run servers. This is usually not expected.
 * @public
 */
export class TioHttpError extends TioError {
  status: number
  statusText: string

  constructor(response: Response) {
    super(`[HTTP ${response.status}: ${response.statusText}]`)

    this.status = response.status
    this.statusText = response.statusText

    Object.setPrototypeOf(this, TioHttpError.prototype)
  }
}
