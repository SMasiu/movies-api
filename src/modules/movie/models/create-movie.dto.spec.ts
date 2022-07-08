import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateMovieDto } from './create-movie.dto'

describe('[Movie] Model - create movie', () => {
  it('Should not contain any error', async () => {
    const dto = {
      title: 'Beetlejuice',
      year: 1988,
      runtime: 92,
      genres: ['Comedy', 'Fantasy'],
      director: 'Tim Burton',
      actors: 'Alec Baldwin',
      plot: 'A plot',
      posterUrl: 'https://images-na.ssl-images-amazon.com/impage.png'
    }

    const errors = await validate(plainToClass(CreateMovieDto, dto))

    expect(errors).toHaveLength(0)
  })

  it('Should not contain any error', async () => {
    const dto = {
      title: 'Beetlejuice',
      year: 1988,
      runtime: 92,
      genres: ['Comedy', 'Fantasy'],
      director: 'Tim Burton'
    }

    const errors = await validate(plainToClass(CreateMovieDto, dto))

    expect(errors).toHaveLength(0)
  })

  it('Should contain error constraints', async () => {
    const dto = {
      title: 123,
      year: '1988',
      runtime: '92',
      genres: 'Comedy',
      director: ['Tim Burton'],
      actors: true,
      plot: ['A plot'],
      posterUrl: 'Invalid url'
    }

    const errors = await validate(plainToClass(CreateMovieDto, dto))

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'title' }),
        expect.objectContaining({ property: 'year' }),
        expect.objectContaining({ property: 'runtime' }),
        expect.objectContaining({ property: 'genres' }),
        expect.objectContaining({ property: 'director' }),
        expect.objectContaining({ property: 'actors' }),
        expect.objectContaining({ property: 'plot' }),
        expect.objectContaining({ property: 'posterUrl' })
      ])
    )
  })
})
