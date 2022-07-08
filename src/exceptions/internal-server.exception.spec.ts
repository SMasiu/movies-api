import { HttpCode } from './exception'
import { InternalServerException } from './internal-server.exception'

describe('Exception - internal server', () => {
  it('Should return response data', () => {
    const message = 'Internal error'
    const error = 'Error data'

    const exception = new InternalServerException(error, { message })
    const response = exception.getResponse()

    expect(response).toEqual({
      statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      message,
      error
    })
  })
})
