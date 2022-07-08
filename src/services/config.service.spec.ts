import { ConfigService } from './config.service'

const validEnv = {
  PORT: '8080',
  DB_GENRE_FILE_PATH: 'db.json',
  DB_MOVIE_FILE_PATH: 'db.json'
}

const configService = new ConfigService()

describe('Service - config', () => {
  it('Should successfully parse & validate env', () => {
    const env = configService.validateAndParse(validEnv)

    expect(env).toEqual({
      ...validEnv,
      PORT: 8080
    })
  })

  it('Should throw error on invalid env', () => {
    expect(() => configService.validateAndParse({})).toThrowError()
  })
})
