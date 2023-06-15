import { interfaceIds } from '@soundxyz/sound-protocol'
import { SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import { SoundContractValidation } from '../../types'

export async function isSoundV1_2_OrGreater(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract = false }: { editionAddress: string } & SoundContractValidation,
) {
  return this.instance.idempotentCachedCall(`is-v1_2_or_greater-${editionAddress}`, async () => {
    await validateSoundEdition.call(this, {
      editionAddress,
      assumeValidSoundContract,
    })

    const { providerOrSigner } = await this.expectProviderOrSigner()

    const edition = SoundEditionV1_2__factory.connect(editionAddress, providerOrSigner)

    return edition.supportsInterface(interfaceIds.ISoundEditionV1_2)
  })
}
