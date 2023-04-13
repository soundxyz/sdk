import { interfaceIds } from '@soundxyz/sound-protocol-private'
import { SoundEditionV1_2__factory } from '@soundxyz/sound-protocol-private/typechain'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'

export async function isSoundV1_2_OrGreater(this: SoundClientInstance, { editionAddress }: { editionAddress: string }) {
  return this.instance.idempotentCachedCall(`is-v1_2_or_greater-${editionAddress}`, async () => {
    await validateSoundEdition.call(this, {
      editionAddress,
    })

    const { signerOrProvider } = await this.expectSignerOrProvider()

    const edition = SoundEditionV1_2__factory.connect(editionAddress, signerOrProvider)

    return edition.supportsInterface(interfaceIds.ISoundEditionV1_2)
  })
}
