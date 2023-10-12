import type { Address } from 'viem'
import { InvalidQuantityError } from '../../errors'
import { parseTokenIdNumber } from '../../utils/helpers'
import { SoundClientInstance } from '../instance'

export function SamAvailableTokensToSell(
  this: SoundClientInstance,
  {
    editionAddress,
  }: {
    editionAddress: Address
  },
  { quantity, ownerPublicAddress }: { quantity: number; ownerPublicAddress: string },
) {
  const soundAPI = this.expectSoundAPI()

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  return soundAPI
    .editionOwnedTokenIds({
      editionContractAddress: editionAddress,
      ownerPublicAddress,
      filter: {
        includeGoldenEgg: false,
      },
      limit: quantity,
      sort: {
        serialNumber: 'DESC',
      },
    })
    .then((value) => {
      const tokenIds =
        value.data?.editionOwnedTokenIds.reduce((acc: number[], tokenId) => {
          const tokenIdNumber = parseTokenIdNumber(tokenId)

          if (tokenIdNumber) acc.push(tokenIdNumber)

          return acc
        }, []) || []

      return tokenIds.sort((a, b) => a - b)
    })
}
