import type { Address, PublicClient } from 'viem'
import { soundEditionV1_2Abi } from '../abi/sound-edition-v1_2'
import { interfaceIds } from '../interfaceIds'

export function isSoundV1_2_OrGreater<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  {
    editionAddress,
  }: {
    editionAddress: Address
  },
) {
  return client.readContract({
    abi: soundEditionV1_2Abi,
    address: editionAddress,
    functionName: 'supportsInterface',
    args: [interfaceIds.ISoundEditionV1_2],
  })
}
