import { IS_SERVER } from '@/utils/constants'
import { parse, stringify } from 'superjson'
import { proxy, useSnapshot, type INTERNAL_Snapshot } from 'valtio'

import { type ZodType, type ZodTypeDef } from 'zod'

interface PersistedStoreState<Output> {
  value: Output | null
  isLoading: boolean
}

export type PersistedStore<Input, Output> = {
  get: () => Promise<Output | null>
  set: (value: Input) => Promise<Output | null>
  state: PersistedStoreState<Output>
  clear(): Promise<void>
  useStore: () => INTERNAL_Snapshot<PersistedStoreState<Output>>
}

const PersistedStores: Map<string, PersistedStore<unknown, unknown>> = new Map()

interface PersistenceStorageInput<Output = unknown, Input = Output, Def extends ZodTypeDef = ZodTypeDef> {
  /**
   * Parse and validation schema
   */
  schema: ZodType<Output, Def, Input>
  /**
   * Unique key combination
   */
  key: string
}

export function PersistenceStorage<Output = unknown, Input = Output, Def extends ZodTypeDef = ZodTypeDef>({
  schema,
  key: idempotentStoreKey,
}: PersistenceStorageInput<Output, Input, Def>): PersistedStore<Input, Output> {
  const existingStore = PersistedStores.get(idempotentStoreKey)

  if (existingStore) return existingStore as PersistedStore<Input, Output>

  const state = proxy<PersistedStoreState<Output>>({
    value: null,
    isLoading: true,
  })

  const key = `sound-${idempotentStoreKey}`

  async function get(): Promise<Output | null> {
    if (IS_SERVER) return null

    try {
      const value = localStorage.getItem(key)

      if (value == null) return (state.value = null)

      const parsedValue = await schema.safeParseAsync(parse(value))

      if (parsedValue.success) {
        return (state.value = parsedValue.data)
      } else {
        await localStorage.removeItem(key)
        throw parsedValue.error
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)

      return (state.value = null)
    } finally {
      if (state.isLoading) state.isLoading = false
    }
  }

  async function setStorage(value: Output) {
    try {
      await localStorage.setItem(key, stringify(value))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)

      return (state.value = null)
    }

    return value
  }

  async function set(value: Input): Promise<Output | null> {
    if (IS_SERVER) return null

    const parsedValue = await schema.parseAsync(value)

    state.value = parsedValue

    return setStorage(parsedValue)
  }

  async function clear() {
    if (IS_SERVER) return

    try {
      state.value = null
      await localStorage.removeItem(key)
    } catch (err) {
      // We ignore browser flaky storage errors

      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  const store: PersistedStore<Input, Output> = {
    get,
    set,
    clear,
    state,
    useStore() {
      return useSnapshot(state)
    },
  }

  PersistedStores.set(idempotentStoreKey, store as PersistedStore<unknown, unknown>)

  return store
}
