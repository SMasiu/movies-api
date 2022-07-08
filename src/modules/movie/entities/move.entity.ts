import { Transform } from 'class-transformer'
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { MovieId } from '../utils/movie-id.utils'

export class MovieEntity {
  @IsNumber()
  id: MovieId

  @IsString()
  title: string

  @IsInt()
  @Transform(({ value }) => Number(value))
  year: number

  @IsInt()
  @Transform(({ value }) => Number(value))
  runtime: number

  @IsArray()
  @IsString({ each: true })
  genres: string[]

  @IsString()
  director: string

  @IsString()
  @IsOptional()
  actors?: string

  @IsString()
  @IsOptional()
  plot?: string

  @IsString()
  @IsOptional()
  posterUrl?: string
}
