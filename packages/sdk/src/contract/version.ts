import type { Address, PublicClient } from 'viem'
import { soundEditionV1Abi } from './edition-v1/abi/sound-edition-v1'
import { interfaceIds as editionV1InterfaceIds } from './edition-v1/interfaceIds'
import { SOUND_EDITION_V2_ABI } from './edition-v2/abi/sound-edition-v2'
import { interfaceIds as editionV2InterfaceIds } from './edition-v2/interfaceIds'

export function soundEditionVersionPublicActions<Client extends Pick<PublicClient, 'multicall'>>(client: Client) {
  return {
    async soundEditionVersion({ contractAddress }: { contractAddress: Address }) {
      const [isSoundEditionV1, isSoundEditionV2] = await client.multicall({
        contracts: [
          {
            abi: soundEditionV1Abi,
            address: contractAddress,
            functionName: 'supportsInterface',
            args: [editionV1InterfaceIds.ISoundEditionV1],
          },
          {
            abi: SOUND_EDITION_V2_ABI,
            address: contractAddress,
            functionName: 'supportsInterface',
            // v2 and v2.1 have the same interface id
            args: [editionV2InterfaceIds.ISoundEditionV2],
          },
        ],
        allowFailure: true,
      })

      return {
        isSoundEditionV1: isSoundEditionV1.result ?? false,
        isSoundEditionV2: isSoundEditionV2.result ?? false,
      }
    },
  }
}
