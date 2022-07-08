import { plainToClass } from 'class-transformer'
import { GenreDto } from './genre.dto'

const dto = {
  id: 'horror',
  name: 'Horror',
  unknownProperty: 'unknownProperty'
}

describe('[Genre] Model - genre', () => {
  it('Should serialize genre model', () => {
    const serializedDto = plainToClass(GenreDto, dto, { excludeExtraneousValues: true })

    expect(serializedDto).toEqual({
      id: dto.id,
      name: dto.name
    })
  })
})
