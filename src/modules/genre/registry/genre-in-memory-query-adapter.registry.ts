import { GenreFilterWhere, GenreQueryRegistry } from './genre.registry'
import { FindOptions } from '../../../registry/registry'
import { GenreEntity } from '../entities/genre.entity'
import { GenreStore } from '../store/genre.store'
import { createGenreIdFromGenreName } from '../utils/genre-id.utils'

export class GenreInMemoryQueryAdapterRegistry extends GenreQueryRegistry {
  constructor(private readonly genreStore: GenreStore) {
    super()
  }

  async findMany({ where }: FindOptions<GenreFilterWhere>): Promise<GenreEntity[]> {
    const genreData = await this.genreStore.retrieve()

    if (!where) {
      return genreData
    }

    const genreIds = where.name.in.map(createGenreIdFromGenreName)

    return genreData.filter((genre) => genreIds.includes(genre.id))
  }
}
