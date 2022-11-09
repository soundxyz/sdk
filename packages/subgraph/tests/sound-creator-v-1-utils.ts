import { newMockEvent } from 'matchstick-as'
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import {
  OwnershipHandoverCanceled,
  OwnershipHandoverRequested,
  OwnershipTransferred,
  RolesUpdated,
  SoundEditionCreated,
  SoundEditionImplementationSet,
} from '../generated/SoundCreatorV1/SoundCreatorV1'

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

export function createSoundEditionCreatedEvent(
  soundEdition: Address,
  deployer: Address,
  initData: Bytes,
  contracts: Array<Address>,
  data: Array<Bytes>,
  results: Array<Bytes>,
): SoundEditionCreated {
  let soundEditionCreatedEvent = changetype<SoundEditionCreated>(newMockEvent())

  soundEditionCreatedEvent.parameters = new Array()

  soundEditionCreatedEvent.parameters.push(
    new ethereum.EventParam('soundEdition', ethereum.Value.fromAddress(soundEdition)),
  )
  soundEditionCreatedEvent.parameters.push(new ethereum.EventParam('deployer', ethereum.Value.fromAddress(deployer)))
  soundEditionCreatedEvent.parameters.push(new ethereum.EventParam('initData', ethereum.Value.fromBytes(initData)))
  soundEditionCreatedEvent.parameters.push(
    new ethereum.EventParam('contracts', ethereum.Value.fromAddressArray(contracts)),
  )
  soundEditionCreatedEvent.parameters.push(new ethereum.EventParam('data', ethereum.Value.fromBytesArray(data)))
  soundEditionCreatedEvent.parameters.push(new ethereum.EventParam('results', ethereum.Value.fromBytesArray(results)))

  return soundEditionCreatedEvent
}

export function createSoundEditionImplementationSetEvent(newImplementation: Address): SoundEditionImplementationSet {
  let soundEditionImplementationSetEvent = changetype<SoundEditionImplementationSet>(newMockEvent())

  soundEditionImplementationSetEvent.parameters = new Array()

  soundEditionImplementationSetEvent.parameters.push(
    new ethereum.EventParam('newImplementation', ethereum.Value.fromAddress(newImplementation)),
  )

  return soundEditionImplementationSetEvent
}
