import { Transform } from 'class-transformer'
import {
  isArray,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator'

export class GetMoviesDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  @IsOptional()
  duration?: number

  @Transform(({ value }) => (isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  genres?: string[]
}
