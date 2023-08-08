export const rangeEditionMinterV2_1Abi = [
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
    name: 'InvalidPlatformPerTxFlatFee',
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
    name: 'PlatformFeeAddressIsZero',
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
    stateMutability: 'pure',
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
    stateMutability: 'pure',
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
    stateMutability: 'pure',
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
    stateMutability: 'pure',
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
    stateMutability: 'pure',
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
        name: 'maxMintablePerAccount_',
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
    inputs: [],
    name: 'isV2_1',
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
          {
            internalType: 'uint16',
            name: 'platformFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'uint96',
            name: 'platformFlatFee',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'platformPerTxFlatFee',
            type: 'uint96',
          },
        ],
        internalType: 'struct MintInfo',
        name: '',
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
    stateMutability: 'view',
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
    name: 'platformFeeAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
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
    stateMutability: 'nonpayable',
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
    stateMutability: 'nonpayable',
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
        internalType: 'uint16',
        name: 'affiliateFeeBPS',
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
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
    ],
    name: 'totalPriceAndFees',
    outputs: [
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'subTotal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'platformFlatFeeTotal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'platformFee',
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

const rangeEditionMinterV2_1Bytecode =
  '0x608060405234801561001057600080fd5b5061001a3361001f565b61005b565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b612c12806200006b6000396000f3fe6080604052600436106102f25760003560e01c8063b3b34f991161018f578063d7533f02116100e1578063f04e283e1161008a578063fb128c8311610064578063fb128c83146103b0578063fc63e69e1461083a578063fee81cf41461085a57600080fd5b8063f04e283e146107f4578063f2fde38b14610807578063f57402961461081a57600080fd5b8063e71924f1116100bb578063e71924f11461078b578063ebaaa3a1146107b2578063ed14834f146107d457600080fd5b8063d7533f0214610737578063e1a4521814610755578063e37a0cea1461076b57600080fd5b8063c7dd322811610143578063c94dcf8f1161011d578063c94dcf8f146106af578063cbb35c21146106cf578063d73f3aab1461071757600080fd5b8063c7dd32281461065a578063c90974d01461067c578063c9238eae1461068f57600080fd5b8063be0c9b6c11610174578063be0c9b6c146105fa578063bf013d7b1461061a578063bf9c0e561461063a57600080fd5b8063b3b34f99146105c7578063b40bf08e146105da57600080fd5b80636c5f55f7116102485780638da5cb5b116101fc578063ac1fc22c116101d6578063ac1fc22c14610551578063aec96b6e14610587578063b0d65938146105a757600080fd5b80638da5cb5b146104d65780639375da5a1461050357806398040f461461052357600080fd5b80637614a7511161022d5780637614a751146104965780637cbf126b146104b65780638d01513c1461046557600080fd5b80636c5f55f714610465578063715018a61461048e57600080fd5b80632848caef116102aa57806354d1f13d1161028457806354d1f13d146104185780635cbc742c146104205780636aa99da31461044057600080fd5b80632848caef146103b05780633db2c7f2146103e4578063522f7386146103f857600080fd5b806308bfa2bf116102db57806308bfa2bf1461035957806322163b861461037057806325692962146103a857600080fd5b806301ffc9a7146102f757806303a6ccd01461032c575b600080fd5b34801561030357600080fd5b5061031761031236600461248b565b61088d565b60405190151581526020015b60405180910390f35b34801561033857600080fd5b5061034c6103473660046124ed565b6108b9565b6040516103239190612522565b34801561036557600080fd5b5061036e610a1b565b005b34801561037c57600080fd5b50600154610390906001600160801b031681565b6040516001600160801b039091168152602001610323565b61036e610ac4565b3480156103bc57600080fd5b506103cc67016345785d8a000081565b6040516001600160601b039091168152602001610323565b3480156103f057600080fd5b506001610317565b34801561040457600080fd5b5061036e61041336600461264e565b610b14565b61036e610bb3565b34801561042c57600080fd5b5061036e61043b3660046126a9565b610bef565b34801561044c57600080fd5b50600054600160a01b90046001600160601b0316610390565b34801561047157600080fd5b5061047b6103e881565b60405161ffff9091168152602001610323565b61036e610ca8565b3480156104a257600080fd5b5061036e6104b13660046126d8565b610cbc565b3480156104c257600080fd5b506103906104d1366004612734565b610d69565b3480156104e257600080fd5b50638b78c6d819545b6040516001600160a01b039091168152602001610323565b34801561050f57600080fd5b5061036e61051e3660046127de565b610f62565b34801561052f57600080fd5b5061054361053e3660046124ed565b610ff7565b604051908152602001610323565b34801561055d57600080fd5b5061039061056c3660046127de565b6004602052600090815260409020546001600160801b031681565b34801561059357600080fd5b5061036e6105a23660046127fb565b61100e565b3480156105b357600080fd5b5061036e6105c2366004612851565b6110e5565b61036e6105d536600461286c565b61118b565b3480156105e657600080fd5b5061036e6105f53660046127fb565b6111a2565b34801561060657600080fd5b5061036e610615366004612851565b6112bb565b34801561062657600080fd5b50610317610635366004612910565b61137d565b34801561064657600080fd5b5061036e61065536600461298a565b6113e2565b34801561066657600080fd5b5060405163b9f19d1760e01b8152602001610323565b61036e61068a3660046129f1565b61150e565b34801561069b57600080fd5b506002546103cc906001600160601b031681565b3480156106bb57600080fd5b506103176106ca366004612a95565b61166a565b3480156106db57600080fd5b506106ef6106ea3660046126d8565b611681565b604080519586526020860194909452928401919091526060830152608082015260a001610323565b34801561072357600080fd5b5061036e610732366004612ad3565b611703565b34801561074357600080fd5b506040516202a3008152602001610323565b34801561076157600080fd5b5061047b61271081565b34801561077757600080fd5b5061036e610786366004612b0f565b6117bd565b34801561079757600080fd5b506001546103cc90600160801b90046001600160601b031681565b3480156107be57600080fd5b5060015461047b90600160e01b900461ffff1681565b3480156107e057600080fd5b506000546104eb906001600160a01b031681565b61036e6108023660046127de565b611820565b61036e6108153660046127de565b611860565b34801561082657600080fd5b5061036e6108353660046127de565b611887565b34801561084657600080fd5b5061036e610855366004612b4d565b61193c565b34801561086657600080fd5b506105436108753660046127de565b63389a75e1600c908152600091909152602090205490565b6000610898826119bb565b806108b357506001600160e01b0319821663b9f19d1760e01b145b92915050565b604080516101c081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081018290526101408101829052610160810182905261018081018290526101a08101829052906109348484611a57565b600081815260056020908152604091829020835463ffffffff600160801b80830482168952600160a01b830482169489019490945261ffff600160c01b830481169589019590955260ff600160d01b830416151560608901526001600160601b0380831660808a01529254600160601b808204831660a08b0152680100000000000000008204831660c08b0152909204811660e089015264010000000082048116610100890152166101208701526001938401546101408701529254600160e01b810490921661016086015290048116610180840152600254166101a08301525092915050565b6000546001600160a01b031680610a45576040516362ccef3360e01b815260040160405180910390fd5b6001546001600160801b03168015610ac057600180546fffffffffffffffffffffffffffffffff19169055610a83826001600160801b038316611ac5565b6040516001600160801b03821681527fa8a9aa21b43d916fdaf4bdf9975892e984e7dbe00c0befea632d6fe5bbead73a9060200160405180910390a15b5050565b60006202a30067ffffffffffffffff164201905063389a75e1600c5233600052806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b82610b1e81611b05565b81610b298585611a57565b8054911515600160d01b027fffffffffff00ffffffffffffffffffffffffffffffffffffffffffffffffffff909216919091179055604080516001600160801b038516815283151560208201526001600160a01b038616917fe430910c8e4bfa8180b70a0b2aa923b82d6712a1d165e223053ef439a3f8614791015b60405180910390a250505050565b63389a75e1600c523360005260006020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b610bf7611ca0565b6103e861ffff82161115610c37576040517f3d1e858400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180547fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff16600160e01b61ffff8416908102919091179091556040519081527f1426859b6b96e2e9ae302b23a42f763f4b0ae916a71a093e61c77120458b2e95906020015b60405180910390a150565b610cb0611ca0565b610cba6000611cbb565b565b82610cc681611b05565b8163ffffffff16600003610ced5760405163a017714560e01b815260040160405180910390fd5b81610cf88585611a57565b80546fffffffff0000000000000000000000001916600160601b63ffffffff93841602179055604080516001600160801b038616815291841660208301526001600160a01b038616917f021f3ca4d64a14574ed4fc7115d2c667604e54efb94b6187ed8117d49c6e47559101610ba5565b6000610d76888888611cf9565b8263ffffffff168463ffffffff161115610da357604051633a964d4760e01b815260040160405180910390fd5b8163ffffffff16600003610dca5760405163a017714560e01b815260040160405180910390fd5b610dd68a898888611d41565b6001600160a01b038b1660009081526003602090815260408083206001600160801b038516845290915281209192509080546001600160601b038c166fffffffffffffffffffffffffffffffff1990911617600160601b63ffffffff8616021781559050600060058183815260208101919091526040908101600020805463ffffffff888116600160601b026fffffffff000000000000000000000000198b831668010000000000000000026bffffffff00000000ffffffff19909416928f1692909217929092171617815590519091506001600160a01b038d16907f9a9e0edce33a498fe7d57bfc9e7b46f9a2cd45507d8853c0c18c4c7bd860798c90610f4b9086908f908f908f908f908f908f908f908f906001600160801b039990991689526001600160601b0397909716602089015263ffffffff95861660408901529385166060880152918416608087015261ffff1660a0860152821660c0850152811660e0840152166101008201526101200190565b60405180910390a250509998505050505050505050565b610f6a611ca0565b6001600160a01b038116610f91576040516362ccef3360e01b815260040160405180910390fd5b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527fda1940b15ab63ed4db791f1c7ec186c01a546f6ce58fa1dcc0561b8638a1bd1290602001610c9d565b60006110038383611a57565b600101549392505050565b8361101881611b05565b60006110248686611a57565b600081815260056020526040902080549192509061104a90869063ffffffff1686611cf9565b815467ffffffffffffffff60801b1916600160801b63ffffffff87811691820263ffffffff60a01b191692909217600160a01b928716928302178455604080516001600160801b038a16815260208101929092528101919091526001600160a01b038816907f13bc03d97cc4e2accb3b8290af069c19619d32a4e9c5219f8580108766fb18fd9060600160405180910390a250505050505050565b6110ed611ca0565b67016345785d8a00006001600160601b0382161115611138576040517fe750044700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600280546bffffffffffffffffffffffff19166001600160601b0383169081179091556040519081527fd294b805671973af1412f646018eacbaf3cab01934465d9623e12de8dd6acbc190602001610c9d565b61119c84843385853660008061150e565b50505050565b836111ac81611b05565b8163ffffffff168363ffffffff1611156111d957604051633a964d4760e01b815260040160405180910390fd5b6000600560006111ef6111ec8989611a57565b90565b8152602080820192909252604090810160002080547fffffffffffffffffffffffffffffffff0000000000000000ffffffffffffffff166801000000000000000063ffffffff8981169182026fffffffff000000000000000000000000191692909217600160601b92891692830217835583516001600160801b038b168152948501529183019190915291506001600160a01b038716907f6d809c5e613207ec6ca68c0d872f18cf6e493a727c39e150f185b4b6d13be9779060600160405180910390a2505050505050565b6112c3611ca0565b67016345785d8a00006001600160601b038216111561130e576040517f5d2be82000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180547fffffffff000000000000000000000000ffffffffffffffffffffffffffffffff16600160801b6001600160601b038416908102919091179091556040519081527f267d27ed20a4d7ecba313e2039580b03e8c3d8018eeefe72709708735b02116490602001610c9d565b60008061138a8787611a57565b600101549050806113a85750506001600160a01b03831615156113d9565b6001600160a01b038516158015906113d557506113d58484836113d0896000526014600c2090565b611f16565b9150505b95945050505050565b846113ec81611b05565b6113f7848484611cf9565b60006114038787611a57565b600081815260056020908152604091829020805463ffffffff191663ffffffff8981169182178355855467ffffffffffffffff60801b1916600160801b8c83160263ffffffff60a01b191617600160a01b918a169190910217855583516001600160801b038c168152928301528251939450926001600160a01b038b16927f33bbd71c3e2f573cc929e30067dcf5801791814427f844484fa25dee910d1352928290030190a2604080516001600160801b038916815263ffffffff888116602083015286168183015290516001600160a01b038a16917f13bc03d97cc4e2accb3b8290af069c19619d32a4e9c5219f8580108766fb18fd919081900360600190a25050505050505050565b600061151a8989611a57565b600081815260056020526040812091925061153482611f50565b825490915061155290640100000000900463ffffffff168983611f91565b825463ffffffff919091166401000000000267ffffffff00000000199091161782556040517fdc33e6810000000000000000000000000000000000000000000000000000000081526001600160a01b038a81166004830152600091908d169063dc33e68190602401602060405180830381865afa1580156115d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115fb9190612b89565b845490915063ffffffff600160601b9091048116908a168201111561164c576040517f1b75136500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5061165d8b8b8b8b8b8b8b8b612007565b5050505050505050505050565b6000611679848484368561137d565b949350505050565b6000806000806000806116948989611a57565b54600254600154600160801b81046001600160601b0390811663ffffffff9b909b169a8b0292811692909201918316999099028181019c909b50909950612710600160e01b90990461ffff9081168c028a90048b0199600160c01b909304168b02919091049650945050505050565b8261170d81611b05565b6103e861ffff8316111561173457604051631a52ce6f60e01b815260040160405180910390fd5b8161173f8585611a57565b80547fffffffffffff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff93841602179055604080516001600160801b038616815291841660208301526001600160a01b038616917fae6d744348a49699fcb91e6a563f2224c0fb27c21053a9218ee827f9d6e698c79101610ba5565b826117c781611b05565b816117d28585611a57565b60010155604080516001600160801b0385168152602081018490526001600160a01b038616917f50beeb3db2bdaab85213836eb4be24fe53e830e8ee419c5859ea380e3b7102759101610ba5565b611828611ca0565b63389a75e1600c52806000526020600c20805442111561185057636f5e88186000526004601cfd5b6000905561185d81611cbb565b50565b611868611ca0565b8060601b61187e57637448fbae6000526004601cfd5b61185d81611cbb565b6001600160a01b0381166000908152600460205260409020546001600160801b03168015610ac0576001600160a01b038216600090815260046020526040902080546fffffffffffffffffffffffffffffffff191690556118f1826001600160801b038316611ac5565b6040516001600160801b03821681526001600160a01b038316907f0a1adaaf9d9caba9cf65528900e946b718d511ebd66ae81d5eb71e7fd0122c4a9060200160405180910390a25050565b8261194681611b05565b816119518585611a57565b80546bffffffffffffffffffffffff19166001600160601b03928316179055604080516001600160801b038616815291841660208301526001600160a01b038616917f7c77af090cbae157811da55b6d8ae1e307a85f5aa1dd2f7a13183279a8c2b4b29101610ba5565b60006001600160e01b031982167ff8ccd08e000000000000000000000000000000000000000000000000000000001480611a1e57506001600160e01b031982167f09d98f1e00000000000000000000000000000000000000000000000000000000145b806108b357506001600160e01b031982167f01ffc9a7000000000000000000000000000000000000000000000000000000001492915050565b6001600160a01b03821660009081526003602090815260408083206001600160801b038516845290915290208054600160d81b900460ff166108b3576040517f947dbacd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80471015611adb5763b12d13eb6000526004601cfd5b6000806000808486620186a0f1610ac057816000526073600b5360ff6020536016600b82f0505050565b6000611b0f61240d565b9050816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b4f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b739190612ba2565b6001600160a01b0316816001600160a01b031614610ac057816001600160a01b031663514e62fc82846001600160a01b03166375b238fc6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611bd9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bfd9190612b89565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381865afa158015611c46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c6a9190612bbf565b610ac0576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b638b78c6d819543314610cba576382b429006000526004601cfd5b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a355565b8163ffffffff168363ffffffff16108015611d1f57508063ffffffff168263ffffffff16105b611d3c5760405163536a71af60e01b815260040160405180910390fd5b505050565b600084611d4d81611b05565b8363ffffffff168563ffffffff1610611d795760405163536a71af60e01b815260040160405180910390fd5b6103e861ffff84161115611da057604051631a52ce6f60e01b815260040160405180910390fd5b600080546001600160a01b0388168252600360209081526040808420600160a01b9093046001600160601b03168085529290915282209093508054600160d81b67ffffffffffffffff60801b19909116600160801b63ffffffff8a81169190910263ffffffff60a01b191691909117600160a01b91891691909102177fffffffff00ff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff8816027fffffffff00ffffffffffffffffffffffffffffffffffffffffffffffffffffff16171781559050611e86600184016001600160801b0316612453565b600080546001600160601b0392909216600160a01b026001600160a01b03928316179055604080516001600160801b038616815263ffffffff898116602083015288169181019190915261ffff8616606082015233918916907feeb5941fb79bbfe40edd76c2e086e8ccdb0b463fc8ac07416266100b4dfddccf9060800160405180910390a35050949350505050565b60008315611f48578360051b8501855b803580851160051b94855260209485185260406000209301818110611f265750505b501492915050565b8054600090819063ffffffff16421015611f7957508154600160601b900463ffffffff166108b3565b50505468010000000000000000900463ffffffff1690565b600063ffffffff84811681851601908316811115611679576000611fc58463ffffffff168763ffffffff1680821191030290565b6040517fbdc0f4ce00000000000000000000000000000000000000000000000000000000815263ffffffff821660048201529091506024015b60405180910390fd5b60006120138989611a57565b90506120496040518060a00160405280600015158152602001600081526020016000815260200160008152602001600081525090565b815463ffffffff600160801b8204811691600160a01b900416428211156120995760405163296f4f6960e01b815242600482015263ffffffff808416602483015282166044820152606401611ffe565b8063ffffffff164211156120d65760405163296f4f6960e01b815242600482015263ffffffff808416602483015282166044820152606401611ffe565b8354600160d01b900460ff1615612119576040517fd7d248ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50506121268a8a89611681565b6020860152606085015250506080820181905234146121805760808101516040517f0dd32d1c0000000000000000000000000000000000000000000000000000000081523460048201526024810191909152604401611ffe565b606081015160015461219d916001600160801b039091160161246c565b600180546fffffffffffffffffffffffffffffffff19166001600160801b0392909216919091179055606081015160808201510360408201526121e38a8a88888861137d565b158015825261226f576020808201516040808401805183900390526001600160a01b038916600090815260049093529091205461222b916001600160801b039091160161246c565b6001600160a01b038716600090815260046020526040902080546fffffffffffffffffffffffffffffffff19166001600160801b03929092169190911790556122b7565b600060208201526001600160a01b038616156122b7576040517f20d6c38900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60408082015190517f40c10f190000000000000000000000000000000000000000000000000000000081526001600160a01b03808b166004830181905263ffffffff8b16602484015286939092918e16917f1c9d0475cac0f75d579d1156e780903d43532d6212c6890ce4f6f278770dc915918e9184916340c10f199160440160206040518083038185885af1158015612355573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061237a9190612b89565b8c8760800151886060015189602001518f8b600001516040516123f99897969594939291906001600160801b03988916815263ffffffff97881660208201529590961660408601529286166060850152908516608084015290931660a08201526001600160a01b039290921660c0830152151560e08201526101000190565b60405180910390a450505050505050505050565b336e2fd5aeb385d324b580fca7c838239f1981016111ec57602060008060006e2fd5aeb385d324b580fca7c83823a05afa61244757600080fd5b506000513d6020140290565b6000600160601b82106124685761246861247d565b5090565b6000600160801b8210612468576124685b6335278d126000526004601cfd5b60006020828403121561249d57600080fd5b81356001600160e01b0319811681146124b557600080fd5b9392505050565b6001600160a01b038116811461185d57600080fd5b80356001600160801b03811681146124e857600080fd5b919050565b6000806040838503121561250057600080fd5b823561250b816124bc565b9150612519602084016124d1565b90509250929050565b815163ffffffff1681526101c081016020830151612548602084018263ffffffff169052565b50604083015161255e604084018261ffff169052565b506060830151612572606084018215159052565b50608083015161258d60808401826001600160601b03169052565b5060a08301516125a560a084018263ffffffff169052565b5060c08301516125bd60c084018263ffffffff169052565b5060e08301516125d560e084018263ffffffff169052565b506101008381015163ffffffff90811691840191909152610120808501519091169083015261014080840151908301526101608084015161ffff1690830152610180808401516001600160601b03908116918401919091526101a09384015116929091019190915290565b801515811461185d57600080fd5b60008060006060848603121561266357600080fd5b833561266e816124bc565b925061267c602085016124d1565b9150604084013561268c81612640565b809150509250925092565b803561ffff811681146124e857600080fd5b6000602082840312156126bb57600080fd5b6124b582612697565b803563ffffffff811681146124e857600080fd5b6000806000606084860312156126ed57600080fd5b83356126f8816124bc565b9250612706602085016124d1565b9150612714604085016126c4565b90509250925092565b80356001600160601b03811681146124e857600080fd5b60008060008060008060008060006101208a8c03121561275357600080fd5b893561275e816124bc565b985061276c60208b0161271d565b975061277a60408b016126c4565b965061278860608b016126c4565b955061279660808b016126c4565b94506127a460a08b01612697565b93506127b260c08b016126c4565b92506127c060e08b016126c4565b91506127cf6101008b016126c4565b90509295985092959850929598565b6000602082840312156127f057600080fd5b81356124b5816124bc565b6000806000806080858703121561281157600080fd5b843561281c816124bc565b935061282a602086016124d1565b9250612838604086016126c4565b9150612846606086016126c4565b905092959194509250565b60006020828403121561286357600080fd5b6124b58261271d565b6000806000806080858703121561288257600080fd5b843561288d816124bc565b935061289b602086016124d1565b92506128a9604086016126c4565b915060608501356128b9816124bc565b939692955090935050565b60008083601f8401126128d657600080fd5b50813567ffffffffffffffff8111156128ee57600080fd5b6020830191508360208260051b850101111561290957600080fd5b9250929050565b60008060008060006080868803121561292857600080fd5b8535612933816124bc565b9450612941602087016124d1565b93506040860135612951816124bc565b9250606086013567ffffffffffffffff81111561296d57600080fd5b612979888289016128c4565b969995985093965092949392505050565b600080600080600060a086880312156129a257600080fd5b85356129ad816124bc565b94506129bb602087016124d1565b93506129c9604087016126c4565b92506129d7606087016126c4565b91506129e5608087016126c4565b90509295509295909350565b60008060008060008060008060e0898b031215612a0d57600080fd5b8835612a18816124bc565b9750612a2660208a016124d1565b96506040890135612a36816124bc565b9550612a4460608a016126c4565b94506080890135612a54816124bc565b935060a089013567ffffffffffffffff811115612a7057600080fd5b612a7c8b828c016128c4565b999c989b50969995989497949560c00135949350505050565b600080600060608486031215612aaa57600080fd5b8335612ab5816124bc565b9250612ac3602085016124d1565b9150604084013561268c816124bc565b600080600060608486031215612ae857600080fd5b8335612af3816124bc565b9250612b01602085016124d1565b915061271460408501612697565b600080600060608486031215612b2457600080fd5b8335612b2f816124bc565b9250612b3d602085016124d1565b9150604084013590509250925092565b600080600060608486031215612b6257600080fd5b8335612b6d816124bc565b9250612b7b602085016124d1565b91506127146040850161271d565b600060208284031215612b9b57600080fd5b5051919050565b600060208284031215612bb457600080fd5b81516124b5816124bc565b600060208284031215612bd157600080fd5b81516124b58161264056fea2646970667358221220cb719e3f1386ef3914478fc625b32c1e40d38d683c1d714067b64547b23ddecc64736f6c63430008130033' as const

export const RangeEditionMinterV2_1Config = {
  abi: rangeEditionMinterV2_1Abi,
  bytecode: rangeEditionMinterV2_1Bytecode,
} as const
