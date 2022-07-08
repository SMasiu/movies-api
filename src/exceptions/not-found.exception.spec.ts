import { HttpCode } from './exception'
import { NotFoundException } from './not-found.exception'

describe('Exception - not found', () => {
  it('Should return response data', () => {
    const message = 'User not found'
    const error = {
      id: 5
    }

    const exception = new NotFoundException(error, { message })
    const response = exception.getResponse()

    expect(response).toEqual({
      statusCode: HttpCode.NOT_FOUND,
      message,
      error
    })
  })
})
