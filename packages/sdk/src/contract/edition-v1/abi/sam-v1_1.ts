export const samV1_1Abi = [
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'BurnZeroQuantity',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BuyIsFrozen',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'available',
        type: 'uint32',
      },
    ],
    name: 'ExceedsMaxSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InSAMPhase',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InflectionPointIsZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InflectionPriceIsZero',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'payout',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'required',
        type: 'uint256',
      },
    ],
    name: 'InsufficientPayout',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'available',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'required',
        type: 'uint256',
      },
    ],
    name: 'InsufficientSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAffiliate',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAffiliateFeeBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidArtistFeeBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidBuyFreezeTime',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidGoldenEggFeeBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidMaxSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPlatformFeeBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPlatformPerTxFlatFee',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintZeroQuantity',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NewOwnerIsZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoHandoverRequest',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PlatformFeeAddressIsZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SAMAlreadyExists',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SAMDoesNotExist',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnapprovedEdition',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'paid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'required',
        type: 'uint256',
      },
    ],
    name: 'Underpaid',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'AffiliateFeeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accrued',
        type: 'uint256',
      },
    ],
    name: 'AffiliateFeesWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'root',
        type: 'bytes32',
      },
    ],
    name: 'AffiliateMerkleRootSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[]',
        name: 'factories',
        type: 'address[]',
      },
    ],
    name: 'ApprovedEditionFactoriesSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'ArtistFeeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'basePrice',
        type: 'uint96',
      },
    ],
    name: 'BasePriceSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'fromCurveSupply',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'totalPayment',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'platformFee',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'artistFee',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'goldenEggFee',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'affiliateFee',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'affiliated',
        type: 'bool',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'attributionId',
        type: 'uint256',
      },
    ],
    name: 'Bought',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'buyFreezeTime',
        type: 'uint32',
      },
    ],
    name: 'BuyFreezeTimeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'basePrice',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'linearPriceSlope',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'inflectionPrice',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'inflectionPoint',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxSupply',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'buyFreezeTime',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'artistFeeBPS',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'goldenEggFeeBPS',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'affiliateFeeBPS',
        type: 'uint16',
      },
    ],
    name: 'Created',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'GoldenEggFeeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'accrued',
        type: 'uint128',
      },
    ],
    name: 'GoldenEggFeesWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'inflectionPoint',
        type: 'uint32',
      },
    ],
    name: 'InflectionPointSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'inflectionPrice',
        type: 'uint128',
      },
    ],
    name: 'InflectionPriceSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'linearPriceSlope',
        type: 'uint128',
      },
    ],
    name: 'LinearPriceSlopeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxSupply',
        type: 'uint32',
      },
    ],
    name: 'MaxSupplySet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipHandoverCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipHandoverRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'PlatformFeeAddressSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'PlatformFeeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint128',
        name: 'accrued',
        type: 'uint128',
      },
    ],
    name: 'PlatformFeesWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint96',
        name: 'perTxFlatFee',
        type: 'uint96',
      },
    ],
    name: 'PlatformPerTxFlatFeeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'fromCurveSupply',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'totalPayout',
        type: 'uint128',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'attributionId',
        type: 'uint256',
      },
    ],
    name: 'Sold',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BPS_DENOMINATOR',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_AFFILIATE_FEE_BPS',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_ARTIST_FEE_BPS',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_GOLDEN_EGG_FEE_BPS',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_PLATFORM_FEE_BPS',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_PLATFORM_PER_TX_FLAT_FEE',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'affiliateFeesAccrued',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
    ],
    name: 'affiliateMerkleRoot',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'approvedEditionFactories',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'affiliateProof',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256',
        name: 'attributonId',
        type: 'uint256',
      },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint96',
        name: 'basePrice',
        type: 'uint96',
      },
      {
        internalType: 'uint128',
        name: 'linearPriceSlope',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'inflectionPrice',
        type: 'uint128',
      },
      {
        internalType: 'uint32',
        name: 'inflectionPoint',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'maxSupply',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'buyFreezeTime',
        type: 'uint32',
      },
      {
        internalType: 'uint16',
        name: 'artistFeeBPS',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'goldenEggFeeBPS',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'affiliateFeeBPS',
        type: 'uint16',
      },
      {
        internalType: 'address',
        name: 'editionBy',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'editionSalt',
        type: 'bytes32',
      },
    ],
    name: 'create',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
    ],
    name: 'goldenEggFeeRecipient',
    outputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
    ],
    name: 'goldenEggFeesAccrued',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'isAffiliated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'affiliateProof',
        type: 'bytes32[]',
      },
    ],
    name: 'isAffiliatedWithProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'moduleInterfaceId',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: 'result',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'result',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ownershipHandoverValidFor',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platformFeeAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platformFeeBPS',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platformFeesAccrued',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platformPerTxFlatFee',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
    ],
    name: 'samInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint96',
            name: 'basePrice',
            type: 'uint96',
          },
          {
            internalType: 'uint128',
            name: 'linearPriceSlope',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'inflectionPrice',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'inflectionPoint',
            type: 'uint32',
          },
          {
            internalType: 'uint128',
            name: 'goldenEggFeesAccrued',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'balance',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'supply',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxSupply',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'buyFreezeTime',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'artistFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'affiliateFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'goldenEggFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'bytes32',
            name: 'affiliateMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'uint16',
            name: 'platformFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'uint96',
            name: 'platformPerTxFlatFee',
            type: 'uint96',
          },
        ],
        internalType: 'struct SAMInfo',
        name: 'info',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'minimumPayout',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'payoutTo',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'attributonId',
        type: 'uint256',
      },
    ],
    name: 'sell',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'setAffiliateFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'root',
        type: 'bytes32',
      },
    ],
    name: 'setAffiliateMerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'factories',
        type: 'address[]',
      },
    ],
    name: 'setApprovedEditionFactories',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'setArtistFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint96',
        name: 'basePrice',
        type: 'uint96',
      },
    ],
    name: 'setBasePrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'buyFreezeTime',
        type: 'uint32',
      },
    ],
    name: 'setBuyFreezeTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'setGoldenEggFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'inflectionPoint',
        type: 'uint32',
      },
    ],
    name: 'setInflectionPoint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'inflectionPrice',
        type: 'uint128',
      },
    ],
    name: 'setInflectionPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'linearPriceSlope',
        type: 'uint128',
      },
    ],
    name: 'setLinearPriceSlope',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'maxSupply',
        type: 'uint32',
      },
    ],
    name: 'setMaxSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'setPlatformFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'setPlatformFeeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint96',
        name: 'perTxFlatFee',
        type: 'uint96',
      },
    ],
    name: 'setPlatformPerTxFlatFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'supplyForwardOffset',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
    ],
    name: 'totalBuyPriceAndFees',
    outputs: [
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'platformFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'artistFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'goldenEggFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'affiliateFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'supplyBackwardOffset',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
    ],
    name: 'totalSellPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'fromSupply',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
    ],
    name: 'totalValue',
    outputs: [
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'withdrawForAffiliate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
    ],
    name: 'withdrawForGoldenEgg',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawForPlatform',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const samV1_1Bytecode =
  '0x6080604052600436106103345760003560e01c80639c186843116101b0578063d1197d8a116100ec578063ed14834f11610095578063f57402961161006f578063f574029614610910578063fb01526014610930578063fb128c8314610950578063fee81cf41461096c57600080fd5b8063ed14834f146108ca578063f04e283e146108ea578063f2fde38b146108fd57600080fd5b8063e1a45218116100c6578063e1a4521814610865578063e9b3d5e71461087b578063ebaaa3a1146108a857600080fd5b8063d1197d8a14610811578063d7533f0214610831578063dc2b66e81461084f57600080fd5b8063b27c350411610159578063bbd1b0ee11610133578063bbd1b0ee14610770578063bd51f99e14610790578063c7dd3228146107b0578063c9238eae146107d257600080fd5b8063b27c350414610710578063b7711cbf14610730578063bb06b9141461075057600080fd5b8063ae6a7a8b1161018a578063ae6a7a8b146106bd578063afab4364146106dd578063b0d65938146106f057600080fd5b80639c1868431461061f578063aa2300b014610667578063ac1fc22c1461068757600080fd5b80635bb028441161027f5780638b7c895d116102285780639375da5a116102025780639375da5a1461059d578063954c4009146105bd57806399136dae146105dd5780639a3befc8146105fd57600080fd5b80638b7c895d146105645780638d01513c146103855780638da5cb5b1461058457600080fd5b80635dcbb465116102595780635dcbb4651461053c5780636c5f55f714610385578063715018a61461055c57600080fd5b80635bb02844146104dc5780635cb3a54e146104fc5780635cbc742c1461051c57600080fd5b806326a36f59116102e157806341f6ec4f116102bb57806341f6ec4f1461047c57806345091b401461049c57806354d1f13d146104d457600080fd5b806326a36f591461040e57806334cf8f0e1461042e57806336765d591461044e57600080fd5b806322163b861161031257806322163b86146103ae578063241ec00b146103e6578063256929621461040657600080fd5b806301ffc9a71461033957806308bfa2bf1461036e5780630d8a845614610385575b600080fd5b34801561034557600080fd5b50610359610354366004612f56565b61099f565b60405190151581526020015b60405180910390f35b34801561037a57600080fd5b50610383610a23565b005b34801561039157600080fd5b5061039b6101f481565b60405161ffff9091168152602001610365565b3480156103ba57600080fd5b506000546103ce906001600160801b031681565b6040516001600160801b039091168152602001610365565b3480156103f257600080fd5b50610383610401366004612f95565b610b03565b610383610be6565b34801561041a57600080fd5b50610383610429366004612ffe565b610c36565b34801561043a57600080fd5b5061038361044936600461308e565b610f24565b34801561045a57600080fd5b5061046e610469366004612f95565b611003565b604051908152602001610365565b34801561048857600080fd5b50610383610497366004613103565b611018565b3480156104a857600080fd5b506104bc6104b7366004612f95565b611374565b6040516001600160a01b039091168152602001610365565b61038361140a565b3480156104e857600080fd5b5061046e6104f73660046131de565b611446565b34801561050857600080fd5b5061046e6105173660046131de565b611463565b34801561052857600080fd5b50610383610537366004613223565b6114c0565b34801561054857600080fd5b506103ce610557366004612f95565b61155f565b61038361157d565b34801561057057600080fd5b5061038361057f36600461323e565b611591565b34801561059057600080fd5b50638b78c6d819546104bc565b3480156105a957600080fd5b506103836105b8366004612f95565b6115e3565b3480156105c957600080fd5b506103836105d836600461308e565b61166d565b3480156105e957600080fd5b506103836105f8366004613280565b611742565b34801561060957600080fd5b506106126117f7565b60405161036591906132ac565b34801561062b57600080fd5b5061063f61063a3660046131de565b611859565b604080519586526020860194909452928401919091526060830152608082015260a001610365565b34801561067357600080fd5b506103596106823660046132f9565b611924565b34801561069357600080fd5b506103ce6106a2366004612f95565b6004602052600090815260409020546001600160801b031681565b3480156106c957600080fd5b506103836106d836600461335e565b6119af565b6103836106eb36600461338a565b611a40565b3480156106fc57600080fd5b5061038361070b36600461341f565b612060565b34801561071c57600080fd5b5061038361072b366004613280565b612122565b34801561073c57600080fd5b5061038361074b36600461308e565b6121d7565b34801561075c57600080fd5b5061038361076b36600461335e565b612254565b34801561077c57600080fd5b5061038361078b36600461343a565b6122d5565b34801561079c57600080fd5b506103836107ab366004613466565b61236e565b3480156107bc57600080fd5b50604051631092c06960e11b8152602001610365565b3480156107de57600080fd5b506000546107f990600160801b90046001600160601b031681565b6040516001600160601b039091168152602001610365565b34801561081d57600080fd5b5061035961082c366004613492565b6123c8565b34801561083d57600080fd5b506040516202a3008152602001610365565b34801561085b57600080fd5b5061039b6103e881565b34801561087157600080fd5b5061039b61271081565b34801561088757600080fd5b5061089b610896366004612f95565b6123dd565b60405161036591906134cb565b3480156108b457600080fd5b5060005461039b90600160e01b900461ffff1681565b3480156108d657600080fd5b506001546104bc906001600160a01b031681565b6103836108f8366004612f95565b612544565b61038361090b366004612f95565b612584565b34801561091c57600080fd5b5061038361092b366004612f95565b6125ab565b34801561093c57600080fd5b5061038361094b366004613280565b612694565b34801561095c57600080fd5b506107f967016345785d8a000081565b34801561097857600080fd5b5061046e610987366004612f95565b63389a75e1600c908152600091909152602090205490565b60006001600160e01b031982167f01ffc9a7000000000000000000000000000000000000000000000000000000001480610a0257506001600160e01b031982167fa3c2dbc700000000000000000000000000000000000000000000000000000000145b80610a1d57506001600160e01b03198216631092c06960e11b145b92915050565b600054600160f01b900460ff1615610a3a57600080fd5b6000805460ff60f01b1916600160f01b1790556001546001600160a01b031680610a77576040516362ccef3360e01b815260040160405180910390fd5b6000546001600160801b03168015610af257600080546fffffffffffffffffffffffffffffffff19169055610ab5826001600160801b038316612739565b6040516001600160801b03821681527fa8a9aa21b43d916fdaf4bdf9975892e984e7dbe00c0befea632d6fe5bbead73a9060200160405180910390a15b50506000805460ff60f01b19169055565b600054600160f01b900460ff1615610b1a57600080fd5b6000805460ff60f01b1916600160f01b178155610b368261277a565b60018101549091506001600160701b03168015610bd4576001820180546dffffffffffffffffffffffffffff191690556000610b7184611374565b9050610b8681836001600160801b0316612739565b6040516001600160801b03831681526001600160a01b0380831691908616907fe9d03ae127c81928b88a95c4fb19c4e0451215b9c03456a73faef64de215f2cc9060200160405180910390a3505b50506000805460ff60f01b1916905550565b60006202a30067ffffffffffffffff164201905063389a75e1600c5233600052806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b600054600160f01b900460ff1615610c4d57600080fd5b6000805460ff60f01b1916600160f01b1781558490819003610c9b576040517fca67be2000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610ca68861277a565b6001810154909150600160e01b900463ffffffff1682811015610d04576040517f9e4c446100000000000000000000000000000000000000000000000000000000815260048101829052602481018490526044015b60405180910390fd5b8281036000610d148483876127dc565b905087811015610d5a576040517fda3db5b00000000000000000000000000000000000000000000000000000000081526004810182905260248101899052604401610cfb565b6001840180546001600160e01b0316600160e01b63ffffffff8516021790819055600160701b90046001600160701b031681811015610df5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f57544600000000000000000000000000000000000000000000000000000000006044820152606401610cfb565b6001850180547fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff16600160701b8484036001600160701b0316021790556040517fad66829f0000000000000000000000000000000000000000000000000000000081526001600160a01b038d169063ad66829f90610e7b9033908f908f9060040161364f565b600060405180830381600087803b158015610e9557600080fd5b505af1158015610ea9573d6000803e3d6000fd5b50505050610eb78883612739565b86886001600160a01b03168d6001600160a01b03167f944b3f0b3c7f4118bf6e875f507afdd5eaafb7679ff8753036c6004bfcece497878f8f88604051610f01949392919061367b565b60405180910390a450506000805460ff60f01b1916905550505050505050505050565b81610f2e81612843565b6000610f398461277a565b600281015490915063ffffffff600160801b90910481169084161115610f8057610f62846129de565b15610f805760405163066f305360e21b815260040160405180910390fd5b6002810180547fffffffffffffffffffffffff00000000ffffffffffffffffffffffffffffffff16600160801b63ffffffff8616908102919091179091556040519081526001600160a01b038516907f23cb1f116dd4d609eb56f337c5dc684f6b86077a9f40eb92f230715d6a1bd148906020015b60405180910390a250505050565b600061100e8261277a565b6003015492915050565b6110218c612843565b61102a8c612a6c565b8663ffffffff166000036110515760405163066f305360e21b815260040160405180910390fd5b8563ffffffff16600003611078576040516337a7abd960e01b815260040160405180910390fd5b6103e861ffff8616111561109f57604051633a53216960e11b815260040160405180910390fd5b6101f461ffff851611156110c6576040516333a27d9760e21b815260040160405180910390fd5b6101f461ffff841611156110ed57604051631a52ce6f60e01b815260040160405180910390fd5b6110f88c8383612aac565b6001600160a01b038c1660009081526003602052604090206002810154600160f81b900460ff1615611156576040517ffa5190c400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8b8160000160106101000a8154816001600160601b0302191690836001600160601b031602179055508a8160020160006101000a8154816001600160801b0302191690836001600160801b03160217905550898160000160006101000a8154816001600160801b0302191690836001600160801b031602179055508881600001601c6101000a81548163ffffffff021916908363ffffffff160217905550878160020160106101000a81548163ffffffff021916908363ffffffff160217905550868160020160146101000a81548163ffffffff021916908363ffffffff160217905550858160020160186101000a81548161ffff021916908361ffff1602179055508481600201601c6101000a81548161ffff021916908361ffff1602179055508381600201601a6101000a81548161ffff021916908361ffff160217905550600181600201601f6101000a81548160ff0219169083151502179055508c6001600160a01b03167f8cde7b696b606d38ecf5d8a7c3ee73d9c309af7d1d1015bee3d7c936995ed90f8d8d8d8d8d8d8d8d8d60405161135d999897969594939291906001600160601b039990991689526001600160801b0397881660208a015295909616604088015263ffffffff9384166060880152918316608087015290911660a085015261ffff90811660c085015291821660e0840152166101008201526101200190565b60405180910390a250505050505050505050505050565b6000819050633684d100600052602060006004601c855afa60203d141661139a57600080fd5b600051634baca2b5600052826020526020806024601c845afa9050806113c4573d6113c457600080fd5b8060203d14161561140457636352211e600052602060006024601c865afa9050806113f3573d6113f357600080fd5b8060203d1416156114045760005191505b50919050565b63389a75e1600c523360005260006020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b600061145b6114548561277a565b84846127dc565b949350505050565b60008061146f8561277a565b60018101549091506000906114949063ffffffff80881691600160e01b9004166136cb565b905060006114a863ffffffff8616836136cb565b90506114b58382876127dc565b979650505050505050565b6114c8612bc6565b6101f461ffff82161115611508576040517f3d1e858400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805461ffff60e01b1916600160e01b61ffff8416908102919091179091556040519081527f1426859b6b96e2e9ae302b23a42f763f4b0ae916a71a093e61c77120458b2e95906020015b60405180910390a150565b600061156a8261277a565b600101546001600160701b031692915050565b611585612bc6565b61158f6000612be1565b565b611599612bc6565b6115a560028383612eda565b507f2064bc349588754d7a319f7e3e19098d6c481de9010cb8faabc2e4d1ccb8a9c682826040516115d79291906136de565b60405180910390a15050565b6115eb612bc6565b6001600160a01b038116611612576040516362ccef3360e01b815260040160405180910390fd5b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383169081179091556040519081527fda1940b15ab63ed4db791f1c7ec186c01a546f6ce58fa1dcc0561b8638a1bd1290602001611554565b8161167781612843565b60006116828461277a565b600281015490915063ffffffff600160a01b909104811690841611156116c9576116ab846129de565b156116c9576040516337a7abd960e01b815260040160405180910390fd5b6002810180547fffffffffffffffff00000000ffffffffffffffffffffffffffffffffffffffff16600160a01b63ffffffff8616908102919091179091556040519081526001600160a01b038516907fd85122012af450d91e115e674dcb75510396079ec3f9add017bfd6029ac57c3190602001610ff5565b8161174c81612843565b60006117578461277a565b90506101f461ffff8416111561178057604051631a52ce6f60e01b815260040160405180910390fd5b6002810180547fffffffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffff16600160d01b61ffff8616908102919091179091556040519081526001600160a01b038516907fbc4b9cc81e8abf70807d993342483076cb584d9453ea4243b108310dd44c87ee90602001610ff5565b6060600280548060200260200160405190810160405280929190818152602001828054801561184f57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311611831575b5050505050905090565b60008060008060008061186b8961277a565b60018101549091506000906118909063ffffffff808c1691600160e01b90041661372c565b600283015490915063ffffffff600160801b9091048116906118b4908a168361372c565b11156118f95760028201546118d7908290600160801b900463ffffffff166136cb565b60405163af73298160e01b815263ffffffff9091166004820152602401610cfb565b61190c8261190683612c1f565b8a612c39565b949f929e50909c509a50919850909650505050505050565b6000806119308661277a565b6003015490508061194e5750506001600160a01b038316151561145b565b6001600160a01b038516158015906119a557506040516bffffffffffffffffffffffff19606087901b1660208201526119a59085908590849060340160405160208183030381529060405280519060200120612cc6565b9695505050505050565b816119b981612843565b826119c381612a6c565b60006119ce8561277a565b6002810180546fffffffffffffffffffffffffffffffff19166001600160801b0387169081179091556040519081529091506001600160a01b038616907faf9934e1e24ed8c894e4dc1c9a96f50ae8d56628b7066199edc3f2ca245378a4906020015b60405180910390a25050505050565b600054600160f01b900460ff1615611a5757600080fd5b6000805460ff60f01b1916600160f01b17815563ffffffff86169003611aa9576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611b1160405180610160016040528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160006001600160a01b031681526020016000151581525090565b6000611b1c8961277a565b63ffffffff8089166101008501526001600160a01b0388166101208501526001820154600160e01b9004811684526002820154919250600160a01b909104164210611b93576040517fdf3981b000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611ba281836000015189612c39565b60e088015260c087015260a08601526080850152606084015260408301819052341015611c0a5760408083015190517ff3ebc3840000000000000000000000000000000000000000000000000000000081523460048201526024810191909152604401610cfb565b60028101546101008301518351600160801b90920463ffffffff1691011115611c62578151600282015460405163af73298160e01b815263ffffffff600160801b909204821692909203166004820152602401610cfb565b611c6e89878787611924565b158015610140840152611cfd5760e082015115611cf85760e08201516001600160a01b038716600090815260046020526040902054611cb8916001600160801b0390911601612d00565b6001600160a01b038716600090815260046020526040902080546fffffffffffffffffffffffffffffffff19166001600160801b03929092169190911790555b611d54565b6001600160a01b03861615611d3e576040517f20d6c38900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60e08201805160a0840180519091019052600090525b608082015115611da5576080820151600054611d7b916001600160801b0390911601612d00565b600080546fffffffffffffffffffffffffffffffff19166001600160801b03929092169190911790555b60c082015115611df85760c08201516001820154611dce916001600160701b0390911601612d15565b6001820180546dffffffffffffffffffffffffffff19166001600160701b03929092169190911790555b60608201516001820154611e1d91600160701b9091046001600160701b031601612d15565b6001820180546001600160701b0392909216600160701b027fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff9092169190911790556101008201518251611e719101612c1f565b6001820180546001600160e01b0316600160e01b63ffffffff93841602179055600282018054600160f01b60ff60f01b1990911617905560a08301516040517f6f134cf40000000000000000000000000000000000000000000000000000000081526001600160a01b038b81166004830152928a166024820152918b1691636f134cf4919060440160206040518083038185885af1158015611f17573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190611f3c919061373f565b60208301526040820151341115611f5d57611f5d3383604001513403612739565b82886001600160a01b03168a6001600160a01b03167f15845fbb9632d61f45d5c5fdd89d6caa7e378568af4cd871d42622224fdef75085602001518660000151876101000151886040015189608001518a60a001518b60c001518c60e001518d61012001518e61014001516040516120409a99989796959493929190998a5263ffffffff98891660208b01529690971660408901526001600160801b039485166060890152928416608088015290831660a0870152821660c08601521660e08401526001600160a01b039190911661010083015215156101208201526101400190565b60405180910390a450506000805460ff60f01b1916905550505050505050565b612068612bc6565b67016345785d8a00006001600160601b03821611156120b3576040517fe750044700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080547fffffffff000000000000000000000000ffffffffffffffffffffffffffffffff16600160801b6001600160601b038416908102919091179091556040519081527fd294b805671973af1412f646018eacbaf3cab01934465d9623e12de8dd6acbc190602001611554565b8161212c81612843565b60006121378461277a565b90506103e861ffff8416111561216057604051633a53216960e11b815260040160405180910390fd5b6002810180547fffffffffffff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff8616908102919091179091556040519081526001600160a01b038516907fc1f9d307740252602e3d93a4e35515536b7bdc62f0cbeb8e4ef65186f25e45bb90602001610ff5565b816121e181612843565b826121eb81612a6c565b60006121f68561277a565b80546001600160e01b0316600160e01b63ffffffff87169081029190911782556040519081529091506001600160a01b038616907f40b551a5bfa5b9a3ca031f8a3b912f66a42567c869b7df66b3d05d791ac985f090602001611a31565b8161225e81612843565b8261226881612a6c565b60006122738561277a565b80546fffffffffffffffffffffffffffffffff19166001600160801b03861690811782556040519081529091506001600160a01b038616907f42aa13794032388632d506ac79fbb376ccf220fa0f83178cf1f26f6fb37c638890602001611a31565b816122df81612843565b826122e981612a6c565b60006122f48561277a565b80547fffffffff000000000000000000000000ffffffffffffffffffffffffffffffff16600160801b6001600160601b0387169081029190911782556040519081529091506001600160a01b038616907f25626c9c16fddd2ddcf085e04ee7e54af24bd69023afef74c1a33ee6fc77dd1d90602001611a31565b8161237881612843565b60006123838461277a565b600381018490556040518481529091506001600160a01b038516907f89239be3d24ce581b82b186bce054ab48a0c360101cee4c9352efda104b7580890602001610ff5565b60006123d683833684611924565b9392505050565b604080516101e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081018290526101408101829052610160810182905261018081018290526101a081018290526101c081018290529061245f8361277a565b80546001600160601b03600160801b808304821686526001600160801b0380841660408801526002850154908116602088015263ffffffff600160e01b948590048116606089015260018601546001600160701b0380821660808b0152868204831660c08b0152600160701b9091041660a0890152828204811660e0890152600160a01b82041661010088015261ffff600160c01b82048116610120890152600160d01b820481166101408901529084900481166101608801526003909401546101808701526000549283049093166101a0860152919004166101c083015250919050565b61254c612bc6565b63389a75e1600c52806000526020600c20805442111561257457636f5e88186000526004601cfd5b6000905561258181612be1565b50565b61258c612bc6565b8060601b6125a257637448fbae6000526004601cfd5b61258181612be1565b600054600160f01b900460ff16156125c257600080fd5b6000805460ff60f01b1916600160f01b1781556001600160a01b0382168152600460205260409020546001600160801b03168015610af2576001600160a01b038216600090815260046020526040902080546fffffffffffffffffffffffffffffffff1916905561263c826001600160801b038316612739565b6040516001600160801b03821681526001600160a01b038316907f0a1adaaf9d9caba9cf65528900e946b718d511ebd66ae81d5eb71e7fd0122c4a9060200160405180910390a250506000805460ff60f01b19169055565b8161269e81612843565b826126a881612a6c565b60006126b38561277a565b90506101f461ffff851611156126dc576040516333a27d9760e21b815260040160405180910390fd5b60028101805461ffff60e01b1916600160e01b61ffff8716908102919091179091556040519081526001600160a01b038616907fa978cb3745fe012b6e358b0f334bef6d60e2a405347b022f707648fbc302c93890602001611a31565b8047101561274f5763b12d13eb6000526004601cfd5b6000806000808486620186a0f161277657816000526073600b5360ff6020536016600b82f0505b5050565b6001600160a01b03811660009081526003602052604090206002810154600160f81b900460ff166127d7576040517f9a510a6d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b825460028401546001600160801b03908116600163ffffffff8681168281018102878316918201808501020390921c929092026001600160601b03600160801b860416909102019261283b92600160e01b820490921691168585612d2a565b019392505050565b600061284d612e85565b9050816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561288d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128b19190613758565b6001600160a01b0316816001600160a01b03161461277657816001600160a01b031663514e62fc82846001600160a01b03166375b238fc6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612917573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061293b919061373f565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381865afa158015612984573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129a89190613785565b612776576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b038116600090815260036020526040812060020154600160f01b900460ff1680610a1d5750816001600160a01b031663a6f32d436040518163ffffffff1660e01b8152600401602060405180830381865afa158015612a48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1d9190613785565b612a75816129de565b15612581576040517fa637a0b500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60025460005b818114612b9357600060028281548110612ace57612ace6137a0565b6000918252602090912001546040517f5004b7a00000000000000000000000000000000000000000000000000000000081526001600160a01b0387811660048301526024820187905290911691508190635004b7a0906044016040805180830381865afa925050508015612b5f575060408051601f3d908101601f19168201909252612b5c918101906137b6565b60015b15612b8a57876001600160a01b0316826001600160a01b031603612b87575050505050505050565b50505b50600101612ab2565b506040517fc3c1444700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b638b78c6d81954331461158f576382b429006000526004601cfd5b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a355565b60006401000000008210612c3557612c35612ecc565b5090565b600080600080600080612c4d8989896127dc565b9450600061271086046000546002909b015461ffff600160e01b808e04821684026001600160601b03600160801b909f049e909e169d909d01898101600160c01b8404831685029081019e8404831685029e8f01600160d01b9094049092169093029182019d989c929b50995090975095945050505050565b60008315612cf8578360051b8501855b803580851160051b94855260209485185260406000209301818110612cd65750505b501492915050565b6000600160801b8210612c3557612c35612ecc565b6000600160701b8210612c3557612c35612ecc565b600063ffffffff85166001600160801b0385168082028303612d515760009250505061145b565b600163ffffffff86811682810192918716010183811881851102841880831015612db1576006600163ffffffff8a16818101026401fffffffe8b831b16820102600019840180850290831b90920191909102030485800285040295509150815b81831015612e78576003850260021c600185901b5b6000612e5c888488030270ffffffffffffffffffffffffffffffffff811160071b81811c68ffffffffffffffffff1060061b1781811c64ffffffffff1060051b1781811c62ffffff1060041b1781811c620100000160b5600192831c1b0260121c80830401811c80830401811c80830401811c80830401811c80830401811c80830401811c80830401901c908190048111900390565b820288900498909801975060018086019585900301612dc65750505b5050505050949350505050565b336e2fd5aeb385d324b580fca7c838239f198101612ec957602060008060006e2fd5aeb385d324b580fca7c83823a05afa612ebf57600080fd5b506000513d602014025b90565b6335278d126000526004601cfd5b828054828255906000526020600020908101928215612f3a579160200282015b82811115612f3a57815473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03843516178255602090920191600190910190612efa565b50612c359291505b80821115612c355760008155600101612f42565b600060208284031215612f6857600080fd5b81356001600160e01b0319811681146123d657600080fd5b6001600160a01b038116811461258157600080fd5b600060208284031215612fa757600080fd5b81356123d681612f80565b60008083601f840112612fc457600080fd5b50813567ffffffffffffffff811115612fdc57600080fd5b6020830191508360208260051b8501011115612ff757600080fd5b9250929050565b60008060008060008060a0878903121561301757600080fd5b863561302281612f80565b9550602087013567ffffffffffffffff81111561303e57600080fd5b61304a89828a01612fb2565b90965094505060408701359250606087013561306581612f80565b80925050608087013590509295509295509295565b803563ffffffff811681146127d757600080fd5b600080604083850312156130a157600080fd5b82356130ac81612f80565b91506130ba6020840161307a565b90509250929050565b80356001600160601b03811681146127d757600080fd5b80356001600160801b03811681146127d757600080fd5b803561ffff811681146127d757600080fd5b6000806000806000806000806000806000806101808d8f03121561312657600080fd5b8c3561313181612f80565b9b5061313f60208e016130c3565b9a5061314d60408e016130da565b995061315b60608e016130da565b985061316960808e0161307a565b975061317760a08e0161307a565b965061318560c08e0161307a565b955061319360e08e016130f1565b94506131a26101008e016130f1565b93506131b16101208e016130f1565b92506101408d01356131c281612f80565b809250506101608d013590509295989b509295989b509295989b565b6000806000606084860312156131f357600080fd5b83356131fe81612f80565b925061320c6020850161307a565b915061321a6040850161307a565b90509250925092565b60006020828403121561323557600080fd5b6123d6826130f1565b6000806020838503121561325157600080fd5b823567ffffffffffffffff81111561326857600080fd5b61327485828601612fb2565b90969095509350505050565b6000806040838503121561329357600080fd5b823561329e81612f80565b91506130ba602084016130f1565b6020808252825182820181905260009190848201906040850190845b818110156132ed5783516001600160a01b0316835292840192918401916001016132c8565b50909695505050505050565b6000806000806060858703121561330f57600080fd5b843561331a81612f80565b9350602085013561332a81612f80565b9250604085013567ffffffffffffffff81111561334657600080fd5b61335287828801612fb2565b95989497509550505050565b6000806040838503121561337157600080fd5b823561337c81612f80565b91506130ba602084016130da565b600080600080600080600060c0888a0312156133a557600080fd5b87356133b081612f80565b965060208801356133c081612f80565b95506133ce6040890161307a565b945060608801356133de81612f80565b9350608088013567ffffffffffffffff8111156133fa57600080fd5b6134068a828b01612fb2565b989b979a5095989497959660a090950135949350505050565b60006020828403121561343157600080fd5b6123d6826130c3565b6000806040838503121561344d57600080fd5b823561345881612f80565b91506130ba602084016130c3565b6000806040838503121561347957600080fd5b823561348481612f80565b946020939093013593505050565b600080604083850312156134a557600080fd5b82356134b081612f80565b915060208301356134c081612f80565b809150509250929050565b81516001600160601b031681526101e0810160208301516134f760208401826001600160801b03169052565b50604083015161351260408401826001600160801b03169052565b50606083015161352a606084018263ffffffff169052565b50608083015161354560808401826001600160801b03169052565b5060a083015161356060a08401826001600160801b03169052565b5060c083015161357860c084018263ffffffff169052565b5060e083015161359060e084018263ffffffff169052565b506101008381015163ffffffff16908301526101208084015161ffff90811691840191909152610140808501518216908401526101608085015182169084015261018080850151908401526101a080850151909116908301526101c0928301516001600160601b0316929091019190915290565b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561363657600080fd5b8260051b80836020870137939093016020019392505050565b6001600160a01b0384168152604060208201526000613672604083018486613604565b95945050505050565b63ffffffff8516815260606020820152600061369b606083018587613604565b90506001600160801b038316604083015295945050505050565b634e487b7160e01b600052601160045260246000fd5b81810381811115610a1d57610a1d6136b5565b60208082528181018390526000908460408401835b8681101561372157823561370681612f80565b6001600160a01b0316825291830191908301906001016136f3565b509695505050505050565b80820180821115610a1d57610a1d6136b5565b60006020828403121561375157600080fd5b5051919050565b60006020828403121561376a57600080fd5b81516123d681612f80565b805180151581146127d757600080fd5b60006020828403121561379757600080fd5b6123d682613775565b634e487b7160e01b600052603260045260246000fd5b600080604083850312156137c957600080fd5b82516137d481612f80565b91506130ba6020840161377556fea264697066735822122005616f1ce95e12541bbc89ba79ad41e52908d441c2cda577009405dc29d5d81764736f6c63430008130033' as const

export const SamV1_1Config = {
  abi: samV1_1Abi,
  bytecode: samV1_1Bytecode,
} as const
