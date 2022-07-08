export type Provider<T = unknown> = { new (...args: unknown[]): T }

export type AbstractProvider<T = unknown> = (abstract new (...args: unknown[]) => T) | Provider<T>

export type ProviderArray<T = unknown> = (Provider<T> | [AbstractProvider<T>, Provider<T>])[]

export interface ModuleProvider<Queries, Commands, T = unknown> {
  provide(): ProviderArray<T>
  provideQueries(): Queries
  provideCommands(): Commands
}
