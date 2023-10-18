export const rangeEditionMinterV2Abi = [
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'available',
        type: 'uint32',
      },
    ],
    name: 'ExceedsAvailableSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExceedsMaxPerAccount',
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
    name: 'InvalidMaxMintableRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPlatformFeeBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPlatformFlatFee',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTimeRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MaxMintablePerAccountIsZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintDoesNotExist',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockTimestamp',
        type: 'uint256',
      },
      {
        internalType: 'uint32',
        name: 'startTime',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32',
      },
    ],
    name: 'MintNotOpen',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintPaused',
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
    name: 'WrongPayment',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
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
        indexed: true,
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'cutoffTime',
        type: 'uint32',
      },
    ],
    name: 'CutoffTimeSet',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxMintablePerAccount',
        type: 'uint32',
      },
    ],
    name: 'MaxMintablePerAccountSet',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxMintableLower',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxMintableUpper',
        type: 'uint32',
      },
    ],
    name: 'MaxMintableRangeSet',
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
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'startTime',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'affiliateFeeBPS',
        type: 'uint16',
      },
    ],
    name: 'MintConfigCreated',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'paused',
        type: 'bool',
      },
    ],
    name: 'MintPausedSet',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'fromTokenId',
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
        name: 'requiredEtherValue',
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
    name: 'Minted',
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
        name: 'flatFee',
        type: 'uint96',
      },
    ],
    name: 'PlatformFlatFeeSet',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'price',
        type: 'uint96',
      },
    ],
    name: 'PriceSet',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'price',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'startTime',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'cutoffTime',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'affiliateFeeBPS',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxMintableLower',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxMintableUpper',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxMintablePerAccount',
        type: 'uint32',
      },
    ],
    name: 'RangeEditionMintCreated',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'startTime',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32',
      },
    ],
    name: 'TimeRangeSet',
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
    name: 'MAX_PLATFORM_FLAT_FEE',
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
      {
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
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
        name: 'price',
        type: 'uint96',
      },
      {
        internalType: 'uint32',
        name: 'startTime',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'cutoffTime',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32',
      },
      {
        internalType: 'uint16',
        name: 'affiliateFeeBPS',
        type: 'uint16',
      },
      {
        internalType: 'uint32',
        name: 'maxMintableLower',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'maxMintableUpper',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'maxMintablePerAccount',
        type: 'uint32',
      },
    ],
    name: 'createEditionMint',
    outputs: [
      {
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
    ],
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
        name: 'mintId',
        type: 'uint128',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
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
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
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
    ],
    name: 'mint',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
    ],
    name: 'mintInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'startTime',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'endTime',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'affiliateFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'mintPaused',
            type: 'bool',
          },
          {
            internalType: 'uint96',
            name: 'price',
            type: 'uint96',
          },
          {
            internalType: 'uint32',
            name: 'maxMintableUpper',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintableLower',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintablePerAccount',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'totalMinted',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'cutoffTime',
            type: 'uint32',
          },
          {
            internalType: 'bytes32',
            name: 'affiliateMerkleRoot',
            type: 'bytes32',
          },
        ],
        internalType: 'struct MintInfo',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
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
        name: 'attributionId',
        type: 'uint256',
      },
    ],
    name: 'mintTo',
    outputs: [],
    stateMutability: 'payable',
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
    name: 'nextMintId',
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
    name: 'platformFlatFee',
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
      {
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
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
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
      {
        internalType: 'bool',
        name: 'paused',
        type: 'bool',
      },
    ],
    name: 'setEditionMintPaused',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        internalType: 'uint32',
        name: 'maxMintablePerAccount',
        type: 'uint32',
      },
    ],
    name: 'setMaxMintablePerAccount',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        internalType: 'uint32',
        name: 'maxMintableLower',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'maxMintableUpper',
        type: 'uint32',
      },
    ],
    name: 'setMaxMintableRange',
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
        name: 'flatFee',
        type: 'uint96',
      },
    ],
    name: 'setPlatformFlatFee',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        internalType: 'uint96',
        name: 'price',
        type: 'uint96',
      },
    ],
    name: 'setPrice',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        internalType: 'uint32',
        name: 'startTime',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32',
      },
    ],
    name: 'setTimeRange',
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
        name: 'mintId',
        type: 'uint128',
      },
      {
        internalType: 'uint32',
        name: 'startTime',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'cutoffTime',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32',
      },
    ],
    name: 'setTimeRange',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
    ],
    name: 'totalPrice',
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
    inputs: [],
    name: 'withdrawForPlatform',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const rangeEditionMinterV2Bytecode =
  '0x608060405234801561001057600080fd5b5061001a3361001f565b61005b565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b612a678061006a6000396000f3fe6080604052600436106102c65760003560e01c8063b3b34f9911610179578063d7533f02116100d6578063ed14834f1161008a578063f574029611610064578063f574029614610772578063fc63e69e14610792578063fee81cf4146107b257600080fd5b8063ed14834f1461072c578063f04e283e1461074c578063f2fde38b1461075f57600080fd5b8063e37a0cea116100bb578063e37a0cea146106c3578063e71924f1146106e3578063ebaaa3a11461070a57600080fd5b8063d7533f021461068f578063e1a45218146106ad57600080fd5b8063bf9c0e561161012d578063c90974d011610112578063c90974d01461063c578063c94dcf8f1461064f578063d73f3aab1461066f57600080fd5b8063bf9c0e56146105fa578063c7dd32281461061a57600080fd5b8063b84158a41161015e578063b84158a41461059a578063be0c9b6c146105ba578063bf013d7b146105da57600080fd5b8063b3b34f9914610567578063b40bf08e1461057a57600080fd5b80636c5f55f7116102275780638da5cb5b116101db57806398040f46116101c057806398040f46146104e3578063ac1fc22c14610511578063aec96b6e1461054757600080fd5b80638da5cb5b146104965780639375da5a146104c357600080fd5b80637614a7511161020c5780637614a751146104565780637cbf126b146104765780638d01513c1461042557600080fd5b80636c5f55f714610425578063715018a61461044e57600080fd5b80632848caef1161027e57806354d1f13d1161026357806354d1f13d146103d85780635cbc742c146103e05780636aa99da31461040057600080fd5b80632848caef14610384578063522f7386146103b857600080fd5b806308bfa2bf116102af57806308bfa2bf1461032d57806322163b8614610344578063256929621461037c57600080fd5b806301ffc9a7146102cb57806303a6ccd014610300575b600080fd5b3480156102d757600080fd5b506102eb6102e63660046122d4565b6107e5565b60405190151581526020015b60405180910390f35b34801561030c57600080fd5b5061032061031b366004612336565b610811565b6040516102f7919061236b565b34801561033957600080fd5b5061034261092f565b005b34801561035057600080fd5b50600154610364906001600160801b031681565b6040516001600160801b0390911681526020016102f7565b6103426109d8565b34801561039057600080fd5b506103a067016345785d8a000081565b6040516001600160601b0390911681526020016102f7565b3480156103c457600080fd5b506103426103d3366004612464565b610a28565b610342610ac7565b3480156103ec57600080fd5b506103426103fb3660046124bf565b610b03565b34801561040c57600080fd5b50600054600160a01b90046001600160601b0316610364565b34801561043157600080fd5b5061043b6103e881565b60405161ffff90911681526020016102f7565b610342610bbc565b34801561046257600080fd5b506103426104713660046124ee565b610bd0565b34801561048257600080fd5b5061036461049136600461254a565b610c7d565b3480156104a257600080fd5b50638b78c6d819545b6040516001600160a01b0390911681526020016102f7565b3480156104cf57600080fd5b506103426104de3660046125f4565b610e76565b3480156104ef57600080fd5b506105036104fe366004612336565b610f0b565b6040519081526020016102f7565b34801561051d57600080fd5b5061036461052c3660046125f4565b6003602052600090815260409020546001600160801b031681565b34801561055357600080fd5b50610342610562366004612611565b610f22565b610342610575366004612667565b610ff9565b34801561058657600080fd5b50610342610595366004612611565b611010565b3480156105a657600080fd5b506103646105b53660046126bf565b611129565b3480156105c657600080fd5b506103426105d53660046126fe565b611150565b3480156105e657600080fd5b506102eb6105f5366004612765565b611212565b34801561060657600080fd5b506103426106153660046127df565b611277565b34801561062657600080fd5b506040516384435ae560e01b81526020016102f7565b61034261064a366004612846565b6113a3565b34801561065b57600080fd5b506102eb61066a3660046128ea565b6114ff565b34801561067b57600080fd5b5061034261068a366004612928565b611516565b34801561069b57600080fd5b506040516202a30081526020016102f7565b3480156106b957600080fd5b5061043b61271081565b3480156106cf57600080fd5b506103426106de366004612964565b6115d0565b3480156106ef57600080fd5b506001546103a090600160801b90046001600160601b031681565b34801561071657600080fd5b5060015461043b90600160e01b900461ffff1681565b34801561073857600080fd5b506000546104ab906001600160a01b031681565b61034261075a3660046125f4565b611633565b61034261076d3660046125f4565b611673565b34801561077e57600080fd5b5061034261078d3660046125f4565b61169a565b34801561079e57600080fd5b506103426107ad3660046129a2565b61174f565b3480156107be57600080fd5b506105036107cd3660046125f4565b63389a75e1600c908152600091909152602090205490565b60006107f0826117ce565b8061080b57506001600160e01b031982166384435ae560e01b145b92915050565b6040805161016081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081018290526101408101829052906108748484611836565b600081815260046020908152604091829020835463ffffffff600160801b820481168852600160a01b820481169388019390935261ffff600160c01b8204169387019390935260ff600160d01b840416151560608701526001600160601b038316608087015254600160601b808204831660a0880152680100000000000000008204831660c0880152909204811660e08601526401000000008204811661010086015216610120840152600101546101408301525092915050565b6000546001600160a01b031680610959576040516362ccef3360e01b815260040160405180910390fd5b6001546001600160801b031680156109d457600180546fffffffffffffffffffffffffffffffff19169055610997826001600160801b0383166118a4565b6040516001600160801b03821681527fa8a9aa21b43d916fdaf4bdf9975892e984e7dbe00c0befea632d6fe5bbead73a9060200160405180910390a15b5050565b60006202a30067ffffffffffffffff164201905063389a75e1600c5233600052806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b82610a32816118e4565b81610a3d8585611836565b8054911515600160d01b027fffffffffff00ffffffffffffffffffffffffffffffffffffffffffffffffffff909216919091179055604080516001600160801b038516815283151560208201526001600160a01b038616917fe430910c8e4bfa8180b70a0b2aa923b82d6712a1d165e223053ef439a3f8614791015b60405180910390a250505050565b63389a75e1600c523360005260006020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b610b0b611a7f565b6103e861ffff82161115610b4b576040517f3d1e858400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180547fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff16600160e01b61ffff8416908102919091179091556040519081527f1426859b6b96e2e9ae302b23a42f763f4b0ae916a71a093e61c77120458b2e95906020015b60405180910390a150565b610bc4611a7f565b610bce6000611a9a565b565b82610bda816118e4565b8163ffffffff16600003610c015760405163a017714560e01b815260040160405180910390fd5b81610c0c8585611836565b80546fffffffff0000000000000000000000001916600160601b63ffffffff93841602179055604080516001600160801b038616815291841660208301526001600160a01b038616917f021f3ca4d64a14574ed4fc7115d2c667604e54efb94b6187ed8117d49c6e47559101610ab9565b6000610c8a888888611ad8565b8263ffffffff168463ffffffff161115610cb757604051633a964d4760e01b815260040160405180910390fd5b8163ffffffff16600003610cde5760405163a017714560e01b815260040160405180910390fd5b610cea8a898888611b20565b6001600160a01b038b1660009081526002602090815260408083206001600160801b038516845290915281209192509080546001600160601b038c166fffffffffffffffffffffffffffffffff1990911617600160601b63ffffffff8616021781559050600060048183815260208101919091526040908101600020805463ffffffff888116600160601b026fffffffff000000000000000000000000198b831668010000000000000000026bffffffff00000000ffffffff19909416928f1692909217929092171617815590519091506001600160a01b038d16907f9a9e0edce33a498fe7d57bfc9e7b46f9a2cd45507d8853c0c18c4c7bd860798c90610e5f9086908f908f908f908f908f908f908f908f906001600160801b039990991689526001600160601b0397909716602089015263ffffffff95861660408901529385166060880152918416608087015261ffff1660a0860152821660c0850152811660e0840152166101008201526101200190565b60405180910390a250509998505050505050505050565b610e7e611a7f565b6001600160a01b038116610ea5576040516362ccef3360e01b815260040160405180910390fd5b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527fda1940b15ab63ed4db791f1c7ec186c01a546f6ce58fa1dcc0561b8638a1bd1290602001610bb1565b6000610f178383611836565b600101549392505050565b83610f2c816118e4565b6000610f388686611836565b6000818152600460205260409020805491925090610f5e90869063ffffffff1686611ad8565b815467ffffffffffffffff60801b1916600160801b63ffffffff87811691820263ffffffff60a01b191692909217600160a01b928716928302178455604080516001600160801b038a16815260208101929092528101919091526001600160a01b038816907f13bc03d97cc4e2accb3b8290af069c19619d32a4e9c5219f8580108766fb18fd9060600160405180910390a250505050505050565b61100a8484338585366000806113a3565b50505050565b8361101a816118e4565b8163ffffffff168363ffffffff16111561104757604051633a964d4760e01b815260040160405180910390fd5b60006004600061105d61105a8989611836565b90565b8152602080820192909252604090810160002080547fffffffffffffffffffffffffffffffff0000000000000000ffffffffffffffff166801000000000000000063ffffffff8981169182026fffffffff000000000000000000000000191692909217600160601b92891692830217835583516001600160801b038b168152948501529183019190915291506001600160a01b038716907f6d809c5e613207ec6ca68c0d872f18cf6e493a727c39e150f185b4b6d13be9779060600160405180910390a2505050505050565b60008163ffffffff1661113c8686611836565b546001600160601b03160295945050505050565b611158611a7f565b67016345785d8a00006001600160601b03821611156111a3576040517f5d2be82000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180547fffffffff000000000000000000000000ffffffffffffffffffffffffffffffff16600160801b6001600160601b038416908102919091179091556040519081527f267d27ed20a4d7ecba313e2039580b03e8c3d8018eeefe72709708735b02116490602001610bb1565b60008061121f8787611836565b6001015490508061123d5750506001600160a01b038316151561126e565b6001600160a01b0385161580159061126a575061126a848483611265896000526014600c2090565b611cf5565b9150505b95945050505050565b84611281816118e4565b61128c848484611ad8565b60006112988787611836565b600081815260046020908152604091829020805463ffffffff191663ffffffff8981169182178355855467ffffffffffffffff60801b1916600160801b8c83160263ffffffff60a01b191617600160a01b918a169190910217855583516001600160801b038c168152928301528251939450926001600160a01b038b16927f33bbd71c3e2f573cc929e30067dcf5801791814427f844484fa25dee910d1352928290030190a2604080516001600160801b038916815263ffffffff888116602083015286168183015290516001600160a01b038a16917f13bc03d97cc4e2accb3b8290af069c19619d32a4e9c5219f8580108766fb18fd919081900360600190a25050505050505050565b60006113af8989611836565b60008181526004602052604081209192506113c982611d2f565b82549091506113e790640100000000900463ffffffff168983611d70565b825463ffffffff919091166401000000000267ffffffff00000000199091161782556040517fdc33e6810000000000000000000000000000000000000000000000000000000081526001600160a01b038a81166004830152600091908d169063dc33e68190602401602060405180830381865afa15801561146c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061149091906129de565b845490915063ffffffff600160601b9091048116908a16820111156114e1576040517f1b75136500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506114f28b8b8b8b8b8b8b8b611de6565b5050505050505050505050565b600061150e8484843685611212565b949350505050565b82611520816118e4565b6103e861ffff8316111561154757604051631a52ce6f60e01b815260040160405180910390fd5b816115528585611836565b80547fffffffffffff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff93841602179055604080516001600160801b038616815291841660208301526001600160a01b038616917fae6d744348a49699fcb91e6a563f2224c0fb27c21053a9218ee827f9d6e698c79101610ab9565b826115da816118e4565b816115e58585611836565b60010155604080516001600160801b0385168152602081018490526001600160a01b038616917f50beeb3db2bdaab85213836eb4be24fe53e830e8ee419c5859ea380e3b7102759101610ab9565b61163b611a7f565b63389a75e1600c52806000526020600c20805442111561166357636f5e88186000526004601cfd5b6000905561167081611a9a565b50565b61167b611a7f565b8060601b61169157637448fbae6000526004601cfd5b61167081611a9a565b6001600160a01b0381166000908152600360205260409020546001600160801b031680156109d4576001600160a01b038216600090815260036020526040902080546fffffffffffffffffffffffffffffffff19169055611704826001600160801b0383166118a4565b6040516001600160801b03821681526001600160a01b038316907f0a1adaaf9d9caba9cf65528900e946b718d511ebd66ae81d5eb71e7fd0122c4a9060200160405180910390a25050565b82611759816118e4565b816117648585611836565b80546bffffffffffffffffffffffff19166001600160601b03928316179055604080516001600160801b038616815291841660208301526001600160a01b038616917f7c77af090cbae157811da55b6d8ae1e307a85f5aa1dd2f7a13183279a8c2b4b29101610ab9565b60006001600160e01b031982167ff8ccd08e00000000000000000000000000000000000000000000000000000000148061080b57506001600160e01b031982167f01ffc9a7000000000000000000000000000000000000000000000000000000001492915050565b6001600160a01b03821660009081526002602090815260408083206001600160801b038516845290915290208054600160d81b900460ff1661080b576040517f947dbacd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b804710156118ba5763b12d13eb6000526004601cfd5b6000806000808486620186a0f16109d457816000526073600b5360ff6020536016600b82f0505050565b60006118ee612256565b9050816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561192e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061195291906129f7565b6001600160a01b0316816001600160a01b0316146109d457816001600160a01b031663514e62fc82846001600160a01b03166375b238fc6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156119b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119dc91906129de565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381865afa158015611a25573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a499190612a14565b6109d4576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b638b78c6d819543314610bce576382b429006000526004601cfd5b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a355565b8163ffffffff168363ffffffff16108015611afe57508063ffffffff168263ffffffff16105b611b1b5760405163536a71af60e01b815260040160405180910390fd5b505050565b600084611b2c816118e4565b8363ffffffff168563ffffffff1610611b585760405163536a71af60e01b815260040160405180910390fd5b6103e861ffff84161115611b7f57604051631a52ce6f60e01b815260040160405180910390fd5b600080546001600160a01b0388168252600260209081526040808420600160a01b9093046001600160601b03168085529290915282209093508054600160d81b67ffffffffffffffff60801b19909116600160801b63ffffffff8a81169190910263ffffffff60a01b191691909117600160a01b91891691909102177fffffffff00ff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff8816027fffffffff00ffffffffffffffffffffffffffffffffffffffffffffffffffffff16171781559050611c65600184016001600160801b031661229c565b600080546001600160601b0392909216600160a01b026001600160a01b03928316179055604080516001600160801b038616815263ffffffff898116602083015288169181019190915261ffff8616606082015233918916907feeb5941fb79bbfe40edd76c2e086e8ccdb0b463fc8ac07416266100b4dfddccf9060800160405180910390a35050949350505050565b60008315611d27578360051b8501855b803580851160051b94855260209485185260406000209301818110611d055750505b501492915050565b8054600090819063ffffffff16421015611d5857508154600160601b900463ffffffff1661080b565b50505468010000000000000000900463ffffffff1690565b600063ffffffff8481168185160190831681111561150e576000611da48463ffffffff168763ffffffff1680821191030290565b6040517fbdc0f4ce00000000000000000000000000000000000000000000000000000000815263ffffffff821660048201529091506024015b60405180910390fd5b6000611df28989611836565b9050611e366040518060e001604052806000151581526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b815463ffffffff600160801b8204811691600160a01b90041642821115611e865760405163296f4f6960e01b815242600482015263ffffffff808416602483015282166044820152606401611ddd565b8063ffffffff16421115611ec35760405163296f4f6960e01b815242600482015263ffffffff808416602483015282166044820152606401611ddd565b8354600160d01b900460ff1615611f06576040517fd7d248ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050600154600160801b90046001600160601b031663ffffffff8816026060820152611f348a8a8a8a611129565b6001600160801b031660a0820181905260608201510160c082018190523414611f985760c08101516040517f0dd32d1c0000000000000000000000000000000000000000000000000000000081523460048201526024810191909152604401611ddd565b606081015160015460a083015161271061ffff600160e01b8404169091020490910160808301819052611fd4916001600160801b0316016122b5565b600180546fffffffffffffffffffffffffffffffff19166001600160801b0392909216919091179055608081015160c082015103604082015261201a8a8a888888611212565b15801582526120bf57815460a082015161271091600160c01b900461ffff16020460208083018290526040808401805184900390526001600160a01b0389166000908152600390925290205461207b916001600160801b03909116016122b5565b6001600160a01b038716600090815260036020526040902080546fffffffffffffffffffffffffffffffff19166001600160801b0392909216919091179055612100565b6001600160a01b03861615612100576040517f20d6c38900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60408082015190517f40c10f190000000000000000000000000000000000000000000000000000000081526001600160a01b03808b166004830181905263ffffffff8b16602484015286939092918e16917f1c9d0475cac0f75d579d1156e780903d43532d6212c6890ce4f6f278770dc915918e9184916340c10f199160440160206040518083038185885af115801561219e573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906121c391906129de565b8c8760c00151886080015189602001518f8b600001516040516122429897969594939291906001600160801b03988916815263ffffffff97881660208201529590961660408601529286166060850152908516608084015290931660a08201526001600160a01b039290921660c0830152151560e08201526101000190565b60405180910390a450505050505050505050565b336e2fd5aeb385d324b580fca7c838239f19810161105a57602060008060006e2fd5aeb385d324b580fca7c83823a05afa61229057600080fd5b506000513d6020140290565b6000600160601b82106122b1576122b16122c6565b5090565b6000600160801b82106122b1576122b15b6335278d126000526004601cfd5b6000602082840312156122e657600080fd5b81356001600160e01b0319811681146122fe57600080fd5b9392505050565b6001600160a01b038116811461167057600080fd5b80356001600160801b038116811461233157600080fd5b919050565b6000806040838503121561234957600080fd5b823561235481612305565b91506123626020840161231a565b90509250929050565b815163ffffffff16815261016081016020830151612391602084018263ffffffff169052565b5060408301516123a7604084018261ffff169052565b5060608301516123bb606084018215159052565b5060808301516123d660808401826001600160601b03169052565b5060a08301516123ee60a084018263ffffffff169052565b5060c083015161240660c084018263ffffffff169052565b5060e083015161241e60e084018263ffffffff169052565b506101008381015163ffffffff81168483015250506101208381015163ffffffff811684830152505061014092830151919092015290565b801515811461167057600080fd5b60008060006060848603121561247957600080fd5b833561248481612305565b92506124926020850161231a565b915060408401356124a281612456565b809150509250925092565b803561ffff8116811461233157600080fd5b6000602082840312156124d157600080fd5b6122fe826124ad565b803563ffffffff8116811461233157600080fd5b60008060006060848603121561250357600080fd5b833561250e81612305565b925061251c6020850161231a565b915061252a604085016124da565b90509250925092565b80356001600160601b038116811461233157600080fd5b60008060008060008060008060006101208a8c03121561256957600080fd5b893561257481612305565b985061258260208b01612533565b975061259060408b016124da565b965061259e60608b016124da565b95506125ac60808b016124da565b94506125ba60a08b016124ad565b93506125c860c08b016124da565b92506125d660e08b016124da565b91506125e56101008b016124da565b90509295985092959850929598565b60006020828403121561260657600080fd5b81356122fe81612305565b6000806000806080858703121561262757600080fd5b843561263281612305565b93506126406020860161231a565b925061264e604086016124da565b915061265c606086016124da565b905092959194509250565b6000806000806080858703121561267d57600080fd5b843561268881612305565b93506126966020860161231a565b92506126a4604086016124da565b915060608501356126b481612305565b939692955090935050565b600080600080608085870312156126d557600080fd5b84356126e081612305565b93506126ee6020860161231a565b9250604085013561264e81612305565b60006020828403121561271057600080fd5b6122fe82612533565b60008083601f84011261272b57600080fd5b50813567ffffffffffffffff81111561274357600080fd5b6020830191508360208260051b850101111561275e57600080fd5b9250929050565b60008060008060006080868803121561277d57600080fd5b853561278881612305565b94506127966020870161231a565b935060408601356127a681612305565b9250606086013567ffffffffffffffff8111156127c257600080fd5b6127ce88828901612719565b969995985093965092949392505050565b600080600080600060a086880312156127f757600080fd5b853561280281612305565b94506128106020870161231a565b935061281e604087016124da565b925061282c606087016124da565b915061283a608087016124da565b90509295509295909350565b60008060008060008060008060e0898b03121561286257600080fd5b883561286d81612305565b975061287b60208a0161231a565b9650604089013561288b81612305565b955061289960608a016124da565b945060808901356128a981612305565b935060a089013567ffffffffffffffff8111156128c557600080fd5b6128d18b828c01612719565b999c989b50969995989497949560c00135949350505050565b6000806000606084860312156128ff57600080fd5b833561290a81612305565b92506129186020850161231a565b915060408401356124a281612305565b60008060006060848603121561293d57600080fd5b833561294881612305565b92506129566020850161231a565b915061252a604085016124ad565b60008060006060848603121561297957600080fd5b833561298481612305565b92506129926020850161231a565b9150604084013590509250925092565b6000806000606084860312156129b757600080fd5b83356129c281612305565b92506129d06020850161231a565b915061252a60408501612533565b6000602082840312156129f057600080fd5b5051919050565b600060208284031215612a0957600080fd5b81516122fe81612305565b600060208284031215612a2657600080fd5b81516122fe8161245656fea2646970667358221220958844e81c91b05e136dd2029384d7e643585a5b3eb461094ea384f286ed97ff64736f6c63430008130033' as const

export const RangeEditionMinterV2Config = {
  abi: rangeEditionMinterV2Abi,
  bytecode: rangeEditionMinterV2Bytecode,
} as const
