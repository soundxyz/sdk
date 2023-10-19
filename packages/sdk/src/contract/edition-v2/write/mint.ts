import type { WalletClient } from 'viem'
import type { EditionMintContractInput } from '../read/mint'
import { curry } from '../../../utils/helpers'

export function editionMint<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  { input }: EditionMintContractInput,
) {
  return client.writeContract(input)
}

export function editionV2WalletActionsMint<Client extends Pick<WalletClient, 'writeContract'> & { editionV2?: {} }>(
  client: Client,
) {
  return {
    editionV2: {
      ...client.editionV2,
      mint: curry(editionMint)(client),
    },
  }
}
