import { MovieInMemoryMutationAdapterRegistry } from './movie-in-memory-mutation-adapter.registry'
import { MovieEntityInput } from './movie.registry'
import { MovieStore } from '../store/movie.store'

const mockEntityId = 1
const entityInput: MovieEntityInput = {
  title: 'Beetlejuice',
  year: 1988,
  runtime: 92,
  genres: ['Comedy', 'Fantasy'],
  director: 'Tim Burton',
  actors: 'Alec Baldwin',
  plot: 'A plot',
  posterUrl: 'https://images-na.ssl-images-amazon.com/impage.png'
}

const store = {
  persist: jest.fn(),
  generateNextId: jest.fn().mockReturnValue(mockEntityId)
} as unknown as MovieStore

const registry = new MovieInMemoryMutationAdapterRegistry(store)

describe('[Movie] registry - movie in memory mutation adapter', () => {
  it('Should create entity', async () => {
    const entity = await registry.create(entityInput)

    expect(entity).toEqual({
      ...entity,
      id: mockEntityId
    })
  })
})
