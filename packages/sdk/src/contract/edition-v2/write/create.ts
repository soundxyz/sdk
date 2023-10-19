import type { WalletClient } from 'viem'
import type { EditionCreateContractInput } from '../read/create'

export function editionCreate<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  input: EditionCreateContractInput,
) {
  return client.writeContract(input)
}
