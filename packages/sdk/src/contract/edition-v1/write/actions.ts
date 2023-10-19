import type { WalletClient } from 'viem'
import { curry } from '../../../utils/helpers'
import { editionMint, editionMintTo } from './mint'

export function editionV1WalletActions<Client extends Pick<WalletClient, 'writeContract'>>(client: Client) {
  return {
    editionV1_write: {
      mint: curry(editionMint)(client),
      mintTo: curry(editionMintTo)(client),
    },
  }
}
