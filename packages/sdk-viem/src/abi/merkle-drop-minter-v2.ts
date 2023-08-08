export const merkleDropMinterV2Abi = [
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
        name: '',
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

const merkleDropMinterV2Bytecode =
  '0x608060405234801561001057600080fd5b5061001a3361001f565b61005b565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b6129e28061006a6000396000f3fe6080604052600436106102d15760003560e01c8063aec96b6e11610179578063d7533f02116100d6578063ed14834f1161008a578063f574029611610064578063f57402961461079d578063fc63e69e146107bd578063fee81cf4146107dd57600080fd5b8063ed14834f14610757578063f04e283e14610777578063f2fde38b1461078a57600080fd5b8063e37a0cea116100bb578063e37a0cea146106ee578063e71924f11461070e578063ebaaa3a11461073557600080fd5b8063d7533f02146106ba578063e1a45218146106d857600080fd5b8063c309c47d1161012d578063c7dd322811610112578063c7dd322814610658578063c94dcf8f1461067a578063d73f3aab1461069a57600080fd5b8063c309c47d14610618578063c3190a2e1461063857600080fd5b8063b84158a41161015e578063b84158a4146105b8578063be0c9b6c146105d8578063bf013d7b146105f857600080fd5b8063aec96b6e14610585578063b24e737e146105a557600080fd5b80635cbc742c116102325780637614a751116101e65780639375da5a116101c05780639375da5a1461050f57806398040f461461052f578063ac1fc22c1461054f57600080fd5b80637614a751146104c25780638d01513c146104915780638da5cb5b146104e257600080fd5b80636aa99da3116102175780636aa99da31461046c5780636c5f55f714610491578063715018a6146104ba57600080fd5b80635cbc742c1461041e57806365bd416d1461043e57600080fd5b806322163b86116102895780632848caef1161026e5780632848caef146103c2578063522f7386146103f657806354d1f13d1461041657600080fd5b806322163b861461038257806325692962146103ba57600080fd5b806308bfa2bf116102ba57806308bfa2bf14610338578063153229bd1461034f578063159a76bd1461036f57600080fd5b806301ffc9a7146102d657806303a6ccd01461030b575b600080fd5b3480156102e257600080fd5b506102f66102f1366004612262565b610810565b60405190151581526020015b60405180910390f35b34801561031757600080fd5b5061032b6103263660046122cf565b61083c565b6040516103029190612304565b34801561034457600080fd5b5061034d610941565b005b34801561035b57600080fd5b5061034d61036a3660046123e9565b6109ea565b61034d61037d36600461247a565b610a88565b34801561038e57600080fd5b506001546103a2906001600160801b031681565b6040516001600160801b039091168152602001610302565b61034d610aa4565b3480156103ce57600080fd5b506103de67016345785d8a000081565b6040516001600160601b039091168152602001610302565b34801561040257600080fd5b5061034d610411366004612512565b610af4565b61034d610b89565b34801561042a57600080fd5b5061034d61043936600461256d565b610bc5565b34801561044a57600080fd5b5061045e610459366004612588565b610c7e565b604051908152602001610302565b34801561047857600080fd5b50600054600160a01b90046001600160601b03166103a2565b34801561049d57600080fd5b506104a76103e881565b60405161ffff9091168152602001610302565b61034d610ccc565b3480156104ce57600080fd5b5061034d6104dd3660046123e9565b610ce0565b3480156104ee57600080fd5b50638b78c6d819545b6040516001600160a01b039091168152602001610302565b34801561051b57600080fd5b5061034d61052a3660046125c6565b610d9c565b34801561053b57600080fd5b5061045e61054a3660046122cf565b610e31565b34801561055b57600080fd5b506103a261056a3660046125c6565b6003602052600090815260409020546001600160801b031681565b34801561059157600080fd5b5061034d6105a03660046125e3565b610e48565b61034d6105b3366004612639565b610f3b565b3480156105c457600080fd5b506103a26105d3366004612726565b611159565b3480156105e457600080fd5b5061034d6105f336600461277c565b611180565b34801561060457600080fd5b506102f6610613366004612797565b611242565b34801561062457600080fd5b506103a2610633366004612811565b6112a2565b34801561064457600080fd5b5061034d6106533660046128a3565b611428565b34801561066457600080fd5b50604051635e9a2e5f60e01b8152602001610302565b34801561068657600080fd5b506102f6610695366004612588565b6114c0565b3480156106a657600080fd5b5061034d6106b53660046128e1565b6114d7565b3480156106c657600080fd5b506040516202a3008152602001610302565b3480156106e457600080fd5b506104a761271081565b3480156106fa57600080fd5b5061034d6107093660046128a3565b611591565b34801561071a57600080fd5b506001546103de90600160801b90046001600160601b031681565b34801561074157600080fd5b506001546104a790600160e01b900461ffff1681565b34801561076357600080fd5b506000546104f7906001600160a01b031681565b61034d6107853660046125c6565b6115f4565b61034d6107983660046125c6565b611634565b3480156107a957600080fd5b5061034d6107b83660046125c6565b61165b565b3480156107c957600080fd5b5061034d6107d836600461291d565b611710565b3480156107e957600080fd5b5061045e6107f83660046125c6565b63389a75e1600c908152600091909152602090205490565b600061081b8261178f565b8061083657506001600160e01b03198216635e9a2e5f60e01b145b92915050565b6040805161014081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081018290529061089784846117f7565b600081815260046020908152604091829020835463ffffffff600160801b820481168852600160a01b820481169388019390935261ffff600160c01b8204169387019390935260ff600160d01b840416151560608701526001600160601b038316608087015260018082015480841660a0890152600160601b909404831660c088015264010000000090930490911660e08601525461010085015201546101208301525092915050565b6000546001600160a01b03168061096b576040516362ccef3360e01b815260040160405180910390fd5b6001546001600160801b031680156109e657600180546fffffffffffffffffffffffffffffffff191690556109a9826001600160801b038316611865565b6040516001600160801b03821681527fa8a9aa21b43d916fdaf4bdf9975892e984e7dbe00c0befea632d6fe5bbead73a9060200160405180910390a15b5050565b826109f4816118a5565b8160046000610a09610a0688886117f7565b90565b81526020808201929092526040908101600020600101805463ffffffff191663ffffffff94851617905580516001600160801b0387168152928516918301919091526001600160a01b038616917f4c3c29668821111c3ddbcf87e1cd6047dc735ef691d46e09671629cb42cdd94891015b60405180910390a250505050565b610a9c868633878188888836600080610f3b565b505050505050565b60006202a30067ffffffffffffffff164201905063389a75e1600c5233600052806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b82610afe816118a5565b81610b0985856117f7565b8054911515600160d01b027fffffffffff00ffffffffffffffffffffffffffffffffffffffffffffffffffff909216919091179055604080516001600160801b038516815283151560208201526001600160a01b038616917fe430910c8e4bfa8180b70a0b2aa923b82d6712a1d165e223053ef439a3f861479101610a7a565b63389a75e1600c523360005260006020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b610bcd611a40565b6103e861ffff82161115610c0d576040517f3d1e858400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180547fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff16600160e01b61ffff8416908102919091179091556040519081527f1426859b6b96e2e9ae302b23a42f763f4b0ae916a71a093e61c77120458b2e95906020015b60405180910390a150565b600060056000610c91610a0687876117f7565b81526020019081526020016000206000836001600160a01b03166001600160a01b031681526020019081526020016000205490509392505050565b610cd4611a40565b610cde6000611a5b565b565b82610cea816118a5565b8163ffffffff16600003610d115760405163a017714560e01b815260040160405180910390fd5b81610d1c85856117f7565b80547fffffffffffffffffffffffffffffffff00000000ffffffffffffffffffffffff16600160601b63ffffffff93841602179055604080516001600160801b038616815291841660208301526001600160a01b038616917f021f3ca4d64a14574ed4fc7115d2c667604e54efb94b6187ed8117d49c6e47559101610a7a565b610da4611a40565b6001600160a01b038116610dcb576040516362ccef3360e01b815260040160405180910390fd5b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527fda1940b15ab63ed4db791f1c7ec186c01a546f6ce58fa1dcc0561b8638a1bd1290602001610c73565b6000610e3d83836117f7565b600101549392505050565b83610e52816118a5565b8163ffffffff168363ffffffff1610610e7e5760405163536a71af60e01b815260040160405180910390fd5b6000610e8a86866117f7565b80547fffffffffffffffff0000000000000000ffffffffffffffffffffffffffffffff16600160801b63ffffffff87811691820263ffffffff60a01b191692909217600160a01b928716928302178355604080516001600160801b038a16815260208101929092528101919091529091506001600160a01b038716907f13bc03d97cc4e2accb3b8290af069c19619d32a4e9c5219f8580108766fb18fd9060600160405180910390a2505050505050565b6000610f478c8c6117f7565b6000818152600460205260409020600181015491925090610f7a9063ffffffff64010000000082048116918d9116611a99565b60018201805463ffffffff929092166401000000000267ffffffff00000000199092169190911790556001600160a01b0389161580610fd45750610fd288888360000154610fcd8d6000526014600c2090565b611b0f565b155b1561100b576040517fb05e92fa00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b336001600160a01b038a16148015906110365750886001600160a01b03168b6001600160a01b031614155b1561107b57611045338a611b49565b61107b576040517ffe736e0100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b815460008381526005602090815260408083206001600160a01b038e1684529091529020805463ffffffff8d811690910191829055600160601b90920490911610156110f3576040517f1b75136500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6111038d8d8d8d8a8a8a8a611b8b565b604080516001600160a01b038b16815263ffffffff8c1660208201527fbbce3c6646076fce6266a06486d114fd6f4fcdce3df843aadf9c56a2d89721a0910160405180910390a150505050505050505050505050565b60008163ffffffff1661116c86866117f7565b546001600160601b03160295945050505050565b611188611a40565b67016345785d8a00006001600160601b03821611156111d3576040517f5d2be82000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180547fffffffff000000000000000000000000ffffffffffffffffffffffffffffffff16600160801b6001600160601b038416908102919091179091556040519081527f267d27ed20a4d7ecba313e2039580b03e8c3d8018eeefe72709708735b02116490602001610c73565b60008061124f87876117f7565b6001015490508061126d5750506001600160a01b0383161515611299565b6001600160a01b038516158015906112955750611295848483610fcd896000526014600c2090565b9150505b95945050505050565b6000876112c25760405163b00db6fb60e01b815260040160405180910390fd5b8163ffffffff166000036112e95760405163a017714560e01b815260040160405180910390fd5b6112f589878787611ffb565b6001600160a01b038a1660009081526002602090815260408083206001600160801b038516845290915281209192509080546001600160601b038a166fffffffffffffffffffffffffffffffff1990911617600160601b63ffffffff8616021781559050600060048183815260208082019290925260409081016000208c815560018101805463ffffffff191663ffffffff8a811691821790925583516001600160801b03891681529485018f90526001600160601b038e16938501939093528b811660608501528a8116608085015261ffff8a1660a085015260c084019290925290861660e083015291506001600160a01b038c16907fd9faafd9b789bcd20399f1fafa1c6459996ac840e9177ee687c23cdbe3b7a9cb906101000160405180910390a2505098975050505050505050565b82611432816118a5565b816114505760405163b00db6fb60e01b815260040160405180910390fd5b8160046000611462610a0688886117f7565b815260208082019290925260409081016000209290925581516001600160801b03861681529081018490526001600160a01b038616917fa863d0ab0f23accb1c42ee00c0587f1c94539e15956a678a54c1e710ba07066e9101610a7a565b60006114cf8484843685611242565b949350505050565b826114e1816118a5565b6103e861ffff8316111561150857604051631a52ce6f60e01b815260040160405180910390fd5b8161151385856117f7565b80547fffffffffffff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff93841602179055604080516001600160801b038616815291841660208301526001600160a01b038616917fae6d744348a49699fcb91e6a563f2224c0fb27c21053a9218ee827f9d6e698c79101610a7a565b8261159b816118a5565b816115a685856117f7565b60010155604080516001600160801b0385168152602081018490526001600160a01b038616917f50beeb3db2bdaab85213836eb4be24fe53e830e8ee419c5859ea380e3b7102759101610a7a565b6115fc611a40565b63389a75e1600c52806000526020600c20805442111561162457636f5e88186000526004601cfd5b6000905561163181611a5b565b50565b61163c611a40565b8060601b61165257637448fbae6000526004601cfd5b61163181611a5b565b6001600160a01b0381166000908152600360205260409020546001600160801b031680156109e6576001600160a01b038216600090815260036020526040902080546fffffffffffffffffffffffffffffffff191690556116c5826001600160801b038316611865565b6040516001600160801b03821681526001600160a01b038316907f0a1adaaf9d9caba9cf65528900e946b718d511ebd66ae81d5eb71e7fd0122c4a9060200160405180910390a25050565b8261171a816118a5565b8161172585856117f7565b80546bffffffffffffffffffffffff19166001600160601b03928316179055604080516001600160801b038616815291841660208301526001600160a01b038616917f7c77af090cbae157811da55b6d8ae1e307a85f5aa1dd2f7a13183279a8c2b4b29101610a7a565b60006001600160e01b031982167ff8ccd08e00000000000000000000000000000000000000000000000000000000148061083657506001600160e01b031982167f01ffc9a7000000000000000000000000000000000000000000000000000000001492915050565b6001600160a01b03821660009081526002602090815260408083206001600160801b038516845290915290208054600160d81b900460ff16610836576040517f947dbacd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8047101561187b5763b12d13eb6000526004601cfd5b6000806000808486620186a0f16109e657816000526073600b5360ff6020536016600b82f0505050565b60006118af6121e4565b9050816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156118ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119139190612959565b6001600160a01b0316816001600160a01b0316146109e657816001600160a01b031663514e62fc82846001600160a01b03166375b238fc6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611979573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061199d9190612976565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381865afa1580156119e6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a0a919061298f565b6109e6576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b638b78c6d819543314610cde576382b429006000526004601cfd5b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a355565b600063ffffffff848116818516019083168111156114cf576000611acd8463ffffffff168763ffffffff1680821191030290565b6040517fbdc0f4ce00000000000000000000000000000000000000000000000000000000815263ffffffff821660048201529091506024015b60405180910390fd5b60008315611b41578360051b8501855b803580851160051b94855260209485185260406000209301818110611b1f5750505b501492915050565b6000604051639c395bc26000528360205282604052602060006044601c6d76a84fef008cdabe6409d2fe638b5afa600160005114169150806040525092915050565b6000611b9789896117f7565b9050611bdb6040518060e001604052806000151581526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b815463ffffffff600160801b8204811691600160a01b90041642821115611c2b5760405163296f4f6960e01b815242600482015263ffffffff808416602483015282166044820152606401611b06565b8063ffffffff16421115611c685760405163296f4f6960e01b815242600482015263ffffffff808416602483015282166044820152606401611b06565b8354600160d01b900460ff1615611cab576040517fd7d248ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050600154600160801b90046001600160601b031663ffffffff8816026060820152611cd98a8a8a8a611159565b6001600160801b031660a0820181905260608201510160c082018190523414611d3d5760c08101516040517f0dd32d1c0000000000000000000000000000000000000000000000000000000081523460048201526024810191909152604401611b06565b606081015160015460a083015161271061ffff600160e01b8404169091020490910160808301819052611d79916001600160801b03160161222a565b600180546fffffffffffffffffffffffffffffffff19166001600160801b0392909216919091179055608081015160c0820151036040820152611dbf8a8a888888611242565b1580158252611e6457815460a082015161271091600160c01b900461ffff16020460208083018290526040808401805184900390526001600160a01b03891660009081526003909252902054611e20916001600160801b039091160161222a565b6001600160a01b038716600090815260036020526040902080546fffffffffffffffffffffffffffffffff19166001600160801b0392909216919091179055611ea5565b6001600160a01b03861615611ea5576040517f20d6c38900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60408082015190517f40c10f190000000000000000000000000000000000000000000000000000000081526001600160a01b03808b166004830181905263ffffffff8b16602484015286939092918e16917f1c9d0475cac0f75d579d1156e780903d43532d6212c6890ce4f6f278770dc915918e9184916340c10f199160440160206040518083038185885af1158015611f43573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190611f689190612976565b8c8760c00151886080015189602001518f8b60000151604051611fe79897969594939291906001600160801b03988916815263ffffffff97881660208201529590961660408601529286166060850152908516608084015290931660a08201526001600160a01b039290921660c0830152151560e08201526101000190565b60405180910390a450505050505050505050565b600084612007816118a5565b8363ffffffff168563ffffffff16106120335760405163536a71af60e01b815260040160405180910390fd5b6103e861ffff8416111561205a57604051631a52ce6f60e01b815260040160405180910390fd5b600080546001600160a01b0388168252600260209081526040808420600160a01b9093046001600160601b03168085529290915282209093508054600160d81b7fffffffffffffffff0000000000000000ffffffffffffffffffffffffffffffff909116600160801b63ffffffff8a81169190910263ffffffff60a01b191691909117600160a01b91891691909102177fffffffff00ff0000ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b61ffff8816027fffffffff00ffffffffffffffffffffffffffffffffffffffffffffffffffffff16171781559050612154600184016001600160801b0316612243565b600080546001600160601b0392909216600160a01b026001600160a01b03928316179055604080516001600160801b038616815263ffffffff898116602083015288169181019190915261ffff8616606082015233918916907feeb5941fb79bbfe40edd76c2e086e8ccdb0b463fc8ac07416266100b4dfddccf9060800160405180910390a35050949350505050565b336e2fd5aeb385d324b580fca7c838239f198101610a0657602060008060006e2fd5aeb385d324b580fca7c83823a05afa61221e57600080fd5b506000513d6020140290565b6000600160801b821061223f5761223f612254565b5090565b6000600160601b821061223f5761223f5b6335278d126000526004601cfd5b60006020828403121561227457600080fd5b81356001600160e01b03198116811461228c57600080fd5b9392505050565b6001600160a01b038116811461163157600080fd5b80356122b381612293565b919050565b80356001600160801b03811681146122b357600080fd5b600080604083850312156122e257600080fd5b82356122ed81612293565b91506122fb602084016122b8565b90509250929050565b815163ffffffff1681526101408101602083015161232a602084018263ffffffff169052565b506040830151612340604084018261ffff169052565b506060830151612354606084018215159052565b50608083015161236f60808401826001600160601b03169052565b5060a083015161238760a084018263ffffffff169052565b5060c083015161239f60c084018263ffffffff169052565b5060e08301516123b760e084018263ffffffff169052565b50610100838101519083015261012092830151929091019190915290565b803563ffffffff811681146122b357600080fd5b6000806000606084860312156123fe57600080fd5b833561240981612293565b9250612417602085016122b8565b9150612425604085016123d5565b90509250925092565b60008083601f84011261244057600080fd5b50813567ffffffffffffffff81111561245857600080fd5b6020830191508360208260051b850101111561247357600080fd5b9250929050565b60008060008060008060a0878903121561249357600080fd5b863561249e81612293565b95506124ac602088016122b8565b94506124ba604088016123d5565b9350606087013567ffffffffffffffff8111156124d657600080fd5b6124e289828a0161242e565b90945092505060808701356124f681612293565b809150509295509295509295565b801515811461163157600080fd5b60008060006060848603121561252757600080fd5b833561253281612293565b9250612540602085016122b8565b9150604084013561255081612504565b809150509250925092565b803561ffff811681146122b357600080fd5b60006020828403121561257f57600080fd5b61228c8261255b565b60008060006060848603121561259d57600080fd5b83356125a881612293565b92506125b6602085016122b8565b9150604084013561255081612293565b6000602082840312156125d857600080fd5b813561228c81612293565b600080600080608085870312156125f957600080fd5b843561260481612293565b9350612612602086016122b8565b9250612620604086016123d5565b915061262e606086016123d5565b905092959194509250565b60008060008060008060008060008060006101208c8e03121561265b57600080fd5b6126658c35612293565b8b359a5061267560208d016122b8565b995061268460408d0135612293565b60408c0135985061269760608d016123d5565b97506126a560808d016122a8565b965067ffffffffffffffff8060a08e013511156126c157600080fd5b6126d18e60a08f01358f0161242e565b90975095506126e260c08e016122a8565b94508060e08e013511156126f557600080fd5b506127068d60e08e01358e0161242e565b81945080935050506101008c013590509295989b509295989b9093969950565b6000806000806080858703121561273c57600080fd5b843561274781612293565b9350612755602086016122b8565b9250604085013561262081612293565b80356001600160601b03811681146122b357600080fd5b60006020828403121561278e57600080fd5b61228c82612765565b6000806000806000608086880312156127af57600080fd5b85356127ba81612293565b94506127c8602087016122b8565b935060408601356127d881612293565b9250606086013567ffffffffffffffff8111156127f457600080fd5b6128008882890161242e565b969995985093965092949392505050565b600080600080600080600080610100898b03121561282e57600080fd5b883561283981612293565b97506020890135965061284e60408a01612765565b955061285c60608a016123d5565b945061286a60808a016123d5565b935061287860a08a0161255b565b925061288660c08a016123d5565b915061289460e08a016123d5565b90509295985092959890939650565b6000806000606084860312156128b857600080fd5b83356128c381612293565b92506128d1602085016122b8565b9150604084013590509250925092565b6000806000606084860312156128f657600080fd5b833561290181612293565b925061290f602085016122b8565b91506124256040850161255b565b60008060006060848603121561293257600080fd5b833561293d81612293565b925061294b602085016122b8565b915061242560408501612765565b60006020828403121561296b57600080fd5b815161228c81612293565b60006020828403121561298857600080fd5b5051919050565b6000602082840312156129a157600080fd5b815161228c8161250456fea26469706673582212205092f522ca1363c063828807113eb9ff8b153dbe9cce632686febb2643bafab164736f6c63430008130033' as const

export const MerkleDropMinterV2Config = {
  abi: merkleDropMinterV2Abi,
  bytecode: merkleDropMinterV2Bytecode,
} as const
