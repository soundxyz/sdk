export const soundEditionV1_1Abi = [
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
    name: 'ExceedsAddressBatchMintLimit',
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
    name: 'ExceedsEditionAvailableSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAmount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidEditionMaxMintableRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidFundingRecipient',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRandomnessLock',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRoyaltyBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MaximumHasAlreadyBeenReached',
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
    name: 'MintRandomnessAlreadyRevealed',
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
    name: 'NoAddressesToAirdrop',
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
    anonymous: false,
    inputs: [
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
        internalType: 'uint32',
        name: 'editionCutoffTime_',
        type: 'uint32',
      },
    ],
    name: 'EditionCutoffTimeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'editionMaxMintableLower_',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'editionMaxMintableUpper_',
        type: 'uint32',
      },
    ],
    name: 'EditionMaxMintableRangeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'fundingRecipient',
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
        internalType: 'bool',
        name: 'mintRandomnessEnabled_',
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
        name: 'operatorFilteringEnabled_',
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
        indexed: true,
        internalType: 'address',
        name: 'edition_',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name_',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'symbol_',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'metadataModule_',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'baseURI_',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'contractURI_',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'fundingRecipient_',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'royaltyBPS_',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'editionMaxMintableLower_',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'editionMaxMintableUpper_',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'editionCutoffTime_',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'flags_',
        type: 'uint8',
      },
    ],
    name: 'SoundEditionInitialized',
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
    name: 'ADDRESS_BATCH_MINT_LIMIT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
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
    name: 'METADATA_IS_FROZEN_FLAG',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
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
    inputs: [],
    name: 'MINT_RANDOMNESS_ENABLED_FLAG',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'OPERATOR_FILTERING_ENABLED_FLAG',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
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
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
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
        name: 'balance',
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
    inputs: [],
    name: 'editionCutoffTime',
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
            internalType: 'uint32',
            name: 'editionMaxMintable',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'editionMaxMintableUpper',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'editionMaxMintableLower',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'editionCutoffTime',
            type: 'uint32',
          },
          {
            internalType: 'address',
            name: 'metadataModule',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'mintRandomness',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'royaltyBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'mintRandomnessEnabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'mintConcluded',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isMetadataFrozen',
            type: 'bool',
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
        ],
        internalType: 'struct EditionInfo',
        name: 'editionInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'editionMaxMintable',
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
    name: 'editionMaxMintableLower',
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
    name: 'editionMaxMintableUpper',
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
    name: 'freezeMetadata',
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
        name: 'operator',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol_',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'metadataModule_',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'baseURI_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'contractURI_',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'fundingRecipient_',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'royaltyBPS_',
        type: 'uint16',
      },
      {
        internalType: 'uint32',
        name: 'editionMaxMintableLower_',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'editionMaxMintableUpper_',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'editionCutoffTime_',
        type: 'uint32',
      },
      {
        internalType: 'uint8',
        name: 'flags_',
        type: 'uint8',
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
    inputs: [],
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
    inputs: [],
    name: 'mintRandomness',
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
    inputs: [],
    name: 'name',
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
        name: 'owner',
        type: 'address',
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
        name: 'tokenId',
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
        name: 'receiver',
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
        name: 'data',
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
        name: '_approved',
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
        name: 'baseURI',
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
        name: 'contractURI',
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
        internalType: 'uint32',
        name: 'editionCutoffTime_',
        type: 'uint32',
      },
    ],
    name: 'setEditionCutoffTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'editionMaxMintableLower_',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'editionMaxMintableUpper_',
        type: 'uint32',
      },
    ],
    name: 'setEditionMaxMintableRange',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'fundingRecipient',
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
        internalType: 'address',
        name: 'metadataModule',
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
        internalType: 'bool',
        name: 'mintRandomnessEnabled_',
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
        name: 'operatorFilteringEnabled_',
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

const soundEditionV1_1Bytecode =
  '0x6080604052600436106105225760003560e01c806375794a3c116102af578063bd09a10f11610179578063dd012a11116100d6578063ebcb167b1161008a578063f2fde38b1161006f578063f2fde38b14610e76578063fb796e6c14610e89578063fee81cf414610e9e57600080fd5b8063ebcb167b14610e41578063f04e283e14610e6357600080fd5b8063e7a6020d116100bb578063e7a6020d14610da2578063e8a3d48514610dc4578063e985e9c514610dd957600080fd5b8063dd012a1114610d6d578063e086e5ec14610d8d57600080fd5b8063d111515d1161012d578063d7533f0211610112578063d7533f0214610d1a578063d89135cd14610d38578063dc33e68114610d4d57600080fd5b8063d111515d14610cf0578063d539139314610d0557600080fd5b8063c23dc68f1161015e578063c23dc68f14610c7f578063c87b56dd14610cac578063ca09933114610ccc57600080fd5b8063bd09a10f14610c3f578063c204642c14610c5f57600080fd5b8063a22cb46511610227578063a6f32d43116101db578063b88d4fde116101c0578063b88d4fde14610be2578063b9c9d93a14610bf5578063bbc17bc414610c2a57600080fd5b8063a6f32d4314610bad578063b7c0b8e814610bc257600080fd5b8063a36f23ea1161020c578063a36f23ea14610b49578063a4198fa214610b69578063a572fb8f14610b8957600080fd5b8063a22cb46514610b14578063a2309ff814610b3457600080fd5b806390e89bb81161027e57806395d89b411161026357806395d89b4114610abf57806396e205fb14610ad457806399a2557a14610af457600080fd5b806390e89bb814610a7f578063938e3d7b14610a9f57600080fd5b806375794a3c14610a0f57806375b238fc14610a245780638462151c14610a395780638da5cb5b14610a6657600080fd5b8063326144a4116103f057806354d1f13d116103685780636c0360eb1161031c57806370a082311161030157806370a08231146109ba578063715018a6146109da5780637359e41f146109e257600080fd5b80636c0360eb146109905780636f38c330146109a557600080fd5b80635bbb21771161034d5780635bbb21771461092e5780635e6ae4ed1461095b5780636352211e1461097057600080fd5b806354d1f13d1461090657806355f804b31461090e57600080fd5b806340c10f19116103bf57806342966c68116103a457806342966c681461089c5780634a4ee7b1146108bc578063514e62fc146108cf57600080fd5b806340c10f191461087657806342842e0e1461088957600080fd5b8063326144a4146107e85780633684d1001461082157806336e79a5a146108415780633ab9d1391461086157600080fd5b80631c10893f1161049e57806325692962116104525780632b7e8953116104375780632b7e89531461077b5780632c02cb7e146107905780632de94807146107b757600080fd5b806325692962146107345780632a55205a1461073c57600080fd5b806323b872dd1161048357806323b872dd146106e1578063241d9651146106f45780632478d6391461071457600080fd5b80631c10893f146106975780631cd64df4146106aa57600080fd5b80630e24495e116104f557806318160ddd116104da57806318160ddd1461061b578063183a4f6e146106645780631bb534ba1461067757600080fd5b80630e24495e146105cb57806313a661ed146105ed57600080fd5b806301ffc9a71461052757806306fdde031461055c578063081812fc1461057e578063095ea7b3146105b6575b600080fd5b34801561053357600080fd5b50610547610542366004614588565b610ecf565b60405190151581526020015b60405180910390f35b34801561056857600080fd5b50610571610f96565b60405161055391906145f5565b34801561058a57600080fd5b5061059e610599366004614608565b610fa9565b6040516001600160a01b039091168152602001610553565b6105c96105c4366004614638565b611025565b005b3480156105d757600080fd5b50610547600654600160f81b9004600116151590565b3480156105f957600080fd5b5061060d6106083660046146ba565b61107c565b604051908152602001610553565b34801561062757600080fd5b507f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c41546000805160206153fb83398151915254036000190161060d565b6105c9610672366004614608565b6110af565b34801561068357600080fd5b5060055461059e906001600160a01b031681565b6105c96106a5366004614638565b6110bc565b3480156106b657600080fd5b506105476106c5366004614638565b60609190911b638b78c6d8176000908152602090205481161490565b6105c96106ef366004614767565b6110e5565b34801561070057600080fd5b506105c961070f3660046147a3565b611145565b34801561072057600080fd5b5061060d61072f3660046147a3565b611205565b6105c9611210565b34801561074857600080fd5b5061075c6107573660046147be565b611261565b604080516001600160a01b039093168352602083019190915201610553565b34801561078757600080fd5b5061060d6112a2565b34801561079c57600080fd5b506107a5600181565b60405160ff9091168152602001610553565b3480156107c357600080fd5b5061060d6107d23660046147a3565b60601b638b78c6d8176000908152602090205490565b3480156107f457600080fd5b5060055461080c90600160c01b900463ffffffff1681565b60405163ffffffff9091168152602001610553565b34801561082d57600080fd5b5060065461059e906001600160a01b031681565b34801561084d57600080fd5b506105c961085c3660046147f2565b611318565b34801561086d57600080fd5b5061080c6113e8565b61060d610884366004614638565b611454565b6105c9610897366004614767565b611643565b3480156108a857600080fd5b506105c96108b7366004614608565b61169d565b6105c96108ca366004614638565b6116a8565b3480156108db57600080fd5b506105476108ea366004614638565b60609190911b638b78c6d8176000908152602090205416151590565b6105c96116cd565b34801561091a57600080fd5b506105c9610929366004614893565b61170a565b34801561093a57600080fd5b5061094e610949366004614914565b6117a5565b6040516105539190614956565b34801561096757600080fd5b506107a5600481565b34801561097c57600080fd5b5061059e61098b366004614608565b611871565b34801561099c57600080fd5b5061057161187c565b3480156109b157600080fd5b5061060d60ff81565b3480156109c657600080fd5b5061060d6109d53660046147a3565b611888565b6105c961190f565b3480156109ee57600080fd5b50610a026109fd366004614608565b61195d565b60405161055391906149d3565b348015610a1b57600080fd5b5061060d6119a5565b348015610a3057600080fd5b5061060d600181565b348015610a4557600080fd5b50610a59610a543660046147a3565b6119bd565b6040516105539190614a49565b348015610a7257600080fd5b50638b78c6d8195461059e565b348015610a8b57600080fd5b506105c9610a9a366004614914565b611ac1565b348015610aab57600080fd5b506105c9610aba366004614893565b611c78565b348015610acb57600080fd5b50610571611d13565b348015610ae057600080fd5b506105c9610aef366004614a70565b611d26565b348015610b0057600080fd5b50610a59610b0f366004614a8b565b611dea565b348015610b2057600080fd5b506105c9610b2f366004614ace565b611f96565b348015610b4057600080fd5b5061060d611fe8565b348015610b5557600080fd5b506105c9610b64366004614af8565b612004565b348015610b7557600080fd5b506105c9610b843660046147a3565b6120fc565b348015610b9557600080fd5b5060055461080c90600160e01b900463ffffffff1681565b348015610bb957600080fd5b506105476121b8565b348015610bce57600080fd5b506105c9610bdd366004614af8565b6121e8565b6105c9610bf0366004614b13565b612295565b348015610c0157600080fd5b50600654610c1790600160e81b900461ffff1681565b60405161ffff9091168152602001610553565b348015610c3657600080fd5b506107a5600281565b348015610c4b57600080fd5b506105c9610c5a366004614b8f565b6122f7565b348015610c6b57600080fd5b5061060d610c7a366004614bb9565b6124c5565b348015610c8b57600080fd5b50610c9f610c9a366004614608565b61270c565b6040516105539190614c05565b348015610cb857600080fd5b50610571610cc7366004614608565b6127a1565b348015610cd857600080fd5b5060055461080c90600160a01b900463ffffffff1681565b348015610cfc57600080fd5b506105c96128d8565b348015610d1157600080fd5b5061060d600281565b348015610d2657600080fd5b506040516202a3008152602001610553565b348015610d4457600080fd5b5061060d6129b8565b348015610d5957600080fd5b5061060d610d683660046147a3565b6129e2565b348015610d7957600080fd5b506105c9610d88366004614c4a565b6129ed565b348015610d9957600080fd5b506105c9612c5d565b348015610dae57600080fd5b50610db7612cbf565b6040516105539190614d71565b348015610dd057600080fd5b50610571612eb8565b348015610de557600080fd5b50610547610df4366004614f13565b6001600160a01b0391821660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c476020908152604080832093909416825291909152205460ff1690565b348015610e4d57600080fd5b50610547600654600160f81b9004600216151590565b6105c9610e713660046147a3565b612ec4565b6105c9610e843660046147a3565b612f46565b348015610e9557600080fd5b50610547612fad565b348015610eaa57600080fd5b5061060d610eb93660046147a3565b60601b63389a75e1176000908152602090205490565b60006001600160e01b031982167f50899e54000000000000000000000000000000000000000000000000000000001480610f3257506001600160e01b031982167f425aac3d00000000000000000000000000000000000000000000000000000000145b80610f415750610f4182612fc4565b80610f7557506001600160e01b031982167f2a55205a00000000000000000000000000000000000000000000000000000000145b80610f9057506001600160e01b031982166301ffc9a760e01b145b92915050565b60606000610fa2613044565b5092915050565b6000610fb4826131f0565b610fea576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4660205260409020546001600160a01b031690565b81731e0049783f008a0085193e00003d00cd54003c716001600160a01b0382161461106d5761105f600654600160f81b9004600416151590565b1561106d5761106d81613251565b6110778383613295565b505050565b600060208201825160051b81015b8082146110a857600160ff8351161b8317925060208201915061108a565b5050919050565b6110b933826132a1565b50565b638b78c6d8195433146110d7576382b429006000526004601cfd5b6110e182826132f2565b5050565b826001600160a01b038116331461113457731e0049783f008a0085193e00003d00cd54003c71331461113457611126600654600160f81b9004600416151590565b156111345761113433613251565b61113f84848461333e565b50505050565b6001638b78c6d83360601b17600052806020600020541661117b57638b78c6d81954331461117b576382b429006000526004601cfd5b6001600160a01b0382166111a257604051630797cc5760e31b815260040160405180910390fd5b6005805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091556040519081527f94c4ad53e91574d56aff9aef0726376e9154e071a602000edf9208f28d649be1906020015b60405180910390a15050565b6000610f90826135f8565b60006202a30067ffffffffffffffff164201905063389a75e13360601b1760005280602060002055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b6005546006546001600160a01b03909116906000906127109061128f90600160e81b900461ffff1685614f3d565b6112999190614f6a565b90509250929050565b60006112ac6121b8565b80156112c857506112c8600654600160f81b9004600216151590565b156113125760065460408051600160a01b90920468ffffffffffffffffff16602083015230908201526060016040516020818303038152906040528051906020012060001c905090565b50600090565b6001638b78c6d83360601b17600052806020600020541661134e57638b78c6d81954331461134e576382b429006000526004601cfd5b8161271061ffff82161115611376576040516319510c8760e31b815260040160405180910390fd5b600680547fff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff16600160e81b61ffff8616908102919091179091556040519081527f092d0aa94dc2b378c7fd77faaaf4cb3fd8336ae247cd486fb593726705772ac09060200160405180910390a1505050565b600554600090600160e01b900463ffffffff164210156114165750600554600160a01b900463ffffffff1690565b60055461144f90600160c01b900463ffffffff166114446000805160206153fb833981519152546000190190565b808218908210021890565b905090565b60006002600117638b78c6d83360601b17600052806020600020541661148f57638b78c6d81954331461148f576382b429006000526004601cfd5b8260ff8111156114b25760405163428e7c1560e11b815260040160405180910390fd5b8360006114cf6000805160206153fb833981519152546000190190565b905060006114db6113e8565b63ffffffff16905080838301111561151757604051634d5c803f60e01b815282820363ffffffff81166004830152906024015b60405180910390fd5b505061152e600654600160f81b9004600216151590565b801561153f575061153d6121b8565b155b156115d457600654600160a01b900468ffffffffffffffffff16600061158c826115796000805160206153fb833981519152546000190190565b6115816113e8565b63ffffffff16613646565b90508181146115d157600680547fffffff000000000000000000ffffffffffffffffffffffffffffffffffffffff16600160a01b68ffffffffffffffffff8416021790555b50505b6000805160206153fb8339815191525493506115f08686613696565b604080516001600160a01b0388168152602081018790529081018590527f25b428dfde728ccfaddad7e29e4ac23c24ed7fd1a6e3e3f91894a9a073f5dfff9060600160405180910390a150505092915050565b826001600160a01b038116331461169257731e0049783f008a0085193e00003d00cd54003c71331461169257611684600654600160f81b9004600416151590565b156116925761169233613251565b61113f84848461381f565b6110b981600161383a565b638b78c6d8195433146116c3576382b429006000526004601cfd5b6110e182826132a1565b63389a75e13360601b176000526000602060002055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b6001638b78c6d83360601b17600052806020600020541661174057638b78c6d819543314611740576382b429006000526004601cfd5b600654600160f81b90046001161561176b5760405163b087bbf360e01b815260040160405180910390fd5b611776600183613aa1565b7ff9c7803e94e0d3c02900d8a90893a6d5e90dd04d32a4cfe825520f82bf9f32f6826040516111f991906145f5565b60608160008167ffffffffffffffff8111156117c3576117c3614662565b60405190808252806020026020018201604052801561181557816020015b6040805160808101825260008082526020808301829052928201819052606082015282526000199092019101816117e15790505b50905060005b8281146118685761184386868381811061183757611837614f8c565b9050602002013561270c565b82828151811061185557611855614f8c565b602090810291909101015260010161181b565b50949350505050565b6000610f9082613aad565b606061144f6001613b83565b60006001600160a01b0382166118ca576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600160a01b031660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c45602052604090205467ffffffffffffffff1690565b638b78c6d81954331461192a576382b429006000526004601cfd5b6000337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a36000638b78c6d81955565b606060206040510160005b8082526001841660051b820191508360011c9350831561198a57600101611968565b5060405191508060405260208201810360051c825250919050565b600061144f6000805160206153fb8339815191525490565b606060008060006119cd85611888565b905060008167ffffffffffffffff8111156119ea576119ea614662565b604051908082528060200260200182016040528015611a13578160200160208202803683370190505b5060408051608081018252600080825260208201819052918101829052606081019190915290915060015b838614611ab557611a4e81613c6e565b91508160400151611aad5781516001600160a01b031615611a6e57815194505b876001600160a01b0316856001600160a01b031603611aad5780838780600101985081518110611aa057611aa0614f8c565b6020026020010181815250505b600101611a3e565b50909695505050505050565b8060008167ffffffffffffffff811115611add57611add614662565b604051908082528060200260200182016040528015611b06578160200160208202803683370190505b50905060005b828114611c24576000858583818110611b2757611b27614f8c565b9050602002016020810190611b3c91906147a3565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa158015611b9b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bbf9190614fa2565b9050611bfd868684818110611bd657611bd6614f8c565b9050602002016020810190611beb91906147a3565b6005546001600160a01b031683613cff565b80838381518110611c1057611c10614f8c565b602090810291909101015250600101611b0c565b506005546040517fcadee7ff7164fffa7c9c81726bbc520c1fb0bc36d7ac763997ea74aee0e387e491611c6a916001600160a01b03909116908790879086903390614ff7565b60405180910390a150505050565b6001638b78c6d83360601b176000528060206000205416611cae57638b78c6d819543314611cae576382b429006000526004601cfd5b600654600160f81b900460011615611cd95760405163b087bbf360e01b815260040160405180910390fd5b611ce4600383613aa1565b7faf497693a87db12ca89131a31edbb3db4bb5702dfb284e8ae7427d185f09112d826040516111f991906145f5565b60606000611d1f613044565b9392505050565b6001638b78c6d83360601b176000528060206000205416611d5c57638b78c6d819543314611d5c576382b429006000526004601cfd5b611d646121b8565b15611d82576040516337149c8160e21b815260040160405180910390fd5b600580547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16600160e01b63ffffffff8516908102919091179091556040519081527f4b178591e114f180ac4b2567fcb348dfc0e7a947cb59eebfb6c24582fe465da7906020016111f9565b6060818310611e25576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080611e3e6000805160206153fb8339815191525490565b90506001851015611e4e57600194505b80841115611e5a578093505b6000611e6587611888565b905084861015611e845785850381811015611e7e578091505b50611e88565b5060005b60008167ffffffffffffffff811115611ea357611ea3614662565b604051908082528060200260200182016040528015611ecc578160200160208202803683370190505b50905081600003611ee2579350611d1f92505050565b6000611eed8861270c565b905060008160400151611efe575080515b885b888114158015611f105750848714155b15611f8557611f1e81613c6e565b92508260400151611f7d5782516001600160a01b031615611f3e57825191505b8a6001600160a01b0316826001600160a01b031603611f7d5780848880600101995081518110611f7057611f70614f8c565b6020026020010181815250505b600101611f00565b505050928352509095945050505050565b81731e0049783f008a0085193e00003d00cd54003c716001600160a01b03821614611fde57611fd0600654600160f81b9004600416151590565b15611fde57611fde81613251565b6110778383613d43565b600061144f6000805160206153fb833981519152546000190190565b6001638b78c6d83360601b17600052806020600020541661203a57638b78c6d81954331461203a576382b429006000526004601cfd5b6000805160206153fb833981519152546000190115612085576040517f7e11285400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81151561209d600654600160f81b9004600216151590565b1515146120ca576006805460ff600160f81b8083048216600218909116026001600160f81b039091161790555b60405182151581527ff50fbd6899784bd7b704b887719883e7dc22f8d14b4403809675b1cc38afca7c906020016111f9565b6001638b78c6d83360601b17600052806020600020541661213257638b78c6d819543314612132576382b429006000526004601cfd5b600654600160f81b90046001161561215d5760405163b087bbf360e01b815260040160405180910390fd5b6006805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091556040519081527ff3fdd6d3ba37d1479142dbb6aef216c352108f558ce922646b4b0d86454d1138906020016111f9565b60006121c26113e8565b63ffffffff166121e26000805160206153fb833981519152546000190190565b14905090565b6001638b78c6d83360601b17600052806020600020541661221e57638b78c6d81954331461221e576382b429006000526004601cfd5b811515612229612fad565b151514612263576006805460ff600160f81b8083048216600418909116026001600160f81b03909116179055811561226357612263613dce565b60405182151581527fdf13a96ac57161f0b62aae644560a12a80c1877faac821ee18874355ff1ab73b906020016111f9565b836001600160a01b03811633146122e457731e0049783f008a0085193e00003d00cd54003c7133146122e4576122d6600654600160f81b9004600416151590565b156122e4576122e433613251565b6122f085858585613def565b5050505050565b6001638b78c6d83360601b17600052806020600020541661232d57638b78c6d81954331461232d576382b429006000526004601cfd5b6123356121b8565b15612353576040516337149c8160e21b815260040160405180910390fd5b600061236f6000805160206153fb833981519152546000190190565b905063ffffffff8116156123ee576123998463ffffffff168263ffffffff16808218908210021890565b93506123b78363ffffffff168263ffffffff16808218908210021890565b60055490935063ffffffff600160a01b909104811690841611156123ee5760405163553aca7560e01b815260040160405180910390fd5b8263ffffffff168463ffffffff16111561241b5760405163553aca7560e01b815260040160405180910390fd5b600580547fffffffff0000000000000000ffffffffffffffffffffffffffffffffffffffff16600160c01b63ffffffff87811682027fffffffffffffffff00000000ffffffffffffffffffffffffffffffffffffffff1692909217600160a01b878416810291909117938490556040805192850484168352930490911660208201527fd21e10698a154bc2595631a15acc6c58a107afa7bb521433d239132136af36a69101611c6a565b60006001638b78c6d83360601b1760005280602060002054166124fd57638b78c6d8195433146124fd576382b429006000526004601cfd5b8260ff8111156125205760405163428e7c1560e11b815260040160405180910390fd5b61252a8486614f3d565b60006125466000805160206153fb833981519152546000190190565b905060006125526113e8565b63ffffffff16905080838301111561258957604051634d5c803f60e01b815282820363ffffffff811660048301529060240161150e565b50506125a0600654600160f81b9004600216151590565b80156125b157506125af6121b8565b155b1561263357600654600160a01b900468ffffffffffffffffff1660006125eb826115796000805160206153fb833981519152546000190190565b905081811461263057600680547fffffff000000000000000000ffffffffffffffffffffffffffffffffffffffff16600160a01b68ffffffffffffffffff8416021790555b50505b600086900361266e576040517fe10344d500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805160206153fb8339815191525493508560005b8181146126c3576126bb8989838181106126a0576126a0614f8c565b90506020020160208101906126b591906147a3565b88613696565b600101612684565b50507ffe9ac969bdc4dbb3461e515fb1f4b43a4bf6d21274b0c195082e75bcb586ead3878787876040516126fa9493929190615043565b60405180910390a15050509392505050565b604080516080810182526000808252602082018190529181018290526060810191909152604080516080810182526000808252602082018190529181018290526060810191909152600183108061277257506000805160206153fb833981519152548310155b1561277d5792915050565b61278683613c6e565b90508060400151156127985792915050565b611d1f83613e33565b60606127ac826131f0565b6127e2576040517fa14c4b5000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6006546001600160a01b03161561287d576006546040517fc87b56dd000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b039091169063c87b56dd90602401600060405180830381865afa158015612855573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f90919081019061506a565b600061288761187c565b905080516000036128a75760405180602001604052806000815250611d1f565b806128b184613eab565b6040516020016128c29291906150e1565b6040516020818303038152906040529392505050565b6001638b78c6d83360601b17600052806020600020541661290e57638b78c6d81954331461290e576382b429006000526004601cfd5b600654600160f81b9004600116156129395760405163b087bbf360e01b815260040160405180910390fd5b6006805460ff600160f81b80830491909116600117026001600160f81b03821681179092557f7028d29d7b13876d9de031ac95eb6acef3e844e1d010820781406e6cd5fc70f9916001600160a01b0390811691161761299661187c565b61299e612eb8565b6040516129ad93929190615110565b60405180910390a150565b600061144f7f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c415490565b6000610f9082613eef565b8461271061ffff82161115612a15576040516319510c8760e31b815260040160405180910390fd5b6000805160206153fb8339815191525415612a5c576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b038716612a8357604051630797cc5760e31b815260040160405180910390fd5b8363ffffffff168563ffffffff161115612ab05760405163553aca7560e01b815260040160405180910390fd5b612aba8c8c613f10565b60016000805160206153fb83398151915255612ad533613fa8565b612ae060018a613fe4565b612aeb600389613fe4565b600580546001600160a01b038981167fffffffffffffffff00000000000000000000000000000000000000000000000090921691909117600160a01b63ffffffff888116919091029190911777ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b898316027bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1617600160e01b918716919091021790915560068054918c167cffffffffffffffffff0000000000000000000000000000000000000000909216600160f81b60ff8616027fff0000ffffffffffffffffff0000000000000000000000000000000000000000161791909117600160e81b61ffff89160217905560405130907f81fb8daf8a05fc760e25f1447b0ca819bcf138a168ec6c1aaa0bd62b170bf32a90612c36908f908f908f908f908f908f908f908f908f908f908f9061514e565b60405180910390a26004821615612c4f57612c4f613dce565b505050505050505050505050565b6005544790612c75906001600160a01b031682613ff0565b600554604080516001600160a01b0390921682526020820183905233908201527f134d6e96840903022b8e4b57aa0644e9eb6ca6fe65a25205b0857fe918c2bcc6906060016129ad565b60408051610260810182526060808252602082018190529181018290528181019190915260006080820181905260a0820181905260c0820181905260e08201819052610100820181905261012082018190526101408201819052610160820181905261018082018190526101a082018190526101c082018190526101e0820181905261020082018190526102208201819052610240820152612d5f61187c565b8152612d69612eb8565b6020820152612d76610f96565b6040820152612d83611d13565b60608201526005546001600160a01b03166080820152612da16113e8565b63ffffffff90811660a0830152600554600160a01b8104821660c0840152600160c01b8104821660e0840152600160e01b9004166101008201526006546001600160a01b0316610120820152612df56112a2565b61014082015260065461ffff600160e81b820416610160830152600160f81b90046002161515610180820152612e296121b8565b15156101a0820152612e46600654600160f81b9004600116151590565b15156101c0820152612e566119a5565b6101e0820152612e64611fe8565b610220820152612e726129b8565b6102008201527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c41546000805160206153fb83398151915254036000190161024082015290565b606061144f6003613b83565b638b78c6d819543314612edf576382b429006000526004601cfd5b8060601b60601c905063389a75e18160601b1760005260206000208054421115612f1157636f5e88186000526004601cfd5b600081555080337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3638b78c6d81955565b638b78c6d819543314612f61576382b429006000526004601cfd5b6001600160a01b031680612f7d57637448fbae6000526004601cfd5b80337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3638b78c6d81955565b600061144f600654600160f81b9004600416151590565b60006301ffc9a760e01b6001600160e01b03198316148061300e57507f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b80610f905750506001600160e01b0319167f5b5e139f000000000000000000000000000000000000000000000000000000001490565b6000546060908190801561309c5761309281604080516080810182526000808252918101828152601f820193909352805181016020018051605f830152829052825181016060019190915291565b9093509150509091565b7f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4280546130c890615205565b80601f01602080910402602001604051908101604052809291908181526020018280546130f490615205565b80156131415780601f1061311657610100808354040283529160200191613141565b820191906000526020600020905b81548152906001019060200180831161312457829003601f168201915b5050505050925061315d6000805160206153fb83398151915290565b600301805461316b90615205565b80601f016020809104026020016040519081016040528092919081815260200182805461319790615205565b80156131e45780601f106131b9576101008083540402835291602001916131e4565b820191906000526020600020905b8154815290600101906020018083116131c757829003601f168201915b50505050509150509091565b60008160011115801561321157506000805160206153fb8339815191525482105b8015610f9057505060009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c446020526040902054600160e01b161590565b69c617113400112233445560005230601a5280603a52600080604460166daaeb6d7670e522a718067333cd4e5afa61328d573d6000803e3d6000fd5b6000603a5250565b6110e18282600161400c565b638b78c6d88260601b176000526020600020805482811681189050808255808460601b60601c7f715ad5ce61fc9595c7b415289d59cf203f23a94fa06f04af7e489a0a76e1fe26600080a350505050565b638b78c6d88260601b17600052602060002081815417808255808460601b60601c7f715ad5ce61fc9595c7b415289d59cf203f23a94fa06f04af7e489a0a76e1fe26600080a350505050565b600061334982613aad565b9050836001600160a01b0316816001600160a01b031614613396576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c466020526040902080546133e18187335b6001600160a01b039081169116811491141790565b613448576001600160a01b03861660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c476020908152604080832033845290915290205460ff1661344857604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b038516613488576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561349357600082555b6001600160a01b0386811660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b1760008581527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c446020526040812091909155600160e11b841690036135ae576001840160008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c44602052604081205490036135ac576000805160206153fb8339815191525481146135ac5760008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c44602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45b505050505050565b600067ffffffffffffffff60806000805160206153fb8339815191525b6005016000856001600160a01b03166001600160a01b0316815260200190815260200160002054901c169050919050565b60001960ff8416430301406000908152448418831860205260409020839081801561368957846001850183061115613684578160ff1c8660011b1792505b61368d565b8192505b50509392505050565b6000805160206153fb8339815191525460008290036136e1576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b03831660008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c456020908152604080832080546801000000000000000188020190558483527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b8181146137ce57808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101613796565b5081600003613809576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805160206153fb8339815191525550505050565b61107783838360405180602001604052806000815250612295565b600061384583613aad565b9050806000806138828660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c466020526040902080549091565b9150915084156138fe576138978184336133cc565b6138fe576001600160a01b03831660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c476020908152604080832033845290915290205460ff166138fe57604051632ce44b5f60e11b815260040160405180910390fd5b801561390957600082555b6001600160a01b03831660008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c456020526040902080546fffffffffffffffffffffffffffffffff0190554260a01b177c03000000000000000000000000000000000000000000000000000000001760008781527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c446020526040812091909155600160e11b85169003613a39576001860160008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4460205260408120549003613a37576000805160206153fb833981519152548114613a375760008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c44602052604090208590555b505b60405186906000906001600160a01b038616907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a450507f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c418054600101905550505050565b6110e182826001614134565b600081600111613b6a575060008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c44602052604081205490600160e01b82169003613b6a5780600003613b65576000805160206153fb833981519152548210613b2b57604051636f96cda160e11b815260040160405180910390fd5b506000190160008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4460205260409020548015613b2b575b919050565b604051636f96cda160e11b815260040160405180910390fd5b805460609080613c2257826001018054613b9c90615205565b80601f0160208091040260200160405190810160405280929190818152602001828054613bc890615205565b8015613c155780601f10613bea57610100808354040283529160200191613c15565b820191906000526020600020905b815481529060010190602001808311613bf857829003601f168201915b5050505050915050919050565b606060405190506040810160405260208152816020820152613c46816001806141d5565b604051602001613c569190615239565b60405160208183030381529060405292505050919050565b604080516080810182526000808252602082018190529181018290526060810191909152610f906000805160206153fb83398151915260008481526004919091016020526040902054604080516080810182526001600160a01b038316815260a083901c67ffffffffffffffff166020820152600160e01b831615159181019190915260e89190911c606082015290565b60405163a9059cbb6000528260205281604052602060006044601c6000885af13d156001600051141716613d3b576390b8ec186000526004601cfd5b604052505050565b3360008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c47602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b613ded733cc6cdda760b79bafa08df41ecfa224f810dceb660016142d4565b565b613dfa8484846110e5565b6001600160a01b0383163b1561113f57613e1684848484614334565b61113f576040516368d2bf6b60e11b815260040160405180910390fd5b604080516080810182526000808252602082018190529181018290526060810191909152610f90613e6383613aad565b604080516080810182526001600160a01b038316815260a083901c67ffffffffffffffff166020820152600160e01b831615159181019190915260e89190911c606082015290565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a900480613ec55750819003601f19909101908152919050565b600067ffffffffffffffff60406000805160206153fb833981519152613615565b6000613f43838360008251601e600184518301031081601e850103518286015183601f0360031b1b170291505092915050565b905080613fa1577f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c42613f7584826152eb565b507f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4361113f83826152eb565b6000555050565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b6110e182826000614134565b60008060008084865af16110e15763b12d13eb6000526004601cfd5b600061401783611871565b905081156140ab57336001600160a01b038216146140ab576001600160a01b03811660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c476020908152604080832033845290915290205460ff166140ab576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008381527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c466020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0388811691821790925591518693918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a450505050565b815160006030821460318314171561416c576461723a2f2f64ffffffffff6005860151160361416c5760019050600584019350602b84525b80156141b557600061417d85614420565b60208101516461723a2f2f87526004199096018481528688559590915084156141ae576141ae600188016000614524565b50506122f0565b600185016141c385826152eb565b5082156122f057600085555050505050565b6060835180156142cc576003600282010460021b60405192507f4142434445464748494a4b4c4d4e4f505152535455565758595a616263646566601f526102308515027f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392d5f03603f52602083018181015b6003880197508751603f8160121c16518353603f81600c1c16516001840153603f8160061c16516002840153603f81165160038401535060048201915080821061424557600384068680156142a5576001821482151501850387526142bd565b603d821515850353603d6001831460011b8503538487525b5050601f01601f191660405250505b509392505050565b6001600160a01b0390911690637d3e3dbe8161430157826142fa5750634420e486614301565b5063a0af29035b8060e01b60005250306004528160245260008060446000806daaeb6d7670e522a718067333cd4e5af15060006024525050565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a02906143699033908990889088906004016153ab565b6020604051808303816000875af19250505080156143a4575060408051601f3d908101601f191682019092526143a1918101906153dd565b60015b614402573d8080156143d2576040519150601f19603f3d011682016040523d82523d6000602084013e6143d7565b606091505b5080516000036143fa576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490505b949350505050565b60608151801561451e5780830160038260021c026003831660008114614450576001600385160382019150614468565b613d3d61ffff84511614603d60ff8551161401820391505b506040519350808452602084017ffc000000fc00686c7074787c8084888c9094989ca0a4a8acb0b4b8bcc0c4c8cc80605b527804080c1014181c2024282c3034383c4044484c5054585c6064603b526ef8fcf800fcd0d4d8dce0e4e8ecf0f4601a525b600487019650865180601f1a5160061c81601e1a5183161760061c81601d1a5183161760061c81601c1a518316178352506003820191508387106144cb5750508301603f01601f19166040525060006060525b50919050565b50805461453090615205565b6000825580601f10614540575050565b601f0160209004906000526020600020908101906110b991905b8082111561456e576000815560010161455a565b5090565b6001600160e01b0319811681146110b957600080fd5b60006020828403121561459a57600080fd5b8135611d1f81614572565b60005b838110156145c05781810151838201526020016145a8565b50506000910152565b600081518084526145e18160208601602086016145a5565b601f01601f19169290920160200192915050565b602081526000611d1f60208301846145c9565b60006020828403121561461a57600080fd5b5035919050565b80356001600160a01b0381168114613b6557600080fd5b6000806040838503121561464b57600080fd5b61465483614621565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156146a1576146a1614662565b604052919050565b803560ff81168114613b6557600080fd5b600060208083850312156146cd57600080fd5b823567ffffffffffffffff808211156146e557600080fd5b818501915085601f8301126146f957600080fd5b81358181111561470b5761470b614662565b8060051b915061471c848301614678565b818152918301840191848101908884111561473657600080fd5b938501935b8385101561475b5761474c856146a9565b8252938501939085019061473b565b98975050505050505050565b60008060006060848603121561477c57600080fd5b61478584614621565b925061479360208501614621565b9150604084013590509250925092565b6000602082840312156147b557600080fd5b611d1f82614621565b600080604083850312156147d157600080fd5b50508035926020909101359150565b803561ffff81168114613b6557600080fd5b60006020828403121561480457600080fd5b611d1f826147e0565b600067ffffffffffffffff82111561482757614827614662565b50601f01601f191660200190565b60006148486148438461480d565b614678565b905082815283838301111561485c57600080fd5b828260208301376000602084830101529392505050565b600082601f83011261488457600080fd5b611d1f83833560208501614835565b6000602082840312156148a557600080fd5b813567ffffffffffffffff8111156148bc57600080fd5b61441884828501614873565b60008083601f8401126148da57600080fd5b50813567ffffffffffffffff8111156148f257600080fd5b6020830191508360208260051b850101111561490d57600080fd5b9250929050565b6000806020838503121561492757600080fd5b823567ffffffffffffffff81111561493e57600080fd5b61494a858286016148c8565b90969095509350505050565b6020808252825182820181905260009190848201906040850190845b81811015611ab5576149c08385516001600160a01b03815116825267ffffffffffffffff602082015116602083015260408101511515604083015262ffffff60608201511660608301525050565b9284019260809290920191600101614972565b6020808252825182820181905260009190848201906040850190845b81811015611ab557835160ff16835292840192918401916001016149ef565b600081518084526020808501945080840160005b83811015614a3e57815187529582019590820190600101614a22565b509495945050505050565b602081526000611d1f6020830184614a0e565b803563ffffffff81168114613b6557600080fd5b600060208284031215614a8257600080fd5b611d1f82614a5c565b600080600060608486031215614aa057600080fd5b614aa984614621565b95602085013595506040909401359392505050565b80358015158114613b6557600080fd5b60008060408385031215614ae157600080fd5b614aea83614621565b915061129960208401614abe565b600060208284031215614b0a57600080fd5b611d1f82614abe565b60008060008060808587031215614b2957600080fd5b614b3285614621565b9350614b4060208601614621565b925060408501359150606085013567ffffffffffffffff811115614b6357600080fd5b8501601f81018713614b7457600080fd5b614b8387823560208401614835565b91505092959194509250565b60008060408385031215614ba257600080fd5b614bab83614a5c565b915061129960208401614a5c565b600080600060408486031215614bce57600080fd5b833567ffffffffffffffff811115614be557600080fd5b614bf1868287016148c8565b909790965060209590950135949350505050565b81516001600160a01b0316815260208083015167ffffffffffffffff169082015260408083015115159082015260608083015162ffffff169082015260808101610f90565b60008060008060008060008060008060006101608c8e031215614c6c57600080fd5b67ffffffffffffffff808d351115614c8357600080fd5b614c908e8e358f01614873565b9b508060208e01351115614ca357600080fd5b614cb38e60208f01358f01614873565b9a50614cc160408e01614621565b99508060608e01351115614cd457600080fd5b614ce48e60608f01358f01614873565b98508060808e01351115614cf757600080fd5b50614d088d60808e01358e01614873565b9650614d1660a08d01614621565b9550614d2460c08d016147e0565b9450614d3260e08d01614a5c565b9350614d416101008d01614a5c565b9250614d506101208d01614a5c565b9150614d5f6101408d016146a9565b90509295989b509295989b9093969950565b6020815260008251610260806020850152614d906102808501836145c9565b91506020850151601f1980868503016040870152614dae84836145c9565b93506040870151915080868503016060870152614dcb84836145c9565b9350606087015191508086850301608087015250614de983826145c9565b9250506080850151614e0660a08601826001600160a01b03169052565b5060a085015163ffffffff811660c08601525060c085015163ffffffff811660e08601525060e0850151610100614e448187018363ffffffff169052565b8601519050610120614e5d8682018363ffffffff169052565b8601519050610140614e79868201836001600160a01b03169052565b860151610160868101919091528601519050610180614e9d8187018361ffff169052565b86015190506101a0614eb28682018315159052565b86015190506101c0614ec78682018315159052565b86015190506101e0614edc8682018315159052565b8601516102008681019190915286015161022080870191909152860151610240808701919091529095015193019290925250919050565b60008060408385031215614f2657600080fd5b614f2f83614621565b915061129960208401614621565b6000816000190483118215151615614f6557634e487b7160e01b600052601160045260246000fd5b500290565b600082614f8757634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b600060208284031215614fb457600080fd5b5051919050565b8183526000602080850194508260005b85811015614a3e576001600160a01b03614fe483614621565b1687529582019590820190600101614fcb565b60006001600160a01b0380881683526080602084015261501b608084018789614fbb565b838103604085015261502d8187614a0e565b9250508084166060840152509695505050505050565b606081526000615057606083018688614fbb565b6020830194909452506040015292915050565b60006020828403121561507c57600080fd5b815167ffffffffffffffff81111561509357600080fd5b8201601f810184136150a457600080fd5b80516150b26148438261480d565b8181528560208385010111156150c757600080fd5b6150d88260208301602086016145a5565b95945050505050565b600083516150f38184602088016145a5565b8351908301906151078183602088016145a5565b01949350505050565b6001600160a01b038416815260606020820152600061513260608301856145c9565b828103604084015261514481856145c9565b9695505050505050565b60006101608083526151628184018f6145c9565b90508281036020840152615176818e6145c9565b90506001600160a01b03808d166040850152838203606085015261519a828d6145c9565b915083820360808501526151ae828c6145c9565b908a1660a085015261ffff891660c085015263ffffffff88811660e0860152871661010085015291506151de9050565b63ffffffff841661012083015260ff83166101408301529c9b505050505050505050505050565b600181811c9082168061521957607f821691505b60208210810361451e57634e487b7160e01b600052602260045260246000fd5b7f61723a2f2f0000000000000000000000000000000000000000000000000000008152600082516152718160058501602087016145a5565b7f2f000000000000000000000000000000000000000000000000000000000000006005939091019283015250600601919050565b601f82111561107757600081815260208120601f850160051c810160208610156152cc5750805b601f850160051c820191505b818110156135f0578281556001016152d8565b815167ffffffffffffffff81111561530557615305614662565b615319816153138454615205565b846152a5565b602080601f83116001811461534e57600084156153365750858301515b600019600386901b1c1916600185901b1785556135f0565b600085815260208120601f198616915b8281101561537d5788860151825594840194600190910190840161535e565b508582101561539b5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006001600160a01b0380871683528086166020840152508360408301526080606083015261514460808301846145c9565b6000602082840312156153ef57600080fd5b8151611d1f8161457256fe2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c40a2646970667358221220c9d097d7fcfe75f045ed189138e2ba878b446545565ba6039a274be68e01fd7064736f6c63430008100033' as const

export const SoundEditionV1_1Config = {
  abi: soundEditionV1_1Abi,
  bytecode: soundEditionV1_1Bytecode,
} as const
