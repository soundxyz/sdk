import type { GetEditionContractInfoReturnType } from './info'

export function getTierCurrentMaxMintable(
  tierInfo: Pick<
    GetEditionContractInfoReturnType['tierInfo'][number],
    'maxMintableLower' | 'maxMintableUpper' | 'cutoffTime'
  >,
  unixTimestamp: number | undefined = Math.floor(Date.now() / 1000),
) {
  // if before the cutoff time, use the upper limit, otherwise use the lower limit
  return unixTimestamp < tierInfo.cutoffTime ? tierInfo.maxMintableUpper : tierInfo.maxMintableLower
}

// This is hardcoded on the contract so we always know its 2
export const MINTER_ROLE = 2n
