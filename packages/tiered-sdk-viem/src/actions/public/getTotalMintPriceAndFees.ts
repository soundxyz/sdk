import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../../abi/super-minter'

export type GetTotalMintPriceAndFeesParams = {
  edition: Address
  tier: number
  scheduleNum: number
  quantity: number
}

export type GetTotalMintPriceAndFeesReturnType = {
  // The required Ether value.
  // `subTotal + platformFlatFee`.
  total: bigint
  // The total price before any additive fees.
  subTotal: bigint
  // The price per token.
  unitPrice: bigint
  // The total platform fees.
  // `platformFlatFee + platformMintBPSFee`.
  platformFee: bigint
  // The total platform flat fees.
  // `platformTxFlatFee + platformMintFlatFee`.
  platformFlatFee: bigint
  // The platform per-transaction flat fees.
  platformTxFlatFee: bigint
  // The total platform per-token flat fees.
  platformMintFlatFee: bigint
  // The total platform per-token BPS fees.
  platformMintBPSFee: bigint
  // The total affiliate fees.
  affiliateFee: bigint
}

export async function getTotalMintPriceAndFees<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { edition, tier, scheduleNum, quantity }: GetTotalMintPriceAndFeesParams,
): Promise<GetTotalMintPriceAndFeesReturnType> {
  return client.readContract({
    abi: SUPER_MINTER_ABI,
    address: SUPER_MINTER_ADDRESS,
    functionName: 'totalPriceAndFees',
    args: [edition, tier, scheduleNum, quantity],
  })
}
