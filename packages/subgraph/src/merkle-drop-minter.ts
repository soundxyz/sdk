import { log } from '@graphprotocol/graph-ts'
import {
  AffiliateFeeSet,
  MerkleDropMintCreated,
  PriceSet,
  TimeRangeSet,
} from '../generated/MerkleDropMinter/MerkleDropMinter'
import { loadOrCreateMinter } from './helpers'

export function handleAffiliateFeeSet(event: AffiliateFeeSet): void {
  let entity = loadOrCreateMinter(event.params.edition.toHexString(), event.params.mintId.toHex())
  entity.affiliateFeeBPS = event.params.bps
  entity.save()
}

export function handleMerkleDropMintCreated(event: MerkleDropMintCreated): void {
  let entity = loadOrCreateMinter(event.params.edition.toHexString(), event.params.mintId.toHex())
  log.info('MerkleMinter created: {} for contract: {}', [
    event.params.mintId.toHex(),
    event.params.edition.toHexString(),
  ])
  entity.address = event.address
  entity.mintId = event.params.mintId
  entity.startTime = event.params.startTime.toI32()
  entity.endTime = event.params.endTime.toI32()
  entity.affiliateFeeBPS = event.params.affiliateFeeBPS
  entity.price = event.params.price
  entity.edition = event.params.edition.toHexString()
  entity.save()
}

export function handlePriceSet(event: PriceSet): void {
  let entity = loadOrCreateMinter(event.params.edition.toHexString(), event.params.mintId.toHex())
  entity.price = event.params.price
  entity.save()
}

export function handleTimeRangeSet(event: TimeRangeSet): void {
  let entity = loadOrCreateMinter(event.params.edition.toHexString(), event.params.mintId.toHex())
  entity.startTime = event.params.startTime.toI32()
  entity.endTime = event.params.endTime.toI32()
  entity.save()
}
