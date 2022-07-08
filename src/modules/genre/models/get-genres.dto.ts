import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class GetGenresDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  names: string[]
}
