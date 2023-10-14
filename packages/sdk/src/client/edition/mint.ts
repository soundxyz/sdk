import { BigNumber } from '@ethersproject/bignumber'
import type { ContractTransaction, PayableOverrides } from '@ethersproject/contracts'
import { MerkleDropMinterV2__factory, SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'

import { InvalidAttributonIdError, InvalidQuantityError, NotEligibleMint } from '../../errors'
import type {
  EstimatableTransaction,
  MintOptions,
  MintSchedule,
  MintToOptions,
  SoundContractValidation,
} from '../../types'
import {
  MINT_FALLBACK_GAS_LIMIT,
  MINT_GAS_LIMIT_MULTIPLIER,
  minterFactoryMap,
  NULL_ADDRESS,
} from '../../utils/constants'
import { exhaustiveGuard, scaleAmount } from '../../utils/helpers'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import { getMerkleProof } from './merkle'
import { isSchedulePaused } from './schedules'
import { interfaceIds } from '@soundxyz/sound-protocol/interfaceIds'
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber.js'

export async function numberOfTokensOwned(
  this: SoundClientInstance,
  {
    editionAddress,
    userAddress,
    assumeValidSoundContract = false,
  }: { editionAddress: string; userAddress: string } & SoundContractValidation,
) {
  await validateSoundEdition.call(this, { editionAddress, assumeValidSoundContract })

  const { providerOrSigner } = await this.expectProviderOrSigner()

  const editionContract = SoundEditionV1_2__factory.connect(editionAddress, providerOrSigner)

  return (await editionContract.balanceOf(userAddress)).toNumber()
}

export async function numberMinted(
  this: SoundClientInstance,
  {
    editionAddress,
    userAddress,
    assumeValidSoundContract = false,
  }: { editionAddress: string; userAddress: string } & SoundContractValidation,
) {
  await validateSoundEdition.call(this, { editionAddress, assumeValidSoundContract })

  const { providerOrSigner } = await this.expectProviderOrSigner()

  const editionContract = SoundEditionV1_2__factory.connect(editionAddress, providerOrSigner)

  return (await editionContract.numberMinted(userAddress)).toNumber()
}

async function mintHelper(
  this: SoundClientInstance,
  {
    mintSchedule,
    quantity,
    affiliate = NULL_ADDRESS,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    skipQuantityChecks = false,
    merkleProof,
    assumeValidSoundContract = false,
  }: MintOptions,
): Promise<EstimatableTransaction> {
  await validateSoundEdition.call(this, { editionAddress: mintSchedule.editionAddress, assumeValidSoundContract })

  if (quantity <= 0 || Math.floor(quantity) !== quantity) throw new InvalidQuantityError({ quantity })

  const { signer, userAddress } = await this.expectSigner()

  let eligibleMintQuantity: number | undefined

  if (!skipQuantityChecks) {
    eligibleMintQuantity = await eligibleQuantity.call(this, {
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
  }

  const value = mintSchedule.price
    .add(mintSchedule.platformPerTokenFee)
    .mul(quantity)
    .add(mintSchedule.platformPerTransactionFee)

  const txnOverrides: PayableOverrides = {
    value,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }

  const interfaceId = mintSchedule.interfaceId

  switch (interfaceId) {
    case interfaceIds.IRangeEditionMinter:
    case interfaceIds.IRangeEditionMinterV2:
    case interfaceIds.IRangeEditionMinterV2_1: {
      const rangeMinter = minterFactoryMap[interfaceId].connect(mintSchedule.minterAddress, signer)

      const mintArgs = [mintSchedule.editionAddress, mintSchedule.mintId, quantity, affiliate] as const

      if (txnOverrides.gasLimit) {
        return {
          gasEstimate: BigNumber.from(await txnOverrides.gasLimit),
          startTransaction: () => rangeMinter.mint(...mintArgs, txnOverrides),
        }
      }

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        const gasEstimate = await rangeMinter.estimateGas.mint(...mintArgs, txnOverrides)

        txnOverrides.gasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gasLimit = MINT_FALLBACK_GAS_LIMIT
      }

      return {
        gasEstimate: BigNumber.from(txnOverrides.gasLimit),
        startTransaction: () => rangeMinter.mint(...mintArgs, txnOverrides),
      }
    }

    case interfaceIds.IMerkleDropMinter:
    case interfaceIds.IMerkleDropMinterV2:
    case interfaceIds.IMerkleDropMinterV2_1: {
      const merkleDropMinter = minterFactoryMap[interfaceId].connect(mintSchedule.minterAddress, signer)

      let proof: string[] | null

      if (merkleProof === undefined) {
        const { merkleRootHash: merkleRoot } = await merkleDropMinter.mintInfo(
          mintSchedule.editionAddress,
          mintSchedule.mintId,
        )

        proof = await getMerkleProof.call(this, {
          merkleRoot,
          userAddress,
        })
      } else {
        proof = merkleProof
      }

      if (!proof?.length) {
        throw new NotEligibleMint({
          mintSchedule,
          userAddress,
          eligibleMintQuantity,
        })
      }

      const mintArgs = [mintSchedule.editionAddress, mintSchedule.mintId, quantity, proof, affiliate] as const

      if (txnOverrides.gasLimit) {
        return {
          gasEstimate: BigNumber.from(await txnOverrides.gasLimit),
          startTransaction: () => merkleDropMinter.mint(...mintArgs, txnOverrides),
        }
      }

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        const gasEstimate = await merkleDropMinter.estimateGas.mint(...mintArgs, txnOverrides)

        txnOverrides.gasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gasLimit = MINT_FALLBACK_GAS_LIMIT
      }

      return {
        gasEstimate: BigNumber.from(txnOverrides.gasLimit),
        startTransaction: () => merkleDropMinter.mint(...mintArgs, txnOverrides),
      }
    }

    default: {
      exhaustiveGuard(interfaceId)
    }
  }
}

export async function estimateMint(this: SoundClientInstance, mintOptions: MintOptions): Promise<BigNumber> {
  return mintHelper.call(this, mintOptions).then(({ gasEstimate }) => gasEstimate)
}

export async function mint(this: SoundClientInstance, mintOptions: MintOptions): Promise<ContractTransaction> {
  return mintHelper.call(this, mintOptions).then(({ startTransaction }) => startTransaction())
}

async function mintToHelper(
  this: SoundClientInstance,
  {
    affiliate = NULL_ADDRESS,
    affiliateProof = [],
    attributonId = 0,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    mintSchedule,
    mintToAddress,
    quantity,

    skipQuantityChecks = false,
    merkleProof,
    assumeValidSoundContract = false,
  }: MintToOptions,
): Promise<EstimatableTransaction> {
  if (!isBigNumberish(attributonId)) {
    throw new InvalidAttributonIdError({
      attributonId,
    })
  }

  await validateSoundEdition.call(this, { editionAddress: mintSchedule.editionAddress, assumeValidSoundContract })

  if (quantity <= 0 || Math.floor(quantity) !== quantity) throw new InvalidQuantityError({ quantity })

  const { signer, userAddress } = await this.expectSigner()

  const toAddress = mintToAddress ?? userAddress

  let eligibleMintQuantity: number | undefined

  if (!skipQuantityChecks) {
    eligibleMintQuantity = await eligibleQuantity.call(this, {
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
  }

  const value = mintSchedule.price
    .add(mintSchedule.platformPerTokenFee)
    .mul(quantity)
    .add(mintSchedule.platformPerTransactionFee)

  const txnOverrides: PayableOverrides = {
    value,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }

  const interfaceId = mintSchedule.interfaceId

  switch (interfaceId) {
    case interfaceIds.IRangeEditionMinterV2:
    case interfaceIds.IRangeEditionMinterV2_1: {
      const rangeMinter = minterFactoryMap[interfaceId].connect(mintSchedule.minterAddress, signer)

      const mintArgs = [
        mintSchedule.editionAddress,
        mintSchedule.mintId,
        toAddress,
        quantity,
        affiliate,
        affiliateProof,
        attributonId,
      ] as const

      if (txnOverrides.gasLimit) {
        return {
          gasEstimate: BigNumber.from(await txnOverrides.gasLimit),
          startTransaction: () => rangeMinter.mintTo(...mintArgs, txnOverrides),
        }
      }

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        const gasEstimate = await rangeMinter.estimateGas.mintTo(...mintArgs, txnOverrides)

        txnOverrides.gasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gasLimit = MINT_FALLBACK_GAS_LIMIT
      }

      return {
        gasEstimate: BigNumber.from(txnOverrides.gasLimit),
        startTransaction: () => rangeMinter.mintTo(...mintArgs, txnOverrides),
      }
    }

    case interfaceIds.IMerkleDropMinterV2:
    case interfaceIds.IMerkleDropMinterV2_1: {
      const merkleDropMinter = minterFactoryMap[interfaceId].connect(mintSchedule.minterAddress, signer)

      let proof: string[] | null

      if (merkleProof === undefined) {
        const { merkleRootHash: merkleRoot } = await merkleDropMinter.mintInfo(
          mintSchedule.editionAddress,
          mintSchedule.mintId,
        )

        proof = await getMerkleProof.call(this, {
          merkleRoot,
          userAddress,
        })
      } else {
        proof = merkleProof
      }

      if (!proof?.length) {
        throw new NotEligibleMint({
          mintSchedule,
          userAddress,
          eligibleMintQuantity,
        })
      }

      const mintArgs = [
        mintSchedule.editionAddress,
        mintSchedule.mintId,
        toAddress,
        quantity,
        // TODO, allow overriding allowlisted for delegatecash
        toAddress,
        proof,
        affiliate,
        affiliateProof,
        attributonId,
      ] as const

      if (txnOverrides.gasLimit) {
        return {
          gasEstimate: BigNumber.from(txnOverrides.gasLimit),
          startTransaction: () => merkleDropMinter.mintTo(...mintArgs, txnOverrides),
        }
      }

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        const gasEstimate = await merkleDropMinter.estimateGas.mintTo(...mintArgs, txnOverrides)

        txnOverrides.gasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gasLimit = MINT_FALLBACK_GAS_LIMIT
      }

      return {
        gasEstimate: BigNumber.from(txnOverrides.gasLimit),
        startTransaction: () => merkleDropMinter.mintTo(...mintArgs, txnOverrides),
      }
    }

    default: {
      exhaustiveGuard(interfaceId)
    }
  }
}

export async function estimateMintTo(this: SoundClientInstance, mintOptions: MintToOptions): Promise<BigNumber> {
  return mintToHelper.call(this, mintOptions).then(({ gasEstimate }) => gasEstimate)
}
export async function mintTo(this: SoundClientInstance, mintOptions: MintToOptions): Promise<ContractTransaction> {
  return mintToHelper.call(this, mintOptions).then(({ startTransaction }) => startTransaction())
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
  const { providerOrSigner } = await this.expectProviderOrSigner()
  const editionContract = SoundEditionV1_2__factory.connect(mintSchedule.editionAddress, providerOrSigner)

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

  const mintedByUserFromSchedule = await (mintSchedule.interfaceId === interfaceIds.IMerkleDropMinterV2 ||
  mintSchedule.interfaceId === interfaceIds.IMerkleDropMinterV2_1
    ? MerkleDropMinterV2__factory.connect(mintSchedule.minterAddress, providerOrSigner)
        .mintCount(mintSchedule.editionAddress, mintSchedule.mintId, userAddress)
        .then((v) => v.toNumber())
    : numberMinted.call(this, {
        editionAddress: mintSchedule.editionAddress,
        userAddress,
      }))
  const eligibleForUserOnSchedule = mintSchedule.maxMintablePerAccount - mintedByUserFromSchedule
  const scheduleEligibleQty = Math.min(remainingForSchedule, eligibleForUserOnSchedule)

  // Return the minimum of the two. The number of tokens minted within the mint schedule
  // can never exceed the number of tokens available for the edition.
  return Math.max(0, Math.min(scheduleEligibleQty, editionRemainingQty))
}
