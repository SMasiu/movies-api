declare const MovieIdType: unique symbol

export type MovieId = {
  [MovieIdType]: typeof MovieIdType
} & number

export const createMovieId = (value: number): MovieId => value as MovieId

export const incrementMovieId = (movieId: MovieId): MovieId => (movieId + 1) as MovieId
