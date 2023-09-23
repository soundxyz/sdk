import { type Address, type Hex } from 'viem'
import { NULL_ADDRESS, UINT32_MAX } from '../utils/constants'

export type MintTieredEditionArgs = {
  edition: Address
  tier: number
  scheduleNum: number
  to: Address
  quantity: number
  mintParams:
    | { mode: 'DEFAULT' }
    | {
        mode: 'VERIFY_MERKLE'
        allowlisted: Address
        allowlistProof: Hex[]
      }
    | {
        mode: 'VERIFY_SIGNATURE'
        signedPrice: bigint
        signedQuantity: number
        signedClaimTicket: number
        signedDeadline: number
        signature: Hex
      }
  affiliate?: Address
  affiliateProof?: Hex[]
  attributionId?: bigint
}

export function mintTieredEditionArgs({
  edition,
  tier,
  scheduleNum,
  to,
  quantity,
  mintParams,
  affiliate = NULL_ADDRESS,
  affiliateProof = [],
  attributionId = 0n,
}: MintTieredEditionArgs) {
  const allowlistedQuantity = UINT32_MAX

  const { allowlisted, allowlistProof }: { allowlisted: Address; allowlistProof: Hex[] } =
    mintParams.mode === 'VERIFY_MERKLE' ? mintParams : { allowlisted: NULL_ADDRESS, allowlistProof: [] }

  const {
    signedPrice,
    signedQuantity,
    signedClaimTicket,
    signedDeadline,
    signature,
  }: {
    signedPrice: bigint
    signedQuantity: number
    signedClaimTicket: number
    signedDeadline: number
    signature: Hex
  } =
    mintParams.mode === 'VERIFY_SIGNATURE'
      ? mintParams
      : { signature: NULL_ADDRESS, signedPrice: 0n, signedQuantity: 0, signedClaimTicket: 0, signedDeadline: 0 }

  return [
    {
      edition,
      tier,
      scheduleNum,
      to,
      quantity,
      allowlisted,
      allowlistedQuantity,
      allowlistProof,
      signedPrice,
      signedQuantity,
      signedClaimTicket,
      signedDeadline,
      signature,
      affiliate,
      affiliateProof,
      attributionId,
    },
  ] as const
}
