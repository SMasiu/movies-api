import { Transform } from 'class-transformer'
import { IsNotEmpty, IsInt, IsPositive, IsString } from 'class-validator'

export class EnvDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  PORT: number

  @IsString()
  @IsNotEmpty()
  DB_GENRE_FILE_PATH: string

  @IsString()
  @IsNotEmpty()
  DB_MOVIE_FILE_PATH: string
}
