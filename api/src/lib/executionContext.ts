import { AsyncLocalStorage } from 'node:async_hooks'

export type StoreKey = 'userId' | 'requestId' | 'webhook'
export type Store = Map<StoreKey, string>

export const executionContext = new AsyncLocalStorage<Store>()
