import { SoundClientInstance } from '../instance'
import { soundEditionV1_2Abi } from '../../abi/sound-edition-v1_2'
import { interfaceIds } from '../../constants'
import type { Address } from 'viem'

export async function isSoundV1_2_OrGreater(
  this: SoundClientInstance,
  { editionAddress }: { editionAddress: Address },
) {
  return this.instance.idempotentCachedCall(`is-v1_2_or_greater-${editionAddress}`, async () => {
    const { readContract } = await this.expectClient()

    return readContract({
      abi: soundEditionV1_2Abi,
      address: editionAddress,
      functionName: 'supportsInterface',
      args: [interfaceIds.ISoundEditionV1_2],
    })
  })
}
