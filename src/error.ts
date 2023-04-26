export class TioError extends Error {
  public constructor(message: string) {
    super(message)

    this.name = `TioError: ${message}`
  }
}

export class TioHttpError extends TioError {
  public status: number
  public statusText: string

  public constructor(response: Response) {
    super(`[HTTP ${response.status}: ${response.statusText}]`)

    this.status = response.status
    this.statusText = response.statusText
  }
}
