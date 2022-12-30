import { interfaceIds } from '@soundxyz/sound-protocol'
import {
  RangeEditionMinter__factory,
  MerkleDropMinter__factory,
  SoundEditionV1_1__factory,
} from '@soundxyz/sound-protocol/typechain/index'

const editionInterface = SoundEditionV1_1__factory.createInterface()
const rangeMinterInterface = RangeEditionMinter__factory.createInterface()
const merkleMinterInteface = MerkleDropMinter__factory.createInterface()

export const minterFactoryMap = {
  [interfaceIds.IRangeEditionMinter]: RangeEditionMinter__factory,
  [interfaceIds.IMerkleDropMinter]: MerkleDropMinter__factory,
} as const

// This is hardcoded on the contract so we always know its 2
export const MINTER_ROLE = 2

export const editionInitFlags = {
  METADATA_IS_FROZEN: 1, // 1 << 0
  MINT_RANDOMNESS_ENABLED: 2, // 1 << 1
  OPERATOR_FILTERING_ENABLED: 4, // 1 << 2
} as const

export const UINT32_MAX = 4294967295

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

export const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'

export const NULL_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'

export const MINT_GAS_LIMIT_MULTIPLIER = 1.2

export const MINT_FALLBACK_GAS_LIMIT = 200_000

export const CUSTOM_ERRORS = {
  ExceedsEditionAvailableSupply: 'ExceedsEditionAvailableSupply',
  ExceedsAvailableSupply: 'ExceedsAvailableSupply',
  ExceedsMaxPerAccount: 'ExceedsMaxPerAccount',
}

export const errorSigHashToName = {
  [editionInterface.getSighash(CUSTOM_ERRORS.ExceedsEditionAvailableSupply)]: editionInterface.getError(
    CUSTOM_ERRORS.ExceedsEditionAvailableSupply,
  ).name,
  [rangeMinterInterface.getSighash(CUSTOM_ERRORS.ExceedsAvailableSupply)]: rangeMinterInterface.getError(
    CUSTOM_ERRORS.ExceedsAvailableSupply,
  ).name,
  [rangeMinterInterface.getSighash(CUSTOM_ERRORS.ExceedsMaxPerAccount)]: rangeMinterInterface.getError(
    CUSTOM_ERRORS.ExceedsMaxPerAccount,
  ).name,
  [merkleMinterInteface.getSighash(CUSTOM_ERRORS.ExceedsAvailableSupply)]: merkleMinterInteface.getError(
    CUSTOM_ERRORS.ExceedsAvailableSupply,
  ).name,
  [merkleMinterInteface.getSighash(CUSTOM_ERRORS.ExceedsMaxPerAccount)]: merkleMinterInteface.getError(
    CUSTOM_ERRORS.ExceedsMaxPerAccount,
  ).name,
} as const
