export interface Store<Entity> {
  load(): Promise<void>
  retrieve(): Promise<Entity[]>
  persist(entity: Entity): Promise<void>
}

export type ReadonlyStore<Entity> = Omit<Store<Entity>, 'persist'>
