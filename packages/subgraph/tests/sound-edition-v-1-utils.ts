import { newMockEvent } from 'matchstick-as'
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts'
import {
  Approval,
  ApprovalForAll,
  BaseURISet,
  ConsecutiveTransfer,
  ContractURISet,
  EditionCutoffTimeSet,
  EditionMaxMintableRangeSet,
  FundingRecipientSet,
  MetadataFrozen,
  MetadataModuleSet,
  MintRandomnessEnabledSet,
  OwnershipHandoverCanceled,
  OwnershipHandoverRequested,
  OwnershipTransferred,
  RolesUpdated,
  RoyaltySet,
  SoundEditionInitialized,
  Transfer,
} from '../generated/SoundEditionV1/SoundEditionV1'

export function createApprovalEvent(owner: Address, approved: Address, tokenId: BigInt): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)))
  approvalEvent.parameters.push(new ethereum.EventParam('approved', ethereum.Value.fromAddress(approved)))
  approvalEvent.parameters.push(new ethereum.EventParam('tokenId', ethereum.Value.fromUnsignedBigInt(tokenId)))

  return approvalEvent
}

export function createApprovalForAllEvent(owner: Address, operator: Address, approved: boolean): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)))
  approvalForAllEvent.parameters.push(new ethereum.EventParam('operator', ethereum.Value.fromAddress(operator)))
  approvalForAllEvent.parameters.push(new ethereum.EventParam('approved', ethereum.Value.fromBoolean(approved)))

  return approvalForAllEvent
}

export function createBaseURISetEvent(baseURI: string): BaseURISet {
  let baseUriSetEvent = changetype<BaseURISet>(newMockEvent())

  baseUriSetEvent.parameters = new Array()

  baseUriSetEvent.parameters.push(new ethereum.EventParam('baseURI', ethereum.Value.fromString(baseURI)))

  return baseUriSetEvent
}

export function createConsecutiveTransferEvent(
  fromTokenId: BigInt,
  toTokenId: BigInt,
  from: Address,
  to: Address,
): ConsecutiveTransfer {
  let consecutiveTransferEvent = changetype<ConsecutiveTransfer>(newMockEvent())

  consecutiveTransferEvent.parameters = new Array()

  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam('fromTokenId', ethereum.Value.fromUnsignedBigInt(fromTokenId)),
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam('toTokenId', ethereum.Value.fromUnsignedBigInt(toTokenId)),
  )
  consecutiveTransferEvent.parameters.push(new ethereum.EventParam('from', ethereum.Value.fromAddress(from)))
  consecutiveTransferEvent.parameters.push(new ethereum.EventParam('to', ethereum.Value.fromAddress(to)))

  return consecutiveTransferEvent
}

export function createContractURISetEvent(contractURI: string): ContractURISet {
  let contractUriSetEvent = changetype<ContractURISet>(newMockEvent())

  contractUriSetEvent.parameters = new Array()

  contractUriSetEvent.parameters.push(new ethereum.EventParam('contractURI', ethereum.Value.fromString(contractURI)))

  return contractUriSetEvent
}

export function createEditionCutoffTimeSetEvent(editionCutoffTime_: BigInt): EditionCutoffTimeSet {
  let editionCutoffTimeSetEvent = changetype<EditionCutoffTimeSet>(newMockEvent())

  editionCutoffTimeSetEvent.parameters = new Array()

  editionCutoffTimeSetEvent.parameters.push(
    new ethereum.EventParam('editionCutoffTime_', ethereum.Value.fromUnsignedBigInt(editionCutoffTime_)),
  )

  return editionCutoffTimeSetEvent
}

export function createEditionMaxMintableRangeSetEvent(
  editionMaxMintableLower_: BigInt,
  editionMaxMintableUpper_: BigInt,
): EditionMaxMintableRangeSet {
  let editionMaxMintableRangeSetEvent = changetype<EditionMaxMintableRangeSet>(newMockEvent())

  editionMaxMintableRangeSetEvent.parameters = new Array()

  editionMaxMintableRangeSetEvent.parameters.push(
    new ethereum.EventParam('editionMaxMintableLower_', ethereum.Value.fromUnsignedBigInt(editionMaxMintableLower_)),
  )
  editionMaxMintableRangeSetEvent.parameters.push(
    new ethereum.EventParam('editionMaxMintableUpper_', ethereum.Value.fromUnsignedBigInt(editionMaxMintableUpper_)),
  )

  return editionMaxMintableRangeSetEvent
}

export function createFundingRecipientSetEvent(fundingRecipient: Address): FundingRecipientSet {
  let fundingRecipientSetEvent = changetype<FundingRecipientSet>(newMockEvent())

  fundingRecipientSetEvent.parameters = new Array()

  fundingRecipientSetEvent.parameters.push(
    new ethereum.EventParam('fundingRecipient', ethereum.Value.fromAddress(fundingRecipient)),
  )

  return fundingRecipientSetEvent
}

export function createMetadataFrozenEvent(
  metadataModule: Address,
  baseURI: string,
  contractURI: string,
): MetadataFrozen {
  let metadataFrozenEvent = changetype<MetadataFrozen>(newMockEvent())

  metadataFrozenEvent.parameters = new Array()

  metadataFrozenEvent.parameters.push(
    new ethereum.EventParam('metadataModule', ethereum.Value.fromAddress(metadataModule)),
  )
  metadataFrozenEvent.parameters.push(new ethereum.EventParam('baseURI', ethereum.Value.fromString(baseURI)))
  metadataFrozenEvent.parameters.push(new ethereum.EventParam('contractURI', ethereum.Value.fromString(contractURI)))

  return metadataFrozenEvent
}

export function createMetadataModuleSetEvent(metadataModule: Address): MetadataModuleSet {
  let metadataModuleSetEvent = changetype<MetadataModuleSet>(newMockEvent())

  metadataModuleSetEvent.parameters = new Array()

  metadataModuleSetEvent.parameters.push(
    new ethereum.EventParam('metadataModule', ethereum.Value.fromAddress(metadataModule)),
  )

  return metadataModuleSetEvent
}

export function createMintRandomnessEnabledSetEvent(mintRandomnessEnabled_: boolean): MintRandomnessEnabledSet {
  let mintRandomnessEnabledSetEvent = changetype<MintRandomnessEnabledSet>(newMockEvent())

  mintRandomnessEnabledSetEvent.parameters = new Array()

  mintRandomnessEnabledSetEvent.parameters.push(
    new ethereum.EventParam('mintRandomnessEnabled_', ethereum.Value.fromBoolean(mintRandomnessEnabled_)),
  )

  return mintRandomnessEnabledSetEvent
}

export function createOwnershipHandoverCanceledEvent(pendingOwner: Address): OwnershipHandoverCanceled {
  let ownershipHandoverCanceledEvent = changetype<OwnershipHandoverCanceled>(newMockEvent())

  ownershipHandoverCanceledEvent.parameters = new Array()

  ownershipHandoverCanceledEvent.parameters.push(
    new ethereum.EventParam('pendingOwner', ethereum.Value.fromAddress(pendingOwner)),
  )

  return ownershipHandoverCanceledEvent
}

export function createOwnershipHandoverRequestedEvent(pendingOwner: Address): OwnershipHandoverRequested {
  let ownershipHandoverRequestedEvent = changetype<OwnershipHandoverRequested>(newMockEvent())

  ownershipHandoverRequestedEvent.parameters = new Array()

  ownershipHandoverRequestedEvent.parameters.push(
    new ethereum.EventParam('pendingOwner', ethereum.Value.fromAddress(pendingOwner)),
  )

  return ownershipHandoverRequestedEvent
}

export function createOwnershipTransferredEvent(oldOwner: Address, newOwner: Address): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(new ethereum.EventParam('oldOwner', ethereum.Value.fromAddress(oldOwner)))
  ownershipTransferredEvent.parameters.push(new ethereum.EventParam('newOwner', ethereum.Value.fromAddress(newOwner)))

  return ownershipTransferredEvent
}

export function createRolesUpdatedEvent(user: Address, roles: BigInt): RolesUpdated {
  let rolesUpdatedEvent = changetype<RolesUpdated>(newMockEvent())

  rolesUpdatedEvent.parameters = new Array()

  rolesUpdatedEvent.parameters.push(new ethereum.EventParam('user', ethereum.Value.fromAddress(user)))
  rolesUpdatedEvent.parameters.push(new ethereum.EventParam('roles', ethereum.Value.fromUnsignedBigInt(roles)))

  return rolesUpdatedEvent
}

export function createRoyaltySetEvent(bps: i32): RoyaltySet {
  let royaltySetEvent = changetype<RoyaltySet>(newMockEvent())

  royaltySetEvent.parameters = new Array()

  royaltySetEvent.parameters.push(
    new ethereum.EventParam('bps', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(bps))),
  )

  return royaltySetEvent
}

export function createSoundEditionInitializedEvent(
  edition_: Address,
  name_: string,
  symbol_: string,
  metadataModule_: Address,
  baseURI_: string,
  contractURI_: string,
  fundingRecipient_: Address,
  royaltyBPS_: i32,
  editionMaxMintableLower_: BigInt,
  editionMaxMintableUpper_: BigInt,
  editionCutoffTime_: BigInt,
  flags_: i32,
): SoundEditionInitialized {
  let soundEditionInitializedEvent = changetype<SoundEditionInitialized>(newMockEvent())

  soundEditionInitializedEvent.parameters = new Array()

  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('edition_', ethereum.Value.fromAddress(edition_)),
  )
  soundEditionInitializedEvent.parameters.push(new ethereum.EventParam('name_', ethereum.Value.fromString(name_)))
  soundEditionInitializedEvent.parameters.push(new ethereum.EventParam('symbol_', ethereum.Value.fromString(symbol_)))
  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('metadataModule_', ethereum.Value.fromAddress(metadataModule_)),
  )
  soundEditionInitializedEvent.parameters.push(new ethereum.EventParam('baseURI_', ethereum.Value.fromString(baseURI_)))
  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('contractURI_', ethereum.Value.fromString(contractURI_)),
  )
  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('fundingRecipient_', ethereum.Value.fromAddress(fundingRecipient_)),
  )
  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('royaltyBPS_', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(royaltyBPS_))),
  )
  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('editionMaxMintableLower_', ethereum.Value.fromUnsignedBigInt(editionMaxMintableLower_)),
  )
  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('editionMaxMintableUpper_', ethereum.Value.fromUnsignedBigInt(editionMaxMintableUpper_)),
  )
  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('editionCutoffTime_', ethereum.Value.fromUnsignedBigInt(editionCutoffTime_)),
  )
  soundEditionInitializedEvent.parameters.push(
    new ethereum.EventParam('flags_', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(flags_))),
  )

  return soundEditionInitializedEvent
}

export function createTransferEvent(from: Address, to: Address, tokenId: BigInt): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(new ethereum.EventParam('from', ethereum.Value.fromAddress(from)))
  transferEvent.parameters.push(new ethereum.EventParam('to', ethereum.Value.fromAddress(to)))
  transferEvent.parameters.push(new ethereum.EventParam('tokenId', ethereum.Value.fromUnsignedBigInt(tokenId)))

  return transferEvent
}
