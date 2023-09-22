import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'
import type { MerkleProvider } from '../../types'

export type GetMintEligibilityParams = {
  editionAddress: Address
  superMinterAddress: Address
  tier: number
  scheduleNum: number
  collectorAddress: Address
  merkleProvider?: MerkleProvider
}

export type GetMintEligibilityReturnType = {
  numberMintedOnSchedule: number
  remainingEligibility: number
}

export async function getMintEligibility<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { editionAddress, superMinterAddress, tier, scheduleNum, collectorAddress, merkleProvider }: GetMintEligibilityParams,
): Promise<GetMintEligibilityReturnType> {
  const [numberMintedOnSchedule, scheduleInfo] = await client.multicall({
    contracts: [
      {
        abi: SuperMinterV1Config.abi,
        address: superMinterAddress,
        functionName: 'numberMinted',
        args: [editionAddress, tier, scheduleNum, collectorAddress],
      },
      {
        abi: SuperMinterV1Config.abi,
        address: superMinterAddress,
        functionName: 'mintInfo',
        args: [editionAddress, tier, scheduleNum],
      },
    ],
    allowFailure: false,
  })

  const { paused, mode, maxMintable, minted, maxMintablePerAccount } = scheduleInfo

  if (paused) {
    return {
      numberMintedOnSchedule,
      remainingEligibility: 0,
    }
  }

  const availableOnSchedule = maxMintable - minted
  const remainingPerAccountLimit = maxMintablePerAccount - numberMintedOnSchedule
  const remainingEligibility = Math.min(availableOnSchedule, remainingPerAccountLimit)

  // default
  if (mode === 0) {
    return {
      numberMintedOnSchedule,
      remainingEligibility,
    }
  }

  // merkle
  if (mode === 1) {
    const { merkleRoot } = scheduleInfo

    if (!merkleProvider) {
      throw new Error('Merkle provider required to check allowlist eligibility!')
    }

    const proof = await merkleProvider.merkleProof({ merkleRoot, userAddress: collectorAddress })

    if (!proof?.length) {
      return {
        numberMintedOnSchedule,
        remainingEligibility: 0,
      }
    }
    return {
      numberMintedOnSchedule,
      remainingEligibility,
    }
  } else if (mode === 2) {
    throw new Error('not implemented')
  } else {
    throw new Error('unknown minting mode')
  }
}
