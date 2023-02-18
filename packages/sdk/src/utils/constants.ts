import { interfaceIds } from '@soundxyz/sound-protocol-private'
import {
  RangeEditionMinter__factory,
  MerkleDropMinter__factory,
  SoundEditionV1_2__factory,
  IMinterModule__factory,
} from '@soundxyz/sound-protocol-private/typechain/index'

const editionInterface = SoundEditionV1_2__factory.createInterface()
const iMinterModuleInterface = IMinterModule__factory.createInterface()
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

export const ContractErrorName = {
  // SoundEdition
  MetadataIsFrozen: 'MetadataIsFrozen',
  InvalidRoyaltyBPS: 'InvalidRoyaltyBPS',
  InvalidRandomnessLock: 'InvalidRandomnessLock',
  ExceedsEditionAvailableSupply: 'ExceedsEditionAvailableSupply',
  InvalidAmount: 'InvalidAmount',
  InvalidFundingRecipient: 'InvalidFundingRecipient',
  InvalidEditionMaxMintableRange: 'InvalidEditionMaxMintableRange',
  MaximumHasAlreadyBeenReached: 'MaximumHasAlreadyBeenReached',
  ExceedsAddressBatchMintLimit: 'ExceedsAddressBatchMintLimit',
  MintRandomnessAlreadyRevealed: 'MintRandomnessAlreadyRevealed',
  NoAddressesToAirdrop: 'NoAddressesToAirdrop',
  MintHasConcluded: 'MintHasConcluded',
  MintsAlreadyExist: 'MintsAlreadyExist',
  // IMinterModule
  Underpaid: 'Underpaid',
  ExceedsAvailableSupply: 'ExceedsAvailableSupply',
  MintNotOpen: 'MintNotOpen',
  MintPaused: 'MintPaused',
  InvalidTimeRange: 'InvalidTimeRange',
  Unauthorized: 'Unauthorized',
  InvalidAffiliateFeeBPS: 'InvalidAffiliateFeeBPS',
  FeeRegistryIsZeroAddress: 'FeeRegistryIsZeroAddress',
  // Child minters
  InvalidMaxMintableRange: 'InvalidMaxMintableRange',
  ExceedsMaxPerAccount: 'ExceedsMaxPerAccount',
  MaxMintablePerAccountIsZero: 'MaxMintablePerAccountIsZero',
  InvalidMerkleProof: 'InvalidMerkleProof',
  MerkleRootHashIsEmpty: 'MerkleRootHashIsEmpty',
} as const

export type ContractErrorName = typeof ContractErrorName[keyof typeof ContractErrorName]

const {
  MetadataIsFrozen,
  InvalidRoyaltyBPS,
  InvalidRandomnessLock,
  ExceedsEditionAvailableSupply,
  InvalidAmount,
  InvalidFundingRecipient,
  InvalidEditionMaxMintableRange,
  MaximumHasAlreadyBeenReached,
  ExceedsAddressBatchMintLimit,
  MintRandomnessAlreadyRevealed,
  NoAddressesToAirdrop,
  MintHasConcluded,
  MintsAlreadyExist,
  Underpaid,
  ExceedsAvailableSupply,
  MintNotOpen,
  MintPaused,
  InvalidTimeRange,
  Unauthorized,
  InvalidAffiliateFeeBPS,
  FeeRegistryIsZeroAddress,
  InvalidMaxMintableRange,
  ExceedsMaxPerAccount,
  MaxMintablePerAccountIsZero,
  InvalidMerkleProof,
  MerkleRootHashIsEmpty,
} = ContractErrorName

// Maps contract error signature hashes to error names
export const ContractErrorSigHashToName = {
  // SoundEdition
  [editionInterface.getSighash(MetadataIsFrozen)]: MetadataIsFrozen,
  [editionInterface.getSighash(InvalidRoyaltyBPS)]: InvalidRoyaltyBPS,
  [editionInterface.getSighash(InvalidRandomnessLock)]: InvalidRandomnessLock,
  [editionInterface.getSighash(ExceedsEditionAvailableSupply)]: ExceedsEditionAvailableSupply,
  [editionInterface.getSighash(InvalidAmount)]: InvalidAmount,
  [editionInterface.getSighash(InvalidFundingRecipient)]: InvalidFundingRecipient,
  [editionInterface.getSighash(InvalidEditionMaxMintableRange)]: InvalidEditionMaxMintableRange,
  [editionInterface.getSighash(MaximumHasAlreadyBeenReached)]: MaximumHasAlreadyBeenReached,
  [editionInterface.getSighash(ExceedsAddressBatchMintLimit)]: ExceedsAddressBatchMintLimit,
  [editionInterface.getSighash(MintRandomnessAlreadyRevealed)]: MintRandomnessAlreadyRevealed,
  [editionInterface.getSighash(NoAddressesToAirdrop)]: NoAddressesToAirdrop,
  [editionInterface.getSighash(MintHasConcluded)]: MintHasConcluded,
  [editionInterface.getSighash(MintsAlreadyExist)]: MintsAlreadyExist,
  // IMinterModule
  [iMinterModuleInterface.getSighash(Underpaid)]: Underpaid,
  [iMinterModuleInterface.getSighash(ExceedsAvailableSupply)]: ExceedsAvailableSupply,
  [iMinterModuleInterface.getSighash(MintNotOpen)]: MintNotOpen,
  [iMinterModuleInterface.getSighash(MintPaused)]: MintPaused,
  [iMinterModuleInterface.getSighash(InvalidTimeRange)]: InvalidTimeRange,
  [iMinterModuleInterface.getSighash(Unauthorized)]: Unauthorized,
  [iMinterModuleInterface.getSighash(InvalidAffiliateFeeBPS)]: InvalidAffiliateFeeBPS,
  [iMinterModuleInterface.getSighash(FeeRegistryIsZeroAddress)]: FeeRegistryIsZeroAddress,
  // RangeEditionMinter
  [rangeMinterInterface.getSighash(InvalidMaxMintableRange)]: InvalidMaxMintableRange,
  [rangeMinterInterface.getSighash(ExceedsMaxPerAccount)]: ExceedsMaxPerAccount,
  [rangeMinterInterface.getSighash(MaxMintablePerAccountIsZero)]: MaxMintablePerAccountIsZero,
  // MerkleDropMinter
  [merkleMinterInteface.getSighash(InvalidMerkleProof)]: InvalidMerkleProof,
  [merkleMinterInteface.getSighash(ExceedsMaxPerAccount)]: ExceedsMaxPerAccount,
  [merkleMinterInteface.getSighash(MerkleRootHashIsEmpty)]: MerkleRootHashIsEmpty,
  [merkleMinterInteface.getSighash(MaxMintablePerAccountIsZero)]: MaxMintablePerAccountIsZero,
} as const

export type ContractErrorSigHashToName = typeof ContractErrorSigHashToName[keyof typeof ContractErrorSigHashToName]
