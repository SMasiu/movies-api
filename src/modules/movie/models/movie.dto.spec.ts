import { plainToClass } from 'class-transformer'
import { MovieDto } from './movie.dto'

const dto = {
  id: 1,
  title: 'Beetlejuice',
  year: 1988,
  runtime: 92,
  genres: ['Comedy', 'Fantasy'],
  director: 'Tim Burton',
  actors: 'Alec Baldwin',
  plot: 'A plot',
  posterUrl: 'https://images-na.ssl-images-amazon.com/impage.png',
  unknownProperty: 'unknownProperty'
}

describe('[Movie] Model - movie', () => {
  it('Should serialize genre model', () => {
    const serializedDto = plainToClass(MovieDto, dto, { excludeExtraneousValues: true })

    expect(serializedDto).toEqual({
      id: dto.id,
      title: dto.title,
      year: dto.year,
      runtime: dto.runtime,
      genres: dto.genres,
      director: dto.director,
      actors: dto.actors,
      plot: dto.plot,
      posterUrl: dto.posterUrl
    })
  })
})
