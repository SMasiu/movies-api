import { Query, QueryHandler, QueryResult } from '@tshio/query-bus'
import { SortOrder } from '../../../registry/registry'
import { GetMoviesDto } from '../models/get-movies.dto'
import { MovieDto } from '../models/movie.dto'
import { MovieFilterWhere, MovieQueryRegistry, MovieSortField } from '../registry/movie.registry'

export const GET_MOVIES_QUERY = 'get-movies-query'

export class GetMoviesQueryResult implements QueryResult<MovieDto[]> {
  constructor(public result: MovieDto[]) {}
}

export class GetMoviesQueryHandler
  implements QueryHandler<Query<GetMoviesDto>, QueryResult<MovieDto[]>>
{
  queryType: string = GET_MOVIES_QUERY

  constructor(private readonly movieQueryRegistry: MovieQueryRegistry) {}

  async execute(query: Query<GetMoviesDto>): Promise<QueryResult<MovieDto[]>> {
    const { duration, genres } = query.payload

    if (!duration && !genres) {
      return new GetMoviesQueryResult([await this.movieQueryRegistry.getRandom({})])
    }

    if (!genres && duration) {
      return new GetMoviesQueryResult([
        await this.movieQueryRegistry.getRandom({
          where: {
            runtime: this.getRuntimeWhereArgs(duration)
          }
        })
      ])
    }

    const where: MovieFilterWhere = {}

    if (genres) {
      where.genres = { in: genres }
    }

    if (duration) {
      where.runtime = this.getRuntimeWhereArgs(duration)
    }

    return new GetMoviesQueryResult(
      await this.movieQueryRegistry.findMany({
        where,
        sort: { field: MovieSortField.MATCHED_GENRES, order: SortOrder.DESC }
      })
    )
  }

  private getRuntimeWhereArgs(duration: number): MovieFilterWhere['runtime'] {
    return {
      gte: duration - 10,
      lte: duration + 10
    }
  }
}
