import { interfaceIds } from '@soundxyz/sound-protocol'
import { RangeEditionMinter__factory, MerkleDropMinter__factory } from '@soundxyz/sound-protocol/typechain/index'

export const minterFactoryMap = {
  [interfaceIds.IRangeEditionMinter]: RangeEditionMinter__factory,
  [interfaceIds.IMerkleDropMinter]: MerkleDropMinter__factory,
} as const

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

// This is hardcoded on the contract so we always know its 2
export const MINTER_ROLE = 2

export const editionInitFlags = {
  METADATA_IS_FROZEN: 1, // 1 << 0
  MINT_RANDOMNESS_ENABLED: 2, // 1 << 1
  OPERATOR_FILTERING_ENABLED: 4, // 1 << 2
} as const
