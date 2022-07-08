import { CommandHandler, Command } from '@tshio/command-bus'
import { Query } from '@tshio/query-bus'
import { QueryBusInjector } from 'src/app.module'
import { NotFoundException } from '../../../exceptions/not-found.exception'
import { GetGenresDto } from '../../genre/models/get-genres.dto'
import { GET_GENRES_QUERY } from '../../genre/queries/get-genres.handler'
import { createGenreIdFromGenreName } from '../../genre/utils/genre-id.utils'
import { CreateMovieDto } from '../models/create-movie.dto'
import { MovieDto } from '../models/movie.dto'
import { MovieMutationRegistry } from '../registry/movie.registry'

export const CREATE_MOVIE_COMMAND = 'create-movie-command'

export class CreateMovieCommandHandler implements CommandHandler<Command<CreateMovieDto>> {
  commandType: string = CREATE_MOVIE_COMMAND

  constructor(
    private readonly movieMutationRegistry: MovieMutationRegistry,
    private readonly queryBusInjector: QueryBusInjector
  ) {}

  async execute(command: Command<CreateMovieDto>): Promise<MovieDto> {
    const { payload: createMovieDto } = command

    const getGenresQuery: Query<GetGenresDto> = {
      type: GET_GENRES_QUERY,
      payload: {
        names: createMovieDto.genres
      }
    }

    const { result: genres } = await this.queryBusInjector.queryBus.execute(getGenresQuery)

    if (createMovieDto.genres.length !== genres.length) {
      const genresIds = genres.map((genre) => genre.id)

      throw new NotFoundException(
        {
          genres: createMovieDto.genres.filter(
            (genre) => !genresIds.includes(createGenreIdFromGenreName(genre))
          )
        },
        { message: 'Genres not found' }
      )
    }

    return this.movieMutationRegistry.create({
      ...createMovieDto,
      genres: genres.map((genre) => genre.name)
    })
  }
}
