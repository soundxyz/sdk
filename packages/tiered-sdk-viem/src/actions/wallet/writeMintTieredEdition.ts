import { type WalletClient, type Address, type Hex, type Chain, type Account, type Transport } from 'viem'
import { NULL_ADDRESS } from '../../utils/constants'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'

export type WriteMintTieredEdition = {
  chain: Chain
  edition: Address
  superMinterAddress: Address
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

export async function writeCreateTieredEdition<TChain extends Chain | undefined, TAccount extends Account>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    chain,
    edition,
    superMinterAddress,
    tier,
    scheduleNum,
    to,
    quantity,
    mintParams,
    affiliate = NULL_ADDRESS,
    affiliateProof = [],
    attributionId = 0n,
  }: WriteMintTieredEdition,
) {
  const allowlistedQuantity = 0

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

  return client.writeContract({
    chain,
    abi: SuperMinterV1Config.abi,
    address: superMinterAddress,
    functionName: 'mintTo',
    args: [
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
    ],
    account: client.account.address,
  })
}
