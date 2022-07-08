import { ConfigService } from 'src/services'
import { GenreStore } from './genre.store'

const configService = {
  dbGenreFilePath: 'database/db-test.json'
} as ConfigService

const genreStore = new GenreStore(configService)

describe('[Genre] store - genre', () => {
  it('Should load & retrieve data', async () => {
    await genreStore.load()

    const data = await genreStore.retrieve()

    expect(data).toEqual(
      expect.arrayContaining([
        { id: 'comedy', name: 'Comedy' },
        { id: 'horror', name: 'Horror' }
      ])
    )
  })
})
