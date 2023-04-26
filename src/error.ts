export class TioError extends Error {
  constructor(message: string) {
    super(message)

    this.name = `TioError: ${message}`
  }
}

export class TioHttpError extends TioError {
  status: number
  statusText: string

  constructor(response: Response) {
    super(`[HTTP ${response.status}: ${response.statusText}]`)

    this.status = response.status
    this.statusText = response.statusText
  }
}
