import { FindOptions, QueryRegistry } from '../../../registry/registry'
import { GenreEntity } from '../entities/genre.entity'

export interface GenreFilterWhere {
  name: {
    in: string[]
  }
}

export type GenreRegistryQueries = Pick<QueryRegistry<GenreEntity, GenreFilterWhere>, 'findMany'>

export abstract class GenreQueryRegistry implements GenreRegistryQueries {
  abstract findMany(args: FindOptions<GenreFilterWhere>): Promise<GenreEntity[]>
}
