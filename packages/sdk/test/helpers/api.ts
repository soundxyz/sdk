import type { SoundAPI } from '../../src/api'

export function MockAPI(api?: Partial<SoundAPI>): SoundAPI {
  return {
    async check() {
      return null
    },
    async audioFromTrack() {
      return {
        data: null,
      }
    },
    async merkleProof() {
      return null
    },
    async releaseInfo() {
      return {
        data: null,
      }
    },
    ...api,
  }
}
