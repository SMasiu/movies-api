export enum HttpCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export interface BaseExceptionOptions {
  message: string
}

export type ExceptionOptions<T> = BaseExceptionOptions & {
  statusCode: HttpCode
  error?: T
}

export interface ExceptionResponse<T> {
  message: string
  statusCode: HttpCode
  error?: T
}

export class Exception<T = undefined> {
  private readonly message: string
  private readonly statusCode: HttpCode
  private readonly error?: T

  constructor({ statusCode, message, error }: ExceptionOptions<T>) {
    this.statusCode = statusCode
    this.message = message
    this.error = error
  }

  getResponse(): ExceptionResponse<T> {
    const { message, statusCode, error } = this

    return { message, statusCode, error }
  }

  getStatusCode(): HttpCode {
    return this.statusCode
  }
}
