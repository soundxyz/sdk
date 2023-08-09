const superMinterV1Abi = [
  {
    inputs: [],
    name: 'CallerNotDelegated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExceedsMaxPerAccount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExceedsMintSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExceedsSignedQuantity',
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
    name: 'InvalidMerkleProof',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidMode',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPlatformFeeBPS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPlatformFeeConfig',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPlatformFlatFee',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSignature',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTimeRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MaxMintableIsZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MaxMintablePerAccountIsZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MerkleRootIsEmpty',
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
    name: 'MintsAlreadyExist',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotConfigurable',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PlatformFeeAddressIsZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SignatureAlreadyUsed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SignatureExpired',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SignedPriceTooLow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SignerIsZeroAddress',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        name: 'platform',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint96',
            name: 'perTxFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'perMintFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint16',
            name: 'perMintBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct ISuperMinter.PlatformFeeConfig',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'DefaultPlatformFeeConfigSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'platform',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'price',
        type: 'uint96',
      },
    ],
    name: 'GAPriceSet',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'value',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'value',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32',
      },
    ],
    name: 'MerkleRootSet',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        components: [
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
            name: 'endTime',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintablePerAccount',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintable',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'affiliateFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'bytes32',
            name: 'affiliateMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'platform',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'mode',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'merkleRoot',
            type: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct ISuperMinter.MintCreation',
        name: 'creation',
        type: 'tuple',
      },
    ],
    name: 'MintCreated',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'quantity',
            type: 'uint32',
          },
          {
            internalType: 'uint256',
            name: 'fromTokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'allowlisted',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'allowlistedQuantity',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'signedQuantity',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'signedClaimTicket',
            type: 'uint32',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'affiliated',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'requiredEtherValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'unitPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformFlatFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'affiliateFee',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct ISuperMinter.MintedLogData',
        name: 'data',
        type: 'tuple',
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
        name: 'edition',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'paused',
        type: 'bool',
      },
    ],
    name: 'PausedSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'platform',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
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
        indexed: true,
        internalType: 'address',
        name: 'platform',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'uint96',
            name: 'perTxFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'perMintFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint16',
            name: 'perMintBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct ISuperMinter.PlatformFeeConfig',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'PlatformFeeConfigSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'platform',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accrued',
        type: 'uint256',
      },
    ],
    name: 'PlatformFeesWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'platform',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'PlatformSignerSet',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'SignerSet',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
    stateMutability: 'payable',
    type: 'fallback',
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
    name: 'DEFAULT',
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
    name: 'DOMAIN_TYPEHASH',
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
    name: 'MAX_PLATFORM_PER_MINT_FEE_BPS',
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
    name: 'MAX_PLATFORM_PER_MINT_FLAT_FEE',
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
    name: 'MAX_PLATFORM_PER_TX_FLAT_FEE',
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
    name: 'MINT_TO_TYPEHASH',
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
    name: 'VERIFY_MERKLE',
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
    name: 'VERIFY_SIGNATURE',
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
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'affiliateFeesAccrued',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'uint32[]',
        name: 'claimTickets',
        type: 'uint32[]',
      },
    ],
    name: 'checkClaimTickets',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'claimed',
        type: 'bool[]',
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
            internalType: 'address',
            name: 'edition',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'scheduleNum',
            type: 'uint8',
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
            internalType: 'uint32',
            name: 'allowlistedQuantity',
            type: 'uint32',
          },
          {
            internalType: 'bytes32[]',
            name: 'allowlistProof',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint96',
            name: 'signedPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint32',
            name: 'signedQuantity',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'signedClaimTicket',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'signedDeadline',
            type: 'uint32',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
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
        internalType: 'struct ISuperMinter.MintTo',
        name: 'p',
        type: 'tuple',
      },
    ],
    name: 'computeMintToDigest',
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
        components: [
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
            name: 'endTime',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintablePerAccount',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintable',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'affiliateFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'bytes32',
            name: 'affiliateMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'platform',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'mode',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'merkleRoot',
            type: 'bytes32',
          },
        ],
        internalType: 'struct ISuperMinter.MintCreation',
        name: 'c',
        type: 'tuple',
      },
    ],
    name: 'createEditionMint',
    outputs: [
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'platform',
        type: 'address',
      },
    ],
    name: 'defaultPlatformFeeConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'uint96',
            name: 'perTxFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'perMintFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint16',
            name: 'perMintBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool',
          },
        ],
        internalType: 'struct ISuperMinter.PlatformFeeConfig',
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
        name: 'platform',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'effectivePlatformFeeConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'uint96',
            name: 'perTxFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'perMintFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint16',
            name: 'perMintBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool',
          },
        ],
        internalType: 'struct ISuperMinter.PlatformFeeConfig',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      {
        internalType: 'bytes1',
        name: 'fields',
        type: 'bytes1',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'version',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'verifyingContract',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        internalType: 'uint256[]',
        name: 'extensions',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'gaPrice',
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
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
    ],
    name: 'mintInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'edition',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'scheduleNum',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'platform',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'gaPrice',
            type: 'uint96',
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
            internalType: 'uint32',
            name: 'maxMintablePerAccount',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintable',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'minted',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'affiliateFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'uint8',
            name: 'mode',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'hasMints',
            type: 'bool',
          },
          {
            internalType: 'bytes32',
            name: 'affiliateMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'merkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'platformSigner',
            type: 'address',
          },
        ],
        internalType: 'struct ISuperMinter.MintInfo',
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
    ],
    name: 'mintInfoList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'edition',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'scheduleNum',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'platform',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'gaPrice',
            type: 'uint96',
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
            internalType: 'uint32',
            name: 'maxMintablePerAccount',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintable',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'minted',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'affiliateFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'uint8',
            name: 'mode',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'hasMints',
            type: 'bool',
          },
          {
            internalType: 'bytes32',
            name: 'affiliateMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'merkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'platformSigner',
            type: 'address',
          },
        ],
        internalType: 'struct ISuperMinter.MintInfo[]',
        name: 'a',
        type: 'tuple[]',
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
            internalType: 'address',
            name: 'edition',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'scheduleNum',
            type: 'uint8',
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
            internalType: 'uint32',
            name: 'allowlistedQuantity',
            type: 'uint32',
          },
          {
            internalType: 'bytes32[]',
            name: 'allowlistProof',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint96',
            name: 'signedPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint32',
            name: 'signedQuantity',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'signedClaimTicket',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'signedDeadline',
            type: 'uint32',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
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
        internalType: 'struct ISuperMinter.MintTo',
        name: 'p',
        type: 'tuple',
      },
    ],
    name: 'mintTo',
    outputs: [],
    stateMutability: 'payable',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'nextScheduleNum',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'collector',
        type: 'address',
      },
    ],
    name: 'numberMinted',
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
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
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
    inputs: [
      {
        internalType: 'address',
        name: 'platform',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
    ],
    name: 'platformFeeConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'uint96',
            name: 'perTxFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'perMintFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint16',
            name: 'perMintBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool',
          },
        ],
        internalType: 'struct ISuperMinter.PlatformFeeConfig',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'platformFeesAccrued',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'platformSigner',
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
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        components: [
          {
            internalType: 'uint96',
            name: 'perTxFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'perMintFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint16',
            name: 'perMintBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool',
          },
        ],
        internalType: 'struct ISuperMinter.PlatformFeeConfig',
        name: 'c',
        type: 'tuple',
      },
    ],
    name: 'setDefaultPlatformFeeConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint96',
        name: 'price',
        type: 'uint96',
      },
    ],
    name: 'setGAPrice',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: 'value',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: 'value',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32',
      },
    ],
    name: 'setMerkleRoot',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'bool',
        name: 'paused',
        type: 'bool',
      },
    ],
    name: 'setPaused',
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
    name: 'setPlatformFeeAddress',
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
        components: [
          {
            internalType: 'uint96',
            name: 'perTxFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'perMintFlat',
            type: 'uint96',
          },
          {
            internalType: 'uint16',
            name: 'perMintBPS',
            type: 'uint16',
          },
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool',
          },
        ],
        internalType: 'struct ISuperMinter.PlatformFeeConfig',
        name: 'c',
        type: 'tuple',
      },
    ],
    name: 'setPlatformFeeConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'setPlatformSigner',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'setSigner',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: 'startTime',
        type: 'uint32',
      },
    ],
    name: 'setStartTime',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
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
        components: [
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
            name: 'unitPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformFlatFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformTxFlatFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformMintFlatFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformMintBPSFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'affiliateFee',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISuperMinter.TotalPriceAndFees',
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
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
      {
        internalType: 'uint96',
        name: 'signedPrice',
        type: 'uint96',
      },
    ],
    name: 'totalPriceAndFeesWithSignedPrice',
    outputs: [
      {
        components: [
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
            name: 'unitPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformFlatFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformTxFlatFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformMintFlatFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'platformMintBPSFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'affiliateFee',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISuperMinter.TotalPriceAndFees',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [
      {
        internalType: 'string',
        name: 'version_',
        type: 'string',
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
    name: 'withdrawForAffiliate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'platform',
        type: 'address',
      },
    ],
    name: 'withdrawForPlatform',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const

const superMinterV1Bytecode =
  '0x6101206040523480156200001257600080fd5b50306080524660a0526000806200005f604080518082018252600b81526a29bab832b926b4b73a32b960a91b602080830191909152825180840190935260018352603160f81b9083015291565b815160209283012081519183019190912060c082905260e0819052604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8152938401929092529082015246606082015230608082015260a090206101005250620000c99050565b60805160a05160c05160e051610100516146756200010e60003960006133ce015260006134880152600061346201526000613412015260006133ef01526146756000f3fe6080604052600436106103035760003560e01c8063a01efa3411610190578063de9484af116100dc578063e62a61a711610095578063f57402961161006f578063f574029614610b4e578063f7b2f1bf14610b6e578063fb128c8314610ab2578063fe1c0c4b14610b8357610312565b8063e62a61a714610aee578063edb3a0a314610b0e578063edcf0e2114610b2e57610312565b8063de9484af14610a19578063e1a4521814610a39578063e1f3e17d14610a4f578063e3d47d5c14610a85578063e4f6a4f014610ab2578063e544144314610ace57610312565b8063b985423111610149578063cbd8aff211610123578063cbd8aff214610976578063d03206a41461067a578063d379ab5f146109c4578063d3ec6f59146109e457610312565b8063b9854231146108d4578063bd3e8fc9146108f4578063c4f0c1c21461092857610312565b8063a01efa3414610805578063a167fd5f14610825578063ab9868971461083a578063ac1fc22c14610867578063b057868814610894578063b276be35146108b457610312565b8063532cf5961161024f57806370304e2f1161020857806387d4d28c116101e257806387d4d28c146107985780639375da5a146107c557806393e8bcf914610371578063998eb8c2146107e557610312565b806370304e2f146106a3578063752d8e91146106d057806384b0196e1461077057610312565b8063532cf5961461055a57806354fd4d50146105875780635e7876821461059c57806361b26ea41461063a5780636a7319cf1461065a5780636c5f55f71461067a57610312565b80631e1846c8116102bc57806344a8246f1161029657806344a8246f146104e75780634618d76214610507578063498120a0146105275780634a04a1c91461054757610312565b80631e1846c81461040657806320606b70146104935780633b79c44f146104c757610312565b806301ffc9a71461031a57806306fdde031461034f5780630a25dea91461037157806315329da0146103985780631542b7fc146103b85780631b98e510146103d857610312565b3661031257610310610ba3565b005b610310610ba3565b34801561032657600080fd5b5061033a6103353660046137f4565b610c3b565b60405190151581526020015b60405180910390f35b34801561035b57600080fd5b50610364610c69565b6040516103469190613864565b34801561037d57600080fd5b50610386600081565b60405160ff9091168152602001610346565b3480156103a457600080fd5b506103106103b33660046138a8565b610c79565b3480156103c457600080fd5b506103106103d3366004613900565b610dac565b3480156103e457600080fd5b506103f86103f336600461394d565b610e34565b604051908152602001610346565b34801561041257600080fd5b50610426610421366004613996565b610e7a565b6040516103469190600061012082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015260e083015160e083015261010080840151818401525092915050565b34801561049f57600080fd5b506103f87f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b3480156104d357600080fd5b506103106104e23660046139ec565b610e9b565b3480156104f357600080fd5b50610310610502366004613a09565b610f0f565b34801561051357600080fd5b50610310610522366004613996565b610ff7565b34801561053357600080fd5b50610310610542366004613a87565b6110d5565b610310610555366004613ad2565b6111a1565b34801561056657600080fd5b5061057a61057536600461394d565b6116c0565b6040516103469190613b0e565b34801561059357600080fd5b506103646117e7565b3480156105a857600080fd5b5061057a6105b73660046139ec565b604080516080808201835260008083526020808401829052838501829052606093840182905294831b6101001781526006855283902083519182018452546001600160601b038082168352600160601b82041694820194909452600160c01b840461ffff1692810192909252600160d01b90920460ff1615159181019190915290565b34801561064657600080fd5b50610310610655366004613b50565b6117f1565b34801561066657600080fd5b5061033a610675366004613bb7565b61186a565b34801561068657600080fd5b506106906103e881565b60405161ffff9091168152602001610346565b3480156106af57600080fd5b506106c36106be366004613c41565b61189a565b6040516103469190613cb9565b3480156106dc57600080fd5b5061057a6106eb36600461394d565b604080516080808201835260008083526020808401829052838501829052606093840182905295831b60ff9586161781526006865283902083519182018452546001600160601b038082168352600160601b82041695820195909552600160c01b850461ffff1692810192909252600160d01b90930490911615159181019190915290565b34801561077c57600080fd5b5061078561197e565b6040516103469796959493929190613cff565b3480156107a457600080fd5b506103f86107b33660046139ec565b60006020819052908152604090205481565b3480156107d157600080fd5b506103106107e03660046139ec565b6119a5565b3480156107f157600080fd5b50610310610800366004613e94565b611a1a565b34801561081157600080fd5b50610310610820366004613900565b611aee565b34801561083157600080fd5b50610386600281565b34801561084657600080fd5b5061085a6108553660046139ec565b611ba1565b6040516103469190614013565b34801561087357600080fd5b506103f86108823660046139ec565b60026020526000908152604090205481565b3480156108a057600080fd5b506103106108af366004613996565b611c97565b3480156108c057600080fd5b506103106108cf366004613996565b611d91565b3480156108e057600080fd5b506103106108ef366004614056565b611dd9565b34801561090057600080fd5b506103f87fc03e2545e609fd0b7813d6074f00235b048ae7580a8e57070eed03901dd951ae81565b34801561093457600080fd5b5061095e6109433660046139ec565b6004602052600090815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610346565b34801561098257600080fd5b506109ac6109913660046139ec565b6003602052600090815260409020546001600160601b031681565b6040516001600160601b039091168152602001610346565b3480156109d057600080fd5b506103106109df366004614081565b611ebd565b3480156109f057600080fd5b50610a046109ff3660046138a8565b611f5c565b60405163ffffffff9091168152602001610346565b348015610a2557600080fd5b50610386610a343660046140cc565b611fa9565b348015610a4557600080fd5b5061069061271081565b348015610a5b57600080fd5b5061095e610a6a3660046139ec565b6001602052600090815260409020546001600160a01b031681565b348015610a9157600080fd5b50610aa5610aa03660046141be565b612472565b6040516103469190614203565b348015610abe57600080fd5b506109ac67016345785d8a000081565b348015610ada57600080fd5b50610310610ae9366004614212565b6125c5565b348015610afa57600080fd5b506103f8610b09366004613ad2565b61267a565b348015610b1a57600080fd5b50610310610b293660046139ec565b6127bf565b348015610b3a57600080fd5b50610426610b4936600461425f565b612865565b348015610b5a57600080fd5b50610310610b693660046139ec565b61289b565b348015610b7a57600080fd5b50610386600181565b348015610b8f57600080fd5b5061033a610b9e3660046138a8565b61291c565b36610bac573636f35b6000805b80368210610bbe5750610c1a565b600180830192600319810190351860001a9081610c0a57600019855260028301933560021984011860001a607f808211610bf9578282013888395b16949094019093019250610bb09050565b8185538085019450505050610bb0565b50600080826000305af490503d6000803e80610c35573d6000fd5b503d6000f35b6000610c636001600160e01b0319831663028b35ad60e31b8114906301ffc9a760e01b141790565b92915050565b6060610c7361292c565b50919050565b83610c8381612969565b6000610c90868686612a6c565b90506000610c9d82612a88565b6001810154909150600160e81b900460ff16600214610ccf5760405163d25a973560e01b815260040160405180910390fd5b610cd884612acb565b6001818101546001600160a01b03861690911490610d0d9060ff600160f01b9091041660048360ff8383161615901518021890565b82600101601e6101000a81548160ff021916908360ff16021790555080610d4c576004820180546001600160a01b0319166001600160a01b0387161790555b6040805160ff808a168252881660208201526001600160a01b0387811692820192909252908916907fc82787a128aa35191b6a1df922a24f581a06500f78030b89582d624c6ae9b2c9906060015b60405180910390a25050505050505050565b83610db681612969565b6000610dc3868686612a6c565b90506000610dd082612a88565b600281018590556040805160ff808a168252881660208201529081018690529091506001600160a01b038816907fe08051cfd6c9341327f7f5550f77e02e815f59c1ecba22a4ac006ddca62dec20906060015b60405180910390a250505050505050565b6000610e738360056000610e4a87876000612a6c565b815260208101919091526040016000206001015460609190911b600160e01b90910460ff161790565b9392505050565b610e8261370c565b610e90858585856000612865565b90505b949350505050565b6000610ea5612af5565b6001600160a01b0381811660008181526004602090815260409182902080546001600160a01b03191694881694851790559051928352929350917fb9aba67a9619eecb4b3e9fe6ded4a35c9bcdbfb1040f5122f91716de616a799391015b60405180910390a25050565b84610f1981612969565b6000610f26878787612a6c565b90506000610f3382612a88565b905060ff8716158015610f4c575063ffffffff84811614155b15610f6a5760405163d25a973560e01b815260040160405180910390fd5b610f748585612b2d565b60018101805463ffffffff87811667ffffffffffffffff199092168217640100000000918816918202179092556040805160ff808c1682528a1660208201529081019190915260608101919091526001600160a01b038916907f41ad9ed088bad8a3ad3052c7360f6919b647b45d4b527e478d463edbb8f9a43590608001610d9a565b8361100181612969565b600061100e868686612a6c565b9050600061101b82612a88565b905060ff861615801561103a57506001810154600160e81b900460ff16155b156110585760405163d25a973560e01b815260040160405180910390fd5b61106184612b5a565b60018101805463ffffffff60601b1916600160601b63ffffffff8716908102919091179091556040805160ff808a16825288166020820152908101919091526001600160a01b038816907f5da54689220406b0ee18edb07d2007345f96968da27c7fd0f405f649d26040a890606001610e23565b836110df81612969565b60006110ec868686612a6c565b905060006110f982612a88565b905060ff861615801561111b57506001810154600160e81b900460ff16600214155b156111395760405163d25a973560e01b815260040160405180910390fd5b80546001600160601b038516600160a01b81026001600160a01b039283161783556040805160ff8a811682528916602082015290810191909152908816907f3b082de0ef84f822f97496af03a3df5a8d5f0c271ea658b5b210819f1310494f90606001610e23565b60006111e06111db6111b660208501856139ec565b6111c660408601602087016142ba565b6111d660608701604088016142ba565b612a6c565b612a88565b600181015490915042640100000000820463ffffffff9081168211921611171561124757600181015460405163296f4f6960e01b815242600482015263ffffffff808316602483015264010000000090920490911660448201526064015b60405180910390fd5b61125e8160010154600160f01b9004600216151590565b1561127c57604051636be9245d60e11b815260040160405180910390fd5b6001810154600160e81b900460ff1660001981016112a35761129e8284612b81565b6112b9565b60011960ff8216016112b9576112b98284612cfc565b6112c4818385612e35565b60006113016112d960408601602087016142ba565b846112ea60a08801608089016142d5565b6112fc61012089016101008a01613b50565b613079565b905060008082600001513414611336578251604051630374cb4760e21b8152346004820152602481019190915260440161123e565b6060830151835186546001600160a01b03166000908152602081905260409020805483019055039150611388856113756101c089016101a08a016139ec565b6113836101c08a018a6142f0565b6131e9565b905080156113d6576101008301519182900391600260006113b16101c08a016101a08b016139ec565b6001600160a01b0316815260208101919091526040016000208054909101905561141a565b60006113ea6101c088016101a089016139ec565b6001600160a01b031614611411576040516320d6c38960e01b815260040160405180910390fd5b60006101008401525b600061142960208801886139ec565b604080516101a081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e0810182905261010081018290526101208101829052610140810182905261016081018290526101808101919091529091506114a560a0890160808a016142d5565b63ffffffff1681526001600160a01b03821663eebab8ef856114cd60408c0160208d016142ba565b6114dd60808d0160608e016139ec565b6114ed60a08e0160808f016142d5565b6040516001600160e01b031960e087901b16815260ff90931660048401526001600160a01b03909116602483015263ffffffff16604482015260640160206040518083038185885af1158015611547573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061156c919061433a565b602082015261158160c0890160a08a016139ec565b6001600160a01b0316604082015261159f60e0890160c08a016142d5565b63ffffffff1660608201526115bc61016089016101408a016142d5565b63ffffffff1660a08201526115d96101c089016101a08a016139ec565b6001600160a01b031660c082015282151560e08201528451610100808301919091526040860151610120830152606080870151610140840152608080880151610160850152918701516101808401526101e08a01359161163e91908b01908b016139ec565b6001600160a01b031661165460208b018b6139ec565b6001600160a01b03167f2a29f7402bd32f0e4bbe17d44be064f7f64d96ee174ed7cb27936d869bf9a88861168e60408d0160208e016142ba565b61169e60608e0160408f016142ba565b866040516116ae93929190614353565b60405180910390a45050505050505050565b604080516080808201835260008083526020808401829052838501829052606080850183905260ff87811689831b178452600683529286902086519485018752546001600160601b038082168652600160601b8204169285019290925261ffff600160c01b83041695840195909552600160d01b900416151592810183905290916117b25760066000606086901b6101001781526020808201929092526040908101600020815160808101835290546001600160601b038082168352600160601b82041693820193909352600160c01b830461ffff1691810191909152600160d01b90910460ff161515606082015290505b8060600151610e7357604080516080810182526000808252602082018190529181018290526060810191909152949350505050565b6060610c6361292c565b60006117fb612af5565b6001600160a01b03811660008181526003602090815260409182902080546bffffffffffffffffffffffff19166001600160601b038816908117909155915191825292935090917fed3d3f99e57c78ce76ac9a1704a72bb912e8f231cc25c6379fdf5354dbb6481b9101610f03565b600080611878888888612a6c565b905061188e61188682612a88565b8686866131e9565b98975050505050505050565b606060006118a9878787612a6c565b60008181526008602052604090209091508367ffffffffffffffff8111156118d3576118d3613d95565b6040519080825280602002602001820160405280156118fc578160200160208202803683370190505b50925060005b8085146119725761194886868381811061191e5761191e614444565b905060200201602081019061193391906142d5565b63ffffffff168361323890919063ffffffff16565b84828151811061195a5761195a614444565b91151560209283029190910190910152600101611902565b50505095945050505050565b600f60f81b606080600080808361199361292c565b97989097965046955030945091925090565b60006119af612af5565b90506119ba8261325a565b6001600160a01b0381811660008181526001602090815260409182902080546001600160a01b0319169487169485179055905192835290917f3a9b87574e9f01aaafa6d829c77645fe96010be0b3093259c7873f4a93de28e99101610f03565b6000611a24612af5565b9050611a2f82613281565b606081811b61010017600090815260066020908152604091829020855181549287015187850151958801511515600160d01b0260ff60d01b1961ffff909716600160c01b029690961662ffffff60c01b196001600160601b03928316600160601b026001600160c01b0319909616929093169190911793909317169190911792909217909155516001600160a01b038216907fec59616fef2c95b1d9e549c69e956a02fc10d12473c9667d711355ff224a2fe690610f03908590613b0e565b83611af881612969565b6000611b05868686612a6c565b90506000611b1282612a88565b600180820154919250600160e81b90910460ff1614611b445760405163d25a973560e01b815260040160405180910390fd5b611b4d846132fa565b600381018490556040805160ff8089168252871660208201529081018590526001600160a01b038816907f0b0a6fe894fe7695ac067d44d6e0de766337e9c3b5f0ee0a61be727383aac5a790606001610e23565b606081811b6000908152600560205260409020600181015461ffff600160d01b8204811691600160c01b9004168167ffffffffffffffff811115611be757611be7613d95565b604051908082528060200260200182016040528015611c2057816020015b611c0d613758565b815260200190600190039081611c055790505b5093505b8115611c8f5761ffff8116606086901b176000908152600560205260409020611c558660ff600885901c1684612472565b85846001900394508481518110611c6e57611c6e614444565b602090810291909101015260010154600160b01b900461ffff169050611c24565b505050919050565b83611ca181612969565b6000611cae868686612a6c565b90506000611cbb82612a88565b905060ff8616611cde5760405163d25a973560e01b815260040160405180910390fd5b6001810154600119600160e81b90910460ff1601611d0f5760405163d25a973560e01b815260040160405180910390fd5b611d1884613318565b6001810180546bffffffff00000000000000001916600160401b63ffffffff8716908102919091179091556040805160ff808a16825288166020820152908101919091526001600160a01b038816907f674233c20daf715ad9e94f9e5818adc53482b77e9556564e5fe3766678246e8e90606001610e23565b6000611d9e858585612a6c565b600081815260056020526040902060010154909150611dd2908690869086908690640100000000900463ffffffff16610f0f565b5050505050565b6000611de3612af5565b9050611dee82613281565b606081811b60ff851617600090815260066020908152604091829020855181549287015187850151958801511515600160d01b0260ff60d01b1961ffff909716600160c01b029690961662ffffff60c01b196001600160601b03928316600160601b026001600160c01b0319909616929093169190911793909317169190911792909217909155516001600160a01b038216907f2e28b985b43becdaa221ff743fd386f80ace62daa5b69941fd6b51445ddaf4ee90611eb0908690869061445a565b60405180910390a2505050565b83611ec781612969565b6000611ed4868686612a6c565b90506000611ee182612a88565b9050611eec8461333f565b60018101805461ffff60a01b1916600160a01b61ffff8716908102919091179091556040805160ff808a16825288166020820152908101919091526001600160a01b038816907fcdff4ec2999e249a9a848accff5e46b43263f82c4076334cd70300e07326472d90606001610e23565b600080611f6a868686612a6c565b6001600160a01b0384166000908152600760209081526040808320600385901c845290915290205490915060e0600583901b161c5b9695505050505050565b6000611fb88260000151612969565b611fc58260c0015161333f565b61014082015160ff8116611fe85760006101608401819052610180840152612059565b60001960ff82160161200f576120028361018001516132fa565b6000610160840152612059565b60011960ff82160161204057612029836101600151612acb565b600061018084015263ffffffff6080840152612059565b60405163a0042b1760e01b815260040160405180910390fd5b61010083015160ff1661209d5763ffffffff60608401819052608084015260ff811660021461208a57600060208401525b60ff811661209d5763ffffffff60a08401525b6120af83604001518460600151612b2d565b6120bc8360800151613318565b6120c98360a00151612b5a565b6000600560006120e486600001518761010001516000612a6c565b815260208082019290925260409081016000908120875160601b8252600590935220600180830154600160e01b900460ff169550919250908401610100811061212f5761212f613389565b6001808401805460ff909316600160e01b0260ff60e01b19909316929092179091558181015461ffff600160d01b909104160162010000811061217457612174613389565b60018201805461ffff60d01b1916600160d01b61ffff84160217905585516101008701516000916121a59188612a6c565b9050600060016001600160a01b03168861016001516001600160a01b031614905060006005600084815260200190815260200160002090508861012001518160000160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555088602001518160000160146101000a8154816001600160601b0302191690836001600160601b0316021790555088604001518160010160006101000a81548163ffffffff021916908363ffffffff16021790555088606001518160010160046101000a81548163ffffffff021916908363ffffffff16021790555088608001518160010160086101000a81548163ffffffff021916908363ffffffff1602179055508860a0015181600101600c6101000a81548163ffffffff021916908363ffffffff1602179055508860c001518160010160146101000a81548161ffff021916908361ffff16021790555088610140015181600101601d6101000a81548160ff021916908360ff1602179055506123268260049015150290565b6001828101805460ff60f01b198116600160f01b94841760ff908116959095029081178355928901805468ff000000000000ffff60b01b1990921661ffff60b01b1990941693909317600160c01b9182900461ffff16600160b01b02179091556101008c0151825461ffff60c01b1916938c1660089190911b61ff0016170291909117905560e0890151156123c05760e089015160028201555b610180890151156123d75761018089015160038201555b6101608901516001600160a01b0316156124185781612418576101608901516004820180546001600160a01b0319166001600160a01b039092169190911790555b88600001516001600160a01b03167fcbaa8cb5ab7e807c363e8c49ecb8b778bb2217e8e7d375826e911413a4c734f48a61010001518a8c60405161245e939291906144a5565b60405180910390a250505050505050919050565b61247a613758565b6000612487858585612a6c565b9050600061249482612a88565b6001600160a01b03878116855260ff878116602080880191909152878216604080890191909152845493841660608901819052600090815260039092529020546001600160601b039081166080880152600160a01b928390041660a0870152600183015463ffffffff80821660c08901526401000000008204811660e0890152600160401b82048116610100890152600160601b82048116610120890152600160801b82041661014088015291820461ffff16610160870152600160e81b8204166101808601529091506002600160f01b90910416151515156101a084015260028101546101e0840152600381015461020084015261259281613397565b6001600160a01b039081166102208501529054811660009081526004602052604090205416610240830152509392505050565b836125cf81612969565b60006125dc868686612a6c565b905060006125e982612a88565b60018101549091506126129060ff600160f01b9091041660028660ff8383161615901518021890565b60018201805460ff60f01b1916600160f01b60ff938416021790556040805188831681529187166020830152851515908201526001600160a01b038816907f81bd379475659273b35365d353d46c7de87aa468a01efc54544fcee90ae0d3b690606001610e23565b6000610c637fc03e2545e609fd0b7813d6074f00235b048ae7580a8e57070eed03901dd951ae6126ad60208501856139ec565b6126bd60408601602087016142ba565b6126cd60608701604088016142ba565b6126dd60808801606089016139ec565b6126ef61014089016101208a016142d5565b6127016101608a016101408b016142d5565b6127136101208b016101008c01613b50565b6127256101808c016101608d016142d5565b6127376101c08d016101a08e016139ec565b60408051602081019b909b526001600160a01b03998a16908b015260ff97881660608b015296909516608089015292861660a088015263ffffffff91821660c0880152811660e08701526001600160601b03909116610100860152166101208401521661014082015261016001604051602081830303815290604052805190602001206133ca565b6001600160a01b03808216600090815260016020526040902054166127e38161325a565b6001600160a01b0382166000908152602081905260409020548015612860576001600160a01b03831660009081526020819052604081205561282582826134e5565b826001600160a01b03167ffc7ad544ff6a06d6499925723d25b6fe70457a42939995b1d3d6f560fe33633382604051611eb091815260200190565b505050565b61286d61370c565b600061287a878787612a6c565b90506128908661288983612a88565b8686613079565b979650505050505050565b6001600160a01b0381166000908152600260205260409020548015612918576001600160a01b0382166000908152600260205260408120556128dd82826134e5565b816001600160a01b03167f0a1adaaf9d9caba9cf65528900e946b718d511ebd66ae81d5eb71e7fd0122c4a82604051610f0391815260200190565b5050565b6000610e9085858585368661186a565b604080518082018252600b81526a29bab832b926b4b73a32b960a91b602080830191909152825180840190935260018352603160f81b9083015291565b6000612973612af5565b9050816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156129b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129d791906145be565b6001600160a01b0316816001600160a01b0316146129185760405163145398bf60e21b81526001600160a01b0382811660048301526001602483015283169063514e62fc90604401602060405180830381865afa158015612a3c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a6091906145db565b61291857612918613533565b60008360601b60005282601e5381601f53505060005192915050565b60008181526005602052604081206001808201549192600160f01b909204169003612ac65760405163947dbacd60e01b815260040160405180910390fd5b919050565b6001600160a01b038116612af25760405163327effa960e11b815260040160405180910390fd5b50565b6000336000526e2fd5aeb385d324b580fca7c83823a0803303612b255760206000806000845afa612b2557600080fd5b505060005190565b8063ffffffff168263ffffffff1611156129185760405163536a71af60e01b815260040160405180910390fd5b8063ffffffff16600003612af257604051630ccae60160e31b815260040160405180910390fd5b6000612b9360e0830160c084016142d5565b90506000612ba760c0840160a085016139ec565b90506001600160a01b038116612bd05760405163582f497d60e11b815260040160405180910390fd5b63fffffffe1963ffffffff831601612c5b57612c0f8460030154612bf9836000526014600c2090565b612c0660e08701876142f0565b90929091613541565b158015612c385750612c368460030154612bf98363ffffffff6004526000526018600c2090565b155b15612c565760405163582f497d60e11b815260040160405180910390fd5b612c93565b612c768460030154612bf983856004526000526018600c2090565b612c935760405163582f497d60e11b815260040160405180910390fd5b6000612c9d612af5565b9050612cd16001600160a01b03838116908316811490612cc360808801606089016139ec565b6001600160a01b0316141790565b611dd257612cdf818361357b565b611dd25760405163fe736e0160e01b815260040160405180910390fd5b612d0e610140820161012083016142d5565b63ffffffff16612d2460a08301608084016142d5565b63ffffffff161115612d49576040516352ad28c360e11b815260040160405180910390fd5b6000612d54836135bd565b9050612d7681612d638461267a565b612d716101808601866145f8565b613608565b612d9357604051638baa579f60e01b815260040160405180910390fd5b612da5610180830161016084016142d5565b63ffffffff16421115612dcb57604051630819bdcd60e01b815260040160405180910390fd5b6000612ddd6111b660208501856139ec565b9050612e12612df4610160850161014086016142d5565b60008381526008602052604090209063ffffffff908116906136d116565b612e2f5760405163900bb2c960e01b815260040160405180910390fd5b50505050565b6000612e4760a08301608084016142d5565b600184015463ffffffff918216600160801b82048316019250600160601b900416811115612e8857604051637f70f90b60e01b815260040160405180910390fd5b60018301805463ffffffff60801b1916600160801b63ffffffff8416021790556000612eba6111b660208501856139ec565b905060001960ff861601612faf576000600781612edd60c0870160a088016139ec565b6001600160a01b0316815260208101919091526040016000209050612f0860a08501608086016142d5565b63ffffffff16612f21838361336690919063ffffffff16565b600187015463ffffffff918216929092019450612f5e91600160401b9004168411612f5260e0870160c088016142d5565b63ffffffff1685111790565b15612f7c57604051631b75136560e01b815260040160405180910390fd5b6020819052600382901c600090815260409020805460e0600585901b1681811c861863ffffffff16901b18905550611dd2565b6000600781612fc460808701606088016139ec565b6001600160a01b0316815260208101919091526040016000209050612fef60a08501608086016142d5565b63ffffffff16613008838361336690919063ffffffff16565b600187015463ffffffff918216929092019450600160401b9091041683111561304457604051631b75136560e01b815260040160405180910390fd5b6020819052600382901c600090815260409020805460e0600585901b1681811c861863ffffffff16901b189055505050505050565b61308161370c565b8354600090613099906001600160a01b0316876116c0565b6001860154909150600090600119600160e81b90910460ff16016130fd5785546001600160601b03600160a01b909104811690851610156130ed5760405163dcdc2f1560e01b815260040160405180910390fd5b506001600160601b038316613142565b60ff871661312e575084546001600160a01b03166000908152600360205260409020546001600160601b0316613142565b508454600160a01b90046001600160601b03165b604080840182905263ffffffff8616808302602080870182905285516001600160601b0390811660a08901819052918701511690920260c0870181905290910160808601529083015161319d919061ffff1661271091020490565b60e08401819052608084015101606084015260208301516001870154612710600160a01b90910461ffff1690910204610100840152505060808101516020820151018152949350505050565b6002840154600090806132095750506001600160a01b0383161515610e93565b611f9f6001600160a01b03861615156132348361322b896000526014600c2090565b88918891613541565b1690565b600881901c6000908152602092909252604090912054600160ff9092161c1690565b6001600160a01b038116612af2576040516362ccef3360e01b815260040160405180910390fd5b6132dc67016345785d8a00006001600160601b031682600001516001600160601b03161167016345785d8a00006001600160601b031683602001516001600160601b0316116103e861ffff16846040015161ffff1611613700565b15612af25760405163b17424c360e01b815260040160405180910390fd5b80612af25760405163caa2867f60e01b815260040160405180910390fd5b8063ffffffff16600003612af25760405163a017714560e01b815260040160405180910390fd5b6103e861ffff82161115612af257604051631a52ce6f60e01b815260040160405180910390fd5b600381901c600090815260209290925260409091205460059190911b60e0161c90565b6335278d126000526004601cfd5b6001810154600090600160f01b900460041681036133c25760048201546001600160a01b0316610c63565b600192915050565b60007f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000030147f00000000000000000000000000000000000000000000000000000000000000004614166134bf5750604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81527f000000000000000000000000000000000000000000000000000000000000000060208201527f00000000000000000000000000000000000000000000000000000000000000009181019190915246606082015230608082015260a090205b67190100000000000060005280601a5282603a52604260182091506000603a5250919050565b804710156134fb5763b12d13eb6000526004601cfd5b6000806000808486620186a0f161291857816000526073600b5360ff6020536016600b82f061291857620f42405a1161291857600080fd5b6382b429006000526004601cfd5b60008315613573578360051b8501855b803580851160051b948552602094851852604060002093018181106135515750505b501492915050565b6000604051639c395bc26000528360205282604052602060006044601c6d76a84fef008cdabe6409d2fe638b5afa600160005114169150806040525092915050565b6001810154600090600160f01b900460041681036135e85760048201546001600160a01b0316610c63565b50546001600160a01b039081166000908152600460205260409020541690565b6001600160a01b039093169260008415610e93576040516041831861368a5760408460408301377f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a060608201511161368a57848152604084013560001a602082015260208160808360015afa503d86825114021561368a576001915050610e93565b631626ba7e60e01b80825285600483015260406024830152836044830152838560648401376020600060648601848a5afa6000519091143d60201416169695505050505050565b600881901c600090815260209290925260409091208054600160ff9093169290921b9182189081905516151590565b60008282178417610e93565b6040518061012001604052806000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b6040805161026081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081018290526101408101829052610160810182905261018081018290526101a081018290526101c081018290526101e081018290526102008101829052610220810182905261024081019190915290565b60006020828403121561380657600080fd5b81356001600160e01b031981168114610e7357600080fd5b6000815180845260005b8181101561384457602081850181015186830182015201613828565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610e73602083018461381e565b6001600160a01b0381168114612af257600080fd5b8035612ac681613877565b803560ff81168114612ac657600080fd5b600080600080608085870312156138be57600080fd5b84356138c981613877565b93506138d760208601613897565b92506138e560408601613897565b915060608501356138f581613877565b939692955090935050565b6000806000806080858703121561391657600080fd5b843561392181613877565b935061392f60208601613897565b925061393d60408601613897565b9396929550929360600135925050565b6000806040838503121561396057600080fd5b823561396b81613877565b915061397960208401613897565b90509250929050565b803563ffffffff81168114612ac657600080fd5b600080600080608085870312156139ac57600080fd5b84356139b781613877565b93506139c560208601613897565b92506139d360408601613897565b91506139e160608601613982565b905092959194509250565b6000602082840312156139fe57600080fd5b8135610e7381613877565b600080600080600060a08688031215613a2157600080fd5b8535613a2c81613877565b9450613a3a60208701613897565b9350613a4860408701613897565b9250613a5660608701613982565b9150613a6460808701613982565b90509295509295909350565b80356001600160601b0381168114612ac657600080fd5b60008060008060808587031215613a9d57600080fd5b8435613aa881613877565b9350613ab660208601613897565b9250613ac460408601613897565b91506139e160608601613a70565b600060208284031215613ae457600080fd5b813567ffffffffffffffff811115613afb57600080fd5b82016102008185031215610e7357600080fd5b60808101610c6382846001600160601b038082511683528060208301511660208401525061ffff60408201511660408301526060810151151560608301525050565b600060208284031215613b6257600080fd5b610e7382613a70565b60008083601f840112613b7d57600080fd5b50813567ffffffffffffffff811115613b9557600080fd5b6020830191508360208260051b8501011115613bb057600080fd5b9250929050565b60008060008060008060a08789031215613bd057600080fd5b8635613bdb81613877565b9550613be960208801613897565b9450613bf760408801613897565b93506060870135613c0781613877565b9250608087013567ffffffffffffffff811115613c2357600080fd5b613c2f89828a01613b6b565b979a9699509497509295939492505050565b600080600080600060808688031215613c5957600080fd5b8535613c6481613877565b9450613c7260208701613897565b9350613c8060408701613897565b9250606086013567ffffffffffffffff811115613c9c57600080fd5b613ca888828901613b6b565b969995985093965092949392505050565b6020808252825182820181905260009190848201906040850190845b81811015613cf3578351151583529284019291840191600101613cd5565b50909695505050505050565b60ff60f81b881681526000602060e081840152613d1f60e084018a61381e565b8381036040850152613d31818a61381e565b606085018990526001600160a01b038816608086015260a0850187905284810360c0860152855180825283870192509083019060005b81811015613d8357835183529284019291840191600101613d67565b50909c9b505050505050505050505050565b634e487b7160e01b600052604160045260246000fd5b6040516101a0810167ffffffffffffffff81118282101715613ddd57634e487b7160e01b600052604160045260246000fd5b60405290565b803561ffff81168114612ac657600080fd5b8015158114612af257600080fd5b600060808284031215613e1557600080fd5b6040516080810181811067ffffffffffffffff82111715613e4657634e487b7160e01b600052604160045260246000fd5b604052905080613e5583613a70565b8152613e6360208401613a70565b6020820152613e7460408401613de3565b60408201526060830135613e8781613df5565b6060919091015292915050565b600060808284031215613ea657600080fd5b610e738383613e03565b80516001600160a01b031682526020810151613ed1602084018260ff169052565b506040810151613ee6604084018260ff169052565b506060810151613f0160608401826001600160a01b03169052565b506080810151613f1c60808401826001600160601b03169052565b5060a0810151613f3760a08401826001600160601b03169052565b5060c0810151613f4f60c084018263ffffffff169052565b5060e0810151613f6760e084018263ffffffff169052565b506101008181015163ffffffff908116918401919091526101208083015182169084015261014080830151909116908301526101608082015161ffff16908301526101808082015160ff16908301526101a0808201511515908301526101c0808201511515908301526101e080820151908301526102008082015190830152610220808201516001600160a01b0390811691840191909152610240808301519182168185015290612e2f565b6020808252825182820181905260009190848201906040850190845b81811015613cf357614042838551613eb0565b92840192610260929092019160010161402f565b60008060a0838503121561406957600080fd5b61407283613897565b91506139798460208501613e03565b6000806000806080858703121561409757600080fd5b84356140a281613877565b93506140b060208601613897565b92506140be60408601613897565b91506139e160608601613de3565b60006101a082840312156140df57600080fd5b6140e7613dab565b6140f08361388c565b81526140fe60208401613a70565b602082015261410f60408401613982565b604082015261412060608401613982565b606082015261413160808401613982565b608082015261414260a08401613982565b60a082015261415360c08401613de3565b60c082015260e083013560e0820152610100614170818501613897565b9082015261012061418284820161388c565b90820152610140614194848201613897565b908201526101606141a684820161388c565b90820152610180928301359281019290925250919050565b6000806000606084860312156141d357600080fd5b83356141de81613877565b92506141ec60208501613897565b91506141fa60408501613897565b90509250925092565b6102608101610c638284613eb0565b6000806000806080858703121561422857600080fd5b843561423381613877565b935061424160208601613897565b925061424f60408601613897565b915060608501356138f581613df5565b600080600080600060a0868803121561427757600080fd5b853561428281613877565b945061429060208701613897565b935061429e60408701613897565b92506142ac60608701613982565b9150613a6460808701613a70565b6000602082840312156142cc57600080fd5b610e7382613897565b6000602082840312156142e757600080fd5b610e7382613982565b6000808335601e1984360301811261430757600080fd5b83018035915067ffffffffffffffff82111561432257600080fd5b6020019150600581901b3603821315613bb057600080fd5b60006020828403121561434c57600080fd5b5051919050565b60ff848116825283166020820152815163ffffffff1660408201526101e081016020830151606083015260408301516001600160a01b038116608084015250606083015163ffffffff811660a084015250608083015163ffffffff811660c08401525060a083015163ffffffff811660e08401525060c08301516101006143e4818501836001600160a01b03169052565b60e085015191506101206143fb8186018415159052565b908501516101408581019190915290850151610160808601919091529085015161018080860191909152908501516101a0850152909301516101c0909201919091529392505050565b634e487b7160e01b600052603260045260246000fd5b60ff8316815260a08101610e7360208301846001600160601b038082511683528060208301511660208401525061ffff60408201511660408301526060810151151560608301525050565b60ff84811682528316602082015281516001600160a01b031660408201526101e0810160208301516001600160601b038116606084015250604083015163ffffffff8116608084015250606083015163ffffffff811660a084015250608083015163ffffffff811660c08401525060a083015163ffffffff811660e08401525060c083015161010061453c8185018361ffff169052565b60e085015161012085810191909152908501519150610140906145638286018460ff169052565b850151915061016061457f858201846001600160a01b03169052565b908501519150610180906145978583018460ff169052565b8501516001600160a01b03166101a0850152909301516101c0909201919091529392505050565b6000602082840312156145d057600080fd5b8151610e7381613877565b6000602082840312156145ed57600080fd5b8151610e7381613df5565b6000808335601e1984360301811261460f57600080fd5b83018035915067ffffffffffffffff82111561462a57600080fd5b602001915036819003821315613bb057600080fdfea264697066735822122063b90ae0923daf3e7a5b5e4598cafceb5ae2d8246dd0e86efd6f4a8249622ccd64736f6c63430008130033' as const

export const SuperMinterV1Config = {
  abi: superMinterV1Abi,
  bytecode: superMinterV1Bytecode,
} as const
