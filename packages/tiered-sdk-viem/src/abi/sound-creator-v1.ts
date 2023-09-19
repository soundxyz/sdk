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
  '0x608060405234801561001057600080fd5b5060405161110d38038061110d83398101604081905261002f916100be565b806001600160a01b03811661005757604051639841ec5160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b03841617905561007b33610082565b50506100ee565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b6000602082840312156100d057600080fd5b81516001600160a01b03811681146100e757600080fd5b9392505050565b611010806100fd6000396000f3fe608060405234801561001057600080fd5b506004361061016c5760003560e01c806354d1f13d116100cd578063a77e0b9811610081578063f04e283e11610066578063f04e283e1461033c578063f2fde38b1461034f578063fee81cf41461036257600080fd5b8063a77e0b9814610318578063d7533f021461032b57600080fd5b806371537cdd116100b257806371537cdd146102c55780637359e41f146102d85780638da5cb5b146102f857600080fd5b806354d1f13d146102b5578063715018a6146102bd57600080fd5b80632de94807116101245780634a4ee7b1116101095780634a4ee7b1146102465780635004b7a014610259578063514e62fc1461028b57600080fd5b80632de94807146102015780633d1d406a1461022557600080fd5b80631c10893f116101555780631c10893f146101ac5780631cd64df4146101bf57806325692962146101f957600080fd5b806313a661ed14610171578063183a4f6e14610197575b600080fd5b61018461017f366004610b53565b610386565b6040519081526020015b60405180910390f35b6101aa6101a5366004610c18565b6103b9565b005b6101aa6101ba366004610c48565b6103c6565b6101e96101cd366004610c48565b60609190911b638b78c6d8176000908152602090205481161490565b604051901515815260200161018e565b6101aa6103ef565b61018461020f366004610c72565b60601b638b78c6d8176000908152602090205490565b610238610233366004610ce0565b610440565b60405161018e929190610e37565b6101aa610254366004610c48565b610573565b61026c610267366004610c48565b610598565b604080516001600160a01b03909316835290151560208301520161018e565b6101e9610299366004610c48565b60609190911b638b78c6d8176000908152602090205416151590565b6101aa61064a565b6101aa610687565b6101aa6102d3366004610c72565b6106d5565b6102eb6102e6366004610c18565b61079e565b60405161018e9190610e61565b638b78c6d819545b6040516001600160a01b03909116815260200161018e565b600054610300906001600160a01b031681565b6040516202a300815260200161018e565b6101aa61034a366004610c72565b6107e6565b6101aa61035d366004610c72565b610868565b610184610370366004610c72565b60601b63389a75e1176000908152602090205490565b600060208201825160051b81015b8082146103b257600160ff8351161b83179250602082019150610394565b5050919050565b6103c333826108cf565b50565b638b78c6d8195433146103e1576382b429006000526004601cfd5b6103eb8282610920565b5050565b60006202a30067ffffffffffffffff164201905063389a75e13360601b1760005280602060002055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b6000805460609061046d906001600160a01b0316610468338c60009182526020526040902090565b61096c565b91506040518789823760008089836000875af161048e573d6000803e3d6000fd5b5061049b86868686610a47565b6040517ff2fde38b0000000000000000000000000000000000000000000000000000000081523360048201529091506001600160a01b0383169063f2fde38b90602401600060405180830381600087803b1580156104f857600080fd5b505af115801561050c573d6000803e3d6000fd5b50505050336001600160a01b0316826001600160a01b03167f405098db99342b699216d8150e930dbbf2f686f5a43485aed1e69219dafd49358a8a8a8a8a8a8960405161055f9796959493929190610ed1565b60405180910390a397509795505050505050565b638b78c6d81954331461058e576382b429006000526004601cfd5b6103eb82826108cf565b600080548190610634906001600160a01b03166105bf868660009182526020526040902090565b306040517f3d602d80600a3d3981f3363d3d373d3d3d363d730000000000000000000000008152606093841b60148201527f5af43d82803e903d91602b57fd5bf3ff000000000000000000000000000000006028820152921b6038830152604c8201526037808220606c830152605591012090565b946001600160a01b0386163b1515945092505050565b63389a75e13360601b176000526000602060002055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b638b78c6d8195433146106a2576382b429006000526004601cfd5b6000337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a36000638b78c6d81955565b638b78c6d8195433146106f0576382b429006000526004601cfd5b806001600160a01b038116610731576040517f9841ec5100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0384169081179091556040519081527f6474a145358de2983a1f98097b7806fd7071e8ca712d3fa4f91df709a99a9c109060200160405180910390a15050565b606060206040510160005b8082526001841660051b820191508360011c935083156107cb576001016107a9565b5060405191508060405260208201810360051c825250919050565b638b78c6d819543314610801576382b429006000526004601cfd5b8060601b60601c905063389a75e18160601b176000526020600020805442111561083357636f5e88186000526004601cfd5b600081555080337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3638b78c6d81955565b638b78c6d819543314610883576382b429006000526004601cfd5b6001600160a01b03168061089f57637448fbae6000526004601cfd5b80337f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3638b78c6d81955565b638b78c6d88260601b176000526020600020805482811681189050808255808460601b60601c7f715ad5ce61fc9595c7b415289d59cf203f23a94fa06f04af7e489a0a76e1fe26600080a350505050565b638b78c6d88260601b17600052602060002081815417808255808460601b60601c7f715ad5ce61fc9595c7b415289d59cf203f23a94fa06f04af7e489a0a76e1fe26600080a350505050565b60006040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528360601b60148201527f5af43d82803e903d91602b57fd5bf300000000000000000000000000000000006028820152826037826000f59150506001600160a01b038116610a41576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f455243313136373a2063726561746532206661696c6564000000000000000000604482015260640160405180910390fd5b92915050565b6060838214610a82576040517f3b800a4600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040519050818152602081018260051b84018360051b8201855b828114610aff578035870180356020820184378782038a01356000808335866000855af1610ace573d6000803e3d6000fd5b50508184526020840193503d82523d6000602084013e3d91909101603f0167ffffffffffffffe01690602001610a9c565b50604052509095945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b803560ff81168114610b4e57600080fd5b919050565b60006020808385031215610b6657600080fd5b823567ffffffffffffffff80821115610b7e57600080fd5b818501915085601f830112610b9257600080fd5b813581811115610ba457610ba4610b0e565b8060051b604051601f19603f83011681018181108582111715610bc957610bc9610b0e565b604052918252848201925083810185019188831115610be757600080fd5b938501935b82851015610c0c57610bfd85610b3d565b84529385019392850192610bec565b98975050505050505050565b600060208284031215610c2a57600080fd5b5035919050565b80356001600160a01b0381168114610b4e57600080fd5b60008060408385031215610c5b57600080fd5b610c6483610c31565b946020939093013593505050565b600060208284031215610c8457600080fd5b610c8d82610c31565b9392505050565b60008083601f840112610ca657600080fd5b50813567ffffffffffffffff811115610cbe57600080fd5b6020830191508360208260051b8501011115610cd957600080fd5b9250929050565b60008060008060008060006080888a031215610cfb57600080fd5b87359650602088013567ffffffffffffffff80821115610d1a57600080fd5b818a0191508a601f830112610d2e57600080fd5b813581811115610d3d57600080fd5b8b6020828501011115610d4f57600080fd5b6020830198508097505060408a0135915080821115610d6d57600080fd5b610d798b838c01610c94565b909650945060608a0135915080821115610d9257600080fd5b50610d9f8a828b01610c94565b989b979a50959850939692959293505050565b600081518084526020808501808196508360051b810191508286016000805b86811015610e29578385038a5282518051808752835b81811015610e02578281018901518882018a01528801610de7565b5086810188018490529a87019a601f01601f19169095018601945091850191600101610dd1565b509298975050505050505050565b6001600160a01b0383168152604060208201526000610e596040830184610db2565b949350505050565b6020808252825182820181905260009190848201906040850190845b81811015610e9c57835160ff1683529284019291840191600101610e7d565b50909695505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b608081526000610ee560808301898b610ea8565b8281036020848101919091528782528891810160005b89811015610f27576001600160a01b03610f1485610c31565b1682529282019290820190600101610efb565b5084810360408601528681528181019250600587901b810182018860005b89811015610fb557838303601f190186528135368c9003601e19018112610f6b57600080fd5b8b01858101903567ffffffffffffffff811115610f8757600080fd5b803603821315610f9657600080fd5b610fa1858284610ea8565b978701979450505090840190600101610f45565b50508581036060870152610fc98188610db2565b9d9c5050505050505050505050505056fea2646970667358221220356162b014c9689240fdb69846eaa15abf9793afa3029ec14a5895627947f3c164736f6c634300081000330000000000000000000000008cfbfae570d673864cd61e1e4543eb7874ca35c2' as const

export const SoundCreatorV1Config = {
  abi: soundCreatorV1Abi,
  bytecode: soundCreatorV1Bytecode,
} as const
