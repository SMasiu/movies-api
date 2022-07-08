import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { EnvDto } from './env.dto'

describe('Model - env', () => {
  it('Should not contain any error', async () => {
    const dto = {
      PORT: 9090,
      DB_GENRE_FILE_PATH: 'genre/db.json',
      DB_MOVIE_FILE_PATH: 'movie/db.json'
    }

    const errors = await validate(plainToClass(EnvDto, dto))

    expect(errors).toHaveLength(0)
  })

  it('Should contain error constraints', async () => {
    const dto = {
      PORT: 'Invalid port',
      DB_GENRE_FILE_PATH: true,
      DB_MOVIE_FILE_PATH: true
    }

    const errors = await validate(plainToClass(EnvDto, dto))

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'PORT' }),
        expect.objectContaining({ property: 'DB_GENRE_FILE_PATH' }),
        expect.objectContaining({ property: 'DB_MOVIE_FILE_PATH' })
      ])
    )
  })
})
