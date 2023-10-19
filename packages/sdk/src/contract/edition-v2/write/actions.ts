import type { WalletClient } from 'viem'
import { curry } from '../../../utils/helpers'
import { editionMint } from './mint'
import { editionCreate } from './create'

export function editionV2WalletActions<Client extends Pick<WalletClient, 'writeContract'>>(client: Client) {
  return {
    editionV2_write: {
      mint: curry(editionMint)(client),
      create: curry(editionCreate)(client),
    },
  }
}
