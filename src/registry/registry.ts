export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface FindOptions<FilterOptions = never, SortOptions = never> {
  where?: FilterOptions
  sort?: SortOptions
}

export interface QueryRegistry<Entity, FilterOptions = never, SortOptions = never> {
  findMany(args: FindOptions<FilterOptions, SortOptions>): Promise<Entity[]>
  getRandom(args: FindOptions<FilterOptions>): Promise<Entity>
}

export interface MutationRegistry<Entity, EntityInput> {
  create(entity: EntityInput): Promise<Entity>
}
