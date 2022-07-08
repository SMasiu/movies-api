import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { GetMoviesDto } from './get-movies.dto'

describe('[Movie] Model - get movies', () => {
  it('Should not contain any error', async () => {
    const dto = {
      duration: 100,
      genres: ['Horror']
    }

    const errors = await validate(plainToClass(GetMoviesDto, dto))

    expect(errors).toHaveLength(0)
  })

  it('Should not contain any error', async () => {
    const dto = {}

    const errors = await validate(plainToClass(GetMoviesDto, dto))

    expect(errors).toHaveLength(0)
  })

  it('Should contain error constraints', async () => {
    const dto = {
      duration: 'Invalid number',
      genres: ['']
    }

    const errors = await validate(plainToClass(GetMoviesDto, dto))

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'duration' }),
        expect.objectContaining({ property: 'genres' })
      ])
    )
  })
})
