import { MovieInMemoryQueryAdapterRegistry } from './movie-in-memory-query-adapter.registry'
import { MovieSortField } from './movie.registry'
import { SortOrder } from '../../../registry'
import { MovieStore } from '../store/movie.store'

const comedyFantasyMovie = {
  id: 1,
  title: 'Beetlejuice',
  year: 1988,
  runtime: 92,
  genres: ['Comedy', 'Fantasy', 'Drama'],
  director: 'Tim Burton',
  actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
  plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
  posterUrl:
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg'
}

const crimeDramaMusicMovie = {
  id: 2,
  title: 'The Cotton Club',
  year: 1984,
  runtime: 127,
  genres: ['Crime', 'Drama', 'Music'],
  director: 'Francis Ford Coppola',
  actors: 'Richard Gere, Gregory Hines, Diane Lane, Lonette McKee',
  plot: 'The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.',
  posterUrl:
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg'
}

const crimeDramaMovie = {
  id: 3,
  title: 'The Shawshank Redemption',
  year: 1994,
  runtime: 142,
  genres: ['Crime', 'Drama'],
  director: 'Frank Darabont',
  actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
  plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  posterUrl:
    'https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg'
}

const mockMovies = [comedyFantasyMovie, crimeDramaMusicMovie, crimeDramaMovie]

const store = { retrieve: jest.fn().mockReturnValue(mockMovies) } as unknown as MovieStore

const registry = new MovieInMemoryQueryAdapterRegistry(store)

describe('[Movie] registry - movie in memory query adapter', () => {
  it('Should return random movie without where args', async () => {
    const randomMovie = await registry.getRandom({})

    expect(mockMovies).toEqual(expect.arrayContaining([randomMovie]))
  })

  it('Should return random movie with where args', async () => {
    const randomMovie = await registry.getRandom({ where: { genres: { in: ['Music'] } } })

    expect(randomMovie).toEqual(crimeDramaMusicMovie)
  })

  it('Should find many movies without where args', async () => {
    const allMovies = await registry.findMany({})

    expect(allMovies).toEqual(expect.arrayContaining(mockMovies))
  })

  it('Should find many movies with where genres arg', async () => {
    const filteredMovies = await registry.findMany({ where: { genres: { in: ['Fantasy'] } } })

    expect(filteredMovies).toEqual(expect.arrayContaining([comedyFantasyMovie]))
  })

  it('Should find many movies with where runtime arg', async () => {
    const filteredMovies = await registry.findMany({
      where: {
        runtime: {
          gte: 120,
          lte: 130
        }
      }
    })

    expect(filteredMovies).toEqual(expect.arrayContaining([crimeDramaMusicMovie]))
  })

  it('Should find many movies with sort arg', async () => {
    const sortedMovies = await registry.findMany({
      where: {
        genres: { in: ['Crime', 'Drama', 'Music'] }
      },
      sort: {
        order: SortOrder.DESC,
        field: MovieSortField.MATCHED_GENRES
      }
    })

    expect(sortedMovies).toEqual([crimeDramaMusicMovie, crimeDramaMovie, comedyFantasyMovie])
  })
})
