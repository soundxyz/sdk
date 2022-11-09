import { newMockEvent } from 'matchstick-as'
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts'
import {
  AffiliateFeeSet,
  CutoffTimeSet,
  MaxMintablePerAccountSet,
  MaxMintableRangeSet,
  MintConfigCreated,
  MintPausedSet,
  Minted,
  PriceSet,
  RangeEditionMintCreated,
  TimeRangeSet,
} from '../generated/RangeEditionMinter/RangeEditionMinter'

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

export function createCutoffTimeSetEvent(edition: Address, mintId: BigInt, cutoffTime: BigInt): CutoffTimeSet {
  let cutoffTimeSetEvent = changetype<CutoffTimeSet>(newMockEvent())

  cutoffTimeSetEvent.parameters = new Array()

  cutoffTimeSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  cutoffTimeSetEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  cutoffTimeSetEvent.parameters.push(
    new ethereum.EventParam('cutoffTime', ethereum.Value.fromUnsignedBigInt(cutoffTime)),
  )

  return cutoffTimeSetEvent
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

export function createMaxMintableRangeSetEvent(
  edition: Address,
  mintId: BigInt,
  maxMintableLower: BigInt,
  maxMintableUpper: BigInt,
): MaxMintableRangeSet {
  let maxMintableRangeSetEvent = changetype<MaxMintableRangeSet>(newMockEvent())

  maxMintableRangeSetEvent.parameters = new Array()

  maxMintableRangeSetEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  maxMintableRangeSetEvent.parameters.push(new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)))
  maxMintableRangeSetEvent.parameters.push(
    new ethereum.EventParam('maxMintableLower', ethereum.Value.fromUnsignedBigInt(maxMintableLower)),
  )
  maxMintableRangeSetEvent.parameters.push(
    new ethereum.EventParam('maxMintableUpper', ethereum.Value.fromUnsignedBigInt(maxMintableUpper)),
  )

  return maxMintableRangeSetEvent
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

export function createRangeEditionMintCreatedEvent(
  edition: Address,
  mintId: BigInt,
  price: BigInt,
  startTime: BigInt,
  cutoffTime: BigInt,
  endTime: BigInt,
  affiliateFeeBPS: i32,
  maxMintableLower: BigInt,
  maxMintableUpper: BigInt,
  maxMintablePerAccount: BigInt,
): RangeEditionMintCreated {
  let rangeEditionMintCreatedEvent = changetype<RangeEditionMintCreated>(newMockEvent())

  rangeEditionMintCreatedEvent.parameters = new Array()

  rangeEditionMintCreatedEvent.parameters.push(new ethereum.EventParam('edition', ethereum.Value.fromAddress(edition)))
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('mintId', ethereum.Value.fromUnsignedBigInt(mintId)),
  )
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('price', ethereum.Value.fromUnsignedBigInt(price)),
  )
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('startTime', ethereum.Value.fromUnsignedBigInt(startTime)),
  )
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('cutoffTime', ethereum.Value.fromUnsignedBigInt(cutoffTime)),
  )
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('endTime', ethereum.Value.fromUnsignedBigInt(endTime)),
  )
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('affiliateFeeBPS', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(affiliateFeeBPS))),
  )
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('maxMintableLower', ethereum.Value.fromUnsignedBigInt(maxMintableLower)),
  )
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('maxMintableUpper', ethereum.Value.fromUnsignedBigInt(maxMintableUpper)),
  )
  rangeEditionMintCreatedEvent.parameters.push(
    new ethereum.EventParam('maxMintablePerAccount', ethereum.Value.fromUnsignedBigInt(maxMintablePerAccount)),
  )

  return rangeEditionMintCreatedEvent
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
