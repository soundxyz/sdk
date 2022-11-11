import { Address, BigInt } from '@graphprotocol/graph-ts'
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
} from '../generated/templates/SoundEditionV1/SoundEditionV1'

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBaseURISet(event: BaseURISet): void {}

export function handleConsecutiveTransfer(event: ConsecutiveTransfer): void {}

export function handleContractURISet(event: ContractURISet): void {}

export function handleEditionCutoffTimeSet(event: EditionCutoffTimeSet): void {}

export function handleEditionMaxMintableRangeSet(event: EditionMaxMintableRangeSet): void {}

export function handleFundingRecipientSet(event: FundingRecipientSet): void {}

export function handleMetadataFrozen(event: MetadataFrozen): void {}

export function handleMetadataModuleSet(event: MetadataModuleSet): void {}

export function handleMintRandomnessEnabledSet(event: MintRandomnessEnabledSet): void {}

export function handleOwnershipHandoverCanceled(event: OwnershipHandoverCanceled): void {}

export function handleOwnershipHandoverRequested(event: OwnershipHandoverRequested): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRolesUpdated(event: RolesUpdated): void {}

export function handleRoyaltySet(event: RoyaltySet): void {}

export function handleSoundEditionInitialized(event: SoundEditionInitialized): void {}

function buildTokenId(editionAddress: Address, tokenId: BigInt): string {
  return editionAddress.toHexString() + '/' + tokenId.toString()
}

export function handleTransfer(event: Transfer): void {}
