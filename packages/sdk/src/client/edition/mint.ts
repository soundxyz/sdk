import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction, PayableOverrides } from '@ethersproject/contracts'
import {
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundEditionV1_2__factory,
} from '@soundxyz/sound-protocol/typechain'

import { InvalidQuantityError, NotEligibleMint } from '../../errors'
import { MintOptions, MintSchedule } from '../../types'
import { MINT_FALLBACK_GAS_LIMIT, MINT_GAS_LIMIT_MULTIPLIER, NULL_ADDRESS } from '../../utils/constants'
import { scaleAmount } from '../../utils/helpers'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import { getMerkleProof } from './merkle'
import { isSchedulePaused } from './schedules'

export async function numberOfTokensOwned(
  this: SoundClientInstance,
  { editionAddress, userAddress }: { editionAddress: string; userAddress: string },
) {
  await validateSoundEdition.call(this, { editionAddress })

  const { signerOrProvider } = await this.expectSignerOrProvider()

  const editionContract = SoundEditionV1_2__factory.connect(editionAddress, signerOrProvider)

  return (await editionContract.balanceOf(userAddress)).toNumber()
}

export async function numberMinted(
  this: SoundClientInstance,
  { editionAddress, userAddress }: { editionAddress: string; userAddress: string },
) {
  await validateSoundEdition.call(this, { editionAddress })

  const { signerOrProvider } = await this.expectSignerOrProvider()

  const editionContract = SoundEditionV1_2__factory.connect(editionAddress, signerOrProvider)

  return (await editionContract.numberMinted(userAddress)).toNumber()
}

export async function mint(
  this: SoundClientInstance,
  { mintSchedule, quantity, affiliate = NULL_ADDRESS, gasLimit, maxFeePerGas, maxPriorityFeePerGas }: MintOptions,
): Promise<ContractTransaction> {
  await validateSoundEdition.call(this, { editionAddress: mintSchedule.editionAddress })
  if (quantity <= 0 || Math.floor(quantity) !== quantity) throw new InvalidQuantityError({ quantity })

  const { signer, userAddress } = await this.expectSigner()

  const eligibleMintQuantity = await eligibleQuantity.call(this, {
    mintSchedule,
    userAddress,
  })
  if (eligibleMintQuantity < quantity) {
    throw new NotEligibleMint({
      eligibleMintQuantity,
      mintSchedule,
      userAddress,
    })
  }

  const txnOverrides: PayableOverrides = {
    value: 'price' in mintSchedule ? mintSchedule.price.mul(quantity) : BigNumber.from('0'),
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }

  switch (mintSchedule.mintType) {
    case 'RangeEdition': {
      const rangeMinter = RangeEditionMinter__factory.connect(mintSchedule.minterAddress, signer)
      const mintArgs = [mintSchedule.editionAddress, mintSchedule.mintId, quantity, affiliate] as const

      if (txnOverrides.gasLimit) {
        return rangeMinter.mint(...mintArgs, txnOverrides)
      }

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        const gasEstimate = await rangeMinter.estimateGas.mint(...mintArgs, txnOverrides)

        txnOverrides.gasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gasLimit = MINT_FALLBACK_GAS_LIMIT
      }

      return rangeMinter.mint(...mintArgs, txnOverrides)
    }

    case 'MerkleDrop': {
      const merkleDropMinter = MerkleDropMinter__factory.connect(mintSchedule.minterAddress, signer)

      const { merkleRootHash: merkleRoot } = await merkleDropMinter.mintInfo(
        mintSchedule.editionAddress,
        mintSchedule.mintId,
      )

      const proof = await getMerkleProof.call(this, {
        merkleRoot,
        userAddress,
      })

      if (!proof?.length) {
        throw new NotEligibleMint({
          mintSchedule,
          userAddress,
          eligibleMintQuantity,
        })
      }

      const mintArgs = [mintSchedule.editionAddress, mintSchedule.mintId, quantity, proof, affiliate] as const

      if (txnOverrides.gasLimit) {
        return merkleDropMinter.mint(...mintArgs, txnOverrides)
      }

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        const gasEstimate = await merkleDropMinter.estimateGas.mint(...mintArgs, txnOverrides)

        txnOverrides.gasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gasLimit = MINT_FALLBACK_GAS_LIMIT
      }

      return merkleDropMinter.mint(...mintArgs, txnOverrides)
    }

    default:
      throw new Error('Unimplemented')
  }
}

export async function eligibleQuantity(
  this: SoundClientInstance,
  {
    mintSchedule,
    timestamp = Math.floor(Date.now() / 1000),
    userAddress,
  }: {
    mintSchedule: MintSchedule
    timestamp?: number
    userAddress: string
  },
): Promise<number> {
  // check valid mint time
  if (timestamp < mintSchedule.startTime || timestamp > mintSchedule.endTime || isSchedulePaused(mintSchedule)) {
    return 0
  }

  // Checks for child minter custom logic
  switch (mintSchedule.mintType) {
    case 'RangeEdition': {
      const maxQty = timestamp < mintSchedule.cutoffTime ? mintSchedule.maxMintableUpper : mintSchedule.maxMintableLower

      if (mintSchedule.totalMinted >= maxQty) {
        return 0
      }
      break
    }
    case 'MerkleDrop': {
      // return 0 if the user is not in the allowlist
      const merkleRoot = mintSchedule.merkleRoot
      const proof = await getMerkleProof.call(this, {
        merkleRoot,
        userAddress,
      })

      if (!proof?.length) {
        return 0
      }
      break
    }
  }

  // Get the edition's remaining token quantity.
  const { signerOrProvider } = await this.expectSignerOrProvider()
  const editionContract = SoundEditionV1_2__factory.connect(mintSchedule.editionAddress, signerOrProvider)

  const [editionTotalMinted, editionMaxMintable] = await Promise.all([
    editionContract.totalMinted(),
    editionContract.editionMaxMintable(),
  ])

  const editionRemainingQty = editionMaxMintable - editionTotalMinted.toNumber()

  if (!editionRemainingQty) {
    return 0
  }

  // Get eligible quantity for the user on this mint schedule.
  const remainingForSchedule =
    (typeof mintSchedule.maxMintable === 'function' ? mintSchedule.maxMintable(timestamp) : mintSchedule.maxMintable) -
    mintSchedule.totalMinted

  const mintedByUserFromSchedule = await numberMinted.call(this, {
    editionAddress: mintSchedule.editionAddress,
    userAddress,
  })
  const eligibleForUserOnSchedule = mintSchedule.maxMintablePerAccount - mintedByUserFromSchedule
  const scheduleEligibleQty = Math.min(remainingForSchedule, eligibleForUserOnSchedule)

  // Return the minimum of the two. The number of tokens minted within the mint schedule
  // can never exceed the number of tokens available for the edition.
  return Math.max(0, Math.min(scheduleEligibleQty, editionRemainingQty))
}
