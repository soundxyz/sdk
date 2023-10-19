import type { WalletClient } from 'viem'
import type { EditionMintContractInput } from '../read/mint'

export function editionMint<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  input: EditionMintContractInput,
) {
  return client.writeContract(input)
}
