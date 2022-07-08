import { Query } from '@tshio/query-bus'
import { GetGenresQueryHandler, GET_GENRES_QUERY } from './get-genres.handler'
import { GetGenresDto } from '../models/get-genres.dto'
import { GenreQueryRegistry } from '../registry/genre.registry'

const genreDto = {
  id: 'horror',
  name: 'Horror'
}

const registry = { findMany: jest.fn().mockReturnValue([genreDto]) } as GenreQueryRegistry

const handler = new GetGenresQueryHandler(registry)
const query: Query<GetGenresDto> = {
  type: GET_GENRES_QUERY,
  payload: {
    names: ['Horror']
  }
}

describe('[Genre] handler - get genres', () => {
  it('Should return list of genres', async () => {
    const result = await handler.execute(query)

    expect(result).toEqual({
      result: [genreDto]
    })

    expect(registry.findMany).toBeCalledTimes(1)
  })
})
