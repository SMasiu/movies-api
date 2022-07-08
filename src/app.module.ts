import { CommandBus } from '@tshio/command-bus'
import { QueryBus } from '@tshio/query-bus'
import { asClass, AwilixContainer, createContainer, InjectionMode, Lifetime } from 'awilix'
import { GenreModuleProvider, GenreQueries } from './modules/genre/genre.provider'
import { MovieCommands, MovieModuleProvider, MovieQueries } from './modules/movie/movie.provider'
import { ConfigService } from './services/config.service'
import { LoggerService } from './services/logger.service'
import { AbstractProvider, Provider, ProviderArray } from './types/provider.types'

const defaultProviderOptions = {
  lifetime: Lifetime.SINGLETON
} as const

export const movieModule = new MovieModuleProvider()
export const genreModule = new GenreModuleProvider()

export class QueryBusInjector {
  queryBus!: QueryBus<MovieQueries | GenreQueries>

  init() {
    this.queryBus = new QueryBus([
      ...movieModule.provideQueries().map((provider) => AppModule.get(provider)),
      ...genreModule.provideQueries().map((provider) => AppModule.get(provider))
    ])
  }
}

export class CommandBusInjector {
  commandBus!: CommandBus<MovieCommands>

  init() {
    this.commandBus = new CommandBus([
      ...movieModule.provideCommands().map((provider) => AppModule.get(provider))
    ])
  }
}

const providers: ProviderArray = [
  ConfigService,
  LoggerService,
  QueryBusInjector,
  CommandBusInjector,
  ...movieModule.provide(),
  ...genreModule.provide()
]

export class AppModule {
  private static container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.CLASSIC
  }).register({
    ...Object.fromEntries(
      providers.map((provider) =>
        Array.isArray(provider)
          ? [this.getProviderName(provider[0]), asClass(provider[1], defaultProviderOptions)]
          : [this.getProviderName(provider), asClass(provider, defaultProviderOptions)]
      )
    )
  })

  static get<T>(provider: Provider<T>): T {
    return this.container.resolve<T>(this.getProviderName(provider))
  }

  static getProviderName(provider: AbstractProvider<unknown>) {
    const { name } = provider

    return name.charAt(0).toLowerCase() + name.slice(1)
  }
}
