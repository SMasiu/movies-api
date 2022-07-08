import { ConfigService } from 'src/services'
import { MovieStore } from './movie.store'

const configService = {
  dbMovieFilePath: 'database/db-test.json'
} as ConfigService

const genreStore = new MovieStore(configService)

describe('[Movie] store - movie', () => {
  it('Should load & retrieve data', async () => {
    await genreStore.load()

    const data = await genreStore.retrieve()

    expect(data).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          title: 'Beetlejuice',
          year: 1988,
          runtime: 92,
          genres: ['Comedy', 'Fantasy'],
          director: 'Tim Burton',
          actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
          plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/image.png'
        }
      ])
    )
  })
})
