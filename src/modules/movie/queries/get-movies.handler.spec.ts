import { Query } from '@tshio/query-bus'
import { GetMoviesQueryHandler, GET_MOVIES_QUERY } from './get-movies.handler'
import { GetMoviesDto } from '../models/get-movies.dto'
import { MovieQueryRegistry } from '../registry/movie.registry'

describe('[Movie] handler - get movies', () => {
  const createRegistry = () =>
    ({
      findMany: jest.fn(),
      getRandom: jest.fn()
    } as MovieQueryRegistry)

  describe('Get movie with no params', () => {
    const registry = createRegistry()
    const handler = new GetMoviesQueryHandler(registry)

    it('Should return call find many', async () => {
      const query: Query<GetMoviesDto> = {
        type: GET_MOVIES_QUERY,
        payload: {}
      }

      await handler.execute(query)

      expect(registry.getRandom).toBeCalledTimes(1)
      expect(registry.findMany).toBeCalledTimes(0)
    })
  })

  describe('Get movie with duration param', () => {
    const registry = createRegistry()
    const handler = new GetMoviesQueryHandler(registry)

    it('Should return call find many', async () => {
      const query: Query<GetMoviesDto> = {
        type: GET_MOVIES_QUERY,
        payload: {
          duration: 120
        }
      }

      await handler.execute(query)

      expect(registry.getRandom).toBeCalledTimes(1)
      expect(registry.findMany).toBeCalledTimes(0)
    })
  })

  describe('Get movie with genres param', () => {
    const registry = createRegistry()
    const handler = new GetMoviesQueryHandler(registry)

    it('Should return call get random', async () => {
      const query: Query<GetMoviesDto> = {
        type: GET_MOVIES_QUERY,
        payload: { genres: ['Horror'] }
      }

      await handler.execute(query)

      expect(registry.getRandom).toBeCalledTimes(0)
      expect(registry.findMany).toBeCalledTimes(1)
    })
  })

  describe('Get movie with duration & genres params', () => {
    const registry = createRegistry()
    const handler = new GetMoviesQueryHandler(registry)

    it('Should return call get random', async () => {
      const query: Query<GetMoviesDto> = {
        type: GET_MOVIES_QUERY,
        payload: { genres: ['Horror'] }
      }

      await handler.execute(query)

      expect(registry.getRandom).toBeCalledTimes(0)
      expect(registry.findMany).toBeCalledTimes(1)
    })
  })
})
