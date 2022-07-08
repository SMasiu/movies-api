import { Query, QueryHandler, QueryResult } from '@tshio/query-bus'
import { GenreDto } from '../models/genre.dto'
import { GetGenresDto } from '../models/get-genres.dto'
import { GenreQueryRegistry } from '../registry/genre.registry'

export const GET_GENRES_QUERY = 'get-genres-query'

export class GetGenresQueryResult implements QueryResult<GenreDto[]> {
  constructor(public result: GenreDto[]) {}
}

export class GetGenresQueryHandler
  implements QueryHandler<Query<GetGenresDto>, QueryResult<GenreDto[]>>
{
  queryType: string = GET_GENRES_QUERY

  constructor(private readonly genreQueryRegistry: GenreQueryRegistry) {}

  async execute(query: Query<GetGenresDto>): Promise<QueryResult<GenreDto[]>> {
    const genres = await this.genreQueryRegistry.findMany({
      where: {
        name: {
          in: query.payload.names
        }
      }
    })

    return new GetGenresQueryResult(genres)
  }
}
