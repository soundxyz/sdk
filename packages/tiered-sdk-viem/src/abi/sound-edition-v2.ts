const soundEditionV2Abi = [
  {
    inputs: [],
    name: 'ApprovalCallerNotOwnerNorApproved',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ApprovalQueryForNonexistentToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BalanceQueryForZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CannotBurnImmediately',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CreateTierIsFrozen',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExceedsAvailableSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidFundingRecipient',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidMaxMintableRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidQueryRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRoyaltyBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTokenTier',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MetadataIsFrozen',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintERC2309QuantityExceedsLimit',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintHasConcluded',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintNotConcluded',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintToZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintZeroQuantity',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintsAlreadyExist',
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
    name: 'OwnerQueryForNonexistentToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OwnershipNotInitializedForExtraData',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TierAlreadyExists',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TierDoesNotExist',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TierIsFrozen',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TierMintsAlreadyExist',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TokenIdsNotStrictlyAscending',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransferCallerNotOwnerNorApproved',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransferFromIncorrectOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransferToNonERC721ReceiverImplementer',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransferToZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'URIQueryForNonexistentToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroTiersProvided',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'to',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromTokenId',
        type: 'uint256',
      },
    ],
    name: 'Airdropped',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
    ],
    name: 'BaseURISet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toTokenId',
        type: 'uint256',
      },
    ],
    name: 'BatchMetadataUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'fromTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toTokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'ConsecutiveTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'contractURI',
        type: 'string',
      },
    ],
    name: 'ContractURISet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'CreateTierFrozen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'cutoff',
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
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'ERC20Withdrawn',
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
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'ETHWithdrawn',
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
    ],
    name: 'FundingRecipientSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'lower',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'upper',
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
        indexed: false,
        internalType: 'address',
        name: 'metadataModule',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'contractURI',
        type: 'string',
      },
    ],
    name: 'MetadataFrozen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'metadataModule',
        type: 'address',
      },
    ],
    name: 'MetadataModuleSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'MintRandomnessEnabledSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromTokenId',
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
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'OperatorFilteringEnablededSet',
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
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roles',
        type: 'uint256',
      },
    ],
    name: 'RolesUpdated',
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
    name: 'RoyaltySet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'metadataModule',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'fundingRecipient',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: 'royaltyBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'isMetadataFrozen',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'operatorFilteringEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isCreateTierFrozen',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'tier',
                type: 'uint8',
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
                name: 'cutoffTime',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'mintRandomnessEnabled',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'isFrozen',
                type: 'bool',
              },
            ],
            internalType: 'struct ISoundEditionV2.TierCreation[]',
            name: 'tierCreations',
            type: 'tuple[]',
          },
        ],
        indexed: false,
        internalType: 'struct ISoundEditionV2.EditionInitialization',
        name: 'init',
        type: 'tuple',
      },
    ],
    name: 'SoundEditionInitialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
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
            name: 'cutoffTime',
            type: 'uint32',
          },
          {
            internalType: 'bool',
            name: 'mintRandomnessEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isFrozen',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct ISoundEditionV2.TierCreation',
        name: 'creation',
        type: 'tuple',
      },
    ],
    name: 'TierCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'TierFrozen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ADMIN_ROLE',
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
    name: 'GA_TIER',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MINTER_ROLE',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'address[]',
        name: 'to',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
    ],
    name: 'airdrop',
    outputs: [
      {
        internalType: 'uint256',
        name: 'fromTokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
    inputs: [],
    name: 'baseURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'contractURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'splitMain',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'splitData',
        type: 'bytes',
      },
    ],
    name: 'createSplit',
    outputs: [
      {
        internalType: 'address',
        name: 'split',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
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
            name: 'cutoffTime',
            type: 'uint32',
          },
          {
            internalType: 'bool',
            name: 'mintRandomnessEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isFrozen',
            type: 'bool',
          },
        ],
        internalType: 'struct ISoundEditionV2.TierCreation',
        name: 'creation',
        type: 'tuple',
      },
    ],
    name: 'createTier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'cutoffTime',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'editionInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'fundingRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'metadataModule',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'isMetadataFrozen',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'operatorFilteringEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isCreateTierFrozen',
            type: 'bool',
          },
          {
            internalType: 'uint16',
            name: 'royaltyBPS',
            type: 'uint16',
          },
          {
            internalType: 'uint256',
            name: 'nextTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalBurned',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalMinted',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalSupply',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'tier',
                type: 'uint8',
              },
              {
                internalType: 'uint32',
                name: 'maxMintable',
                type: 'uint32',
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
                name: 'cutoffTime',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'minted',
                type: 'uint32',
              },
              {
                internalType: 'uint256',
                name: 'mintRandomness',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'mintConcluded',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'mintRandomnessEnabled',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'isFrozen',
                type: 'bool',
              },
            ],
            internalType: 'struct ISoundEditionV2.TierInfo[]',
            name: 'tierInfo',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ISoundEditionV2.EditionInfo',
        name: 'info',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emitAllMetadataUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'uint64',
            name: 'startTimestamp',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'burned',
            type: 'bool',
          },
          {
            internalType: 'uint24',
            name: 'extraData',
            type: 'uint24',
          },
        ],
        internalType: 'struct IERC721AUpgradeable.TokenOwnership',
        name: 'ownership',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
    ],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'uint64',
            name: 'startTimestamp',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'burned',
            type: 'bool',
          },
          {
            internalType: 'uint24',
            name: 'extraData',
            type: 'uint24',
          },
        ],
        internalType: 'struct IERC721AUpgradeable.TokenOwnership[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'freezeCreateTier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'freezeMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'freezeTier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fundingRecipient',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
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
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'roles',
        type: 'uint256',
      },
    ],
    name: 'grantRoles',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'roles',
        type: 'uint256',
      },
    ],
    name: 'hasAllRoles',
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
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'roles',
        type: 'uint256',
      },
    ],
    name: 'hasAnyRole',
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
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'metadataModule',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'fundingRecipient',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: 'royaltyBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'isMetadataFrozen',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'operatorFilteringEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isCreateTierFrozen',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'tier',
                type: 'uint8',
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
                name: 'cutoffTime',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'mintRandomnessEnabled',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'isFrozen',
                type: 'bool',
              },
            ],
            internalType: 'struct ISoundEditionV2.TierCreation[]',
            name: 'tierCreations',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ISoundEditionV2.EditionInitialization',
        name: 'init',
        type: 'tuple',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
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
    name: 'isCreateTierFrozen',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'isFrozen',
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
    name: 'isMetadataFrozen',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'maxMintable',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'maxMintableLower',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'maxMintableUpper',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'metadataModule',
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
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: 'fromTokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'mintConcluded',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'mintRandomness',
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
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'mintRandomnessEnabled',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'mintRandomnessOneOfOne',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: 'name_',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextTokenId',
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
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'numberBurned',
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
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'numberMinted',
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
    inputs: [],
    name: 'operatorFilteringEnabled',
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
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'rawTokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'roles',
        type: 'uint256',
      },
    ],
    name: 'renounceRoles',
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
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'roles',
        type: 'uint256',
      },
    ],
    name: 'revokeRoles',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'rolesOf',
    outputs: [
      {
        internalType: 'uint256',
        name: 'roles',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'royaltyBPS',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'salePrice',
        type: 'uint256',
      },
    ],
    name: 'royaltyInfo',
    outputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'royaltyAmount',
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
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: 'cutoff',
        type: 'uint32',
      },
    ],
    name: 'setCutoffTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'setFundingRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: 'lower',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'upper',
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
        internalType: 'address',
        name: 'module',
        type: 'address',
      },
    ],
    name: 'setMetadataModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'setMintRandomnessEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'setOperatorFilteringEnabled',
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
    name: 'setRoyalty',
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
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: 'symbol_',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'tierInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
          },
          {
            internalType: 'uint32',
            name: 'maxMintable',
            type: 'uint32',
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
            name: 'cutoffTime',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'minted',
            type: 'uint32',
          },
          {
            internalType: 'uint256',
            name: 'mintRandomness',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'mintConcluded',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'mintRandomnessEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isFrozen',
            type: 'bool',
          },
        ],
        internalType: 'struct ISoundEditionV2.TierInfo',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'tierMinted',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tierTokenIdIndex',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'tierTokenIds',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stop',
        type: 'uint256',
      },
    ],
    name: 'tierTokenIdsIn',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenTier',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
    ],
    name: 'tokenTiers',
    outputs: [
      {
        internalType: 'uint8[]',
        name: 'tiers',
        type: 'uint8[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'tokensOfOwner',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stop',
        type: 'uint256',
      },
    ],
    name: 'tokensOfOwnerIn',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalBurned',
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
    inputs: [],
    name: 'totalMinted',
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
    inputs: [],
    name: 'totalSupply',
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
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
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
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]',
      },
    ],
    name: 'withdrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const soundEditionV2Bytecode =
  '0x608060405234801561001057600080fd5b50615508806100206000396000f3fe6080604052600436106104ca5760003560e01c80637793818111610276578063b9c9d93a1161014f578063e1a45218116100c1578063eebab8ef11610085578063eebab8ef14610ed6578063f04e283e14610ee9578063f2fde38b14610efc578063f982bc6f14610f0f578063fb796e6c14610f2f578063fee81cf414610f4457600080fd5b8063e1a4521814610e49578063e7a6020d14610e5f578063e8a3d48514610e81578063e985e9c514610e96578063eb78a07614610eb657600080fd5b8063d111515d11610113578063d111515d14610db5578063d539139314610dca578063d89135cd14610ddf578063db0ea80514610df4578063dc33e68114610e14578063e086e5ec14610e3457600080fd5b8063b9c9d93a14610cf3578063c0ede3cf14610d28578063c23dc68f14610d48578063c5bc5a4c14610d75578063c87b56dd14610d9557600080fd5b8063a22cb465116101e8578063aec9b83c116101ac578063aec9b83c14610c40578063b0fbdc8b14610c60578063b393cf7a14610c80578063b7c0b8e814610ca0578063b7c858fb14610cc0578063b88d4fde14610ce057600080fd5b8063a22cb46514610ba9578063a2309ff814610bc9578063a4198fa214610bde578063a468f04314610bfe578063a8f5473e14610c1e57600080fd5b806390ecf29c1161023a57806390ecf29c14610aff578063938e3d7b14610b1f57806393e8bcf914610b3f57806395d89b4114610b54578063998ad69114610b6957806399a2557a14610b8957600080fd5b80637793818114610a665780637ab51f9e14610a865780638462151c14610aa65780638da5cb5b14610ac657806390e89bb814610adf57600080fd5b80632f01b56e116103a85780635bbb21771161031a5780636c0360eb116102de5780636c0360eb146109df57806370a08231146109f4578063715018a614610a1457806375794a3c14610a1c57806375b238fc14610a31578063774de39614610a4657600080fd5b80635bbb2177146109205780635f08f8761461094d5780636352211e1461096d578063649e705f1461098d5780636a3d27c6146109bf57600080fd5b806342966c681161036c57806342966c681461086e578063465664811461088e5780634a4ee7b1146108ae578063514e62fc146108c157806354d1f13d146108f857806355f804b31461090057600080fd5b80632f01b56e146107c157806335766f4b146107ee5780633684d1001461081b57806336e79a5a1461083b57806342842e0e1461085b57600080fd5b80631c10893f11610441578063241d965111610405578063241d9651146106e75780632478d6391461070757806325692962146107275780632a036a4d1461072f5780632a55205a1461074f5780632de948071461078e57600080fd5b80631c10893f146106485780631c519ba41461065b5780631cd64df4146106705780631cdb1765146106a757806323b872dd146106d457600080fd5b8063095ea7b311610493578063095ea7b3146105b45780630e24495e146105c9578063110db80e146105eb57806318160ddd14610600578063183a4f6e146106155780631bb534ba1461062857600080fd5b80624dad56146104cf578063010fe62c1461050957806301ffc9a71461052a57806306fdde031461055a578063081812fc1461057c575b600080fd5b3480156104db57600080fd5b506104ef6104ea366004614311565b610f77565b60405163ffffffff90911681526020015b60405180910390f35b61051c610517366004614377565b610f96565b604051908152602001610500565b34801561053657600080fd5b5061054a6105453660046143e6565b61103c565b6040519015158152602001610500565b34801561056657600080fd5b5061056f611088565b6040516105009190614453565b34801561058857600080fd5b5061059c610597366004614466565b611098565b6040516001600160a01b039091168152602001610500565b6105c76105c2366004614496565b6110dc565b005b3480156105d557600080fd5b5061054a600554600160b01b9004600116151590565b3480156105f757600080fd5b506105c7611133565b34801561060c57600080fd5b5061051c611193565b6105c7610623366004614466565b6111b3565b34801561063457600080fd5b5060055461059c906001600160a01b031681565b6105c7610656366004614496565b6111c0565b34801561066757600080fd5b506105c76111d6565b34801561067c57600080fd5b5061054a61068b366004614496565b638b78c6d8600c90815260009290925260209091205481161490565b3480156106b357600080fd5b506106c76106c23660046144c0565b611226565b6040516105009190614501565b6105c76106e236600461453c565b6112d5565b3480156106f357600080fd5b506105c7610702366004614578565b611335565b34801561071357600080fd5b5061051c610722366004614578565b611349565b6105c7611354565b34801561073b57600080fd5b5061054a61074a366004614311565b6113a3565b34801561075b57600080fd5b5061076f61076a366004614593565b6113c1565b604080516001600160a01b039093168352602083019190915201610500565b34801561079a57600080fd5b5061051c6107a9366004614578565b638b78c6d8600c908152600091909152602090205490565b3480156107cd57600080fd5b506107e16107dc366004614311565b611401565b60405161050091906145f0565b3480156107fa57600080fd5b5061080e610809366004614311565b61141d565b60405161050091906146c0565b34801561082757600080fd5b5060065461059c906001600160a01b031681565b34801561084757600080fd5b506105c76108563660046146e1565b6114e3565b6105c761086936600461453c565b61154f565b34801561087a57600080fd5b506105c7610889366004614466565b61156a565b34801561089a57600080fd5b506105c76108a936600461493e565b611575565b6105c76108bc366004614496565b611728565b3480156108cd57600080fd5b5061054a6108dc366004614496565b638b78c6d8600c90815260009290925260209091205416151590565b6105c761173a565b34801561090c57600080fd5b506105c761091b366004614aa7565b611776565b34801561092c57600080fd5b5061094061093b3660046144c0565b6117d3565b6040516105009190614b17565b34801561095957600080fd5b5061059c610968366004614b59565b61181f565b34801561097957600080fd5b5061059c610988366004614466565b61185f565b34801561099957600080fd5b506109ad6109a8366004614466565b61186a565b60405160ff9091168152602001610500565b3480156109cb57600080fd5b506105c76109da366004614311565b611889565b3480156109eb57600080fd5b5061056f611905565b348015610a0057600080fd5b5061051c610a0f366004614578565b611916565b6105c7611975565b348015610a2857600080fd5b5061051c611989565b348015610a3d57600080fd5b5061051c600181565b348015610a5257600080fd5b506105c7610a61366004614bdb565b611993565b348015610a7257600080fd5b5061051c610a81366004614466565b6119de565b348015610a9257600080fd5b506105c7610aa1366004614bf7565b611a4d565b348015610ab257600080fd5b506107e1610ac1366004614578565b611adc565b348015610ad257600080fd5b50638b78c6d8195461059c565b348015610aeb57600080fd5b506105c7610afa3660046144c0565b611b00565b348015610b0b57600080fd5b506105c7610b1a366004614c21565b611bea565b348015610b2b57600080fd5b506105c7610b3a366004614aa7565b611d44565b348015610b4b57600080fd5b506109ad600081565b348015610b6057600080fd5b5061056f611d91565b348015610b7557600080fd5b506105c7610b84366004614c64565b611d9b565b348015610b9557600080fd5b506107e1610ba4366004614c8e565b611e38565b348015610bb557600080fd5b506105c7610bc4366004614cc1565b611e4d565b348015610bd557600080fd5b5061051c611e9f565b348015610bea57600080fd5b506105c7610bf9366004614578565b611ea9565b348015610c0a57600080fd5b506104ef610c19366004614311565b611f0a565b348015610c2a57600080fd5b5061054a600554600160b01b9004600416151590565b348015610c4c57600080fd5b5061054a610c5b366004614311565b611f80565b348015610c6c57600080fd5b506104ef610c7b366004614311565b611f9e565b348015610c8c57600080fd5b5061051c610c9b366004614311565b611fbd565b348015610cac57600080fd5b506105c7610cbb366004614cdd565b611fd0565b348015610ccc57600080fd5b506104ef610cdb366004614311565b612059565b6105c7610cee366004614cf8565b612078565b348015610cff57600080fd5b50600554610d1590600160a01b900461ffff1681565b60405161ffff9091168152602001610500565b348015610d3457600080fd5b506107e1610d43366004614d73565b6120b3565b348015610d5457600080fd5b50610d68610d63366004614466565b6121a7565b6040516105009190614d91565b348015610d8157600080fd5b506104ef610d90366004614311565b61220a565b348015610da157600080fd5b5061056f610db0366004614466565b61221d565b348015610dc157600080fd5b506105c761224e565b348015610dd657600080fd5b5061051c600281565b348015610deb57600080fd5b5061051c6122da565b348015610e0057600080fd5b5061054a610e0f366004614311565b6122e4565b348015610e2057600080fd5b5061051c610e2f366004614578565b6122f7565b348015610e4057600080fd5b506105c7612302565b348015610e5557600080fd5b50610d1561271081565b348015610e6b57600080fd5b50610e74612363565b6040516105009190614dda565b348015610e8d57600080fd5b5061056f61257c565b348015610ea257600080fd5b5061054a610eb1366004614f2e565b612588565b348015610ec257600080fd5b506104ef610ed1366004614311565b6125c5565b61051c610ee4366004614f58565b6125e4565b6105c7610ef7366004614578565b612662565b6105c7610f0a366004614578565b61269f565b348015610f1b57600080fd5b5061056f610f2a366004614466565b6126c6565b348015610f3b57600080fd5b5061054a6127a7565b348015610f5057600080fd5b5061051c610f5f366004614578565b63389a75e1600c908152600091909152602090205490565b6000610f82826127be565b54600160601b900463ffffffff1692915050565b60006001610fa3816127fe565b610faf8685850261284c565b915060005b808514610ff357610feb868683818110610fd057610fd0614f76565b9050602002016020810190610fe59190614578565b856129cb565b600101610fb4565b507f0b411e173d03042c3eb682fe6cf8f1d64b549c283a9ed7e0f83a9711ee0841e8868686868660405161102b959493929190614fc8565b60405180910390a150949350505050565b60006110826001600160e01b03198316633088f0c560e01b1461105e846129f9565b6001600160e01b0319851663152a902d60e11b8114906301ffc9a760e01b14612a47565b92915050565b6060611092612a5b565b50919050565b60006110a382612be3565b6110b7576110b76333d1c03960e21b612c41565b6110bf612c4b565b60009283526006016020525060409020546001600160a01b031690565b81731e0049783f008a0085193e00003d00cd54003c716001600160a01b0382161461112457611116600554600160b01b9004600216151590565b156111245761112481612c6f565b61112e8383612cb3565b505050565b600161113e816127fe565b611146612cbf565b6005805460ff60b01b1981166004600160b01b9283900460ff16179091021790556040517f36c5c1f433b3c0800132549fa10c9deefbeafdd7b70aba4bbc6a987ca2fef54790600090a150565b6000600161119f612c4b565b600101546111ab612c4b565b540303919050565b6111bd3382612cf2565b50565b6111c8612cfe565b6111d28282612d19565b5050565b7f6bd5c950a8d8df17f772f5af37cb3655737899cbf903264b9795592da439661c600180611202612d25565b61120c919061500f565b6040805192835260208301919091520160405180910390a1565b6060816001600160401b03811115611240576112406146fc565b604051908082528060200260200182016040528015611269578160200160208202803683370190505b50905060005b8083146112ce576112a284848381811061128b5761128b614f76565b905060200201356008612d3590919063ffffffff16565b8282815181106112b4576112b4614f76565b60ff9092166020928302919091019091015260010161126f565b5092915050565b826001600160a01b038116331461132457731e0049783f008a0085193e00003d00cd54003c71331461132457611316600554600160b01b9004600216151590565b156113245761132433612c6f565b61132f848484612d56565b50505050565b6001611340816127fe565b6111d282612f19565b600061108282612f70565b60006202a3006001600160401b03164201905063389a75e1600c5233600052806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b60006110826113b1836127be565b54600160c81b9004600216151590565b6005546001600160a01b03166000600160f01b83106113e2576113e2612fb5565b600554612710600160a01b90910461ffff168402045b90509250929050565b606061108282600061141285612059565b63ffffffff166120b3565b6114256142ac565b6000611430836127be565b60ff84168352905061144181612fc3565b63ffffffff90811660208401528154600160401b810482166040850152600160601b810482166060850152600160801b810482166080850152600160a01b90041660a083015261149081613016565b60c08301526114a98154600160c81b9004600216151590565b15156101008301526114ba8161305f565b151560e08301526114d58154600160c81b9004600416151590565b151561012083015250919050565b60016114ee816127fe565b6114f782613089565b6005805461ffff60a01b1916600160a01b61ffff8516908102919091179091556040519081527f092d0aa94dc2b378c7fd77faaaf4cb3fd8336ae247cd486fb593726705772ac0906020015b60405180910390a15050565b61112e83838360405180602001604052806000815250612078565b6111bd8160016130b0565b61158781600001518260200151613228565b6115976115926132ad565b6132e5565b6115a48160c00151613089565b6115b18160a00151613321565b60608101516115c290600190613348565b60808101516115d390600390613348565b60a0810151600580546001600160a01b0319166001600160a01b03909216919091179055610140810151516000819003611620576040516392ce813760e01b815260040160405180910390fd5b60005b81811461165957611651836101400151828151811061164457611644614f76565b6020026020010151613361565b600101611623565b50506040810151600680546001600160a01b0319166001600160a01b0390921691909117905560c08101516005805461ffff60a01b1916600160a01b61ffff909316929092029190911790556101208101511515600402610100820151151560020260e083015115151717600560166101000a81548160ff021916908360ff1602179055507fa3b86a860bd9998b50eb73f747d1c1e8a794e86b16ac067bb914d1395b275c208160405161170d91906150ab565b60405180910390a1806101000151156111bd576111bd613511565b611730612cfe565b6111d28282612cf2565b63389a75e1600c523360005260006020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b6001611781816127fe565b611789613530565b611794600183613563565b7ff9c7803e94e0d3c02900d8a90893a6d5e90dd04d32a4cfe825520f82bf9f32f6826040516117c39190614453565b60405180910390a16111d26111d6565b60408051828152600583901b8082016020019092526060915b801561181757601f1980820191860101356000611808826121a7565b84840160200152506117ec9050565b509392505050565b6000600161182c816127fe565b604051838582376000805260206000858360008a5af1611850573d6000803e3d6000fd5b50600051915061181782612f19565b60006110828261356f565b6008602052600581901c60009081526040812054601f8319161a611082565b6001611894816127fe565b600061189f836127be565b90506118aa81613631565b805460ff600160c81b80830482166004170260ff60c81b1990921691909117825560405190841681527f5455468b416476a27220f0fc8daad92345a6c408a0356acd2560b63bf0e51d949060200160405180910390a1505050565b60606119116001613663565b905090565b60006001600160a01b038216611936576119366323d3ad8160e21b612c41565b6001600160401b03611946612c4b565b6005016000846001600160a01b03166001600160a01b0316815260200190815260200160002054169050919050565b61197d612cfe565b611987600061374e565b565b6000611911612d25565b600161199e816127fe565b6119a6612cbf565b6119af82613361565b7fc14f5a12ed3f072ab9522493ce2b476e950ee5a3f3abf2324961c6ac66b00e948260405161154391906151c7565b6000806119ea8361186a565b9050600080611a228560006119fe86612059565b60ff8716600090815260096020526040902092919063ffffffff9081169061378c16565b91509150611a366401000000008610831690565b611a4257600019611a44565b805b95945050505050565b6001611a58816127fe565b6000611a63846127be565b9050611a6e81613631565b611a77816137b0565b805463ffffffff60801b1916600160801b63ffffffff85169081029190911782556040805160ff8716815260208101929092527fbfb64051edb1b4f08e14520b9ed4d2609e52d66c0c83cfb1ac125ab41734fceb91015b60405180910390a150505050565b606060016000611aea612d25565b90506060818314611a4257611a448584846137d7565b6000816001600160401b03811115611b1a57611b1a6146fc565b604051908082528060200260200182016040528015611b43578160200160208202803683370190505b506005549091506001600160a01b031660005b808414611bb257611b8d858583818110611b7257611b72614f76565b9050602002016020810190611b879190614578565b836138df565b838281518110611b9f57611b9f614f76565b6020908102919091010152600101611b56565b507fcadee7ff7164fffa7c9c81726bbc520c1fb0bc36d7ac763997ea74aee0e387e48185858533604051611ace9594939291906151d5565b6001611bf5816127fe565b6000611c00856127be565b9050611c0b81613631565b611c14816137b0565b8054600160a01b900463ffffffff168015611c8e578154600160601b810463ffffffff90811686821611600160401b9092048116908716111715611c6b57604051633a964d4760e01b815260040160405180910390fd5b63ffffffff85168181108282180218945063ffffffff8416818110828218021893505b8363ffffffff168563ffffffff161115611cbb57604051633a964d4760e01b815260040160405180910390fd5b815467ffffffffffffffff60401b1916600160401b63ffffffff87811691820263ffffffff60601b191692909217600160601b9287169283021784556040805160ff8a16815260208101929092528101919091527faabbe826f21f31d8508fe47762ab61162f999f0c296e1a88ce50d1ef0ea6da849060600160405180910390a1505050505050565b6001611d4f816127fe565b611d57613530565b611d62600383613563565b7faf497693a87db12ca89131a31edbb3db4bb5702dfb284e8ae7427d185f09112d826040516115439190614453565b6060611082612a5b565b6001611da6816127fe565b6000611db1846127be565b9050611dbc81613631565b611dc581613957565b8054611de89060ff600160c81b9091041660028560ff8383161615901518021890565b815460ff60c81b1916600160c81b60ff9283160217825560408051918616825284151560208301527f9213f35ab455184cb0b8872ec8a16bd1fb69d2f0e909f4174a93470cd5e225009101611ace565b6060611e458484846137d7565b949350505050565b81731e0049783f008a0085193e00003d00cd54003c716001600160a01b03821614611e9557611e87600554600160b01b9004600216151590565b15611e9557611e9581612c6f565b61112e8383613984565b6000611911613a01565b6001611eb4816127fe565b611ebc613530565b600680546001600160a01b0319166001600160a01b0384169081179091556040519081527ff3fdd6d3ba37d1479142dbb6aef216c352108f558ce922646b4b0d86454d1138906020016117c3565b600080611f16836127be565b90506000611f2382613016565b90506000611f3083612fc3565b63ffffffff1690508015821517611f755760ff85166000908152600960209081526040808320848606600381901c855292529091205460059190911b60e0161c611a44565b600095945050505050565b6000611082611f8e836127be565b54600160c81b9004600416151590565b6000611fa9826127be565b54600160801b900463ffffffff1692915050565b6000611082611fcb836127be565b613016565b6001611fdb816127fe565b600554611fff9060ff600160b01b9091041660028460ff8383161615901518021890565b600560166101000a81548160ff021916908360ff160217905550811561202757612027613511565b60405182151581527fdf13a96ac57161f0b62aae644560a12a80c1877faac821ee18874355ff1ab73b90602001611543565b6000612064826127be565b54600160a01b900463ffffffff1692915050565b6120838484846112d5565b6001600160a01b0383163b1561132f5761209f84848484613a14565b61132f5761132f6368d2bf6b60e11b612c41565b606082820360006120c386612059565b63ffffffff1690508084118486101517156120f157604051631960ccad60e11b815260040160405180910390fd5b816001600160401b03811115612109576121096146fc565b604051908082528060200260200182016040528015612132578160200160208202803683370190505b5060ff871660009081526009602052604081209194505b83811461219c57868101600381901c60009081526020849052604090205460059190911b60e0161c63ffffffff1685828151811061218957612189614f76565b6020908102919091010152600101612149565b505050509392505050565b60408051608081018252600080825260208201819052918101829052606081019190915260018210612205576121db612d25565b821015612205575b6121ec82613af6565b6121fc57600019909101906121e3565b61108282613b16565b919050565b6000611082612218836127be565b612fc3565b606061222882612be3565b61224557604051630a14c4b560e41b815260040160405180910390fd5b611082826126c6565b6001612259816127fe565b612261613530565b6005805460ff60b01b1981166001600160b01b9283900460ff16179091021790556006547f7028d29d7b13876d9de031ac95eb6acef3e844e1d010820781406e6cd5fc70f9906001600160a01b03166122b8611905565b6122c061257c565b6040516122cf93929190615220565b60405180910390a150565b6000611911613b9f565b60006110826122f2836127be565b61305f565b600061108282613bb2565b60055447906001600160a01b031661231a8183613bc6565b604080516001600160a01b03831681526020810184905233918101919091527f134d6e96840903022b8e4b57aa0644e9eb6ca6fe65a25205b0857fe918c2bcc690606001611543565b6123f8604051806101e001604052806060815260200160608152602001606081526020016060815260200160006001600160a01b0316815260200160006001600160a01b03168152602001600015158152602001600015158152602001600015158152602001600061ffff16815260200160008152602001600081526020016000815260200160008152602001606081525090565b612400611905565b815261240a61257c565b6020820152612417612a5b565b606083015260408201526005546001600160a01b0380821660808401526006541660a0830152600160b01b810460018116151560c084015260028116151560e08401526004161515610100830152600160a01b900461ffff1661012082015261247e611989565b61014082015261248c611e9f565b61018082015261249a6122da565b6101608201526124a8611193565b6101a0820152600654600160a01b810461ffff1690600160b01b900460ff16816001600160401b038111156124df576124df6146fc565b60405190808252806020026020018201604052801561251857816020015b6125056142ac565b8152602001906001900390816124fd5790505b506101c08401525b8115612577576000612531826127be565b905061253c8261141d565b846101c0015184600190039450848151811061255a5761255a614f76565b602090810291909101015254600160c01b900460ff169050612520565b505090565b60606119116003613663565b6000612592612c4b565b6001600160a01b039384166000908152600791909101602090815260408083209490951682529290925250205460ff1690565b60006125d0826127be565b54600160401b900463ffffffff1692915050565b600060036125f1816127fe565b6125fb858461284c565b915061260784846129cb565b6040805160ff871681526001600160a01b0386166020820152908101849052606081018390527f7ac572687bf4e66a8514fc2ec464fc2644c78bcb1d80a225fc51a33e0ee38bfa9060800160405180910390a1509392505050565b61266a612cfe565b63389a75e1600c52806000526020600c20805442111561269257636f5e88186000526004601cfd5b600090556111bd8161374e565b6126a7612cfe565b8060601b6126bd57637448fbae6000526004601cfd5b6111bd8161374e565b6006546060906001600160a01b03161561274b5760065460405163c87b56dd60e01b8152600481018490526001600160a01b039091169063c87b56dd90602401600060405180830381865afa158015612723573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526110829190810190615256565b6000612755611905565b9050805160000361277557604051806020016040528060008152506127a0565b8061277f84613c14565b6040516020016127909291906152c3565b6040516020818303038152906040525b9392505050565b6000611911600554600160b01b9004600216151590565b60ff8116600090815260076020526040812080549091600160c81b909104600116900361220557604051630bec67bf60e31b815260040160405180910390fd5b60006128086132ad565b638b78c6d8600c9081526000829052602090205490915082166111d257638b78c6d819546001600160a01b0316816001600160a01b0316146111d2576111d2613c58565b60008160000361286f5760405163b562e8dd60e01b815260040160405180910390fd5b612877612d25565b90506401000000006001838301031061289257612892612fb5565b600061289d846127be565b8054909150600160a01b900463ffffffff1660006128ba83612fc3565b63ffffffff169050818501818111156128e6576040516316b9b18560e01b815260040160405180910390fd5b835463ffffffff60a01b1916600160a01b63ffffffff831602178085556002600160c81b909104161561294757835461292a906001600160401b0316848885613c66565b845467ffffffffffffffff19166001600160401b03919091161784555b60ff87166000908152600960205260408120905b8781146129bf576129a082868301898401826020528160031c60005260406000206007831660051b815463ffffffff8482841c188116831b8218845550505050505050565b60ff8916156129b7576129b760088883018b613cdb565b60010161295b565b50505050505092915050565b601f811680156129df576129df8382613d01565b81811461112e576129f1836020613d01565b6020016129df565b60006301ffc9a760e01b6001600160e01b031983161480612a2a57506380ac58cd60e01b6001600160e01b03198316145b806110825750506001600160e01b031916635b5e139f60e01b1490565b6000611a4485612a578685871782565b1790565b60005460609081908015612ab357612aa981604080516080810182526000808252918101828152601f820193909352805181016020018051605f830152829052825181016060019190915291565b9093509150509091565b6000612abd612c4b565b9050806002018054612ace906152f2565b80601f0160208091040260200160405190810160405280929190818152602001828054612afa906152f2565b8015612b475780601f10612b1c57610100808354040283529160200191612b47565b820191906000526020600020905b815481529060010190602001808311612b2a57829003601f168201915b50505050509350806003018054612b5d906152f2565b80601f0160208091040260200160405190810160405280929190818152602001828054612b89906152f2565b8015612bd65780601f10612bab57610100808354040283529160200191612bd6565b820191906000526020600020905b815481529060010190602001808311612bb957829003601f168201915b5050505050925050509091565b60008160011161220557612bf5612c4b565b548210156122055760005b612c08612c4b565b600084815260049190910160205260408120549150819003612c3457612c2d83615326565b9250612c00565b600160e01b161592915050565b8060005260046000fd5b7f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4090565b69c617113400112233445560005230601a5280603a52600080604460166daaeb6d7670e522a718067333cd4e5afa612cab573d6000803e3d6000fd5b6000603a5250565b6111d282826001613df5565b612cd4600554600160b01b9004600416151590565b1561198757604051635dc9af4560e11b815260040160405180910390fd5b6111d282826000613ea6565b638b78c6d819543314611987576382b429006000526004601cfd5b6111d282826001613ea6565b6000612d2f612c4b565b54919050565b6000826020528160051c6000526040600020548219601f161a905092915050565b6000612d618261356f565b6001600160a01b039485169490915081168414612d8757612d8762a1148160e81b612c41565b600080612d9384613eff565b91509150612db88187612da33390565b6001600160a01b039081169116811491141790565b612dda57612dc68633612588565b612dda57612dda632ce44b5f60e11b612c41565b8015612de557600082555b612ded612c4b565b6001600160a01b0387166000908152600591909101602052604090208054600019019055612e19612c4b565b6001600160a01b03861660008181526005929092016020526040909120805460010190554260a01b17600160e11b17612e50612c4b565b60008681526004919091016020526040812091909155600160e11b84169003612ec65760018401612e7f612c4b565b600082815260049190910160205260408120549003612ec457612ea0612c4b565b548114612ec45783612eb0612c4b565b600083815260049190910160205260409020555b505b6001600160a01b0385168481887fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a480600003612f1057612f10633a954ecd60e21b612c41565b50505050505050565b612f2281613321565b600580546001600160a01b0319166001600160a01b0383169081179091556040519081527f94c4ad53e91574d56aff9aef0726376e9154e071a602000edf9208f28d649be1906020016122cf565b60006001600160401b036080612f84612c4b565b6005016000856001600160a01b03166001600160a01b0316815260200190815260200160002054901c169050919050565b6335278d126000526004601cfd5b8054600090600160801b900463ffffffff16421015612fee575054600160601b900463ffffffff1690565b81546110829063ffffffff600160401b8204811691600160a01b900416808218908210021890565b600061302c8254600160c81b9004600216151590565b801561303c575061303c8261305f565b156122055750546001600160401b03166000908152306020526040902080150190565b600061306a82612fc3565b915463ffffffff928316600160a01b9091049092169190911015919050565b61271061ffff821611156111bd576040516319510c8760e31b815260040160405180910390fd5b60006130bb8361356f565b9050806000806130ca86613eff565b915091508415613101576130df818433612da3565b613101576130ed8333612588565b61310157613101632ce44b5f60e11b612c41565b801561310c57600082555b6fffffffffffffffffffffffffffffffff613125612c4b565b6001600160a01b038516600081815260059290920160205260409091208054929092019091554260a01b17600360e01b1761315e612c4b565b60008881526004919091016020526040812091909155600160e11b851690036131d4576001860161318d612c4b565b6000828152600491909101602052604081205490036131d2576131ae612c4b565b5481146131d257846131be612c4b565b600083815260049190910160205260409020555b505b60405186906000906001600160a01b038616907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a4613214612c4b565b600190810180549091019055505050505050565b6000613232612c4b565b80549091501561324457613244613c58565b60018155600061327b848460008251601e600184518301031081601e850103518286015183601f0360031b1b170291505092915050565b9050806132a55760028201613290858261538b565b506003820161329f848261538b565b5061132f565b600055505050565b6000336000526e2fd5aeb385d324b580fca7c83823a08033036132dd5760206000806000845afa6132dd57600080fd5b505060005190565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b6001600160a01b0381166111bd57604051630797cc5760e31b815260040160405180910390fd5b8051600003613355575050565b6111d282826000613f27565b805160ff811660009081526007602052604090208054600160c81b90046001161561339f57604051632520e1bd60e11b815260040160405180910390fd5b60ff82166133d25763ffffffff6020840181905260408401819052606084015260006080840152600160a0840152613407565b826040015163ffffffff16836020015163ffffffff16111561340757604051633a964d4760e01b815260040160405180910390fd5b602083015181546040850151606086015167ffffffffffffffff60401b19909216600160401b63ffffffff9485160263ffffffff60601b191617600160601b918416919091021763ffffffff60801b1916600160801b929091169190910217815560a0830151151560040260808401511515600202825460ff9290911760019081178316600160c81b0260ff60c81b1983168117855560068054600160c01b600160b01b80830488169190910260ff60c01b1990941661ffff60c01b19909616959095179290921790955584549590931690910260ff60b01b1961ffff600160a01b9485900481169093019092169092021662ffffff60a01b199093169290921791909117905550565b611987733cc6cdda760b79bafa08df41ecfa224f810dceb66001613faf565b613545600554600160b01b9004600116151590565b156119875760405163b087bbf360e01b815260040160405180910390fd5b6111d282826001613f27565b60008160011161362157613581612c4b565b60008381526004919091016020526040812054915081900361360e576135a5612c4b565b5482106135bc576135bc636f96cda160e11b612c41565b6135c4612c4b565b6000199092016000818152600493909301602052604090922054905080156135bc57600160e01b81166000036135f957919050565b613609636f96cda160e11b612c41565b6135bc565b600160e01b811660000361362157919050565b612205636f96cda160e11b612c41565b6136458154600160c81b9004600416151590565b156111bd57604051633fa1be4f60e01b815260040160405180910390fd5b8054606090806137025782600101805461367c906152f2565b80601f01602080910402602001604051908101604052809291908181526020018280546136a8906152f2565b80156136f55780601f106136ca576101008083540402835291602001916136f5565b820191906000526020600020905b8154815290600101906020018083116136d857829003601f168201915b5050505050915050919050565b60606040519050604081016040526020815281602082015261372681600180614024565b604051602001613736919061544a565b60405160208183030381529060405292505050919050565b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a355565b6000806137a38663ffffffff87168686602061410b565b9150915094509492505050565b6137b98161305f565b156111bd576040516337149c8160e21b815260040160405180910390fd5b60608183106137f0576137f0631960ccad60e11b612c41565b60018310156137fe57600192505b6000613808612d25565b9050808310613815578092505b6060600061382287611916565b858710908102915081156138d357818787031161383f5786860391505b60405192506001820160051b8301604052600061385b886121a7565b90506000816040015161386c575080515b60005b6138788a613b16565b925060408301516000811461389057600092506138b5565b83511561389c57835192505b8b831860601b6138b5576001820191508a8260051b8801525b5060018a019950888a14806138c957508481145b1561386f57855250505b50909695505050505050565b60006370a0823160005230602052602060346024601c865afa601f3d111661390f576390b8ec186000526004601cfd5b81601452603451905063a9059cbb60601b60005260206000604460106000875af13d15600160005114171661394c576390b8ec186000526004601cfd5b600060345292915050565b8054600160a01b900463ffffffff16156111bd576040516330b33cff60e01b815260040160405180910390fd5b8061398d612c4b565b336000818152600792909201602090815260408084206001600160a01b03881680865290835293819020805460ff19169515159590951790945592518415158152919290917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b60006001613a0d612c4b565b5403919050565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a0290613a49903390899088908890600401615482565b6020604051808303816000875af1925050508015613a84575060408051601f3d908101601f19168201909252613a81918101906154b5565b60015b613ad9573d808015613ab2576040519150601f19603f3d011682016040523d82523d6000602084013e613ab7565b606091505b508051600003613ad157613ad16368d2bf6b60e11b612c41565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b6000613b00612c4b565b6000928352600401602052506040902054151590565b604080516080810182526000808252602082018190529181018290526060810191909152611082613b45612c4b565b60008481526004919091016020526040902054604080516080810182526001600160a01b038316815260a083901c6001600160401b03166020820152600160e01b831615159181019190915260e89190911c606082015290565b6000613ba9612c4b565b60010154905090565b60006001600160401b036040612f84612c4b565b80471015613bdc5763b12d13eb6000526004601cfd5b6000806000808486620186a0f16111d257816000526073600b5360ff6020536016600b82f06111d257620f42405a116111d257600080fd5b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a900480613c2e5750819003601f19909101908152919050565b6382b429006000526004601cfd5b8381830215611e45578284015b8560ff16600101430340600052844487181860205260406000208660008114613cbc57866001868406011115613cb7578160ff1c8860011b17600052602060002093505b613cc0565b8193505b5050819550600185019450808503613c735750949350505050565b826020528160051c60005260406000208054600052818319601f16536000519055505050565b6000613d0b612c4b565b5490506000829003613d2757613d2763b562e8dd60e01b612c41565b6001600160a01b0383164260a01b6001841460e11b1717613d46612c4b565b60008381526004919091016020526040902055680100000000000000018202613d6d612c4b565b6001600160a01b0385166000818152600592909201602052604082208054909301909255819003613da757613da7622e076360e81b612c41565b818301825b808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4818160010191508103613dac5781613deb612c4b565b555061112e915050565b6000613e008361185f565b9050818015613e185750336001600160a01b03821614155b15613e3b57613e278133612588565b613e3b57613e3b6367d9dca160e11b612c41565b83613e44612c4b565b6000858152600691909101602052604080822080546001600160a01b0319166001600160a01b0394851617905551859287811692908516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259190a450505050565b638b78c6d8600c52826000526020600c20805483811783613ec8575080841681185b80835580600c5160601c7f715ad5ce61fc9595c7b415289d59cf203f23a94fa06f04af7e489a0a76e1fe26600080a3505050505050565b6000806000613f0c612c4b565b60009485526006016020525050604090912080549092909150565b8151600060308214603183141715613f5f576461723a2f2f64ffffffffff60058601511603613f5f5760019050600584019350602b84525b8015613f8e576000613f70856141af565b602001516461723a2f2f865260041990950183815294865550613fa8565b60018501613f9c858261538b565b508215613fa857600085555b5050505050565b6001600160a01b0390911690637d3e3dbe81613fdc5782613fd55750634420e486613fdc565b5063a0af29035b8060e01b60005230600452826024526004600060446000806daaeb6d7670e522a718067333cd4e5af161401a578060005160e01c0361401a57600080fd5b5060006024525050565b606083518015611817576003600282010460021b60405192507f4142434445464748494a4b4c4d4e4f505152535455565758595a616263646566601f526106708515027f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392d5f18603f52602083018181015b6003880197508751603f8160121c1651600053603f81600c1c1651600153603f8160061c1651600253603f81165160035350600051825260048201915080821061409457602001604052613d3d60f01b60038406600204808303919091526000861515909102918290035290038252509392505050565b600080838510614119578493505b6000600019860160018261010087900490506000196001881b018989035b83811684821860011c01965080841161418e57848701838104600090815260208f90526040902054908490068a021c821695508b861461418e57858c1161418357506000198601614137565b866001019350614137565b50505050931582151796188617159760018218909602189091019450505050565b6060815180156110925760038160021c02600382166141e45783820151613d3d18601e81901a1560ff909116150190036141ee565b6003821601600019015b60405192508083526020830181810191507ffc000000fc00686c7074787c8084888c9094989ca0a4a8acb0b4b8bcc0c4c8cc80605b527804080c1014181c2024282c3034383c4044484c5054585c6064603b526ef8fcf800fcd0d4d8dce0e4e8ecf0f4601a525b600486019550855180601f1a5160061c81601e1a5183161760061c81601d1a5183161760061c81601c1a51831617835250600382019150828210614255575050602081016040526000815250600060605250919050565b6040805161014081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081019190915290565b803560ff8116811461220557600080fd5b60006020828403121561432357600080fd5b6127a082614300565b60008083601f84011261433e57600080fd5b5081356001600160401b0381111561435557600080fd5b6020830191508360208260051b850101111561437057600080fd5b9250929050565b6000806000806060858703121561438d57600080fd5b61439685614300565b935060208501356001600160401b038111156143b157600080fd5b6143bd8782880161432c565b9598909750949560400135949350505050565b6001600160e01b0319811681146111bd57600080fd5b6000602082840312156143f857600080fd5b81356127a0816143d0565b60005b8381101561441e578181015183820152602001614406565b50506000910152565b6000815180845261443f816020860160208601614403565b601f01601f19169290920160200192915050565b6020815260006127a06020830184614427565b60006020828403121561447857600080fd5b5035919050565b80356001600160a01b038116811461220557600080fd5b600080604083850312156144a957600080fd5b6144b28361447f565b946020939093013593505050565b600080602083850312156144d357600080fd5b82356001600160401b038111156144e957600080fd5b6144f58582860161432c565b90969095509350505050565b6020808252825182820181905260009190848201906040850190845b818110156138d357835160ff168352928401929184019160010161451d565b60008060006060848603121561455157600080fd5b61455a8461447f565b92506145686020850161447f565b9150604084013590509250925092565b60006020828403121561458a57600080fd5b6127a08261447f565b600080604083850312156145a657600080fd5b50508035926020909101359150565b600081518084526020808501945080840160005b838110156145e5578151875295820195908201906001016145c9565b509495945050505050565b6020815260006127a060208301846145b5565b805160ff1682526020810151614621602084018263ffffffff169052565b506040810151614639604084018263ffffffff169052565b506060810151614651606084018263ffffffff169052565b506080810151614669608084018263ffffffff169052565b5060a081015161468160a084018263ffffffff169052565b5060c081015160c083015260e081015161469f60e084018215159052565b5061010081810151151590830152610120808201518015158285015261132f565b61014081016110828284614603565b803561ffff8116811461220557600080fd5b6000602082840312156146f357600080fd5b6127a0826146cf565b634e487b7160e01b600052604160045260246000fd5b60405161016081016001600160401b0381118282101715614735576147356146fc565b60405290565b604051601f8201601f191681016001600160401b0381118282101715614763576147636146fc565b604052919050565b60006001600160401b03821115614784576147846146fc565b50601f01601f191660200190565b60006147a56147a08461476b565b61473b565b90508281528383830111156147b957600080fd5b828260208301376000602084830101529392505050565b600082601f8301126147e157600080fd5b6127a083833560208501614792565b8035801515811461220557600080fd5b803563ffffffff8116811461220557600080fd5b600060c0828403121561482657600080fd5b60405160c081018181106001600160401b0382111715614848576148486146fc565b60405290508061485783614300565b815261486560208401614800565b602082015261487660408401614800565b604082015261488760608401614800565b6060820152614898608084016147f0565b60808201526148a960a084016147f0565b60a08201525092915050565b600082601f8301126148c657600080fd5b813560206001600160401b038211156148e1576148e16146fc565b6148ef818360051b0161473b565b82815260c0928302850182019282820191908785111561490e57600080fd5b8387015b85811015614931576149248982614814565b8452928401928101614912565b5090979650505050505050565b60006020828403121561495057600080fd5b81356001600160401b038082111561496757600080fd5b90830190610160828603121561497c57600080fd5b614984614712565b82358281111561499357600080fd5b61499f878286016147d0565b8252506020830135828111156149b457600080fd5b6149c0878286016147d0565b6020830152506149d26040840161447f565b60408201526060830135828111156149e957600080fd5b6149f5878286016147d0565b606083015250608083013582811115614a0d57600080fd5b614a19878286016147d0565b608083015250614a2b60a0840161447f565b60a0820152614a3c60c084016146cf565b60c0820152614a4d60e084016147f0565b60e0820152610100614a608185016147f0565b90820152610120614a728482016147f0565b908201526101408381013583811115614a8a57600080fd5b614a96888287016148b5565b918301919091525095945050505050565b600060208284031215614ab957600080fd5b81356001600160401b03811115614acf57600080fd5b611e45848285016147d0565b80516001600160a01b031682526020808201516001600160401b03169083015260408082015115159083015260609081015162ffffff16910152565b6020808252825182820181905260009190848201906040850190845b818110156138d357614b46838551614adb565b9284019260809290920191600101614b33565b600080600060408486031215614b6e57600080fd5b614b778461447f565b925060208401356001600160401b0380821115614b9357600080fd5b818601915086601f830112614ba757600080fd5b813581811115614bb657600080fd5b876020828501011115614bc857600080fd5b6020830194508093505050509250925092565b600060c08284031215614bed57600080fd5b6127a08383614814565b60008060408385031215614c0a57600080fd5b614c1383614300565b91506113f860208401614800565b600080600060608486031215614c3657600080fd5b614c3f84614300565b9250614c4d60208501614800565b9150614c5b60408501614800565b90509250925092565b60008060408385031215614c7757600080fd5b614c8083614300565b91506113f8602084016147f0565b600080600060608486031215614ca357600080fd5b614cac8461447f565b95602085013595506040909401359392505050565b60008060408385031215614cd457600080fd5b614c808361447f565b600060208284031215614cef57600080fd5b6127a0826147f0565b60008060008060808587031215614d0e57600080fd5b614d178561447f565b9350614d256020860161447f565b92506040850135915060608501356001600160401b03811115614d4757600080fd5b8501601f81018713614d5857600080fd5b614d6787823560208401614792565b91505092959194509250565b600080600060608486031215614d8857600080fd5b614cac84614300565b608081016110828284614adb565b600081518084526020808501945080840160005b838110156145e557614dc6878351614603565b610140969096019590820190600101614db3565b60208152600082516101e0806020850152614df9610200850183614427565b91506020850151601f1980868503016040870152614e178483614427565b93506040870151915080868503016060870152614e348483614427565b93506060870151915080868503016080870152614e518483614427565b935060808701519150614e6f60a08701836001600160a01b03169052565b60a08701516001600160a01b03811660c0880152915060c087015180151560e0880152915060e08701519150610100614eab8188018415159052565b8701519150610120614ec08782018415159052565b8701519150610140614ed78782018461ffff169052565b87015161016087810191909152870151610180808801919091528701516101a0808801919091528701516101c080880191909152870151868503909101838701529050614f248382614d9f565b9695505050505050565b60008060408385031215614f4157600080fd5b614f4a8361447f565b91506113f86020840161447f565b600080600060608486031215614f6d57600080fd5b61455a84614300565b634e487b7160e01b600052603260045260246000fd5b8183526000602080850194508260005b858110156145e5576001600160a01b03614fb58361447f565b1687529582019590820190600101614f9c565b60ff86168152608060208201526000614fe5608083018688614f8c565b604083019490945250606001529392505050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561108257611082614ff9565b60ff8151168252602081015163ffffffff8082166020850152806040840151166040850152806060840151166060850152505060808101511515608083015260a0810151151560a08301525050565b600081518084526020808501945080840160005b838110156145e557615098878351615022565b60c0969096019590820190600101615085565b60208152600082516101608060208501526150ca610180850183614427565b91506020850151601f19808685030160408701526150e88483614427565b93506040870151915061510660608701836001600160a01b03169052565b60608701519150808685030160808701526151218483614427565b935060808701519150808685030160a087015261513e8483614427565b935060a0870151915061515c60c08701836001600160a01b03169052565b60c087015161ffff811660e0880152915060e087015191506101006151848188018415159052565b87015191506101206151998782018415159052565b87015191506101406151ae8782018415159052565b870151868503909101838701529050614f248382615071565b60c081016110828284615022565b600060018060a01b038088168352608060208401526151f8608084018789614f8c565b838103604085015261520a81876145b5565b9250508084166060840152509695505050505050565b6001600160a01b038416815260606020820181905260009061524490830185614427565b8281036040840152614f248185614427565b60006020828403121561526857600080fd5b81516001600160401b0381111561527e57600080fd5b8201601f8101841361528f57600080fd5b805161529d6147a08261476b565b8181528560208385010111156152b257600080fd5b611a44826020830160208601614403565b600083516152d5818460208801614403565b8351908301906152e9818360208801614403565b01949350505050565b600181811c9082168061530657607f821691505b60208210810361109257634e487b7160e01b600052602260045260246000fd5b60008161533557615335614ff9565b506000190190565b601f82111561112e57600081815260208120601f850160051c810160208610156153645750805b601f850160051c820191505b8181101561538357828155600101615370565b505050505050565b81516001600160401b038111156153a4576153a46146fc565b6153b8816153b284546152f2565b8461533d565b602080601f8311600181146153ed57600084156153d55750858301515b600019600386901b1c1916600185901b178555615383565b600085815260208120601f198616915b8281101561541c578886015182559484019460019091019084016153fd565b508582101561543a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6461723a2f2f60d81b81526000825161546a816005850160208701614403565b602f60f81b6005939091019283015250600601919050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090614f2490830184614427565b6000602082840312156154c757600080fd5b81516127a0816143d056fea2646970667358221220ac19a880f01e1322df667b99ba6ced41c3da1cd305627cd9e40cf06720f4300464736f6c63430008130033' as const

export const SoundEditionV2Config = {
  abi: soundEditionV2Abi,
  bytecode: soundEditionV2Bytecode,
} as const
