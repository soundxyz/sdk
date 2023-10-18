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
