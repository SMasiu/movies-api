import { GenreInMemoryQueryAdapterRegistry } from './genre-in-memory-query-adapter.registry'
import { GenreEntity } from '../entities/genre.entity'
import { GenreStore } from '../store/genre.store'
import { createGenreIdFromGenreName } from '../utils/genre-id.utils'

const horrorGenre: GenreEntity = {
  id: createGenreIdFromGenreName('Horror'),
  name: 'Horror'
}

const comedyGenre: GenreEntity = {
  id: createGenreIdFromGenreName('Comedy'),
  name: 'Comedy'
}

const mockGenres: GenreEntity[] = [horrorGenre, comedyGenre]

const genreStore = {
  retrieve: jest.fn().mockReturnValue(mockGenres)
} as unknown as GenreStore

const registry = new GenreInMemoryQueryAdapterRegistry(genreStore)

describe('[Genre] registry - genre in memory query adapter', () => {
  it('Should find many genres without where arg', async () => {
    const genres = await registry.findMany({})

    expect(genres).toHaveLength(2)
  })

  it('Should find many genres with where arg', async () => {
    const genres = await registry.findMany({ where: { name: { in: ['Horror'] } } })

    expect(genres).toEqual(expect.arrayContaining([horrorGenre]))
  })
})
