import type { Address, PublicClient } from 'viem'
import { nowUnixTimestamp } from '../../../utils/helpers'
import { SOUND_EDITION_V2_ABI } from '../abi/sound-edition-v2'
import { SUPER_MINTER_V1, SUPER_MINTER_V1_ADDRESS } from '../abi/super-minter-v1'
import { SUPER_MINTER_V2, SUPER_MINTER_V2_ADDRESS } from '../abi/super-minter-v2'
import type { GetEditionContractInfoReturnType } from './info'
import { CacheUtils } from '../../../utils/cache-utils'

export function getTierCurrentMaxMintable(
  tierInfo: Pick<
    GetEditionContractInfoReturnType['tierInfo'][number],
    'maxMintableLower' | 'maxMintableUpper' | 'cutoffTime'
  >,
  unixTimestamp: number | undefined = nowUnixTimestamp(),
) {
  // if before the cutoff time, use the upper limit, otherwise use the lower limit
  return unixTimestamp < tierInfo.cutoffTime ? tierInfo.maxMintableUpper : tierInfo.maxMintableLower
}

// This is hardcoded on the contract so we always know its 2
export const MINTER_ROLE = 2n

export type SuperMinter = typeof SUPER_MINTER_V1 | typeof SUPER_MINTER_V2
export type SuperMinterAddress = SuperMinter['address']

export async function getSuperMinterForEdition<Client extends Pick<PublicClient, 'multicall'>>(
  client: Client,
  { editionAddress }: { editionAddress: Address },
): Promise<SuperMinter> {
  const cacheKey = `superMinter-${editionAddress}`

  return CacheUtils.getOrSetCache<SuperMinter>(cacheKey, () => _getSuperMinterForEdition({ client, editionAddress }))
}

async function _getSuperMinterForEdition({
  client,
  editionAddress,
}: {
  client: Pick<PublicClient, 'multicall'>
  editionAddress: Address
}) {
  const [hasSuperMinterV1, hasSuperMinterV2] = await client.multicall({
    contracts: [
      {
        abi: SOUND_EDITION_V2_ABI,
        address: editionAddress,
        functionName: 'hasAnyRole',
        args: [SUPER_MINTER_V1_ADDRESS, MINTER_ROLE],
      },
      {
        abi: SOUND_EDITION_V2_ABI,
        address: editionAddress,
        functionName: 'hasAnyRole',
        args: [SUPER_MINTER_V2_ADDRESS, MINTER_ROLE],
      },
    ],
    allowFailure: false,
  })

  if (hasSuperMinterV1) {
    return SUPER_MINTER_V1
  } else if (hasSuperMinterV2) {
    return SUPER_MINTER_V2
  }

  throw new Error('No super minter found for edition')
}
