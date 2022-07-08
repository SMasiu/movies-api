import { NextFunction, Request, Response } from 'express'
import { AppModule } from '../app.module'
import { Exception } from '../exceptions/exception'
import { InternalServerException } from '../exceptions/internal-server.exception'
import { LoggerService } from '../services/logger.service'

export const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const logger = AppModule.get(LoggerService)

  if (err instanceof Exception) {
    return res.status(err.getStatusCode()).json(err.getResponse())
  }

  if (err instanceof Error) {
    logger.error(JSON.stringify({ message: err.message, name: err.name, stack: err.stack }))
  }

  const internalServerException = new InternalServerException()

  return res
    .status(internalServerException.getStatusCode())
    .json(internalServerException.getResponse())
}
