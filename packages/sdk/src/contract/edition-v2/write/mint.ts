import type { Chain, WalletClient } from 'viem'
import { curry } from '../../../utils/helpers'
import type { EditionMintContractInput } from '../read/mint'

export function editionMint<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  { input }: EditionMintContractInput,
) {
  return client.writeContract<typeof input.abi, typeof input.functionName, Chain>(input)
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
