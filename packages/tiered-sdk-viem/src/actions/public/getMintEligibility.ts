import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SOUND_EDITION_V2_ABI } from '../../abi/sound-edition-v2'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../../abi/super-minter'
import { getTierCurrentMaxMintable } from '../../helpers/tierCurrentMaxMintable'

import type { MerkleProvider } from '../../types'

export type GetMintEligibilityParams = {
  editionAddress: Address
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
  { editionAddress, tier, scheduleNum, collectorAddress, merkleProvider }: GetMintEligibilityParams,
): Promise<GetMintEligibilityReturnType> {
  const [numberMintedOnSchedule, scheduleInfo, tierInfo] = await client.multicall({
    contracts: [
      {
        abi: SUPER_MINTER_ABI,
        address: SUPER_MINTER_ADDRESS,
        functionName: 'numberMinted',
        args: [editionAddress, tier, scheduleNum, collectorAddress],
      },
      {
        abi: SUPER_MINTER_ABI,
        address: SUPER_MINTER_ADDRESS,
        functionName: 'mintInfo',
        args: [editionAddress, tier, scheduleNum],
      },
      {
        abi: SOUND_EDITION_V2_ABI,
        address: editionAddress,
        functionName: 'tierInfo',
        args: [tier],
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

  const tierCurrentMax = tierInfo.mintConcluded ? 0 : Math.max(getTierCurrentMaxMintable(tierInfo) - tierInfo.minted, 0)

  const availableOnSchedule = maxMintable - minted
  const remainingPerAccountLimit = maxMintablePerAccount - numberMintedOnSchedule
  const remainingEligibility = Math.min(availableOnSchedule, remainingPerAccountLimit, tierCurrentMax)

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
