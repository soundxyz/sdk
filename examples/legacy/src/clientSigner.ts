import './fetch'

import { SoundClient } from '@soundxyz/sdk'
import { LanyardMerkleProofProvider } from '@soundxyz/sdk/merkle/lanyard'

import { goerliProvider } from './alchemy'
import { signer } from './signer'

export const clientSigner = SoundClient({
  provider: goerliProvider,
  signer,
  merkleProvider: LanyardMerkleProofProvider,
})
