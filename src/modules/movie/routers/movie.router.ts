import { Command } from '@tshio/command-bus'
import { Query } from '@tshio/query-bus'
import { Router } from 'express'
import { AppModule, CommandBusInjector, QueryBusInjector } from '../../../app.module'
import { HttpCode } from '../../../exceptions/exception'
import { bodyValidationMiddleware } from '../../../middlewares/body-validator.middleware'
import { queryValidationMiddleware } from '../../../middlewares/query-validator.middleware'
import { responseMiddleware } from '../../../middlewares/response.middleware'
import { CREATE_MOVIE_COMMAND } from '../commands/create-movie.handler'
import { CreateMovieDto } from '../models/create-movie.dto'
import { GetMoviesDto } from '../models/get-movies.dto'
import { MovieDto } from '../models/movie.dto'
import { GET_MOVIES_QUERY } from '../queries/get-movies.handler'

export const movieRouter = Router()

movieRouter.post(
  '/',
  bodyValidationMiddleware(CreateMovieDto),
  responseMiddleware<MovieDto, CreateMovieDto>(MovieDto, HttpCode.CREATED, async (req) => {
    const { body } = req
    const command: Command<CreateMovieDto> = {
      type: CREATE_MOVIE_COMMAND,
      payload: body
    }

    return AppModule.get(CommandBusInjector).commandBus.execute(command)
  })
)

movieRouter.get(
  '/',
  queryValidationMiddleware(GetMoviesDto),
  responseMiddleware<MovieDto, never, GetMoviesDto>(MovieDto, HttpCode.OK, async (req) => {
    const { query: queryParams } = req
    const query: Query<GetMoviesDto> = {
      type: GET_MOVIES_QUERY,
      payload: queryParams
    }

    const queryResult = await AppModule.get(QueryBusInjector).queryBus.execute(query)

    return queryResult.result
  })
)
