import { BaseExceptionOptions, Exception, HttpCode } from './exception'

export class InternalServerException<T = undefined> extends Exception<T> {
  constructor(error?: T, options?: BaseExceptionOptions) {
    super({
      statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      message: options?.message || 'Internal server exception',
      error
    })
  }
}
