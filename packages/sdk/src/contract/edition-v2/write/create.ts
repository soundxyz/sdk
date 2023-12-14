import type { WalletClient } from 'viem'
import { curry } from '../../../utils/helpers'
import type { EditionCreateContractInput } from '../read/create'

export function editionCreate<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  input: EditionCreateContractInput,
) {
  return client.writeContract(input)
}

export function editionV2WalletActionsCreate<Client extends Pick<WalletClient, 'writeContract'> & { editionV2?: {} }>(
  client: Client,
) {
  return {
    editionV2: {
      ...client.editionV2,
      createEdition: curry(editionCreate)(client),
    },
  }
}
