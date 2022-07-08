import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength
} from 'class-validator'
import { MOVIE } from '../validation/movie.validation'

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MOVIE.TITLE.MAX_LENGTH)
  title: string

  @IsInt()
  @IsPositive()
  year: number

  @IsInt()
  @IsPositive()
  runtime: number

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  genres: string[]

  @IsString()
  @IsNotEmpty()
  @MaxLength(MOVIE.DIRECTOR.MAX_LENGTH)
  director: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  actors?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  plot?: string

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  posterUrl?: string
}
