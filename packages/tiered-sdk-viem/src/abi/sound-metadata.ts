export const SOUND_METADATA_ADDRESS = '0x0000000000f5A96Dc85959cAeb0Cfe680f108FB5'

export const SOUND_METADATA_ABI = [
  { inputs: [], name: 'Unauthorized', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'edition', type: 'address' },
      { indexed: false, internalType: 'uint8', name: 'tier', type: 'uint8' },
      { indexed: false, internalType: 'string', name: 'uri', type: 'string' },
    ],
    name: 'BaseURISet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'edition', type: 'address' },
      { indexed: false, internalType: 'uint32', name: 'tokenId', type: 'uint32' },
    ],
    name: 'NumberUpToSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'edition', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'value', type: 'bool' },
    ],
    name: 'UseTierTokenIdIndexSet',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_NUMBER_UP_TO',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'edition', type: 'address' },
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
    ],
    name: 'baseURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'edition', type: 'address' },
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
    ],
    name: 'goldenEggTokenId',
    outputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'edition', type: 'address' }],
    name: 'numberedUpTo',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'edition', type: 'address' },
      { internalType: 'uint8', name: 'tier', type: 'uint8' },
      { internalType: 'string', name: 'uri', type: 'string' },
    ],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'edition', type: 'address' },
      { internalType: 'uint32', name: 'tokenId', type: 'uint32' },
    ],
    name: 'setNumberedUpTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'edition', type: 'address' },
      { internalType: 'bool', name: 'value', type: 'bool' },
    ],
    name: 'setUseTierTokenIdIndex',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{ internalType: 'address', name: 'edition', type: 'address' }],
    name: 'useTierTokenIdIndex',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const
