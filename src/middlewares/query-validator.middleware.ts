import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BadRequestException } from '../exceptions/bad-request.exception'
import { collectErrors } from '../utils/error.utils'

export const queryValidationMiddleware =
  <T extends object>(queryModel: ClassConstructor<T>) =>
  async (
    req: Request<ParamsDictionary, unknown, unknown, T>,
    res: Response,
    next: NextFunction
  ) => {
    const { query } = req

    const validationModel = plainToClass(queryModel, query)

    const errors = await validate(validationModel, { whitelist: true })

    if (errors.length) {
      const exception = new BadRequestException(collectErrors(errors))

      return res.status(exception.getStatusCode()).json(exception.getResponse())
    }

    // save serialized data
    req.query = validationModel

    next()
  }
