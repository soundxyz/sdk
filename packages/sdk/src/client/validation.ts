import { interfaceIds } from '@soundxyz/sound-protocol'
import { SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'

import { NotSoundEditionError } from '../errors'
import { validateAddress } from '../utils/helpers'
import { SoundClientInstance } from './instance'
import type { SoundContractValidation } from '../types'

export async function isSoundEdition(
  this: SoundClientInstance,
  { editionAddress }: { editionAddress: string },
): Promise<boolean> {
  const { instance, expectProviderOrSigner } = this

  return instance.idempotentCachedCall(`is-sound-edition-${editionAddress}`, async () => {
    validateAddress({ type: 'SOUND_EDITION', address: editionAddress })
    const { providerOrSigner } = await expectProviderOrSigner()

    const editionContract = SoundEditionV1_2__factory.connect(editionAddress, providerOrSigner)

    try {
      return await editionContract.supportsInterface(interfaceIds.ISoundEditionV1)
    } catch (err: unknown) {
      // CALL_EXCEPTION gets thrown if the contract doesn't exist or supportsInterface isn't implemented
      if (err instanceof Error && 'code' in err && err.code === 'CALL_EXCEPTION') {
        return false
      }

      throw err
    }
  })
}

export function validateSoundEdition(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract }: { editionAddress: string } & Required<SoundContractValidation>,
) {
  if (assumeValidSoundContract) return

  return isSoundEdition.call(this, { editionAddress }).then((isEdition) => {
    if (!isEdition) throw new NotSoundEditionError({ contractAddress: editionAddress })
  })
}

async function getNetworkChainId(this: SoundClientInstance) {
  const networkProvider = await this.expectProvider()

  const network = await networkProvider.getNetwork()

  return network.chainId
}

export async function networkChainMatches(this: SoundClientInstance, { chainId }: { chainId: number }) {
  const networkChain = await getNetworkChainId.call(this)

  return networkChain === chainId
}
