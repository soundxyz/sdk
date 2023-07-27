import type { SoundClientConfig } from '../types'
import { editionInfo } from './edition/info'
import { SoundClientInstance } from './instance'
import { isSoundEdition, networkChainMatches } from './validation'

export function SoundClient(config: SoundClientConfig) {
  const instance = SoundClientInstance(config)

  return {
    instance,

    isSoundEdition: isSoundEdition.bind(instance),
    networkChainMatches: networkChainMatches.bind(instance),

    edition: {
      info: editionInfo.bind(instance),
    },
  }
}
