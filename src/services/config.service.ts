import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { config } from 'dotenv'
import { EnvDto } from '../models/env.dto'

export class ConfigService {
  readonly port: number
  readonly dbGenreFilePath: string
  readonly dbMovieFilePath: string

  constructor() {
    config()

    const env = this.validateAndParse(process.env)

    this.port = env.PORT
    this.dbGenreFilePath = env.DB_GENRE_FILE_PATH
    this.dbMovieFilePath = env.DB_MOVIE_FILE_PATH
  }

  validateAndParse(rawEnv: Record<string, string | undefined>): EnvDto {
    const env = plainToClass(EnvDto, rawEnv)

    const errors = validateSync(env, { whitelist: true })

    if (errors.length) {
      throw new Error('Invalid env file')
    }

    return env
  }
}
