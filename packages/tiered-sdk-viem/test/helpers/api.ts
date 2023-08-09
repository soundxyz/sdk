import type { SoundAPI } from '../../src/api'

export function MockAPI(api?: Partial<SoundAPI>): SoundAPI {
  return {
    async check() {
      return null
    },
    async merkleProof() {
      return null
    },
    async releaseInfo() {
      return {
        data: null,
      }
    },
    async releaseShareInfo() {
      return {
        data: null,
      }
    },
    async editionOwnedTokenIds() {
      return {
        data: null,
      }
    },
    ...api,
  }
}
