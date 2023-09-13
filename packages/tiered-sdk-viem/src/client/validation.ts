import type { SoundClientInstance } from './instance'
import { SoundEditionV2Config } from '../abi/sound-edition-v2'
import type { SoundContractValidation } from '../types'
import { NotSoundEditionError } from '../errors'
import { BaseError, ContractFunctionZeroDataError, type Address } from 'viem'
import { interfaceIds } from '../constants'

export async function isSoundEdition(
  this: SoundClientInstance,
  {
    editionAddress,
  }: {
    editionAddress: Address
  },
) {
  const { instance } = this

  return instance.idempotentCachedCall(`is-sound-edition-${editionAddress}`, async () => {
    const client = await this.expectClient()

    try {
      return await client.readContract({
        abi: SoundEditionV2Config.abi,
        address: editionAddress,
        functionName: 'supportsInterface',
        args: [interfaceIds.ISoundEditionV2],
      })
    } catch (err: unknown) {
      // ContractFunctionZeroDataError gets thrown if the contract doesn't exist or supportsInterface isn't implemented
      if (err instanceof BaseError && err.walk((e) => e instanceof ContractFunctionZeroDataError)) {
        return false
      }

      throw err
    }
  })
}

export function validateSoundEdition(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract }: { editionAddress: Address } & Required<SoundContractValidation>,
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
