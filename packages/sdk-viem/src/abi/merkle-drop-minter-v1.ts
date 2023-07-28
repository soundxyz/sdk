export const merkleDropMinterV1Abi = [
  {
    inputs: [
      {
        internalType: 'contract ISoundFeeRegistry',
        name: 'feeRegistry_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
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
    name: 'FeeRegistryIsZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAffiliateFeeBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidMerkleProof',
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
    name: 'MerkleRootHashIsEmpty',
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
        indexed: true,
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
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
    ],
    name: 'DropClaimed',
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
        indexed: true,
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxMintable',
        type: 'uint32',
      },
    ],
    name: 'MaxMintableSet',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'merkleRootHash',
        type: 'bytes32',
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
        name: 'maxMintable',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxMintablePerAccount',
        type: 'uint32',
      },
    ],
    name: 'MerkleDropMintCreated',
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
        internalType: 'uint128',
        name: 'mintId',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'merkleRootHash',
        type: 'bytes32',
      },
    ],
    name: 'MerkleRootHashSet',
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
        indexed: true,
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
        name: 'edition',
        type: 'address',
      },
      {
        indexed: true,
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
        indexed: true,
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
    name: 'MAX_BPS',
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
        internalType: 'bytes32',
        name: 'merkleRootHash',
        type: 'bytes32',
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
        name: 'maxMintable',
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
    inputs: [],
    name: 'feeRegistry',
    outputs: [
      {
        internalType: 'contract ISoundFeeRegistry',
        name: '',
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
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: '',
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
        internalType: 'uint32',
        name: 'requestedQuantity',
        type: 'uint32',
      },
      {
        internalType: 'bytes32[]',
        name: 'merkleProof',
        type: 'bytes32[]',
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
            name: 'maxMintable',
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
            internalType: 'bytes32',
            name: 'merkleRootHash',
            type: 'bytes32',
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
        name: 'feeBPS',
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
        name: 'maxMintable',
        type: 'uint32',
      },
    ],
    name: 'setMaxMintable',
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
        internalType: 'bytes32',
        name: 'merkleRootHash',
        type: 'bytes32',
      },
    ],
    name: 'setMerkleRootHash',
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
