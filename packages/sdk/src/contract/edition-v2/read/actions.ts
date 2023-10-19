import type { PublicClient } from 'viem'
import { curry } from '../../../utils/helpers'
import { editionContractInfo, mintingSchedules } from './info'
import { editionMintParameters, getPlatformFees, getTotalMintPriceAndFees, mintEligibility } from './mint'
import type { MerkleProvider } from '../../../utils/types'
import { createEditionParameters } from './create'

export function editionV2PublicActions<
  Client extends Pick<PublicClient, 'readContract' | 'multicall' | 'estimateContractGas'>,
>(client: Client) {
  return {
    editionV2: {
      info: curry(editionContractInfo)(client),
      mintSchedules: curry(mintingSchedules)(client),

      mint({ merkleProvider }: { merkleProvider: MerkleProvider }) {
        return {
          totalMintPriceAndFees: curry(getTotalMintPriceAndFees)(client),
          platformFees: curry(getPlatformFees)(client),

          eligiblity: curry(mintEligibility)(client)({ merkleProvider }),

          mintParameters: curry(editionMintParameters)(client)({ merkleProvider }),
        }
      },

      create: curry(createEditionParameters)(client),
    },
  }
}
