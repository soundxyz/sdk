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