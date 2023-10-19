import type { WalletClient } from 'viem'
import { curry } from '../../../utils/helpers'
import { editionMint, editionMintTo } from './mint'

export function editionV1WalletActions<Client extends Pick<WalletClient, 'writeContract'> & { editionV1?: {} }>(
  client: Client,
) {
  return {
    editionV1: {
      ...client.editionV1,
      mint: curry(editionMint)(client),
      mintTo: curry(editionMintTo)(client),
    },
  }
}
