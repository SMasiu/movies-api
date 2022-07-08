import { MovieFilterWhere, MovieQueryRegistry, MovieSort, MovieSortField } from './movie.registry'
import { FindOptions, SortOrder } from '../../../registry/registry'
import { getRandomElementFromArray } from '../../../utils/array.utils'
import { MovieEntity } from '../entities/move.entity'
import { MovieStore } from '../store/movie.store'

export type AggregateMovieEntity = MovieEntity & { _matchedGenres?: number }

export const movieSortFieldMap: Record<MovieSortField, keyof AggregateMovieEntity> = {
  [MovieSortField.MATCHED_GENRES]: '_matchedGenres'
}

export class MovieInMemoryQueryAdapterRegistry extends MovieQueryRegistry {
  constructor(private readonly movieStore: MovieStore) {
    super()
  }

  async getRandom({ where }: FindOptions<MovieFilterWhere>): Promise<MovieEntity> {
    const filteredMovies = this.aggregateMovies(await this.movieStore.retrieve(), where)

    return getRandomElementFromArray(filteredMovies)
  }

  async findMany({
    where,
    sort
  }: FindOptions<MovieFilterWhere, MovieSort>): Promise<MovieEntity[]> {
    const aggregatedMovies = this.aggregateMovies(await this.movieStore.retrieve(), where, sort)

    return aggregatedMovies
  }

  private filterMovies(
    data: AggregateMovieEntity[],
    where?: MovieFilterWhere
  ): AggregateMovieEntity[] {
    if (!where) {
      return data
    }

    const { runtime, genres } = where

    return data.filter((item) => {
      if (runtime && (item.runtime < runtime.gte || item.runtime > runtime.lte)) {
        return false
      }

      if (genres) {
        const matchedGenres = item.genres.reduce(
          (matchedCount, genre) => matchedCount + (genres.in.includes(genre) ? 1 : 0),
          0
        )

        if (!matchedGenres) {
          return false
        }

        item._matchedGenres = matchedGenres
      }

      return true
    })
  }

  private sortMovies(data: AggregateMovieEntity[], sort?: MovieSort): AggregateMovieEntity[] {
    if (!sort) return data

    const sortOrder = sort.order === SortOrder.ASC ? 1 : -1
    const sortField = movieSortFieldMap[sort.field]

    return data.sort((a, b) => ((a[sortField] || 0) > (b[sortField] || 0) ? 1 : -1) * sortOrder)
  }

  private aggregateMovies(
    data: AggregateMovieEntity[],
    where?: MovieFilterWhere,
    sort?: MovieSort
  ): AggregateMovieEntity[] {
    const filteredMovies = this.filterMovies(data, where)
    const sortedMovies = this.sortMovies(filteredMovies, sort)

    return sortedMovies
  }
}
