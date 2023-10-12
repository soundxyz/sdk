export const soundEditionV1Abi = [
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

const soundEditionV1Bytecode =
  '0x6080604052600436106104d15760003560e01c806375794a3c11610279578063bd09a10f1161015e578063dc33e681116100d6578063e985e9c51161008a578063f04e283e1161006f578063f04e283e14610e5f578063f2fde38b14610e7f578063fee81cf414610e9f57600080fd5b8063e985e9c514610dd5578063ebcb167b14610e3d57600080fd5b8063e086e5ec116100bb578063e086e5ec14610d89578063e7a6020d14610d9e578063e8a3d48514610dc057600080fd5b8063dc33e68114610d49578063dd012a1114610d6957600080fd5b8063ca0993311161012d578063d539139311610112578063d539139314610d01578063d7533f0214610d16578063d89135cd14610d3457600080fd5b8063ca09933114610cc8578063d111515d14610cec57600080fd5b8063bd09a10f14610c3b578063c204642c14610c5b578063c23dc68f14610c7b578063c87b56dd14610ca857600080fd5b8063a22cb465116101f1578063a572fb8f116101c0578063b88d4fde116101a5578063b88d4fde14610bd1578063b9c9d93a14610bf1578063bbc17bc414610c2657600080fd5b8063a572fb8f14610b98578063a6f32d4314610bbc57600080fd5b8063a22cb46514610b23578063a2309ff814610b43578063a36f23ea14610b58578063a4198fa214610b7857600080fd5b806390e89bb81161024857806395d89b411161022d57806395d89b4114610ace57806396e205fb14610ae357806399a2557a14610b0357600080fd5b806390e89bb814610a8e578063938e3d7b14610aae57600080fd5b806375794a3c14610a1e57806375b238fc14610a335780638462151c14610a485780638da5cb5b14610a7557600080fd5b80632de94807116103ba578063514e62fc116103325780636c0360eb116102e657806370a08231116102cb57806370a08231146109bc578063715018a6146109dc5780637359e41f146109f157600080fd5b80636c0360eb146109925780636f38c330146109a757600080fd5b806355f804b31161031757806355f804b3146109255780635bbb2177146109455780636352211e1461097257600080fd5b8063514e62fc146108d957806354d1f13d1461091057600080fd5b80633ab9d1391161038957806342842e0e1161036e57806342842e0e1461087957806342966c68146108995780634a4ee7b1146108b957600080fd5b80633ab9d1391461085157806340c10f191461086657600080fd5b80632de94807146107a7578063326144a4146107d85780633684d1001461081157806336e79a5a1461083157600080fd5b80631c10893f1161044d5780632478d6391161041c5780632a55205a116104015780632a55205a1461072c5780632b7e89531461076b5780632c02cb7e1461078057600080fd5b80632478d639146106f7578063256929621461071757600080fd5b80631c10893f146106605780631cd64df41461068057806323b872dd146106b7578063241d9651146106d757600080fd5b80630e24495e116104a457806318160ddd1161048957806318160ddd146105d7578063183a4f6e146106205780631bb534ba1461064057600080fd5b80630e24495e1461058757806313a661ed146105a957600080fd5b806301ffc9a7146104d657806306fdde031461050b578063081812fc1461052d578063095ea7b314610565575b600080fd5b3480156104e257600080fd5b506104f66104f136600461411f565b610ed0565b60405190151581526020015b60405180910390f35b34801561051757600080fd5b50610520610f63565b604051610502919061418c565b34801561053957600080fd5b5061054d61054836600461419f565b610f76565b6040516001600160a01b039091168152602001610502565b34801561057157600080fd5b506105856105803660046141d4565b610ff2565b005b34801561059357600080fd5b506104f6600654600160f81b9004600116151590565b3480156105b557600080fd5b506105c96105c4366004614256565b611113565b604051908152602001610502565b3480156105e357600080fd5b507f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4154600080516020614f678339815191525403600019016105c9565b34801561062c57600080fd5b5061058561063b36600461419f565b611146565b34801561064c57600080fd5b5060055461054d906001600160a01b031681565b34801561066c57600080fd5b5061058561067b3660046141d4565b611153565b34801561068c57600080fd5b506104f661069b3660046141d4565b60609190911b638b78c6d8176000908152602090205481161490565b3480156106c357600080fd5b506105856106d2366004614303565b61117c565b3480156106e357600080fd5b506105856106f236600461433f565b611436565b34801561070357600080fd5b506105c961071236600461433f565b6114f6565b34801561072357600080fd5b50610585611501565b34801561073857600080fd5b5061074c61074736600461435a565b611552565b604080516001600160a01b039093168352602083019190915201610502565b34801561077757600080fd5b506105c9611593565b34801561078c57600080fd5b50610795600181565b60405160ff9091168152602001610502565b3480156107b357600080fd5b506105c96107c236600461433f565b60601b638b78c6d8176000908152602090205490565b3480156107e457600080fd5b506005546107fc90600160c01b900463ffffffff1681565b60405163ffffffff9091168152602001610502565b34801561081d57600080fd5b5060065461054d906001600160a01b031681565b34801561083d57600080fd5b5061058561084c36600461438e565b61161b565b34801561085d57600080fd5b506107fc6116eb565b6105c96108743660046141d4565b611757565b34801561088557600080fd5b50610585610894366004614303565b6118de565b3480156108a557600080fd5b506105856108b436600461419f565b6118fe565b3480156108c557600080fd5b506105856108d43660046141d4565b611909565b3480156108e557600080fd5b506104f66108f43660046141d4565b60609190911b638b78c6d8176000908152602090205416151590565b34801561091c57600080fd5b5061058561192e565b34801561093157600080fd5b5061058561094036600461442f565b61196b565b34801561095157600080fd5b506109656109603660046144b0565b611a06565b60405161050291906144f2565b34801561097e57600080fd5b5061054d61098d36600461419f565b611ad2565b34801561099e57600080fd5b50610520611add565b3480156109b357600080fd5b506105c960ff81565b3480156109c857600080fd5b506105c96109d736600461433f565b611ae9565b3480156109e857600080fd5b50610585611b70565b3480156109fd57600080fd5b50610a11610a0c36600461419f565b611bbe565b604051610502919061456f565b348015610a2a57600080fd5b506105c9611c06565b348015610a3f57600080fd5b506105c9600181565b348015610a5457600080fd5b50610a68610a6336600461433f565b611c1e565b60405161050291906145aa565b348015610a8157600080fd5b50638b78c6d8195461054d565b348015610a9a57600080fd5b50610585610aa93660046144b0565b611d22565b348015610aba57600080fd5b50610585610ac936600461442f565b611e20565b348015610ada57600080fd5b50610520611ebb565b348015610aef57600080fd5b50610585610afe3660046145f6565b611ece565b348015610b0f57600080fd5b50610a68610b1e366004614611565b611f92565b348015610b2f57600080fd5b50610585610b3e366004614654565b61213e565b348015610b4f57600080fd5b506105c96121c9565b348015610b6457600080fd5b50610585610b7336600461467e565b6121e5565b348015610b8457600080fd5b50610585610b9336600461433f565b6122dd565b348015610ba457600080fd5b506005546107fc90600160e01b900463ffffffff1681565b348015610bc857600080fd5b506104f6612399565b348015610bdd57600080fd5b50610585610bec366004614699565b6123c9565b348015610bfd57600080fd5b50600654610c1390600160e81b900461ffff1681565b60405161ffff9091168152602001610502565b348015610c3257600080fd5b50610795600281565b348015610c4757600080fd5b50610585610c56366004614715565b61240d565b348015610c6757600080fd5b506105c9610c7636600461473f565b6125e4565b348015610c8757600080fd5b50610c9b610c9636600461419f565b6127e3565b604051610502919061478b565b348015610cb457600080fd5b50610520610cc336600461419f565b612878565b348015610cd457600080fd5b506005546107fc90600160a01b900463ffffffff1681565b348015610cf857600080fd5b506105856129af565b348015610d0d57600080fd5b506105c9600281565b348015610d2257600080fd5b506040516202a3008152602001610502565b348015610d4057600080fd5b506105c9612a8f565b348015610d5557600080fd5b506105c9610d6436600461433f565b612ab9565b348015610d7557600080fd5b50610585610d843660046147d0565b612ac4565b348015610d9557600080fd5b50610585612d23565b348015610daa57600080fd5b50610db3612d3b565b60405161050291906148f7565b348015610dcc57600080fd5b50610520612f34565b348015610de157600080fd5b506104f6610df0366004614a99565b6001600160a01b0391821660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c476020908152604080832093909416825291909152205460ff1690565b348015610e4957600080fd5b506104f6600654600160f81b9004600216151590565b348015610e6b57600080fd5b50610585610e7a36600461433f565b612f40565b348015610e8b57600080fd5b50610585610e9a36600461433f565b612fc2565b348015610eab57600080fd5b506105c9610eba36600461433f565b60601b63389a75e1176000908152602090205490565b60006001600160e01b031982167f50899e54000000000000000000000000000000000000000000000000000000001480610f0e5750610f0e82613029565b80610f4257506001600160e01b031982167f2a55205a00000000000000000000000000000000000000000000000000000000145b80610f5d57506001600160e01b031982166301ffc9a760e01b145b92915050565b60606000610f6f6130a9565b5092915050565b6000610f818261336e565b610fb7576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4660205260409020546001600160a01b031690565b6000610ffd82611ad2565b9050336001600160a01b0382161461108b576001600160a01b03811660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c476020908152604080832033845290915290205460ff1661108b576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c466020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600060208201825160051b81015b80821461113f57600160ff8351161b83179250602082019150611121565b5050919050565b61115033826133cf565b50565b638b78c6d81954331461116e576382b429006000526004601cfd5b6111788282613420565b5050565b60006111878261346c565b9050836001600160a01b0316816001600160a01b0316146111d4576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4660205260409020805461121f8187335b6001600160a01b039081169116811491141790565b611286576001600160a01b03861660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c476020908152604080832033845290915290205460ff1661128657604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b0385166112c6576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80156112d157600082555b6001600160a01b0386811660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b1760008581527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c446020526040812091909155600160e11b841690036113ec576001840160008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c44602052604081205490036113ea57600080516020614f678339815191525481146113ea5760008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c44602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45b505050505050565b6001638b78c6d83360601b17600052806020600020541661146c57638b78c6d81954331461146c576382b429006000526004601cfd5b6001600160a01b03821661149357604051630797cc5760e31b815260040160405180910390fd5b6005805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091556040519081527f94c4ad53e91574d56aff9aef0726376e9154e071a602000edf9208f28d649be1906020015b60405180910390a15050565b6000610f5d8261353f565b60006202a30067ffffffffffffffff164201905063389a75e13360601b1760005280602060002055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b6005546006546001600160a01b03909116906000906127109061158090600160e81b900461ffff1685614ac3565b61158a9190614af0565b90509250929050565b600061159d612399565b80156115b957506115b9600654600160f81b9004600216151590565b156116155760065460408051600160a01b90920460b81b76ffffffffffffffffffffffffffffffffffffffffffffff1916602083015230908201526060016040516020818303038152906040528051906020012060001c905090565b50600090565b6001638b78c6d83360601b17600052806020600020541661165157638b78c6d819543314611651576382b429006000526004601cfd5b8161271061ffff82161115611679576040516319510c8760e31b815260040160405180910390fd5b600680547fff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff16600160e81b61ffff8616908102919091179091556040519081527f092d0aa94dc2b378c7fd77faaaf4cb3fd8336ae247cd486fb593726705772ac09060200160405180910390a1505050565b600554600090600160e01b900463ffffffff164210156117195750600554600160a01b900463ffffffff1690565b60055461175290600160c01b900463ffffffff16611747600080516020614f67833981519152546000190190565b808218908210021890565b905090565b60006002600117638b78c6d83360601b17600052806020600020541661179257638b78c6d819543314611792576382b429006000526004601cfd5b8260ff8111156117b55760405163428e7c1560e11b815260040160405180910390fd5b8360006117d2600080516020614f67833981519152546000190190565b905060006117de6116eb565b63ffffffff16905080838301111561181a57604051634d5c803f60e01b815282820363ffffffff81166004830152906024015b60405180910390fd5b5050611831600654600160f81b9004600216151590565b80156118425750611840612399565b155b156118b95760068054600160a01b80820460b890811b76ffffffffffffffffffffffffffffffffffffffffffffff1916600081811a430360001901408152444118909118602052604090207fffffff000000000000000000ffffffffffffffffffffffffffffffffffffffff90931692901c021790555b600080516020614f678339815191525493506118d5868661358d565b50505092915050565b6118f9838383604051806020016040528060008152506123c9565b505050565b611150816001613716565b638b78c6d819543314611924576382b429006000526004601cfd5b61117882826133cf565b63389a75e13360601b176000526000602060002055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b6001638b78c6d83360601b1760005280602060002054166119a157638b78c6d8195433146119a1576382b429006000526004601cfd5b600654600160f81b9004600116156119cc5760405163b087bbf360e01b815260040160405180910390fd5b6119d760018361397d565b7ff9c7803e94e0d3c02900d8a90893a6d5e90dd04d32a4cfe825520f82bf9f32f6826040516114ea919061418c565b60608160008167ffffffffffffffff811115611a2457611a246141fe565b604051908082528060200260200182016040528015611a7657816020015b604080516080810182526000808252602080830182905292820181905260608201528252600019909201910181611a425790505b50905060005b828114611ac957611aa4868683818110611a9857611a98614b12565b905060200201356127e3565b828281518110611ab657611ab6614b12565b6020908102919091010152600101611a7c565b50949350505050565b6000610f5d8261346c565b60606117526001613989565b60006001600160a01b038216611b2b576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600160a01b031660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c45602052604090205467ffffffffffffffff1690565b638b78c6d819543314611b8b576382b429006000526004601cfd5b6000337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a36000638b78c6d81955565b606060206040510160005b8082526001841660051b820191508360011c93508315611beb57600101611bc9565b5060405191508060405260208201810360051c825250919050565b6000611752600080516020614f678339815191525490565b60606000806000611c2e85611ae9565b905060008167ffffffffffffffff811115611c4b57611c4b6141fe565b604051908082528060200260200182016040528015611c74578160200160208202803683370190505b5060408051608081018252600080825260208201819052918101829052606081019190915290915060015b838614611d1657611caf81613a74565b91508160400151611d0e5781516001600160a01b031615611ccf57815194505b876001600160a01b0316856001600160a01b031603611d0e5780838780600101985081518110611d0157611d01614b12565b6020026020010181815250505b600101611c9f565b50909695505050505050565b8060005b818114611e1a57611e12848483818110611d4257611d42614b12565b9050602002016020810190611d57919061433f565b6005546001600160a01b0316868685818110611d7557611d75614b12565b9050602002016020810190611d8a919061433f565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa158015611de9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e0d9190614b28565b613b05565b600101611d26565b50505050565b6001638b78c6d83360601b176000528060206000205416611e5657638b78c6d819543314611e56576382b429006000526004601cfd5b600654600160f81b900460011615611e815760405163b087bbf360e01b815260040160405180910390fd5b611e8c60038361397d565b7faf497693a87db12ca89131a31edbb3db4bb5702dfb284e8ae7427d185f09112d826040516114ea919061418c565b60606000611ec76130a9565b9392505050565b6001638b78c6d83360601b176000528060206000205416611f0457638b78c6d819543314611f04576382b429006000526004601cfd5b611f0c612399565b15611f2a576040516337149c8160e21b815260040160405180910390fd5b600580547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16600160e01b63ffffffff8516908102919091179091556040519081527f4b178591e114f180ac4b2567fcb348dfc0e7a947cb59eebfb6c24582fe465da7906020016114ea565b6060818310611fcd576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080611fe6600080516020614f678339815191525490565b90506001851015611ff657600194505b80841115612002578093505b600061200d87611ae9565b90508486101561202c5785850381811015612026578091505b50612030565b5060005b60008167ffffffffffffffff81111561204b5761204b6141fe565b604051908082528060200260200182016040528015612074578160200160208202803683370190505b5090508160000361208a579350611ec792505050565b6000612095886127e3565b9050600081604001516120a6575080515b885b8881141580156120b85750848714155b1561212d576120c681613a74565b925082604001516121255782516001600160a01b0316156120e657825191505b8a6001600160a01b0316826001600160a01b031603612125578084888060010199508151811061211857612118614b12565b6020026020010181815250505b6001016120a8565b505050928352509095945050505050565b3360008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c47602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6000611752600080516020614f67833981519152546000190190565b6001638b78c6d83360601b17600052806020600020541661221b57638b78c6d81954331461221b576382b429006000526004601cfd5b600080516020614f67833981519152546000190115612266576040517f7e11285400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81151561227e600654600160f81b9004600216151590565b1515146122ab576006805460ff600160f81b8083048216600218909116026001600160f81b039091161790555b60405182151581527ff50fbd6899784bd7b704b887719883e7dc22f8d14b4403809675b1cc38afca7c906020016114ea565b6001638b78c6d83360601b17600052806020600020541661231357638b78c6d819543314612313576382b429006000526004601cfd5b600654600160f81b90046001161561233e5760405163b087bbf360e01b815260040160405180910390fd5b6006805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0384169081179091556040519081527ff3fdd6d3ba37d1479142dbb6aef216c352108f558ce922646b4b0d86454d1138906020016114ea565b60006123a36116eb565b63ffffffff166123c3600080516020614f67833981519152546000190190565b14905090565b6123d484848461117c565b6001600160a01b0383163b15611e1a576123f084848484613b49565b611e1a576040516368d2bf6b60e11b815260040160405180910390fd5b6001638b78c6d83360601b17600052806020600020541661244357638b78c6d819543314612443576382b429006000526004601cfd5b61244b612399565b15612469576040516337149c8160e21b815260040160405180910390fd5b6000612485600080516020614f67833981519152546000190190565b905063ffffffff811615612504576124af8463ffffffff168263ffffffff16808218908210021890565b93506124cd8363ffffffff168263ffffffff16808218908210021890565b60055490935063ffffffff600160a01b909104811690841611156125045760405163553aca7560e01b815260040160405180910390fd5b8263ffffffff168463ffffffff1611156125315760405163553aca7560e01b815260040160405180910390fd5b600580547fffffffff0000000000000000ffffffffffffffffffffffffffffffffffffffff16600160c01b63ffffffff87811682027fffffffffffffffff00000000ffffffffffffffffffffffffffffffffffffffff1692909217600160a01b878416810291909117938490556040805192850484168352930490911660208201527fd21e10698a154bc2595631a15acc6c58a107afa7bb521433d239132136af36a6910160405180910390a150505050565b60006001638b78c6d83360601b17600052806020600020541661261c57638b78c6d81954331461261c576382b429006000526004601cfd5b8260ff81111561263f5760405163428e7c1560e11b815260040160405180910390fd5b6126498486614ac3565b6000612665600080516020614f67833981519152546000190190565b905060006126716116eb565b63ffffffff1690508083830111156126a857604051634d5c803f60e01b815282820363ffffffff8116600483015290602401611811565b50506126bf600654600160f81b9004600216151590565b80156126d057506126ce612399565b155b156127475760068054600160a01b80820460b890811b76ffffffffffffffffffffffffffffffffffffffffffffff1916600081811a430360001901408152444118909118602052604090207fffffff000000000000000000ffffffffffffffffffffffffffffffffffffffff90931692901c021790555b6000869003612782576040517fe10344d500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080516020614f678339815191525493508560005b8181146127d7576127cf8989838181106127b4576127b4614b12565b90506020020160208101906127c9919061433f565b8861358d565b600101612798565b50505050509392505050565b60408051608081018252600080825260208201819052918101829052606081019190915260408051608081018252600080825260208201819052918101829052606081019190915260018310806128495750600080516020614f67833981519152548310155b156128545792915050565b61285d83613a74565b905080604001511561286f5792915050565b611ec783613c35565b60606128838261336e565b6128b9576040517fa14c4b5000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6006546001600160a01b031615612954576006546040517fc87b56dd000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b039091169063c87b56dd90602401600060405180830381865afa15801561292c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f5d9190810190614b41565b600061295e611add565b9050805160000361297e5760405180602001604052806000815250611ec7565b8061298884613cad565b604051602001612999929190614bb8565b6040516020818303038152906040529392505050565b6001638b78c6d83360601b1760005280602060002054166129e557638b78c6d8195433146129e5576382b429006000526004601cfd5b600654600160f81b900460011615612a105760405163b087bbf360e01b815260040160405180910390fd5b6006805460ff600160f81b80830491909116600117026001600160f81b03821681179092557f7028d29d7b13876d9de031ac95eb6acef3e844e1d010820781406e6cd5fc70f9916001600160a01b03908116911617612a6d611add565b612a75612f34565b604051612a8493929190614be7565b60405180910390a150565b60006117527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c415490565b6000610f5d82613cf1565b8461271061ffff82161115612aec576040516319510c8760e31b815260040160405180910390fd5b600080516020614f678339815191525415612b33576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b038716612b5a57604051630797cc5760e31b815260040160405180910390fd5b8363ffffffff168563ffffffff161115612b875760405163553aca7560e01b815260040160405180910390fd5b612b918c8c613d12565b6001600080516020614f6783398151915255612bac33613db2565b612bb760018a613dee565b612bc2600389613dee565b600580546001600160a01b038981167fffffffffffffffff00000000000000000000000000000000000000000000000090921691909117600160a01b63ffffffff888116919091029190911777ffffffffffffffffffffffffffffffffffffffffffffffff16600160c01b898316027bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1617600160e01b918716919091021790915560068054918c167cffffffffffffffffff0000000000000000000000000000000000000000909216600160f81b60ff8616027fff0000ffffffffffffffffff0000000000000000000000000000000000000000161791909117600160e81b61ffff89160217905560405130907f81fb8daf8a05fc760e25f1447b0ca819bcf138a168ec6c1aaa0bd62b170bf32a90612d0d908f908f908f908f908f908f908f908f908f908f908f90614c25565b60405180910390a2505050505050505050505050565b600554612d39906001600160a01b031647613dfa565b565b60408051610260810182526060808252602082018190529181018290528181019190915260006080820181905260a0820181905260c0820181905260e08201819052610100820181905261012082018190526101408201819052610160820181905261018082018190526101a082018190526101c082018190526101e0820181905261020082018190526102208201819052610240820152612ddb611add565b8152612de5612f34565b6020820152612df2610f63565b6040820152612dff611ebb565b60608201526005546001600160a01b03166080820152612e1d6116eb565b63ffffffff90811660a0830152600554600160a01b8104821660c0840152600160c01b8104821660e0840152600160e01b9004166101008201526006546001600160a01b0316610120820152612e71611593565b61014082015260065461ffff600160e81b820416610160830152600160f81b90046002161515610180820152612ea5612399565b15156101a0820152612ec2600654600160f81b9004600116151590565b15156101c0820152612ed2611c06565b6101e0820152612ee06121c9565b610220820152612eee612a8f565b6102008201527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4154600080516020614f6783398151915254036000190161024082015290565b60606117526003613989565b638b78c6d819543314612f5b576382b429006000526004601cfd5b8060601b60601c905063389a75e18160601b1760005260206000208054421115612f8d57636f5e88186000526004601cfd5b600081555080337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3638b78c6d81955565b638b78c6d819543314612fdd576382b429006000526004601cfd5b6001600160a01b031680612ff957637448fbae6000526004601cfd5b80337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3638b78c6d81955565b60006301ffc9a760e01b6001600160e01b03198316148061307357507f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b80610f5d5750506001600160e01b0319167f5b5e139f000000000000000000000000000000000000000000000000000000001490565b6000546060908190801561321a57600081811a67ffffffffffffffff8111156130d4576130d46141fe565b6040519080825280601f01601f1916602001820160405280156130fe576020820181803683370190505b50905060008282516001016020811061311957613119614b12565b1a67ffffffffffffffff811115613132576131326141fe565b6040519080825280601f01601f19166020018201604052801561315c576020820181803683370190505b50905060005b82518110156131b55783816001016020811061318057613180614b12565b1a60f81b83828151811061319657613196614b12565b60200101906001600160f81b031916908160001a905350600101613162565b5060005b815181101561320f578381845160020101602081106131da576131da614b12565b1a60f81b8282815181106131f0576131f0614b12565b60200101906001600160f81b031916908160001a9053506001016131b9565b509093509150509091565b7f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c42805461324690614cdc565b80601f016020809104026020016040519081016040528092919081815260200182805461327290614cdc565b80156132bf5780601f10613294576101008083540402835291602001916132bf565b820191906000526020600020905b8154815290600101906020018083116132a257829003601f168201915b505050505092506132db600080516020614f6783398151915290565b60030180546132e990614cdc565b80601f016020809104026020016040519081016040528092919081815260200182805461331590614cdc565b80156133625780601f1061333757610100808354040283529160200191613362565b820191906000526020600020905b81548152906001019060200180831161334557829003601f168201915b50505050509150509091565b60008160011115801561338f5750600080516020614f678339815191525482105b8015610f5d57505060009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c446020526040902054600160e01b161590565b638b78c6d88260601b176000526020600020805482811681189050808255808460601b60601c7f715ad5ce61fc9595c7b415289d59cf203f23a94fa06f04af7e489a0a76e1fe26600080a350505050565b638b78c6d88260601b17600052602060002081815417808255808460601b60601c7f715ad5ce61fc9595c7b415289d59cf203f23a94fa06f04af7e489a0a76e1fe26600080a350505050565b6000818060011161350d57600080516020614f678339815191525481101561350d5760008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c44602052604081205490600160e01b8216900361350b575b80600003611ec757506000190160008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4460205260409020546134cb565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600067ffffffffffffffff6080600080516020614f678339815191525b6005016000856001600160a01b03166001600160a01b0316815260200190815260200160002054901c169050919050565b600080516020614f678339815191525460008290036135d8576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b03831660008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c456020908152604080832080546801000000000000000188020190558483527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b8181146136c557808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a460010161368d565b5081600003613700576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080516020614f678339815191525550505050565b60006137218361346c565b90508060008061375e8660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c466020526040902080549091565b9150915084156137da5761377381843361120a565b6137da576001600160a01b03831660009081527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c476020908152604080832033845290915290205460ff166137da57604051632ce44b5f60e11b815260040160405180910390fd5b80156137e557600082555b6001600160a01b03831660008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c456020526040902080546fffffffffffffffffffffffffffffffff0190554260a01b177c03000000000000000000000000000000000000000000000000000000001760008781527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c446020526040812091909155600160e11b85169003613915576001860160008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c446020526040812054900361391357600080516020614f678339815191525481146139135760008181527f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c44602052604090208590555b505b60405186906000906001600160a01b038616907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a450507f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c418054600101905550505050565b61117882826001613e16565b805460609080613a28578260010180546139a290614cdc565b80601f01602080910402602001604051908101604052809291908181526020018280546139ce90614cdc565b8015613a1b5780601f106139f057610100808354040283529160200191613a1b565b820191906000526020600020905b8154815290600101906020018083116139fe57829003601f168201915b5050505050915050919050565b606060405190506040810160405260208152816020820152613a4c81600180613eb8565b604051602001613a5c9190614d10565b60405160208183030381529060405292505050919050565b604080516080810182526000808252602082018190529181018290526060810191909152610f5d600080516020614f6783398151915260008481526004919091016020526040902054604080516080810182526001600160a01b038316815260a083901c67ffffffffffffffff166020820152600160e01b831615159181019190915260e89190911c606082015290565b60405163a9059cbb6000528260205281604052602060006044601c6000885af13d156001600051141716613b41576390b8ec186000526004601cfd5b604052505050565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a0290613b7e903390899088908890600401614d7c565b6020604051808303816000875af1925050508015613bb9575060408051601f3d908101601f19168201909252613bb691810190614dae565b60015b613c17573d808015613be7576040519150601f19603f3d011682016040523d82523d6000602084013e613bec565b606091505b508051600003613c0f576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490505b949350505050565b604080516080810182526000808252602082018190529181018290526060810191909152610f5d613c658361346c565b604080516080810182526001600160a01b038316815260a083901c67ffffffffffffffff166020820152600160e01b831615159181019190915260e89190911c606082015290565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a900480613cc75750819003601f19909101908152919050565b600067ffffffffffffffff6040600080516020614f6783398151915261355c565b81518151808201601e811115613d79577f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c42613d4d8682614e11565b507f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4361142e8582614e11565b82858386604051602001613d909493929190614ed1565b604051602081830303815290604052613da890614f42565b6000555050505050565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b61117882826000613e16565b60008060008084865af16111785763b12d13eb6000526004601cfd5b8151600060308214603183141715613e4e576461723a2f2f64ffffffffff60058601511603613e4e5760019050600584019350602b84525b8015613e97576000613e5f85613fb7565b60208101516461723a2f2f8752600419909601848152868855959091508415613e9057613e906001880160006140bb565b5050613eb1565b60018501613ea58582614e11565b508215613eb157600085555b5050505050565b606083518015613faf576003600282010460021b60405192507f4142434445464748494a4b4c4d4e4f505152535455565758595a616263646566601f526102308515027f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392d5f03603f52602083018181015b6003880197508751603f8160121c16518353603f81600c1c16516001840153603f8160061c16516002840153603f811651600384015350600482019150808210613f285760038406868015613f8857600182148215150185038752613fa0565b603d821515850353603d6001831460011b8503538487525b5050601f01601f191660405250505b509392505050565b6060815180156140b55780830160038260021c026003831660008114613fe7576001600385160382019150613fff565b613d3d61ffff84511614603d60ff8551161401820391505b506040519350808452602084017ffc000000fc00686c7074787c8084888c9094989ca0a4a8acb0b4b8bcc0c4c8cc80605b527804080c1014181c2024282c3034383c4044484c5054585c6064603b526ef8fcf800fcd0d4d8dce0e4e8ecf0f4601a525b600487019650865180601f1a5160061c81601e1a5183161760061c81601d1a5183161760061c81601c1a518316178352506003820191508387106140625750508301603f01601f19166040525060006060525b50919050565b5080546140c790614cdc565b6000825580601f106140d7575050565b601f01602090049060005260206000209081019061115091905b8082111561410557600081556001016140f1565b5090565b6001600160e01b03198116811461115057600080fd5b60006020828403121561413157600080fd5b8135611ec781614109565b60005b8381101561415757818101518382015260200161413f565b50506000910152565b6000815180845261417881602086016020860161413c565b601f01601f19169290920160200192915050565b602081526000611ec76020830184614160565b6000602082840312156141b157600080fd5b5035919050565b80356001600160a01b03811681146141cf57600080fd5b919050565b600080604083850312156141e757600080fd5b6141f0836141b8565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561423d5761423d6141fe565b604052919050565b803560ff811681146141cf57600080fd5b6000602080838503121561426957600080fd5b823567ffffffffffffffff8082111561428157600080fd5b818501915085601f83011261429557600080fd5b8135818111156142a7576142a76141fe565b8060051b91506142b8848301614214565b81815291830184019184810190888411156142d257600080fd5b938501935b838510156142f7576142e885614245565b825293850193908501906142d7565b98975050505050505050565b60008060006060848603121561431857600080fd5b614321846141b8565b925061432f602085016141b8565b9150604084013590509250925092565b60006020828403121561435157600080fd5b611ec7826141b8565b6000806040838503121561436d57600080fd5b50508035926020909101359150565b803561ffff811681146141cf57600080fd5b6000602082840312156143a057600080fd5b611ec78261437c565b600067ffffffffffffffff8211156143c3576143c36141fe565b50601f01601f191660200190565b60006143e46143df846143a9565b614214565b90508281528383830111156143f857600080fd5b828260208301376000602084830101529392505050565b600082601f83011261442057600080fd5b611ec7838335602085016143d1565b60006020828403121561444157600080fd5b813567ffffffffffffffff81111561445857600080fd5b613c2d8482850161440f565b60008083601f84011261447657600080fd5b50813567ffffffffffffffff81111561448e57600080fd5b6020830191508360208260051b85010111156144a957600080fd5b9250929050565b600080602083850312156144c357600080fd5b823567ffffffffffffffff8111156144da57600080fd5b6144e685828601614464565b90969095509350505050565b6020808252825182820181905260009190848201906040850190845b81811015611d165761455c8385516001600160a01b03815116825267ffffffffffffffff602082015116602083015260408101511515604083015262ffffff60608201511660608301525050565b928401926080929092019160010161450e565b6020808252825182820181905260009190848201906040850190845b81811015611d1657835160ff168352928401929184019160010161458b565b6020808252825182820181905260009190848201906040850190845b81811015611d16578351835292840192918401916001016145c6565b803563ffffffff811681146141cf57600080fd5b60006020828403121561460857600080fd5b611ec7826145e2565b60008060006060848603121561462657600080fd5b61462f846141b8565b95602085013595506040909401359392505050565b803580151581146141cf57600080fd5b6000806040838503121561466757600080fd5b614670836141b8565b915061158a60208401614644565b60006020828403121561469057600080fd5b611ec782614644565b600080600080608085870312156146af57600080fd5b6146b8856141b8565b93506146c6602086016141b8565b925060408501359150606085013567ffffffffffffffff8111156146e957600080fd5b8501601f810187136146fa57600080fd5b614709878235602084016143d1565b91505092959194509250565b6000806040838503121561472857600080fd5b614731836145e2565b915061158a602084016145e2565b60008060006040848603121561475457600080fd5b833567ffffffffffffffff81111561476b57600080fd5b61477786828701614464565b909790965060209590950135949350505050565b81516001600160a01b0316815260208083015167ffffffffffffffff169082015260408083015115159082015260608083015162ffffff169082015260808101610f5d565b60008060008060008060008060008060006101608c8e0312156147f257600080fd5b67ffffffffffffffff808d35111561480957600080fd5b6148168e8e358f0161440f565b9b508060208e0135111561482957600080fd5b6148398e60208f01358f0161440f565b9a5061484760408e016141b8565b99508060608e0135111561485a57600080fd5b61486a8e60608f01358f0161440f565b98508060808e0135111561487d57600080fd5b5061488e8d60808e01358e0161440f565b965061489c60a08d016141b8565b95506148aa60c08d0161437c565b94506148b860e08d016145e2565b93506148c76101008d016145e2565b92506148d66101208d016145e2565b91506148e56101408d01614245565b90509295989b509295989b9093969950565b6020815260008251610260806020850152614916610280850183614160565b91506020850151601f19808685030160408701526149348483614160565b935060408701519150808685030160608701526149518483614160565b935060608701519150808685030160808701525061496f8382614160565b925050608085015161498c60a08601826001600160a01b03169052565b5060a085015163ffffffff811660c08601525060c085015163ffffffff811660e08601525060e08501516101006149ca8187018363ffffffff169052565b86015190506101206149e38682018363ffffffff169052565b86015190506101406149ff868201836001600160a01b03169052565b860151610160868101919091528601519050610180614a238187018361ffff169052565b86015190506101a0614a388682018315159052565b86015190506101c0614a4d8682018315159052565b86015190506101e0614a628682018315159052565b8601516102008681019190915286015161022080870191909152860151610240808701919091529095015193019290925250919050565b60008060408385031215614aac57600080fd5b614ab5836141b8565b915061158a602084016141b8565b6000816000190483118215151615614aeb57634e487b7160e01b600052601160045260246000fd5b500290565b600082614b0d57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b600060208284031215614b3a57600080fd5b5051919050565b600060208284031215614b5357600080fd5b815167ffffffffffffffff811115614b6a57600080fd5b8201601f81018413614b7b57600080fd5b8051614b896143df826143a9565b818152856020838501011115614b9e57600080fd5b614baf82602083016020860161413c565b95945050505050565b60008351614bca81846020880161413c565b835190830190614bde81836020880161413c565b01949350505050565b6001600160a01b0384168152606060208201526000614c096060830185614160565b8281036040840152614c1b8185614160565b9695505050505050565b6000610160808352614c398184018f614160565b90508281036020840152614c4d818e614160565b90506001600160a01b03808d1660408501528382036060850152614c71828d614160565b91508382036080850152614c85828c614160565b908a1660a085015261ffff891660c085015263ffffffff88811660e086015287166101008501529150614cb59050565b63ffffffff841661012083015260ff83166101408301529c9b505050505050505050505050565b600181811c90821680614cf057607f821691505b6020821081036140b557634e487b7160e01b600052602260045260246000fd5b7f61723a2f2f000000000000000000000000000000000000000000000000000000815260008251614d4881600585016020870161413c565b7f2f000000000000000000000000000000000000000000000000000000000000006005939091019283015250600601919050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152614c1b6080830184614160565b600060208284031215614dc057600080fd5b8151611ec781614109565b601f8211156118f957600081815260208120601f850160051c81016020861015614df25750805b601f850160051c820191505b8181101561142e57828155600101614dfe565b815167ffffffffffffffff811115614e2b57614e2b6141fe565b614e3f81614e398454614cdc565b84614dcb565b602080601f831160018114614e745760008415614e5c5750858301515b600019600386901b1c1916600185901b17855561142e565b600085815260208120601f198616915b82811015614ea357888601518255948401946001909101908401614e84565b5085821015614ec15787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60007fff00000000000000000000000000000000000000000000000000000000000000808760f81b1683528551614f0f816001860160208a0161413c565b8084019050818660f81b16600182015284519150614f3482600283016020880161413c565b016002019695505050505050565b805160208083015191908110156140b55760001960209190910360031b1b1691905056fe2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c40a2646970667358221220cd641059ce6cd4dc382379f84eb992ff39acf8b55f86381ca1fbe7573a50c64c64736f6c63430008100033' as const

export const SoundEditionV1Config = {
  abi: soundEditionV1Abi,
  bytecode: soundEditionV1Bytecode,
} as const
