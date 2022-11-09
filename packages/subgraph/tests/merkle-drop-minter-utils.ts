import { newMockEvent } from 'matchstick-as'
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import {
  AffiliateFeeSet,
  DropClaimed,
  MaxMintablePerAccountSet,
  MaxMintableSet,
  MerkleDropMintCreated,
  MerkleRootHashSet,
  MintConfigCreated,
  MintPausedSet,
  Minted,
  PriceSet,
  TimeRangeSet,
} from '../generated/MerkleDropMinter/MerkleDropMinter'

export function createAffiliateFeeSetEvent(edition: Address, mintId: BigInt, bps: i32): AffiliateFeeSet {
  let affiliateFeeSetEvent = changetype<AffiliateFeeSet>(newMockEvent())

  affiliateFeeSetEvent.parameters = new Array()

  affiliateFeeSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  affiliateFeeSetEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  affiliateFeeSetEvent.parameters.push(
    new ethereum.EventParam('bps', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(bps))),
  )

  return affiliateFeeSetEvent
}

export function createDropClaimedEvent(recipient: Address, quantity: BigInt): DropClaimed {
  let dropClaimedEvent = changetype<DropClaimed>(newMockEvent())

  dropClaimedEvent.parameters = new Array()

  dropClaimedEvent.parameters.push(new ethereum.EventParam('recipient', ethereum.Value.fromAddress(recipient)))
  dropClaimedEvent.parameters.push(new ethereum.EventParam('quantity', ethereum.Value.fromUnsignedBigInt(quantity)))

  return dropClaimedEvent
}

export function createMaxMintablePerAccountSetEvent(
  edition: Address,
  mintId: BigInt,
  maxMintablePerAccount: BigInt,
): MaxMintablePerAccountSet {
  let maxMintablePerAccountSetEvent = changetype<MaxMintablePerAccountSet>(newMockEvent())

  maxMintablePerAccountSetEvent.parameters = new Array()

  maxMintablePerAccountSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  maxMintablePerAccountSetEvent.parameters.push(
    new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)),
  )
  maxMintablePerAccountSetEvent.parameters.push(
    new ethereum.EventParam('maxMintablePerAccount', ethereum.Value.fromUnsignedBigInt(maxMintablePerAccount)),
  )

  return maxMintablePerAccountSetEvent
}

export function createMaxMintableSetEvent(edition: Address, mintId: BigInt, maxMintable: BigInt): MaxMintableSet {
  let maxMintableSetEvent = changetype<MaxMintableSet>(newMockEvent())

  maxMintableSetEvent.parameters = new Array()

  maxMintableSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  maxMintableSetEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  maxMintableSetEvent.parameters.push(
    new ethereum.EventParam('maxMintable', ethereum.Value.fromUnsignedBigInt(maxMintable)),
  )

  return maxMintableSetEvent
}

export function createMerkleDropMintCreatedEvent(
  edition: Address,
  mintId: BigInt,
  merkleRootHash: Bytes,
  price: BigInt,
  startTime: BigInt,
  endTime: BigInt,
  affiliateFeeBPS: i32,
  maxMintable: BigInt,
  maxMintablePerAccount: BigInt,
): MerkleDropMintCreated {
  let merkleDropMintCreatedEvent = changetype<MerkleDropMintCreated>(newMockEvent())

  merkleDropMintCreatedEvent.parameters = new Array()

  merkleDropMintCreatedEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  merkleDropMintCreatedEvent.parameters.push(
    new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)),
  )
  merkleDropMintCreatedEvent.parameters.push(
    new ethereum.EventParam('merkleRootHash', ethereum.Value.fromFixedBytes(merkleRootHash)),
  )
  merkleDropMintCreatedEvent.parameters.push(new ethereum.EventParam('price', ethereum.Value.fromUnsignedBigInt(price)))
  merkleDropMintCreatedEvent.parameters.push(
    new ethereum.EventParam('startTime', ethereum.Value.fromUnsignedBigInt(startTime)),
  )
  merkleDropMintCreatedEvent.parameters.push(
    new ethereum.EventParam('endTime', ethereum.Value.fromUnsignedBigInt(endTime)),
  )
  merkleDropMintCreatedEvent.parameters.push(
    new ethereum.EventParam('affiliateFeeBPS', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(affiliateFeeBPS))),
  )
  merkleDropMintCreatedEvent.parameters.push(
    new ethereum.EventParam('maxMintable', ethereum.Value.fromUnsignedBigInt(maxMintable)),
  )
  merkleDropMintCreatedEvent.parameters.push(
    new ethereum.EventParam('maxMintablePerAccount', ethereum.Value.fromUnsignedBigInt(maxMintablePerAccount)),
  )

  return merkleDropMintCreatedEvent
}

export function createMerkleRootHashSetEvent(
  edition: Address,
  mintId: BigInt,
  merkleRootHash: Bytes,
): MerkleRootHashSet {
  let merkleRootHashSetEvent = changetype<MerkleRootHashSet>(newMockEvent())

  merkleRootHashSetEvent.parameters = new Array()

  merkleRootHashSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  merkleRootHashSetEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  merkleRootHashSetEvent.parameters.push(
    new ethereum.EventParam('merkleRootHash', ethereum.Value.fromFixedBytes(merkleRootHash)),
  )

  return merkleRootHashSetEvent
}

export function createMintConfigCreatedEvent(
  edition: Address,
  creator: Address,
  mintId: BigInt,
  startTime: BigInt,
  endTime: BigInt,
  affiliateFeeBPS: i32,
): MintConfigCreated {
  let mintConfigCreatedEvent = changetype<MintConfigCreated>(newMockEvent())

  mintConfigCreatedEvent.parameters = new Array()

  mintConfigCreatedEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  mintConfigCreatedEvent.parameters.push(new ethereum.EventParam('creator', ethereum.Value.fromAddress(creator)))
  mintConfigCreatedEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  mintConfigCreatedEvent.parameters.push(
    new ethereum.EventParam('startTime', ethereum.Value.fromUnsignedBigInt(startTime)),
  )
  mintConfigCreatedEvent.parameters.push(new ethereum.EventParam('endTime', ethereum.Value.fromUnsignedBigInt(endTime)))
  mintConfigCreatedEvent.parameters.push(
    new ethereum.EventParam('affiliateFeeBPS', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(affiliateFeeBPS))),
  )

  return mintConfigCreatedEvent
}

export function createMintPausedSetEvent(edition: Address, mintId: BigInt, paused: boolean): MintPausedSet {
  let mintPausedSetEvent = changetype<MintPausedSet>(newMockEvent())

  mintPausedSetEvent.parameters = new Array()

  mintPausedSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  mintPausedSetEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  mintPausedSetEvent.parameters.push(new ethereum.EventParam('paused', ethereum.Value.fromBoolean(paused)))

  return mintPausedSetEvent
}

export function createMintedEvent(
  edition: Address,
  mintId: BigInt,
  buyer: Address,
  fromTokenId: BigInt,
  quantity: BigInt,
  requiredEtherValue: BigInt,
  platformFee: BigInt,
  affiliateFee: BigInt,
  affiliate: Address,
  affiliated: boolean,
): Minted {
  let mintedEvent = changetype<Minted>(newMockEvent())

  mintedEvent.parameters = new Array()

  mintedEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  mintedEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  mintedEvent.parameters.push(new ethereum.EventParam('buyer', ethereum.Value.fromAddress(buyer)))
  mintedEvent.parameters.push(new ethereum.EventParam('fromTokenId', ethereum.Value.fromUnsignedBigInt(fromTokenId)))
  mintedEvent.parameters.push(new ethereum.EventParam('quantity', ethereum.Value.fromUnsignedBigInt(quantity)))
  mintedEvent.parameters.push(
    new ethereum.EventParam('requiredEtherValue', ethereum.Value.fromUnsignedBigInt(requiredEtherValue)),
  )
  mintedEvent.parameters.push(new ethereum.EventParam('platformFee', ethereum.Value.fromUnsignedBigInt(platformFee)))
  mintedEvent.parameters.push(new ethereum.EventParam('affiliateFee', ethereum.Value.fromUnsignedBigInt(affiliateFee)))
  mintedEvent.parameters.push(new ethereum.EventParam('affiliate', ethereum.Value.fromAddress(affiliate)))
  mintedEvent.parameters.push(new ethereum.EventParam('affiliated', ethereum.Value.fromBoolean(affiliated)))

  return mintedEvent
}

export function createPriceSetEvent(edition: Address, mintId: BigInt, price: BigInt): PriceSet {
  let priceSetEvent = changetype<PriceSet>(newMockEvent())

  priceSetEvent.parameters = new Array()

  priceSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  priceSetEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  priceSetEvent.parameters.push(new ethereum.EventParam('price', ethereum.Value.fromUnsignedBigInt(price)))

  return priceSetEvent
}

export function createTimeRangeSetEvent(
  edition: Address,
  mintId: BigInt,
  startTime: BigInt,
  endTime: BigInt,
): TimeRangeSet {
  let timeRangeSetEvent = changetype<TimeRangeSet>(newMockEvent())

  timeRangeSetEvent.parameters = new Array()

  timeRangeSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  timeRangeSetEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  timeRangeSetEvent.parameters.push(new ethereum.EventParam('startTime', ethereum.Value.fromUnsignedBigInt(startTime)))
  timeRangeSetEvent.parameters.push(new ethereum.EventParam('endTime', ethereum.Value.fromUnsignedBigInt(endTime)))

  return timeRangeSetEvent
}
