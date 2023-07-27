import type { SoundClientInstance } from './instance'
import { validateAddress } from '../utils/helpers'
import { soundEditionV2Abi } from '../abi/sound-edition-v2'
import { interfaceIds } from '@soundxyz/sound-protocol'
import type { SoundContractValidation } from '../types'
import { NotSoundEditionError } from '../errors'

export async function isSoundEdition(
  this: SoundClientInstance,
  {
    editionAddress,
  }: {
    editionAddress: string
  },
) {
  const { instance } = this

  return instance.idempotentCachedCall(`is-sound-edition-${editionAddress}`, async () => {
    validateAddress(editionAddress, { type: 'SOUND_EDITION' })
    const client = await this.expectClient()

    try {
      return await client.readContract({
        abi: soundEditionV2Abi,
        address: editionAddress,
        functionName: 'supportsInterface',
        args: [interfaceIds.ISoundEditionV1],
      })
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
  const client = await this.expectClient()

  return client.chain?.id
}

export async function networkChainMatches(this: SoundClientInstance, { chainId }: { chainId: number }) {
  const networkChain = await getNetworkChainId.call(this)

  return networkChain === chainId
}
