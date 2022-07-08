import { BaseExceptionOptions, Exception, HttpCode } from './exception'

export class NotFoundException<T = undefined> extends Exception<T> {
  constructor(error?: T, options?: BaseExceptionOptions) {
    super({
      statusCode: HttpCode.NOT_FOUND,
      message: options?.message || 'Not found',
      error
    })
  }
}
