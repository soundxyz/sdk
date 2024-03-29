import type { SoundClientInstance } from './instance'
import { soundEditionV1_2Abi } from '../abi/sound-edition-v1_2'
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
        abi: soundEditionV1_2Abi,
        address: editionAddress,
        functionName: 'supportsInterface',
        args: [interfaceIds.ISoundEditionV1],
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
