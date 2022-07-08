import { MovieEntityInput, MovieMutationRegistry } from './movie.registry'
import { MovieEntity } from '../entities/move.entity'
import { MovieStore } from '../store/movie.store'

export class MovieInMemoryMutationAdapterRegistry extends MovieMutationRegistry {
  constructor(private readonly movieStore: MovieStore) {
    super()
  }

  async create(entityInput: MovieEntityInput): Promise<MovieEntity> {
    const entity: MovieEntity = {
      ...entityInput,
      id: this.movieStore.generateNextId()
    }

    await this.movieStore.persist(entity)

    return entity
  }
}
