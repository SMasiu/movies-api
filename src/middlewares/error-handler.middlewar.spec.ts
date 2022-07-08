import { Request, Response, NextFunction } from 'express'
import { errorHandlerMiddleware } from './error-handler.middleware'
import { HttpCode, NotFoundException } from '../exceptions'

const knownError = new NotFoundException()
const unknownError = new Error()

const req = {} as Request

const res = {
  status: jest.fn().mockImplementation((status: HttpCode) => ({
    json: () => ({ status })
  })) as Response['status']
} as Response

const next: NextFunction = jest.fn()

describe('Middleware - error handler', () => {
  it('Should handle known error', () => {
    const { status } = errorHandlerMiddleware(knownError, req, res, next)

    expect(status).toEqual(HttpCode.NOT_FOUND)
  })

  it('Should handle unknown error', () => {
    const { status } = errorHandlerMiddleware(unknownError, req, res, next)

    expect(status).toEqual(HttpCode.INTERNAL_SERVER_ERROR)
  })
})
