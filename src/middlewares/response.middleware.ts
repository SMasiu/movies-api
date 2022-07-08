import { ClassConstructor, plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { Query, ParamsDictionary } from 'express-serve-static-core'
import { HttpCode } from '../exceptions/exception'

export const responseMiddleware =
  <ResponseModel, Body = never, QueryParams = Query>(
    responseModel: ClassConstructor<ResponseModel>,
    successStatusCode: HttpCode,
    resolverFn: (
      req: Request<ParamsDictionary, unknown, Body, QueryParams>,
      res: Response
    ) => Promise<ResponseModel[] | ResponseModel>
  ) =>
  async (
    req: Request<ParamsDictionary, unknown, Body, QueryParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responseData = await resolverFn(req, res)

      return res.status(successStatusCode).json(
        plainToClass(responseModel, responseData, {
          excludeExtraneousValues: true
        })
      )
    } catch (err) {
      next(err)
    }
  }
