import { FindOptions, MutationRegistry, QueryRegistry, SortOrder } from '../../../registry/registry'
import { MovieEntity } from '../entities/move.entity'

export interface MovieFilterWhere {
  runtime?: {
    gte: number
    lte: number
  }
  genres?: {
    in: string[]
  }
}

export enum MovieSortField {
  MATCHED_GENRES = 'MATCHED_GENRES'
}

export interface MovieSort {
  order: SortOrder
  field: MovieSortField
}

export type MovieFilterOptions = FindOptions<MovieFilterWhere>

export type MovieEntityInput = Omit<MovieEntity, 'id'>

export type MovieRegistryQueries = QueryRegistry<MovieEntity, MovieFilterWhere, MovieSort>

export abstract class MovieQueryRegistry implements MovieRegistryQueries {
  abstract findMany(args: FindOptions<MovieFilterWhere, MovieSort>): Promise<MovieEntity[]>
  abstract getRandom(args: FindOptions<MovieFilterWhere>): Promise<MovieEntity>
}

export type MovieRegistryMutations = MutationRegistry<MovieEntity, MovieEntityInput>

export abstract class MovieMutationRegistry implements MovieRegistryMutations {
  abstract create(entity: MovieEntityInput): Promise<MovieEntity>
}
