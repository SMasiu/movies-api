import { Expose } from 'class-transformer'
import { MovieId } from '../utils/movie-id.utils'

export class MovieDto {
  @Expose()
  id: MovieId

  @Expose()
  title: string

  @Expose()
  year: number

  @Expose()
  runtime: number

  @Expose()
  genres: string[]

  @Expose()
  director: string

  @Expose()
  actors?: string

  @Expose()
  plot?: string

  @Expose()
  posterUrl?: string
}
