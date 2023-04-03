import { interfaceIds } from '@soundxyz/sound-protocol'
import { SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'

import { NotSoundEditionError } from '../errors'
import { validateAddress } from '../utils/helpers'
import { SoundClientInstance } from './instance'

export async function isSoundEdition(
  this: SoundClientInstance,
  { editionAddress }: { editionAddress: string },
): Promise<boolean> {
  const { instance, expectSignerOrProvider } = this

  return instance.idempotentCachedCall(`is-sound-edition-${editionAddress}`, async () => {
    validateAddress({ type: 'SOUND_EDITION', address: editionAddress })
    const { signerOrProvider } = await expectSignerOrProvider()

    const editionContract = SoundEditionV1_2__factory.connect(editionAddress, signerOrProvider)

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

export async function validateSoundEdition(this: SoundClientInstance, { editionAddress }: { editionAddress: string }) {
  const isEdition = await isSoundEdition.call(this, { editionAddress })
  if (!isEdition) {
    throw new NotSoundEditionError({ contractAddress: editionAddress })
  }
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