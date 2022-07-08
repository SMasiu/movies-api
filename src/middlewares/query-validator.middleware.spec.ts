import { IsInt } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { queryValidationMiddleware } from './query-validator.middleware'

class Query {
  @IsInt()
  id: number
}

const validReq = {
  query: {
    id: 1
  }
} as Request<ParamsDictionary, unknown, unknown, Query>

const invalidReq = {
  query: {
    id: '1'
  } as unknown
} as Request<ParamsDictionary, unknown, unknown, Query>

const res = {
  status: jest.fn().mockReturnValue({
    json: jest.fn()
  }) as Response['status']
} as Response

const next: NextFunction = jest.fn()

describe('Middleware - query validator', () => {
  it('Should call next function', async () => {
    const middlewareFn = queryValidationMiddleware(Query)

    await middlewareFn(validReq, res, next)

    expect(next).toBeCalledTimes(1)
  })

  it('Should return validation response', async () => {
    const middlewareFn = queryValidationMiddleware(Query)

    await middlewareFn(invalidReq, res, next)

    expect(res.status).toBeCalledTimes(1)
  })
})
