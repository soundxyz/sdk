import { InvalidQuantityError } from '../../errors'
import { parseTokenIdNumber, validateAddress } from '../../utils/helpers'
import { SoundClientInstance } from '../instance'

export function SamAvailableTokensToSell(
  this: SoundClientInstance,
  {
    editionAddress,
  }: {
    editionAddress: string
  },
  { quantity, ownerPublicAddress }: { quantity: number; ownerPublicAddress: string },
) {
  const soundAPI = this.expectSoundAPI()

  validateAddress({
    address: editionAddress,
    notNull: true,
    type: 'SOUND_EDITION',
  })

  validateAddress({
    address: ownerPublicAddress,
    notNull: true,
    type: 'WALLET',
  })

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
