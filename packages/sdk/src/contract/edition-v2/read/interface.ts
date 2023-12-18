import type { Address, PublicClient } from 'viem'
import { SOUND_EDITION_V2_ABI } from '../abi/sound-edition-v2'
import { interfaceIds } from '../interfaceIds'

export function isSoundV2<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  {
    editionAddress,
  }: {
    editionAddress: Address
  },
) {
  return client.readContract({
    abi: SOUND_EDITION_V2_ABI,
    address: editionAddress,
    functionName: 'supportsInterface',
    args: [interfaceIds.ISoundEditionV2],
  })
}
