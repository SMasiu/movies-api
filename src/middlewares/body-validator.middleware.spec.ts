import { IsInt } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { bodyValidationMiddleware } from './body-validator.middleware'

class Body {
  @IsInt()
  id: number
}

const validReq = {
  body: {
    id: 1
  }
} as Request

const invalidReq = {
  body: {
    id: '1'
  }
} as Request

const res = {
  status: jest.fn().mockReturnValue({
    json: jest.fn()
  }) as Response['status']
} as Response

const next: NextFunction = jest.fn()

describe('Middleware - body validator', () => {
  it('Should call next function', async () => {
    const middlewareFn = bodyValidationMiddleware(Body)

    await middlewareFn(validReq, res, next)

    expect(next).toBeCalledTimes(1)
  })

  it('Should return validation response', async () => {
    const middlewareFn = bodyValidationMiddleware(Body)

    await middlewareFn(invalidReq, res, next)

    expect(res.status).toBeCalledTimes(1)
  })
})
