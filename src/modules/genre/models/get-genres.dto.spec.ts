import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { GetGenresDto } from './get-genres.dto'

describe('[Genre] Model - get genres', () => {
  it('Should not contain any error', async () => {
    const dto = {
      names: ['Horror']
    }

    const errors = await validate(plainToClass(GetGenresDto, dto))

    expect(errors).toHaveLength(0)
  })

  it('Should contain error constraints', async () => {
    const dto = {
      names: ['']
    }

    const errors = await validate(plainToClass(GetGenresDto, dto))

    expect(errors).toEqual(expect.arrayContaining([expect.objectContaining({ property: 'names' })]))
  })
})
