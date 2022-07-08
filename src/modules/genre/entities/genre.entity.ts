import { IsString } from 'class-validator'
import { GenreId } from '../utils/genre-id.utils'

export class GenreEntity {
  @IsString()
  id: GenreId

  @IsString()
  name: string
}
