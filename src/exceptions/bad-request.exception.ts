import { BaseExceptionOptions, Exception, HttpCode } from './exception'

export interface ValidationError {
  message: string
  constraint: string
}

export interface ValidationErrorData {
  property: string
  errors: ValidationError[]
}

export class BadRequestException extends Exception<ValidationErrorData[]> {
  constructor(error: ValidationErrorData[], options?: BaseExceptionOptions) {
    super({
      statusCode: HttpCode.BAD_REQUEST,
      message: options?.message || 'Bad request exception',
      error
    })
  }
}
