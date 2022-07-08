import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { plainToClass } from 'class-transformer'
import { isArray, validate } from 'class-validator'
import { ConfigService } from '../../../services/config.service'
import { Store } from '../../../store/store'
import { MovieEntity } from '../entities/move.entity'
import { createMovieId, incrementMovieId, MovieId } from '../utils/movie-id.utils'

export interface MovieDataFile {
  movies?: MovieEntity[]
}

export class MovieStore implements Store<MovieEntity> {
  private lastId: MovieId = createMovieId(-1)
  private data: MovieEntity[] = []
  private readonly dataFileFormatSpaces: number = 4
  private readonly dataFilePath = join(process.cwd(), this.configService.dbMovieFilePath)

  constructor(private readonly configService: ConfigService) {}

  async load(): Promise<void> {
    const data = await readFile(this.dataFilePath)
    const parsedData = await this.parseFileData(JSON.parse(data.toString()))

    this.lastId = Math.max(...parsedData.map((movie: MovieEntity) => movie.id)) as MovieId
    this.data = parsedData
  }

  async retrieve(): Promise<MovieEntity[]> {
    return [...this.data]
  }

  async persist(entity: MovieEntity): Promise<void> {
    const data = await readFile(this.dataFilePath)
    const parsedData = JSON.parse(data.toString())

    parsedData.movies.push({
      id: entity.id,
      title: entity.title,
      year: entity.year.toString(),
      runtime: entity.runtime.toString(),
      genres: entity.genres.sort((a, b) => (a > b ? 1 : -1)),
      director: entity.director,
      actors: entity.actors,
      plot: entity.plot,
      posterUrl: entity.posterUrl
    })

    await writeFile(this.dataFilePath, JSON.stringify(parsedData, null, this.dataFileFormatSpaces))
  }

  generateNextId(): MovieId {
    const movieId = incrementMovieId(this.lastId)
    this.lastId = movieId

    return movieId
  }

  private async parseFileData(data?: MovieDataFile): Promise<MovieEntity[]> {
    if (!data || !data.movies || !isArray(data.movies)) {
      throw new Error(`Invalid ${this.dataFilePath} file`)
    }

    const parsedData: MovieEntity[] = data.movies.map((movie) => plainToClass(MovieEntity, movie))

    const validationResult = await Promise.all(parsedData.map((item) => validate(item)))

    if (validationResult.flat().length) {
      throw new Error(`Invalid ${this.dataFilePath} file`)
    }

    return parsedData
  }
}
