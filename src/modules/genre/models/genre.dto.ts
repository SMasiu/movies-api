import { Expose } from 'class-transformer'
import { GenreId } from '../utils/genre-id.utils'

export class GenreDto {
  @Expose()
  id: GenreId

  @Expose()
  name: string
}
