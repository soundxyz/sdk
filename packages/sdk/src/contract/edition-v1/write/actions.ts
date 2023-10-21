import type { WalletClient } from 'viem'
import { curry } from '../../../utils/helpers'
import { editionMint, editionMintTo } from './mint'
import { SamBuy, SamSell } from './sam'

export function editionV1WalletActions<
  Client extends Pick<WalletClient, 'writeContract'> & {
    editionV1?: {
      sam?: {}
    }
  },
>(client: Client) {
  return {
    editionV1: {
      ...client.editionV1,
      mint: curry(editionMint)(client),
      mintTo: curry(editionMintTo)(client),
      sam: {
        ...client.editionV1?.sam,
        sell: curry(SamSell)(client),
        buy: curry(SamBuy)(client),
      },
    },
  }
}
