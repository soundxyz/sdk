import type { WalletClient } from 'viem'
import type { EditionMintContractInput, EditionMintToContractInput } from '../read/mint'
import { interfaceIds } from '../interfaceIds'

export function editionMint<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  { interfaceId, input }: EditionMintContractInput,
) {
  /**
   * Typescript needs type narrowing from the union of inputs
   */
  if (interfaceId === interfaceIds.IRangeEditionMinter) {
    return client.writeContract(input)
  }

  return client.writeContract(input)
}

export function editionMintTo<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  { interfaceId, input }: EditionMintToContractInput,
) {
  /**
   * Typescript needs type narrowing from the union of inputs
   */
  if (interfaceId === interfaceIds.IMerkleDropMinterV2_1) {
    return client.writeContract(input)
  }

  return client.writeContract(input)
}
