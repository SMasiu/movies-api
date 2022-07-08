import { json } from 'body-parser'
import express, { Express } from 'express'
import helmet from 'helmet'
import { AppModule, QueryBusInjector, CommandBusInjector } from './app.module'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { GenreStore } from './modules/genre/store/genre.store'
import { movieRouter } from './modules/movie/routers/movie.router'
import { MovieStore } from './modules/movie/store/movie.store'
import { ConfigService } from './services/config.service'
import { LoggerService } from './services/logger.service'

const bootstrap = async () => {
  const app: Express = express()

  const configService = AppModule.get(ConfigService)
  const loggerService = AppModule.get(LoggerService)

  const genreStore = AppModule.get(GenreStore)
  const movieStore = AppModule.get(MovieStore)
  const queryBusInjector = AppModule.get(QueryBusInjector)
  const commandBusInjector = AppModule.get(CommandBusInjector)

  await genreStore.load()
  await movieStore.load()
  queryBusInjector.init()
  commandBusInjector.init()

  app.use(helmet())
  app.use(json())

  app.use('/movie', movieRouter)

  app.use(errorHandlerMiddleware)

  const { port } = configService

  app.listen(port, () => {
    loggerService.info(`Server is running at http://localhost:${port}`)
  })
}

bootstrap()
