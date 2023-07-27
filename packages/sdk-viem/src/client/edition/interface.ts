import { interfaceIds } from '@soundxyz/sound-protocol/interfaceIds'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import type { SoundContractValidation } from '../../types'
import { soundEditionV2Abi } from '../../abi/sound-edition-v2'
import { validateAddress } from '../../utils/helpers'

export async function isSoundV1_2_OrGreater(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract = false }: { editionAddress: string } & SoundContractValidation,
) {
  return this.instance.idempotentCachedCall(`is-v1_2_or_greater-${editionAddress}`, async () => {
    await validateSoundEdition.call(this, {
      editionAddress,
      assumeValidSoundContract,
    })

    validateAddress(editionAddress, { type: 'SOUND_EDITION' })

    const { readContract } = await this.expectClient()

    return readContract({
      abi: soundEditionV2Abi,
      address: editionAddress,
      functionName: 'supportsInterface',
      args: [interfaceIds.ISoundEditionV1_2],
    })
  })
}
