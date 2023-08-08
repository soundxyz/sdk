export const merkleDropMinterV2_1Abi = [
  {
    inputs: [],
    name: 'CallerNotDelegated',
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
    name: 'InvalidMerkleProof',
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
    name: 'MerkleRootHashIsEmpty',
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
        indexed: false,
        internalType: 'address',
        name: 'allowlisted',
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
        indexed: false,
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
        indexed: false,
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
        name: 'maxMintable_',
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
        internalType: 'bytes32[]',
        name: 'proof',
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
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mintCount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'count',
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
        name: 'allowlisted',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
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

const merkleDropMinterV2_1Bytecode =
  '0x608060405234801561001057600080fd5b5061001a3361001f565b61005b565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b612b8e806200006b6000396000f3fe6080604052600436106102fd5760003560e01c8063b0d659381161018f578063d7533f02116100e1578063f04e283e1161008a578063fb128c8311610064578063fb128c83146103ee578063fc63e69e14610865578063fee81cf41461088557600080fd5b8063f04e283e1461081f578063f2fde38b14610832578063f57402961461084557600080fd5b8063e71924f1116100bb578063e71924f1146107b6578063ebaaa3a1146107dd578063ed14834f146107ff57600080fd5b8063d7533f0214610762578063e1a4521814610780578063e37a0cea1461079657600080fd5b8063c3190a2e11610143578063c94dcf8f1161011d578063c94dcf8f146106da578063cbb35c21146106fa578063d73f3aab1461074257600080fd5b8063c3190a2e14610678578063c7dd322814610698578063c9238eae146106ba57600080fd5b8063be0c9b6c11610174578063be0c9b6c14610618578063bf013d7b14610638578063c309c47d1461065857600080fd5b8063b0d65938146105e5578063b24e737e1461060557600080fd5b80635cbc742c116102535780638d01513c116101fc57806398040f46116101d657806398040f461461056f578063ac1fc22c1461058f578063aec96b6e146105c557600080fd5b80638d01513c146104d15780638da5cb5b146105225780639375da5a1461054f57600080fd5b80636c5f55f71161022d5780636c5f55f7146104d1578063715018a6146104fa5780637614a7511461050257600080fd5b80635cbc742c1461045e57806365bd416d1461047e5780636aa99da3146104ac57600080fd5b806322163b86116102b55780633db2c7f21161028f5780633db2c7f214610422578063522f73861461043657806354d1f13d1461045657600080fd5b806322163b86146103ae57806325692962146103e65780632848caef146103ee57600080fd5b806308bfa2bf116102e657806308bfa2bf14610364578063153229bd1461037b578063159a76bd1461039b57600080fd5b806301ffc9a71461030257806303a6ccd014610337575b600080fd5b34801561030e57600080fd5b5061032261031d366004612419565b6108b8565b60405190151581526020015b60405180910390f35b34801561034357600080fd5b50610357610352366004612486565b6108e4565b60405161032e91906124bb565b34801561037057600080fd5b50610379610a2d565b005b34801561038757600080fd5b506103796103963660046125d4565b610ad6565b6103796103a9366004612665565b610b74565b3480156103ba57600080fd5b506001546103ce906001600160801b031681565b6040516001600160801b03909116815260200161032e565b610379610b90565b3480156103fa57600080fd5b5061040a67016345785d8a000081565b6040516001600160601b03909116815260200161032e565b34801561042e57600080fd5b506001610322565b34801561044257600080fd5b506103796104513660046126fd565b610be0565b610379610c75565b34801561046a57600080fd5b50610379610479366004612758565b610cb1565b34801561048a57600080fd5b5061049e610499366004612773565b610d6a565b60405190815260200161032e565b3480156104b857600080fd5b50600054600160a01b90046001600160601b03166103ce565b3480156104dd57600080fd5b506104e76103e881565b60405161ffff909116815260200161032e565b610379610db8565b34801561050e57600080fd5b5061037961051d3660046125d4565b610dcc565b34801561052e57600080fd5b50638b78c6d819545b6040516001600160a01b03909116815260200161032e565b34801561055b57600080fd5b5061037961056a3660046127b1565b610e88565b34801561057b57600080fd5b5061049e61058a366004612486565b610f1d565b34801561059b57600080fd5b506103ce6105aa3660046127b1565b6004602052600090815260409020546001600160801b031681565b3480156105d157600080fd5b506103796105e03660046127ce565b610f34565b3480156105f157600080fd5b5061037961060036600461283b565b611027565b610379610613366004612856565b6110cd565b34801561062457600080fd5b5061037961063336600461283b565b6112eb565b34801561064457600080fd5b50610322610653366004612943565b6113ad565b34801561066457600080fd5b506103ce6106733660046129bd565b61140d565b34801561068457600080fd5b50610379610693366004612a4f565b611593565b3480156106a457600080fd5b50604051636328e9ad60e01b815260200161032e565b3480156106c657600080fd5b5060025461040a906001600160601b031681565b3480156106e657600080fd5b506103226106f5366004612773565b61162b565b34801561070657600080fd5b5061071a6107153660046125d4565b611642565b604080519586526020860194909452928401919091526060830152608082015260a00161032e565b34801561074e57600080fd5b5061037961075d366004612a8d565b6116c4565b34801561076e57600080fd5b506040516202a300815260200161032e565b34801561078c57600080fd5b506104e761271081565b3480156107a257600080fd5b506103796107b1366004612a4f565b61177e565b3480156107c257600080fd5b5060015461040a90600160801b90046001600160601b031681565b3480156107e957600080fd5b506001546104e790600160e01b900461ffff1681565b34801561080b57600080fd5b50600054610537906001600160a01b031681565b61037961082d3660046127b1565b6117e1565b6103796108403660046127b1565b611821565b34801561085157600080fd5b506103796108603660046127b1565b611848565b34801561087157600080fd5b50610379610880366004612ac9565b6118fd565b34801561089157600080fd5b5061049e6108a03660046127b1565b63389a75e1600c908152600091909152602090205490565b60006108c38261197c565b806108de57506001600160e01b03198216636328e9ad60e01b145b92915050565b604080516101a081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e0810182905261010081018290526101208101829052610140810182905261016081018290526101808101829052906109578484611a18565b600081815260056020908152604091829020835463ffffffff600160801b80830482168952600160a01b830482169489019490945261ffff600160c01b830481169589019590955260ff600160d01b830416151560608901526001600160601b0380831660808a015260018085015480841660a08c0152600160601b909404831660c08b015264010000000090930490911660e08901529154610100880152938401546101208701529254600160e01b810490921661014086015290048116610160840152600254166101808301525092915050565b6000546001600160a01b031680610a57576040516362ccef3360e01b815260040160405180910390fd5b6001546001600160801b03168015610ad257600180546fffffffffffffffffffffffffffffffff19169055610a95826001600160801b038316611a86565b6040516001600160801b03821681527fa8a9aa21b43d916fdaf4bdf9975892e984e7dbe00c0befea632d6fe5bbead73a9060200160405180910390a15b5050565b82610ae081611ac6565b8160056000610af5610af28888611a18565b90565b81526020808201929092526040908101600020600101805463ffffffff191663ffffffff94851617905580516001600160801b0387168152928516918301919091526001600160a01b038616917f4c3c29668821111c3ddbcf87e1cd6047dc735ef691d46e09671629cb42cdd94891015b60405180910390a250505050565b610b888686338781888888366000806110cd565b505050505050565b60006202a30067ffffffffffffffff164201905063389a75e1600c5233600052806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b82610bea81611ac6565b81610bf58585611a18565b8054911515600160d01b027fffffffffff00ffffffffffffffffffffffffffffffffffffffffffffffffffff909216919091179055604080516001600160801b038516815283151560208201526001600160a01b038616917fe430910c8e4bfa8180b70a0b2aa923b82d6712a1d165e223053ef439a3f861479101610b66565b63389a75e1600c523360005260006020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b610cb9611c61565b6103e861ffff82161115610cf9576040517f3d1e858400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180547fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff16600160e01b61ffff8416908102919091179091556040519081527f1426859b6b96e2e9ae302b23a42f763f4b0ae916a71a093e61c77120458b2e95906020015b60405180910390a150565b600060066000610d7d610af28787611a18565b81526020019081526020016000206000836001600160a01b03166001600160a01b031681526020019081526020016000205490509392505050565b610dc0611c61565b610dca6000611c7c565b565b82610dd681611ac6565b8163ffffffff16600003610dfd5760405163a017714560e01b815260040160405180910390fd5b81610e088585611a18565b80547fffffffffffffffffffffffffffffffff00000000ffffffffffffffffffffffff16600160601b63ffffffff93841602179055604080516001600160801b038616815291841660208301526001600160a01b038616917f021f3ca4d64a14574ed4fc7115d2c667604e54efb94b6187ed8117d49c6e47559101610b66565b610e90611c61565b6001600160a01b038116610eb7576040516362ccef3360e01b815260040160405180910390fd5b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527fda1940b15ab63ed4db791f1c7ec186c01a546f6ce58fa1dcc0561b8638a1bd1290602001610d5f565b6000610f298383611a18565b600101549392505050565b83610f3e81611ac6565b8163ffffffff168363ffffffff1610610f6a5760405163536a71af60e01b815260040160405180910390fd5b6000610f768686611a18565b80547fffffffffffffffff0000000000000000ffffffffffffffffffffffffffffffff16600160801b63ffffffff87811691820263ffffffff60a01b191692909217600160a01b928716928302178355604080516001600160801b038a16815260208101929092528101919091529091506001600160a01b038716907f13bc03d97cc4e2accb3b8290af069c19619d32a4e9c5219f8580108766fb18fd9060600160405180910390a2505050505050565b61102f611c61565b67016345785d8a00006001600160601b038216111561107a576040517fe750044700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600280546bffffffffffffffffffffffff19166001600160601b0383169081179091556040519081527fd294b805671973af1412f646018eacbaf3cab01934465d9623e12de8dd6acbc190602001610d5f565b60006110d98c8c611a18565b600081815260056020526040902060018101549192509061110c9063ffffffff64010000000082048116918d9116611cba565b60018201805463ffffffff929092166401000000000267ffffffff00000000199092169190911790556001600160a01b038916158061116657506111648888836000015461115f8d6000526014600c2090565b611d30565b155b1561119d576040517fb05e92fa00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b336001600160a01b038a16148015906111c85750886001600160a01b03168b6001600160a01b031614155b1561120d576111d7338a611d6a565b61120d576040517ffe736e0100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b815460008381526006602090815260408083206001600160a01b038e1684529091529020805463ffffffff8d811690910191829055600160601b9092049091161015611285576040517f1b75136500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6112958d8d8d8d8a8a8a8a611dac565b604080516001600160a01b038b16815263ffffffff8c1660208201527fbbce3c6646076fce6266a06486d114fd6f4fcdce3df843aadf9c56a2d89721a0910160405180910390a150505050505050505050505050565b6112f3611c61565b67016345785d8a00006001600160601b038216111561133e576040517f5d2be82000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180547fffffffff000000000000000000000000ffffffffffffffffffffffffffffffff16600160801b6001600160601b038416908102919091179091556040519081527f267d27ed20a4d7ecba313e2039580b03e8c3d8018eeefe72709708735b02116490602001610d5f565b6000806113ba8787611a18565b600101549050806113d85750506001600160a01b0383161515611404565b6001600160a01b03851615801590611400575061140084848361115f896000526014600c2090565b9150505b95945050505050565b60008761142d5760405163b00db6fb60e01b815260040160405180910390fd5b8163ffffffff166000036114545760405163a017714560e01b815260040160405180910390fd5b611460898787876121b2565b6001600160a01b038a1660009081526003602090815260408083206001600160801b038516845290915281209192509080546001600160601b038a166fffffffffffffffffffffffffffffffff1990911617600160601b63ffffffff8616021781559050600060058183815260208082019290925260409081016000208c815560018101805463ffffffff191663ffffffff8a811691821790925583516001600160801b03891681529485018f90526001600160601b038e16938501939093528b811660608501528a8116608085015261ffff8a1660a085015260c084019290925290861660e083015291506001600160a01b038c16907fd9faafd9b789bcd20399f1fafa1c6459996ac840e9177ee687c23cdbe3b7a9cb906101000160405180910390a2505098975050505050505050565b8261159d81611ac6565b816115bb5760405163b00db6fb60e01b815260040160405180910390fd5b81600560006115cd610af28888611a18565b815260208082019290925260409081016000209290925581516001600160801b03861681529081018490526001600160a01b038616917fa863d0ab0f23accb1c42ee00c0587f1c94539e15956a678a54c1e710ba07066e9101610b66565b600061163a84848436856113ad565b949350505050565b6000806000806000806116558989611a18565b54600254600154600160801b81046001600160601b0390811663ffffffff9b909b169a8b0292811692909201918316999099028181019c909b50909950612710600160e01b90990461ffff9081168c028a90048b0199600160c01b909304168b02919091049650945050505050565b826116ce81611ac6565b6103e861ffff831611156116f557604051631a52ce6f60e01b815260040160405180910390fd5b816117008585611a18565b80547fffffffffffff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff93841602179055604080516001600160801b038616815291841660208301526001600160a01b038616917fae6d744348a49699fcb91e6a563f2224c0fb27c21053a9218ee827f9d6e698c79101610b66565b8261178881611ac6565b816117938585611a18565b60010155604080516001600160801b0385168152602081018490526001600160a01b038616917f50beeb3db2bdaab85213836eb4be24fe53e830e8ee419c5859ea380e3b7102759101610b66565b6117e9611c61565b63389a75e1600c52806000526020600c20805442111561181157636f5e88186000526004601cfd5b6000905561181e81611c7c565b50565b611829611c61565b8060601b61183f57637448fbae6000526004601cfd5b61181e81611c7c565b6001600160a01b0381166000908152600460205260409020546001600160801b03168015610ad2576001600160a01b038216600090815260046020526040902080546fffffffffffffffffffffffffffffffff191690556118b2826001600160801b038316611a86565b6040516001600160801b03821681526001600160a01b038316907f0a1adaaf9d9caba9cf65528900e946b718d511ebd66ae81d5eb71e7fd0122c4a9060200160405180910390a25050565b8261190781611ac6565b816119128585611a18565b80546bffffffffffffffffffffffff19166001600160601b03928316179055604080516001600160801b038616815291841660208301526001600160a01b038616917f7c77af090cbae157811da55b6d8ae1e307a85f5aa1dd2f7a13183279a8c2b4b29101610b66565b60006001600160e01b031982167ff8ccd08e0000000000000000000000000000000000000000000000000000000014806119df57506001600160e01b031982167f09d98f1e00000000000000000000000000000000000000000000000000000000145b806108de57506001600160e01b031982167f01ffc9a7000000000000000000000000000000000000000000000000000000001492915050565b6001600160a01b03821660009081526003602090815260408083206001600160801b038516845290915290208054600160d81b900460ff166108de576040517f947dbacd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80471015611a9c5763b12d13eb6000526004601cfd5b6000806000808486620186a0f1610ad257816000526073600b5360ff6020536016600b82f0505050565b6000611ad061239b565b9050816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b10573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b349190612b05565b6001600160a01b0316816001600160a01b031614610ad257816001600160a01b031663514e62fc82846001600160a01b03166375b238fc6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b9a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bbe9190612b22565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381865afa158015611c07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c2b9190612b3b565b610ad2576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b638b78c6d819543314610dca576382b429006000526004601cfd5b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a355565b600063ffffffff8481168185160190831681111561163a576000611cee8463ffffffff168763ffffffff1680821191030290565b6040517fbdc0f4ce00000000000000000000000000000000000000000000000000000000815263ffffffff821660048201529091506024015b60405180910390fd5b60008315611d62578360051b8501855b803580851160051b94855260209485185260406000209301818110611d405750505b501492915050565b6000604051639c395bc26000528360205282604052602060006044601c6d76a84fef008cdabe6409d2fe638b5afa600160005114169150806040525092915050565b6000611db88989611a18565b9050611dee6040518060a00160405280600015158152602001600081526020016000815260200160008152602001600081525090565b815463ffffffff600160801b8204811691600160a01b90041642821115611e3e5760405163296f4f6960e01b815242600482015263ffffffff808416602483015282166044820152606401611d27565b8063ffffffff16421115611e7b5760405163296f4f6960e01b815242600482015263ffffffff808416602483015282166044820152606401611d27565b8354600160d01b900460ff1615611ebe576040517fd7d248ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050611ecb8a8a89611642565b602086015260608501525050608082018190523414611f255760808101516040517f0dd32d1c0000000000000000000000000000000000000000000000000000000081523460048201526024810191909152604401611d27565b6060810151600154611f42916001600160801b03909116016123e1565b600180546fffffffffffffffffffffffffffffffff19166001600160801b039290921691909117905560608101516080820151036040820152611f888a8a8888886113ad565b1580158252612014576020808201516040808401805183900390526001600160a01b0389166000908152600490935290912054611fd0916001600160801b03909116016123e1565b6001600160a01b038716600090815260046020526040902080546fffffffffffffffffffffffffffffffff19166001600160801b039290921691909117905561205c565b600060208201526001600160a01b0386161561205c576040517f20d6c38900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60408082015190517f40c10f190000000000000000000000000000000000000000000000000000000081526001600160a01b03808b166004830181905263ffffffff8b16602484015286939092918e16917f1c9d0475cac0f75d579d1156e780903d43532d6212c6890ce4f6f278770dc915918e9184916340c10f199160440160206040518083038185885af11580156120fa573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061211f9190612b22565b8c8760800151886060015189602001518f8b6000015160405161219e9897969594939291906001600160801b03988916815263ffffffff97881660208201529590961660408601529286166060850152908516608084015290931660a08201526001600160a01b039290921660c0830152151560e08201526101000190565b60405180910390a450505050505050505050565b6000846121be81611ac6565b8363ffffffff168563ffffffff16106121ea5760405163536a71af60e01b815260040160405180910390fd5b6103e861ffff8416111561221157604051631a52ce6f60e01b815260040160405180910390fd5b600080546001600160a01b0388168252600360209081526040808420600160a01b9093046001600160601b03168085529290915282209093508054600160d81b7fffffffffffffffff0000000000000000ffffffffffffffffffffffffffffffff909116600160801b63ffffffff8a81169190910263ffffffff60a01b191691909117600160a01b91891691909102177fffffffff00ff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff8816027fffffffff00ffffffffffffffffffffffffffffffffffffffffffffffffffffff1617178155905061230b600184016001600160801b03166123fa565b600080546001600160601b0392909216600160a01b026001600160a01b03928316179055604080516001600160801b038616815263ffffffff898116602083015288169181019190915261ffff8616606082015233918916907feeb5941fb79bbfe40edd76c2e086e8ccdb0b463fc8ac07416266100b4dfddccf9060800160405180910390a35050949350505050565b336e2fd5aeb385d324b580fca7c838239f198101610af257602060008060006e2fd5aeb385d324b580fca7c83823a05afa6123d557600080fd5b506000513d6020140290565b6000600160801b82106123f6576123f661240b565b5090565b6000600160601b82106123f6576123f65b6335278d126000526004601cfd5b60006020828403121561242b57600080fd5b81356001600160e01b03198116811461244357600080fd5b9392505050565b6001600160a01b038116811461181e57600080fd5b803561246a8161244a565b919050565b80356001600160801b038116811461246a57600080fd5b6000806040838503121561249957600080fd5b82356124a48161244a565b91506124b26020840161246f565b90509250929050565b815163ffffffff1681526101a0810160208301516124e1602084018263ffffffff169052565b5060408301516124f7604084018261ffff169052565b50606083015161250b606084018215159052565b50608083015161252660808401826001600160601b03169052565b5060a083015161253e60a084018263ffffffff169052565b5060c083015161255660c084018263ffffffff169052565b5060e083015161256e60e084018263ffffffff169052565b50610100838101519083015261012080840151908301526101408084015161ffff1690830152610160808401516001600160601b03908116918401919091526101809384015116929091019190915290565b803563ffffffff8116811461246a57600080fd5b6000806000606084860312156125e957600080fd5b83356125f48161244a565b92506126026020850161246f565b9150612610604085016125c0565b90509250925092565b60008083601f84011261262b57600080fd5b50813567ffffffffffffffff81111561264357600080fd5b6020830191508360208260051b850101111561265e57600080fd5b9250929050565b60008060008060008060a0878903121561267e57600080fd5b86356126898161244a565b95506126976020880161246f565b94506126a5604088016125c0565b9350606087013567ffffffffffffffff8111156126c157600080fd5b6126cd89828a01612619565b90945092505060808701356126e18161244a565b809150509295509295509295565b801515811461181e57600080fd5b60008060006060848603121561271257600080fd5b833561271d8161244a565b925061272b6020850161246f565b9150604084013561273b816126ef565b809150509250925092565b803561ffff8116811461246a57600080fd5b60006020828403121561276a57600080fd5b61244382612746565b60008060006060848603121561278857600080fd5b83356127938161244a565b92506127a16020850161246f565b9150604084013561273b8161244a565b6000602082840312156127c357600080fd5b81356124438161244a565b600080600080608085870312156127e457600080fd5b84356127ef8161244a565b93506127fd6020860161246f565b925061280b604086016125c0565b9150612819606086016125c0565b905092959194509250565b80356001600160601b038116811461246a57600080fd5b60006020828403121561284d57600080fd5b61244382612824565b60008060008060008060008060008060006101208c8e03121561287857600080fd5b6128828c3561244a565b8b359a5061289260208d0161246f565b99506128a160408d013561244a565b60408c013598506128b460608d016125c0565b97506128c260808d0161245f565b965067ffffffffffffffff8060a08e013511156128de57600080fd5b6128ee8e60a08f01358f01612619565b90975095506128ff60c08e0161245f565b94508060e08e0135111561291257600080fd5b506129238d60e08e01358e01612619565b81945080935050506101008c013590509295989b509295989b9093969950565b60008060008060006080868803121561295b57600080fd5b85356129668161244a565b94506129746020870161246f565b935060408601356129848161244a565b9250606086013567ffffffffffffffff8111156129a057600080fd5b6129ac88828901612619565b969995985093965092949392505050565b600080600080600080600080610100898b0312156129da57600080fd5b88356129e58161244a565b9750602089013596506129fa60408a01612824565b9550612a0860608a016125c0565b9450612a1660808a016125c0565b9350612a2460a08a01612746565b9250612a3260c08a016125c0565b9150612a4060e08a016125c0565b90509295985092959890939650565b600080600060608486031215612a6457600080fd5b8335612a6f8161244a565b9250612a7d6020850161246f565b9150604084013590509250925092565b600080600060608486031215612aa257600080fd5b8335612aad8161244a565b9250612abb6020850161246f565b915061261060408501612746565b600080600060608486031215612ade57600080fd5b8335612ae98161244a565b9250612af76020850161246f565b915061261060408501612824565b600060208284031215612b1757600080fd5b81516124438161244a565b600060208284031215612b3457600080fd5b5051919050565b600060208284031215612b4d57600080fd5b8151612443816126ef56fea26469706673582212201617c2ca1f644c161a8d76b39215bf1a1d7b037af4be6758ce9a84dd3b155faf64736f6c63430008130033' as const

export const MerkleDropMinterV2_1Config = {
  abi: merkleDropMinterV2_1Abi,
  bytecode: merkleDropMinterV2_1Bytecode,
} as const
