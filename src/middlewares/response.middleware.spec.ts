import { Expose } from 'class-transformer'
import { Request, Response, NextFunction } from 'express'
import { responseMiddleware } from './response.middleware'
import { HttpCode } from '../exceptions'

class ResponseModel {
  @Expose()
  id: number
}

const responseData = {
  id: 1,
  password: '123'
}

const req = {} as Request

const res = {
  status: jest.fn().mockImplementation(() => ({
    json: jest.fn().mockImplementation((args) => args)
  })) as Response['status']
} as Response

const next: NextFunction = jest.fn()

describe('Middleware - response', () => {
  it('Should serialize response', async () => {
    const middlewareFn = responseMiddleware<ResponseModel, unknown, unknown>(
      ResponseModel,
      HttpCode.OK,
      async () => responseData
    )

    const response = await middlewareFn(req, res, next)

    expect(response).toEqual({
      id: responseData.id
    })
  })
})
