import { BigNumber, isBigNumberish } from '@ethersproject/bignumber/lib/bignumber'
import { PayableOverrides } from '@ethersproject/contracts'
import { SAM__factory, SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'
import { SAMInfoStructOutput } from '@soundxyz/sound-protocol/typechain/ISAM'

import {
  InvalidAttributonIdError,
  InvalidOffsetError,
  InvalidQuantityError,
  InvalidTokenIdError,
  SamNotFoundError,
} from '../../errors'
import { ExpandTypeChainStructOutput, TakeFirst } from '../../types'
import { MINT_FALLBACK_GAS_LIMIT, MINT_GAS_LIMIT_MULTIPLIER, NULL_ADDRESS } from '../../utils/constants'
import { scaleAmount, validateAddress } from '../../utils/helpers'
import { isSoundV1_2_OrGreater } from '../edition/interface'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import { SamBuyOptions, SamEditionAddress, SamSellOptions } from './types'

export async function SamContractAddress(this: SoundClientInstance, { editionAddress }: SamEditionAddress) {
  return this.instance.idempotentCachedCall(`sam-contract-address-${editionAddress}`, async () => {
    await validateSoundEdition.call(this, {
      editionAddress,
    })

    if (!(await isSoundV1_2_OrGreater.call(this, { editionAddress }))) return null

    const { signerOrProvider } = await this.expectSignerOrProvider()

    const edition = SoundEditionV1_2__factory.connect(editionAddress, signerOrProvider)

    return edition.sam().then((samAddress) => (samAddress.toLowerCase() === NULL_ADDRESS ? null : samAddress))
  })
}

export async function SamSell(
  this: SoundClientInstance,
  { editionAddress }: SamEditionAddress,
  {
    tokenIds,

    minimumPayout,

    attributonId = 0,

    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: SamSellOptions,
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress })

  if (!samAddress) throw new SamNotFoundError({ contractAddress: editionAddress })

  const { signer, userAddress } = await this.expectSigner()

  const samContract = SAM__factory.connect(samAddress, signer)

  const tokenIdsContract = tokenIds
    .map((tokenId) => {
      if (!isBigNumberish(tokenId)) throw new InvalidTokenIdError({ tokenId })
      return BigNumber.from(tokenId)
    })
    .sort((a, b) => (a.gt(b) ? 1 : -1))

  if (!isBigNumberish(attributonId)) {
    throw new InvalidAttributonIdError({
      attributonId,
    })
  }

  const sellArgs: TakeFirst<Parameters<(typeof samContract)['sell']>, 5> = [
    editionAddress,
    tokenIdsContract,
    minimumPayout,
    userAddress,
    attributonId,
  ] as const

  const txnOverrides: PayableOverrides = {
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }

  if (txnOverrides.gasLimit) {
    return samContract.sell(...sellArgs, txnOverrides)
  }

  try {
    // Add a buffer to the gas estimate to account for node provider estimate variance.
    const gasEstimate = await samContract.estimateGas.sell(...sellArgs, txnOverrides)

    txnOverrides.gasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
  } catch (err) {
    // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
    txnOverrides.gasLimit = MINT_FALLBACK_GAS_LIMIT
  }

  return samContract.sell(...sellArgs, txnOverrides)
}

export async function SamBuy(
  this: SoundClientInstance,
  { editionAddress }: SamEditionAddress,
  {
    quantity,

    price,

    affiliate = NULL_ADDRESS,
    affiliateProof = [],

    attributonId = 0,

    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: SamBuyOptions,
) {
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  const samAddress = await SamContractAddress.call(this, { editionAddress })

  if (!samAddress) throw new SamNotFoundError({ contractAddress: editionAddress })

  validateAddress({
    type: 'AFFILIATE',
    address: affiliate,
  })

  const { signer, userAddress } = await this.expectSigner()

  const samContract = SAM__factory.connect(samAddress, signer)

  if (!isBigNumberish(attributonId)) {
    throw new InvalidAttributonIdError({
      attributonId,
    })
  }

  const buyArgs: TakeFirst<Parameters<(typeof samContract)['buy']>, 6> = [
    editionAddress,
    userAddress,
    quantity,
    affiliate,
    affiliateProof,
    attributonId,
  ] as const

  const txnOverrides: PayableOverrides = {
    value: price,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }

  if (txnOverrides.gasLimit) {
    return samContract.buy(...buyArgs, txnOverrides)
  }

  try {
    // Add a buffer to the gas estimate to account for node provider estimate variance.
    const gasEstimate = await samContract.estimateGas.buy(...buyArgs, txnOverrides)

    txnOverrides.gasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
  } catch (err) {
    // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
    txnOverrides.gasLimit = MINT_FALLBACK_GAS_LIMIT
  }

  return samContract.buy(...buyArgs, txnOverrides)
}

export async function SamTotalSellPrice(
  this: SoundClientInstance,
  { editionAddress }: SamEditionAddress,
  { offset, quantity }: { offset: number; quantity: number },
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress })

  if (!samAddress) return null

  const { signerOrProvider } = await this.expectSignerOrProvider()

  const samContract = SAM__factory.connect(samAddress, signerOrProvider)

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0) throw new InvalidOffsetError({ offset })

  return samContract.totalSellPrice(editionAddress, offset, quantity)
}

export async function SamTotalBuyPrice(
  this: SoundClientInstance,
  { editionAddress }: SamEditionAddress,
  { offset, quantity }: { offset: number; quantity: number },
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress })

  if (!samAddress) return null

  const { signerOrProvider } = await this.expectSignerOrProvider()

  const samContract = SAM__factory.connect(samAddress, signerOrProvider)

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0) throw new InvalidOffsetError({ offset })

  const info: ExpandTypeChainStructOutput<Awaited<ReturnType<(typeof samContract)['totalBuyPriceAndFees']>>> =
    await samContract.totalBuyPriceAndFees(editionAddress, offset, quantity)

  return { ...info }
}

export async function SamEditionInfo(this: SoundClientInstance, { editionAddress }: SamEditionAddress) {
  const samAddress = await SamContractAddress.call(this, { editionAddress })

  if (!samAddress) return null

  const { signerOrProvider } = await this.expectSignerOrProvider()

  const samContract = SAM__factory.connect(samAddress, signerOrProvider)

  const info: ExpandTypeChainStructOutput<SAMInfoStructOutput> = await samContract.samInfo(editionAddress)

  return { ...info }
}
