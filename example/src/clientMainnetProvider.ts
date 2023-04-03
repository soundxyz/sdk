import { SoundClient } from '@soundxyz/sdk'

import { mainnetProvider } from './alchemy'

export const clientMainnetProvider = SoundClient({
  provider: mainnetProvider,
})
