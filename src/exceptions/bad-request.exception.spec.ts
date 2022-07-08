import { BadRequestException, ValidationErrorData } from './bad-request.exception'
import { HttpCode } from './exception'

describe('Exception - bad request', () => {
  it('Should return response data', () => {
    const message = 'Validation error'
    const error: ValidationErrorData[] = [
      {
        property: 'name',
        errors: []
      }
    ]

    const exception = new BadRequestException(error, { message })
    const response = exception.getResponse()

    expect(response).toEqual({
      statusCode: HttpCode.BAD_REQUEST,
      message,
      error
    })
  })
})
