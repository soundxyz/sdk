import { fetch } from 'undici'

// @ts-expect-error Incomplete spec not needed for examples
globalThis.fetch ||= fetch
