export const soundCreatorV1Abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_soundEditionImplementation',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'ArrayLengthsMismatch',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ImplementationAddressCantBeZero',
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
    name: 'Unauthorized',
    type: 'error',
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
        indexed: true,
        internalType: 'address',
        name: 'soundEdition',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'deployer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'initData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'contracts',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
      {
        indexed: false,
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    name: 'SoundEditionCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'SoundEditionImplementationSet',
    type: 'event',
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
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'initData',
        type: 'bytes',
      },
      {
        internalType: 'address[]',
        name: 'contracts',
        type: 'address[]',
      },
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'createSoundAndMints',
    outputs: [
      {
        internalType: 'address',
        name: 'soundEdition',
        type: 'address',
      },
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
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
        name: 'result',
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
        name: 'result',
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
        name: 'roles',
        type: 'uint256',
      },
    ],
    name: 'ordinalsFromRoles',
    outputs: [
      {
        internalType: 'uint8[]',
        name: 'ordinals',
        type: 'uint8[]',
      },
    ],
    stateMutability: 'pure',
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
        internalType: 'uint8[]',
        name: 'ordinals',
        type: 'uint8[]',
      },
    ],
    name: 'rolesFromOrdinals',
    outputs: [
      {
        internalType: 'uint256',
        name: 'roles',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
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
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'setEditionImplementation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'by',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
    ],
    name: 'soundEditionAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'soundEditionImplementation',
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
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const

const soundCreatorV1Bytecode =
  '0x608060405234801561001057600080fd5b50604051610d9d380380610d9d83398101604081905261002f916100be565b806001600160a01b03811661005757604051639841ec5160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b03841617905561007b33610082565b50506100ee565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b6000602082840312156100d057600080fd5b81516001600160a01b03811681146100e757600080fd5b9392505050565b610ca0806100fd6000396000f3fe6080604052600436106100fe5760003560e01c8063514e62fc116100955780638da5cb5b116100645780638da5cb5b14610290578063a77e0b98146102bd578063f04e283e146102dd578063f2fde38b146102f0578063fee81cf41461030357600080fd5b8063514e62fc1461022957806354d1f13d14610260578063715018a61461026857806371537cdd1461027057600080fd5b80632de94807116100d15780632de94807146101685780633d1d406a146101a95780634a4ee7b1146101d75780635004b7a0146101ea57600080fd5b8063183a4f6e146101035780631c10893f146101185780631cd64df41461012b5780632569296214610160575b600080fd5b6101166101113660046108e5565b610336565b005b61011661012636600461091a565b610343565b34801561013757600080fd5b5061014b61014636600461091a565b610359565b60405190151581526020015b60405180910390f35b610116610378565b34801561017457600080fd5b5061019b610183366004610944565b638b78c6d8600c908152600091909152602090205490565b604051908152602001610157565b3480156101b557600080fd5b506101c96101c43660046109b2565b6103c8565b604051610157929190610b0c565b6101166101e536600461091a565b6104e2565b3480156101f657600080fd5b5061020a61020536600461091a565b6104f4565b604080516001600160a01b039093168352901515602083015201610157565b34801561023557600080fd5b5061014b61024436600461091a565b638b78c6d8600c90815260009290925260209091205416151590565b610116610590565b6101166105cc565b34801561027c57600080fd5b5061011661028b366004610944565b6105e0565b34801561029c57600080fd5b50638b78c6d819545b6040516001600160a01b039091168152602001610157565b3480156102c957600080fd5b506000546102a5906001600160a01b031681565b6101166102eb366004610944565b610665565b6101166102fe366004610944565b6106a2565b34801561030f57600080fd5b5061019b61031e366004610944565b63389a75e1600c908152600091909152602090205490565b61034033826106c9565b50565b61034b6106d5565b61035582826106f0565b5050565b638b78c6d8600c90815260008390526020902054811681145b92915050565b60006202a30067ffffffffffffffff164201905063389a75e1600c5233600052806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b600080546060906103f5906001600160a01b03166103f0338c60009182526020526040902090565b6106fc565b91506040518789823760008089836000875af1610416573d6000803e3d6000fd5b50610423868686866107a0565b60405163f2fde38b60e01b81523360048201529091506001600160a01b0383169063f2fde38b90602401600060405180830381600087803b15801561046757600080fd5b505af115801561047b573d6000803e3d6000fd5b50505050336001600160a01b0316826001600160a01b03167f405098db99342b699216d8150e930dbbf2f686f5a43485aed1e69219dafd49358a8a8a8a8a8a896040516104ce9796959493929190610b61565b60405180910390a397509795505050505050565b6104ea6106d5565b61035582826106c9565b60008054819061057a906001600160a01b031661051b868660009182526020526040902090565b30604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b8152606093841b60148201526f5af43d82803e903d91602b57fd5bf3ff60801b6028820152921b6038830152604c8201526037808220606c830152605591012090565b946001600160a01b0386163b1515945092505050565b63389a75e1600c523360005260006020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b6105d46106d5565b6105de600061084e565b565b6105e86106d5565b806001600160a01b03811661061057604051639841ec5160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b0384169081179091556040519081527f6474a145358de2983a1f98097b7806fd7071e8ca712d3fa4f91df709a99a9c109060200160405180910390a15050565b61066d6106d5565b63389a75e1600c52806000526020600c20805442111561069557636f5e88186000526004601cfd5b600090556103408161084e565b6106aa6106d5565b8060601b6106c057637448fbae6000526004601cfd5b6103408161084e565b6103558282600061088c565b638b78c6d8195433146105de576382b429006000526004601cfd5b6103558282600161088c565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528360601b60148201526e5af43d82803e903d91602b57fd5bf360881b6028820152826037826000f59150506001600160a01b0381166103725760405162461bcd60e51b815260206004820152601760248201527f455243313136373a2063726561746532206661696c6564000000000000000000604482015260640160405180910390fd5b60608382146107c257604051631dc0052360e11b815260040160405180910390fd5b6040519050818152602081018260051b84018360051b8201855b82811461083f578035870180356020820184378782038a01356000808335866000855af161080e573d6000803e3d6000fd5b50508184526020840193503d82523d6000602084013e3d91909101603f0167ffffffffffffffe016906020016107dc565b50604052509095945050505050565b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a355565b638b78c6d8600c52826000526020600c208054838117836108ae575080841681185b80835580600c5160601c7f715ad5ce61fc9595c7b415289d59cf203f23a94fa06f04af7e489a0a76e1fe26600080a3505050505050565b6000602082840312156108f757600080fd5b5035919050565b80356001600160a01b038116811461091557600080fd5b919050565b6000806040838503121561092d57600080fd5b610936836108fe565b946020939093013593505050565b60006020828403121561095657600080fd5b61095f826108fe565b9392505050565b60008083601f84011261097857600080fd5b50813567ffffffffffffffff81111561099057600080fd5b6020830191508360208260051b85010111156109ab57600080fd5b9250929050565b60008060008060008060006080888a0312156109cd57600080fd5b87359650602088013567ffffffffffffffff808211156109ec57600080fd5b818a0191508a601f830112610a0057600080fd5b813581811115610a0f57600080fd5b8b6020828501011115610a2157600080fd5b6020830198508097505060408a0135915080821115610a3f57600080fd5b610a4b8b838c01610966565b909650945060608a0135915080821115610a6457600080fd5b50610a718a828b01610966565b989b979a50959850939692959293505050565b600082825180855260208086019550808260051b8401018186016000805b85811015610afe57601f1980888603018b5283518051808752845b81811015610ad8578281018901518882018a01528801610abd565b5086810188018590529b87019b601f019091169094018501935091840191600101610aa2565b509198975050505050505050565b6001600160a01b0383168152604060208201819052600090610b3090830184610a84565b949350505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b608081526000610b7560808301898b610b38565b8281036020848101919091528782528891810160005b89811015610bb7576001600160a01b03610ba4856108fe565b1682529282019290820190600101610b8b565b5084810360408601528681528181019250600587901b810182018860005b89811015610c4557838303601f190186528135368c9003601e19018112610bfb57600080fd5b8b01858101903567ffffffffffffffff811115610c1757600080fd5b803603821315610c2657600080fd5b610c31858284610b38565b978701979450505090840190600101610bd5565b50508581036060870152610c598188610a84565b9d9c5050505050505050505050505056fea26469706673582212209553362764b6534b7f8d4dbf7184dce66b20b6a6f38b6b2f663c666d6cefb39f64736f6c6343000813003300000000000000000000000076a94abf51196f75ed6d7f32882861734257c184' as const

export const SoundCreatorV1Config = {
  abi: soundCreatorV1Abi,
  bytecode: soundCreatorV1Bytecode,
} as const
