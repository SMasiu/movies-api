import { CreateMovieCommandHandler } from './commands/create-movie.handler'
import { GetMoviesQueryHandler } from './queries/get-movies.handler'
import { MovieInMemoryMutationAdapterRegistry } from './registry/movie-in-memory-mutation-adapter.registry'
import { MovieInMemoryQueryAdapterRegistry } from './registry/movie-in-memory-query-adapter.registry'
import { MovieMutationRegistry, MovieQueryRegistry } from './registry/movie.registry'
import { MovieStore } from './store/movie.store'
import { ModuleProvider, ProviderArray } from '../../types'

const queries = [GetMoviesQueryHandler] as const
const commands = [CreateMovieCommandHandler] as const

export type MovieQueries = [GetMoviesQueryHandler]
export type MovieCommands = [CreateMovieCommandHandler]

export class MovieModuleProvider implements ModuleProvider<typeof queries, typeof commands> {
  private readonly providers: ProviderArray = [
    ...queries,
    ...commands,
    MovieStore,
    [MovieMutationRegistry, MovieInMemoryMutationAdapterRegistry],
    [MovieQueryRegistry, MovieInMemoryQueryAdapterRegistry]
  ]

  provide(): ProviderArray {
    return [...this.providers]
  }

  provideQueries() {
    return queries
  }

  provideCommands() {
    return commands
  }
}
