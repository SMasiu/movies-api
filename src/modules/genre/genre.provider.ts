import { GetGenresQueryHandler } from './queries/get-genres.handler'
import { GenreInMemoryQueryAdapterRegistry } from './registry/genre-in-memory-query-adapter.registry'
import { GenreQueryRegistry } from './registry/genre.registry'
import { GenreStore } from './store/genre.store'
import { ModuleProvider, ProviderArray } from '../../types'

const queries = [GetGenresQueryHandler] as const
const commands = [] as const

export type GenreQueries = [GetGenresQueryHandler]
export type GenreCommands = []

export class GenreModuleProvider implements ModuleProvider<typeof queries, typeof commands> {
  private readonly providers: ProviderArray = [
    ...queries,
    ...commands,
    GenreStore,
    [GenreQueryRegistry, GenreInMemoryQueryAdapterRegistry]
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
