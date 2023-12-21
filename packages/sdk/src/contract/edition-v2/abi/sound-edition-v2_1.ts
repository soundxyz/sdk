export const SOUND_EDITION_V2_1_IMPLEMENTATION_ADDRESS = '0x000000000000Be2397A709213a10cf71b07f42eE'

export const SOUND_EDITION_V2_1_ABI = [
  { inputs: [], name: 'AlreadyInitialized', type: 'error' },
  { inputs: [], name: 'ApprovalCallerNotOwnerNorApproved', type: 'error' },
  { inputs: [], name: 'ApprovalQueryForNonexistentToken', type: 'error' },
  { inputs: [], name: 'BalanceQueryForZeroAddress', type: 'error' },
  { inputs: [], name: 'CannotBurnImmediately', type: 'error' },
  { inputs: [], name: 'CreateTierIsFrozen', type: 'error' },
  { inputs: [], name: 'ExceedsAvailableSupply', type: 'error' },
  { inputs: [], name: 'InvalidFundingRecipient', type: 'error' },
  { inputs: [], name: 'InvalidMaxMintableRange', type: 'error' },
  { inputs: [], name: 'InvalidQueryRange', type: 'error' },
  { inputs: [], name: 'InvalidRoyaltyBPS', type: 'error' },
  { inputs: [], name: 'InvalidTokenTier', type: 'error' },
  { inputs: [], name: 'MetadataIsFrozen', type: 'error' },
  { inputs: [], name: 'MintERC2309QuantityExceedsLimit', type: 'error' },
  { inputs: [], name: 'MintHasConcluded', type: 'error' },
  { inputs: [], name: 'MintNotConcluded', type: 'error' },
  { inputs: [], name: 'MintToZeroAddress', type: 'error' },
  { inputs: [], name: 'MintZeroQuantity', type: 'error' },
  { inputs: [], name: 'MintsAlreadyExist', type: 'error' },
  { inputs: [], name: 'NewOwnerIsZeroAddress', type: 'error' },
  { inputs: [], name: 'NoHandoverRequest', type: 'error' },
  { inputs: [], name: 'OwnerQueryForNonexistentToken', type: 'error' },
  { inputs: [], name: 'OwnershipNotInitializedForExtraData', type: 'error' },
  { inputs: [], name: 'TierAlreadyExists', type: 'error' },
  { inputs: [], name: 'TierDoesNotExist', type: 'error' },
  { inputs: [], name: 'TierIsFrozen', type: 'error' },
  { inputs: [], name: 'TierMintsAlreadyExist', type: 'error' },
  { inputs: [], name: 'TierQueryForNonexistentToken', type: 'error' },
  { inputs: [], name: 'TokenIdsNotStrictlyAscending', type: 'error' },
  { inputs: [], name: 'TransferCallerNotOwnerNorApproved', type: 'error' },
  { inputs: [], name: 'TransferFromIncorrectOwner', type: 'error' },
  { inputs: [], name: 'TransferToNonERC721ReceiverImplementer', type: 'error' },
  { inputs: [], name: 'TransferToZeroAddress', type: 'error' },
  { inputs: [], name: 'URIQueryForNonexistentToken', type: 'error' },
  { inputs: [], name: 'Unauthorized', type: 'error' },
  { inputs: [], name: 'ZeroTiersProvided', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'tier', type: 'uint8' },
      { indexed: false, internalType: 'address[]', name: 'to', type: 'address[]' },
      { indexed: false, internalType: 'uint256', name: 'quantity', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fromTokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint32', name: 'fromTierTokenIdIndex', type: 'uint32' },
    ],
    name: 'Airdropped',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'approved', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'string', name: 'baseURI', type: 'string' }],
    name: 'BaseURISet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'fromTokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'toTokenId', type: 'uint256' },
    ],
    name: 'BatchMetadataUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'fromTokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'toTokenId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'ConsecutiveTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'string', name: 'contractURI', type: 'string' }],
    name: 'ContractURISet',
    type: 'event',
  },
  { anonymous: false, inputs: [], name: 'CreateTierFrozen', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'tier', type: 'uint8' },
      { indexed: false, internalType: 'uint32', name: 'cutoff', type: 'uint32' },
    ],
    name: 'CutoffTimeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'recipient', type: 'address' },
      { indexed: false, internalType: 'address[]', name: 'tokens', type: 'address[]' },
      { indexed: false, internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      { indexed: false, internalType: 'address', name: 'caller', type: 'address' },
    ],
    name: 'ERC20Withdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'recipient', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'caller', type: 'address' },
    ],
    name: 'ETHWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'recipient', type: 'address' }],
    name: 'FundingRecipientSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'tier', type: 'uint8' },
      { indexed: false, internalType: 'uint32', name: 'lower', type: 'uint32' },
      { indexed: false, internalType: 'uint32', name: 'upper', type: 'uint32' },
    ],
    name: 'MaxMintableRangeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'metadataModule', type: 'address' },
      { indexed: false, internalType: 'string', name: 'baseURI', type: 'string' },
      { indexed: false, internalType: 'string', name: 'contractURI', type: 'string' },
    ],
    name: 'MetadataFrozen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'metadataModule', type: 'address' }],
    name: 'MetadataModuleSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'tier', type: 'uint8' },
      { indexed: false, internalType: 'bool', name: 'enabled', type: 'bool' },
    ],
    name: 'MintRandomnessEnabledSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'tier', type: 'uint8' },
      { indexed: false, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'quantity', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fromTokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint32', name: 'fromTierTokenIdIndex', type: 'uint32' },
    ],
    name: 'Minted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'address', name: 'pendingOwner', type: 'address' }],
    name: 'OwnershipHandoverCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'address', name: 'pendingOwner', type: 'address' }],
    name: 'OwnershipHandoverRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'oldOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'roles', type: 'uint256' },
    ],
    name: 'RolesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'bps', type: 'uint16' }],
    name: 'RoyaltySet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'address', name: 'metadataModule', type: 'address' },
          { internalType: 'string', name: 'baseURI', type: 'string' },
          { internalType: 'string', name: 'contractURI', type: 'string' },
          { internalType: 'address', name: 'fundingRecipient', type: 'address' },
          { internalType: 'uint16', name: 'royaltyBPS', type: 'uint16' },
          { internalType: 'bool', name: 'isMetadataFrozen', type: 'bool' },
          { internalType: 'bool', name: 'isCreateTierFrozen', type: 'bool' },
          {
            components: [
              { internalType: 'uint8', name: 'tier', type: 'uint8' },
              { internalType: 'uint32', name: 'maxMintableLower', type: 'uint32' },
              { internalType: 'uint32', name: 'maxMintableUpper', type: 'uint32' },
              { internalType: 'uint32', name: 'cutoffTime', type: 'uint32' },
              { internalType: 'bool', name: 'mintRandomnessEnabled', type: 'bool' },
              { internalType: 'bool', name: 'isFrozen', type: 'bool' },
            ],
            internalType: 'struct ISoundEditionV2_1.TierCreation[]',
            name: 'tierCreations',
            type: 'tuple[]',
          },
        ],
        indexed: false,
        internalType: 'struct ISoundEditionV2_1.EditionInitialization',
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
          { internalType: 'uint8', name: 'tier', type: 'uint8' },
          { internalType: 'uint32', name: 'maxMintableLower', type: 'uint32' },
          { internalType: 'uint32', name: 'maxMintableUpper', type: 'uint32' },
          { internalType: 'uint32', name: 'cutoffTime', type: 'uint32' },
          { internalType: 'bool', name: 'mintRandomnessEnabled', type: 'bool' },
          { internalType: 'bool', name: 'isFrozen', type: 'bool' },
        ],
        indexed: false,
        internalType: 'struct ISoundEditionV2_1.TierCreation',
        name: 'creation',
        type: 'tuple',
      },
    ],
    name: 'TierCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'TierFrozen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'BPS_DENOMINATOR',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'GA_TIER',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
      { internalType: 'address[]', name: 'to', type: 'address[]' },
      { internalType: 'uint256', name: 'quantity', type: 'uint256' },
    ],
    name: 'airdrop',
    outputs: [{ internalType: 'uint256', name: 'fromTokenId', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'cancelOwnershipHandover', outputs: [], stateMutability: 'payable', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: 'pendingOwner', type: 'address' }],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'splitMain', type: 'address' },
      { internalType: 'bytes', name: 'splitData', type: 'bytes' },
    ],
    name: 'createSplit',
    outputs: [{ internalType: 'address', name: 'split', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint8', name: 'tier', type: 'uint8' },
          { internalType: 'uint32', name: 'maxMintableLower', type: 'uint32' },
          { internalType: 'uint32', name: 'maxMintableUpper', type: 'uint32' },
          { internalType: 'uint32', name: 'cutoffTime', type: 'uint32' },
          { internalType: 'bool', name: 'mintRandomnessEnabled', type: 'bool' },
          { internalType: 'bool', name: 'isFrozen', type: 'bool' },
        ],
        internalType: 'struct ISoundEditionV2_1.TierCreation',
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
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'cutoffTime',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'editionInfo',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'baseURI', type: 'string' },
          { internalType: 'string', name: 'contractURI', type: 'string' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'address', name: 'fundingRecipient', type: 'address' },
          { internalType: 'address', name: 'metadataModule', type: 'address' },
          { internalType: 'bool', name: 'isMetadataFrozen', type: 'bool' },
          { internalType: 'bool', name: 'isCreateTierFrozen', type: 'bool' },
          { internalType: 'uint16', name: 'royaltyBPS', type: 'uint16' },
          { internalType: 'uint256', name: 'nextTokenId', type: 'uint256' },
          { internalType: 'uint256', name: 'totalBurned', type: 'uint256' },
          { internalType: 'uint256', name: 'totalMinted', type: 'uint256' },
          { internalType: 'uint256', name: 'totalSupply', type: 'uint256' },
          {
            components: [
              { internalType: 'uint8', name: 'tier', type: 'uint8' },
              { internalType: 'uint32', name: 'maxMintable', type: 'uint32' },
              { internalType: 'uint32', name: 'maxMintableLower', type: 'uint32' },
              { internalType: 'uint32', name: 'maxMintableUpper', type: 'uint32' },
              { internalType: 'uint32', name: 'cutoffTime', type: 'uint32' },
              { internalType: 'uint32', name: 'minted', type: 'uint32' },
              { internalType: 'uint256', name: 'mintRandomness', type: 'uint256' },
              { internalType: 'bool', name: 'mintConcluded', type: 'bool' },
              { internalType: 'bool', name: 'mintRandomnessEnabled', type: 'bool' },
              { internalType: 'bool', name: 'isFrozen', type: 'bool' },
            ],
            internalType: 'struct ISoundEditionV2_1.TierInfo[]',
            name: 'tierInfo',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ISoundEditionV2_1.EditionInfo',
        name: 'info',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'emitAllMetadataUpdate', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'addr', type: 'address' },
          { internalType: 'uint64', name: 'startTimestamp', type: 'uint64' },
          { internalType: 'bool', name: 'burned', type: 'bool' },
          { internalType: 'uint24', name: 'extraData', type: 'uint24' },
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
    inputs: [{ internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' }],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'addr', type: 'address' },
          { internalType: 'uint64', name: 'startTimestamp', type: 'uint64' },
          { internalType: 'bool', name: 'burned', type: 'bool' },
          { internalType: 'uint24', name: 'extraData', type: 'uint24' },
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
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'explicitTokenTier',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'explicitTokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'freezeCreateTier', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'freezeMetadata', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'freezeTier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fundingRecipient',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'roles', type: 'uint256' },
    ],
    name: 'grantRoles',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'roles', type: 'uint256' },
    ],
    name: 'hasAllRoles',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'roles', type: 'uint256' },
    ],
    name: 'hasAnyRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'address', name: 'metadataModule', type: 'address' },
          { internalType: 'string', name: 'baseURI', type: 'string' },
          { internalType: 'string', name: 'contractURI', type: 'string' },
          { internalType: 'address', name: 'fundingRecipient', type: 'address' },
          { internalType: 'uint16', name: 'royaltyBPS', type: 'uint16' },
          { internalType: 'bool', name: 'isMetadataFrozen', type: 'bool' },
          { internalType: 'bool', name: 'isCreateTierFrozen', type: 'bool' },
          {
            components: [
              { internalType: 'uint8', name: 'tier', type: 'uint8' },
              { internalType: 'uint32', name: 'maxMintableLower', type: 'uint32' },
              { internalType: 'uint32', name: 'maxMintableUpper', type: 'uint32' },
              { internalType: 'uint32', name: 'cutoffTime', type: 'uint32' },
              { internalType: 'bool', name: 'mintRandomnessEnabled', type: 'bool' },
              { internalType: 'bool', name: 'isFrozen', type: 'bool' },
            ],
            internalType: 'struct ISoundEditionV2_1.TierCreation[]',
            name: 'tierCreations',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ISoundEditionV2_1.EditionInitialization',
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
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isCreateTierFrozen',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'isFrozen',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isMetadataFrozen',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'maxMintable',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'maxMintableLower',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'maxMintableUpper',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'metadataModule',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'quantity', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: 'fromTokenId', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'mintConcluded',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'mintRandomness',
    outputs: [{ internalType: 'uint256', name: 'result', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'mintRandomnessEnabled',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'mintRandomnessOneOfOne',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: 'name_', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextTokenId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'numberBurned',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'numberMinted',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: 'result', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'pendingOwner', type: 'address' }],
    name: 'ownershipHandoverExpiresAt',
    outputs: [{ internalType: 'uint256', name: 'result', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'payable', type: 'function' },
  {
    inputs: [{ internalType: 'uint256', name: 'roles', type: 'uint256' }],
    name: 'renounceRoles',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  { inputs: [], name: 'requestOwnershipHandover', outputs: [], stateMutability: 'payable', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'roles', type: 'uint256' },
    ],
    name: 'revokeRoles',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'rolesOf',
    outputs: [{ internalType: 'uint256', name: 'roles', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'royaltyBPS',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: 'salePrice', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'royaltyAmount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'uri', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'uri', type: 'string' }],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
      { internalType: 'uint32', name: 'cutoff', type: 'uint32' },
    ],
    name: 'setCutoffTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'recipient', type: 'address' }],
    name: 'setFundingRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
      { internalType: 'uint32', name: 'lower', type: 'uint32' },
      { internalType: 'uint32', name: 'upper', type: 'uint32' },
    ],
    name: 'setMaxMintableRange',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'module', type: 'address' }],
    name: 'setMetadataModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
      { internalType: 'bool', name: 'enabled', type: 'bool' },
    ],
    name: 'setMintRandomnessEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: 'bps', type: 'uint16' }],
    name: 'setRoyalty',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: 'symbol_', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'tierInfo',
    outputs: [
      {
        components: [
          { internalType: 'uint8', name: 'tier', type: 'uint8' },
          { internalType: 'uint32', name: 'maxMintable', type: 'uint32' },
          { internalType: 'uint32', name: 'maxMintableLower', type: 'uint32' },
          { internalType: 'uint32', name: 'maxMintableUpper', type: 'uint32' },
          { internalType: 'uint32', name: 'cutoffTime', type: 'uint32' },
          { internalType: 'uint32', name: 'minted', type: 'uint32' },
          { internalType: 'uint256', name: 'mintRandomness', type: 'uint256' },
          { internalType: 'bool', name: 'mintConcluded', type: 'bool' },
          { internalType: 'bool', name: 'mintRandomnessEnabled', type: 'bool' },
          { internalType: 'bool', name: 'isFrozen', type: 'bool' },
        ],
        internalType: 'struct ISoundEditionV2_1.TierInfo',
        name: 'info',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'tierMinted',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tierTokenIdIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tier', type: 'uint8' }],
    name: 'tierTokenIds',
    outputs: [{ internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
      { internalType: 'uint256', name: 'start', type: 'uint256' },
      { internalType: 'uint256', name: 'stop', type: 'uint256' },
    ],
    name: 'tierTokenIdsIn',
    outputs: [{ internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenTier',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' }],
    name: 'tokenTiers',
    outputs: [{ internalType: 'uint8[]', name: 'tiers', type: 'uint8[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'start', type: 'uint256' },
      { internalType: 'uint256', name: 'stop', type: 'uint256' },
    ],
    name: 'tokensOfOwnerIn',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalBurned',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalMinted',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address[]', name: 'tokens', type: 'address[]' }],
    name: 'withdrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'withdrawETH', outputs: [], stateMutability: 'nonpayable', type: 'function' },
] as const
