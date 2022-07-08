declare const GenreIdType: unique symbol

export type GenreId = {
  [GenreIdType]: typeof GenreIdType
} & string

export const createGenreIdFromGenreName = (name: string): GenreId => name.toLowerCase() as GenreId
