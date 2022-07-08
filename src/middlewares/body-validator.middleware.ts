import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BadRequestException } from '../exceptions/bad-request.exception'
import { collectErrors } from '../utils/error.utils'

export const bodyValidationMiddleware =
  <T extends object>(bodyModel: ClassConstructor<T>) =>
  async (req: Request<ParamsDictionary, unknown, T>, res: Response, next: NextFunction) => {
    const { body } = req

    const validationModel = plainToClass(bodyModel, body)

    const errors = await validate(validationModel, { whitelist: true })
    if (errors.length) {
      const exception = new BadRequestException(collectErrors(errors))

      return res.status(exception.getStatusCode()).json(exception.getResponse())
    }

    // save serialized data
    req.body = validationModel

    next()
  }
