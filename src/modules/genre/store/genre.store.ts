import { readFile } from 'fs/promises'
import { join } from 'path'
import { plainToClass } from 'class-transformer'
import { isArray, validate } from 'class-validator'
import { ConfigService } from '../../../services/config.service'
import { ReadonlyStore } from '../../../store/store'
import { GenreEntity } from '../entities/genre.entity'
import { createGenreIdFromGenreName } from '../utils/genre-id.utils'

export interface GenreDataFile {
  genres?: string[]
}

export class GenreStore implements ReadonlyStore<GenreEntity> {
  private data: GenreEntity[] = []
  private readonly dataFilePath = join(process.cwd(), this.configService.dbGenreFilePath)

  constructor(private readonly configService: ConfigService) {}

  async load(): Promise<void> {
    const data = await readFile(this.dataFilePath)
    const parsedData = await this.parseFileData(JSON.parse(data.toString()))

    this.data = parsedData
  }

  async retrieve(): Promise<GenreEntity[]> {
    return [...this.data]
  }

  private async parseFileData(data?: GenreDataFile): Promise<GenreEntity[]> {
    if (!data || !data.genres || !isArray(data.genres)) {
      throw new Error(`Invalid ${this.dataFilePath} file`)
    }

    const parsedData: GenreEntity[] = data.genres.map((genre) =>
      plainToClass(GenreEntity, {
        id: createGenreIdFromGenreName(genre),
        name: genre
      })
    )

    const validationResult = await Promise.all(parsedData.map((item) => validate(item)))

    if (validationResult.flat().length) {
      throw new Error(`Invalid ${this.dataFilePath} file`)
    }

    return parsedData
  }
}
