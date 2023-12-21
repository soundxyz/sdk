export const SOUND_EDITION_V2_1_IMPLEMENTATION_ADDRESS = '0x000000000000Be2397A709213a10cf71b07f42eE'

export const SOUND_EDITION_V2_1_ABI = [
  {
    type: 'function',
    name: 'ADMIN_ROLE',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BPS_DENOMINATOR',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'GA_TIER',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'MINTER_ROLE',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'airdrop',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'to',
        type: 'address[]',
        internalType: 'address[]',
      },
      {
        name: 'quantity',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'fromTokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'baseURI',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'contractURI',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'createSplit',
    inputs: [
      {
        name: 'splitMain',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'splitData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'split',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createTier',
    inputs: [
      {
        name: 'creation',
        type: 'tuple',
        internalType: 'struct ISoundEditionV2_1.TierCreation',
        components: [
          {
            name: 'tier',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'maxMintableLower',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'maxMintableUpper',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'cutoffTime',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'mintRandomnessEnabled',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'isFrozen',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cutoffTime',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'editionInfo',
    inputs: [],
    outputs: [
      {
        name: 'info',
        type: 'tuple',
        internalType: 'struct ISoundEditionV2_1.EditionInfo',
        components: [
          {
            name: 'baseURI',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'contractURI',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'fundingRecipient',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'metadataModule',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'isMetadataFrozen',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'isCreateTierFrozen',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'royaltyBPS',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'nextTokenId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'totalBurned',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'totalMinted',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'totalSupply',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'tierInfo',
            type: 'tuple[]',
            internalType: 'struct ISoundEditionV2_1.TierInfo[]',
            components: [
              {
                name: 'tier',
                type: 'uint8',
                internalType: 'uint8',
              },
              {
                name: 'maxMintable',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'maxMintableLower',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'maxMintableUpper',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'cutoffTime',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'minted',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'mintRandomness',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'mintConcluded',
                type: 'bool',
                internalType: 'bool',
              },
              {
                name: 'mintRandomnessEnabled',
                type: 'bool',
                internalType: 'bool',
              },
              {
                name: 'isFrozen',
                type: 'bool',
                internalType: 'bool',
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'emitAllMetadataUpdate',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'explicitTokenTier',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'explicitTokenURI',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'freezeCreateTier',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'freezeMetadata',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'freezeTier',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'fundingRecipient',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getApproved',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: 'init',
        type: 'tuple',
        internalType: 'struct ISoundEditionV2_1.EditionInitialization',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'metadataModule',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'baseURI',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'contractURI',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'fundingRecipient',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'royaltyBPS',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'isMetadataFrozen',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'isCreateTierFrozen',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'tierCreations',
            type: 'tuple[]',
            internalType: 'struct ISoundEditionV2_1.TierCreation[]',
            components: [
              {
                name: 'tier',
                type: 'uint8',
                internalType: 'uint8',
              },
              {
                name: 'maxMintableLower',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'maxMintableUpper',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'cutoffTime',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'mintRandomnessEnabled',
                type: 'bool',
                internalType: 'bool',
              },
              {
                name: 'isFrozen',
                type: 'bool',
                internalType: 'bool',
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isCreateTierFrozen',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isFrozen',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isMetadataFrozen',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxMintable',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxMintableLower',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxMintableUpper',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'metadataModule',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'quantity',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'fromTokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'mintConcluded',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mintRandomness',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mintRandomnessEnabled',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mintRandomnessOneOfOne',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nextTokenId',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'numberBurned',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'numberMinted',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'royaltyBPS',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'royaltyInfo',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'salePrice',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'royaltyAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_approved',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setBaseURI',
    inputs: [
      {
        name: 'baseURI',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setContractURI',
    inputs: [
      {
        name: 'contractURI',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setCutoffTime',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'cutoffTime',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setFundingRecipient',
    inputs: [
      {
        name: 'fundingRecipient',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMaxMintableRange',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'lower',
        type: 'uint32',
        internalType: 'uint32',
      },
      {
        name: 'upper',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMetadataModule',
    inputs: [
      {
        name: 'metadataModule',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMintRandomnessEnabled',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'enabled',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setRoyalty',
    inputs: [
      {
        name: 'bps',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tierInfo',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: 'info',
        type: 'tuple',
        internalType: 'struct ISoundEditionV2_1.TierInfo',
        components: [
          {
            name: 'tier',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'maxMintable',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'maxMintableLower',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'maxMintableUpper',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'cutoffTime',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'minted',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'mintRandomness',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'mintConcluded',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'mintRandomnessEnabled',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'isFrozen',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tierMinted',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tierTokenIdIndex',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tierTokenIds',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    outputs: [
      {
        name: 'tokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tierTokenIdsIn',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'stop',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'tokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenTier',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenTiers',
    inputs: [
      {
        name: 'tokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint8[]',
        internalType: 'uint8[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenURI',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalBurned',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalMinted',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'withdrawERC20',
    inputs: [
      {
        name: 'tokens',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'withdrawETH',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Airdropped',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
      {
        name: 'to',
        type: 'address[]',
        indexed: false,
        internalType: 'address[]',
      },
      {
        name: 'quantity',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'fromTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'fromTierTokenIdIndex',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BaseURISet',
    inputs: [
      {
        name: 'baseURI',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BatchMetadataUpdate',
    inputs: [
      {
        name: 'fromTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'toTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ConsecutiveTransfer',
    inputs: [
      {
        name: 'fromTokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'toTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ContractURISet',
    inputs: [
      {
        name: 'contractURI',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CreateTierFrozen',
    inputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CutoffTimeSet',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
      {
        name: 'cutoff',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ERC20Withdrawn',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'tokens',
        type: 'address[]',
        indexed: false,
        internalType: 'address[]',
      },
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'caller',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ETHWithdrawn',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'caller',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FundingRecipientSet',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MaxMintableRangeSet',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
      {
        name: 'lower',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
      {
        name: 'upper',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MetadataFrozen',
    inputs: [
      {
        name: 'metadataModule',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'baseURI',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'contractURI',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MetadataModuleSet',
    inputs: [
      {
        name: 'metadataModule',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MintRandomnessEnabledSet',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
      {
        name: 'enabled',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Minted',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
      {
        name: 'to',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'quantity',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'fromTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'fromTierTokenIdIndex',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoyaltySet',
    inputs: [
      {
        name: 'bps',
        type: 'uint16',
        indexed: false,
        internalType: 'uint16',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SoundEditionInitialized',
    inputs: [
      {
        name: 'init',
        type: 'tuple',
        indexed: false,
        internalType: 'struct ISoundEditionV2_1.EditionInitialization',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'metadataModule',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'baseURI',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'contractURI',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'fundingRecipient',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'royaltyBPS',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'isMetadataFrozen',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'isCreateTierFrozen',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'tierCreations',
            type: 'tuple[]',
            internalType: 'struct ISoundEditionV2_1.TierCreation[]',
            components: [
              {
                name: 'tier',
                type: 'uint8',
                internalType: 'uint8',
              },
              {
                name: 'maxMintableLower',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'maxMintableUpper',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'cutoffTime',
                type: 'uint32',
                internalType: 'uint32',
              },
              {
                name: 'mintRandomnessEnabled',
                type: 'bool',
                internalType: 'bool',
              },
              {
                name: 'isFrozen',
                type: 'bool',
                internalType: 'bool',
              },
            ],
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TierCreated',
    inputs: [
      {
        name: 'creation',
        type: 'tuple',
        indexed: false,
        internalType: 'struct ISoundEditionV2_1.TierCreation',
        components: [
          {
            name: 'tier',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'maxMintableLower',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'maxMintableUpper',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'cutoffTime',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'mintRandomnessEnabled',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'isFrozen',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TierFrozen',
    inputs: [
      {
        name: 'tier',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'ApprovalCallerNotOwnerNorApproved',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ApprovalQueryForNonexistentToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'BalanceQueryForZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotBurnImmediately',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CreateTierIsFrozen',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ExceedsAvailableSupply',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidFundingRecipient',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidMaxMintableRange',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidRoyaltyBPS',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidTokenTier',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MetadataIsFrozen',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MintERC2309QuantityExceedsLimit',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MintHasConcluded',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MintNotConcluded',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MintToZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MintZeroQuantity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MintsAlreadyExist',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OwnerQueryForNonexistentToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OwnershipNotInitializedForExtraData',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TierAlreadyExists',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TierDoesNotExist',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TierIsFrozen',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TierMintsAlreadyExist',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TierQueryForNonexistentToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TokenIdsNotStrictlyAscending',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TransferCallerNotOwnerNorApproved',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TransferFromIncorrectOwner',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TransferToNonERC721ReceiverImplementer',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TransferToZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'URIQueryForNonexistentToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ZeroTiersProvided',
    inputs: [],
  },
] as const
