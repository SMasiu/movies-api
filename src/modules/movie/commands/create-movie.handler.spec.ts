import { Command } from '@tshio/command-bus'
import { CreateMovieCommandHandler, CREATE_MOVIE_COMMAND } from './create-movie.handler'
import { QueryBusInjector } from '../../../app.module'
import { NotFoundException } from '../../../exceptions'
import { CreateMovieDto } from '../models/create-movie.dto'
import { MovieMutationRegistry } from '../registry/movie.registry'

const mockMovieId = 1
const movieDto: CreateMovieDto = {
  title: 'Beetlejuice',
  year: 1988,
  runtime: 92,
  genres: ['Comedy', 'Fantasy'],
  director: 'Tim Burton',
  actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
  plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
  posterUrl:
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg'
}

const movieWithUnknownGenreDto: CreateMovieDto = {
  title: 'Beetlejuice',
  year: 1988,
  runtime: 92,
  genres: ['Comedy', 'Fantasy', 'unknownGenre'],
  director: 'Tim Burton',
  actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
  plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
  posterUrl:
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg'
}

const registry = {
  create: jest.fn().mockReturnValue({
    ...movieDto,
    id: mockMovieId
  })
} as MovieMutationRegistry

const queryBusInjector = {
  queryBus: {
    execute: jest.fn().mockReturnValue({
      result: [
        {
          id: 'comedy',
          name: 'Comedy'
        },
        {
          id: 'fantasy',
          name: 'Fantasy'
        }
      ]
    })
  }
} as unknown as QueryBusInjector

const handler = new CreateMovieCommandHandler(registry, queryBusInjector)

describe('[Movie] handler - create movie', () => {
  it('Should successfully create a movie', async () => {
    const command: Command<CreateMovieDto> = {
      type: CREATE_MOVIE_COMMAND,
      payload: movieDto
    }

    const result = await handler.execute(command)

    expect(result).toEqual({
      ...movieDto,
      id: expect.any(Number)
    })
    expect(registry.create).toBeCalledTimes(1)
  })

  it('Should throw genre not found error', async () => {
    const command: Command<CreateMovieDto> = {
      type: CREATE_MOVIE_COMMAND,
      payload: movieWithUnknownGenreDto
    }

    expect(async () => await handler.execute(command)).rejects.toBeInstanceOf(NotFoundException)
  })
})
