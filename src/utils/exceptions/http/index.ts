export class HttpException extends Error {
  public readonly statusCode: number
  public readonly message: string
  public readonly data: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(statusCode: number, message: string, data: any) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}
