import type { WalletClient } from 'viem'
import type { EditionMintContractInput, EditionMintToContractInput } from '../read/mint'

export function editionMint<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  input: EditionMintContractInput,
) {
  // @ts-expect-error Fix typescript not liking union inputs
  return client.writeContract(input)
}

export function editionMintTo<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  input: EditionMintToContractInput,
) {
  // @ts-expect-error Fix typescript not liking union inputs
  return client.writeContract(input)
}
