import { BigNumber, isBigNumberish } from '@ethersproject/bignumber/lib/bignumber.js'
import { PayableOverrides } from '@ethersproject/contracts'
import { SAMV1_1__factory, SAM__factory, SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'
import { SAMInfoStructOutput } from '@soundxyz/sound-protocol/typechain/ISAM'
import { SAMInfoStructOutput as V1_1SAMInfoStructOutput } from '@soundxyz/sound-protocol/typechain/ISAMV1_1'

import {
  InvalidAttributonIdError,
  InvalidOffsetError,
  InvalidQuantityError,
  InvalidTokenIdError,
  SamNotFoundError,
} from '../../errors'
import { ExpandTypeChainStructOutput, SAMInterfaceId, SoundContractValidation, TakeFirst } from '../../types'
import { MINT_FALLBACK_GAS_LIMIT, MINT_GAS_LIMIT_MULTIPLIER, NULL_ADDRESS } from '../../utils/constants'
import { exhaustiveGuard, scaleAmount, validateAddress } from '../../utils/helpers'
import { isSoundV1_2_OrGreater } from '../edition/interface'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import { SamBuyOptions, SamEditionAddress, SamSellOptions } from './types'
import { interfaceIds } from '@soundxyz/sound-protocol'

export async function SamContractAddress(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract = false }: SamEditionAddress & SoundContractValidation,
) {
  return this.instance.idempotentCachedCall(`sam-contract-address-${editionAddress}`, async () => {
    await validateSoundEdition.call(this, {
      editionAddress,
      assumeValidSoundContract,
    })

    if (!(await isSoundV1_2_OrGreater.call(this, { editionAddress }))) return null

    const { providerOrSigner } = await this.expectProviderOrSigner()

    const edition = SoundEditionV1_2__factory.connect(editionAddress, providerOrSigner)

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

    assumeValidSoundContract = false,
  }: SamSellOptions,
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })

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
    maxTotalValue,

    affiliate = NULL_ADDRESS,
    affiliateProof = [],

    attributonId = 0,

    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,

    assumeValidSoundContract = false,
  }: SamBuyOptions,
) {
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })

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
    value: maxTotalValue,
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
  { editionAddress, assumeValidSoundContract = false }: SamEditionAddress,
  { offset, quantity }: { offset: number; quantity: number },
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })

  if (!samAddress) return null

  const { providerOrSigner } = await this.expectProviderOrSigner()

  const samContract = SAM__factory.connect(samAddress, providerOrSigner)

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0) throw new InvalidOffsetError({ offset })

  return samContract.totalSellPrice(editionAddress, offset, quantity)
}

export async function SamTotalBuyPrice(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract = false }: SamEditionAddress,
  { offset, quantity }: { offset: number; quantity: number },
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })

  if (!samAddress) return null

  const { providerOrSigner } = await this.expectProviderOrSigner()

  const samContract = SAM__factory.connect(samAddress, providerOrSigner)

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0) throw new InvalidOffsetError({ offset })

  const info: ExpandTypeChainStructOutput<Awaited<ReturnType<(typeof samContract)['totalBuyPriceAndFees']>>> =
    await samContract.totalBuyPriceAndFees(editionAddress, offset, quantity)

  return { ...info }
}

export async function SamEditionInfo(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract = false }: SamEditionAddress,
): Promise<ExpandTypeChainStructOutput<V1_1SAMInfoStructOutput> | null> {
  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })
  if (!samAddress) return null

  const {
    expectProviderOrSigner,
    instance: { idempotentCachedCall },
  } = this

  const { providerOrSigner } = await expectProviderOrSigner()

  const interfaceId = await idempotentCachedCall(`minter-interface-id-${samAddress}`, async () => {
    const samModule = SAM__factory.connect(samAddress, providerOrSigner)
    return (await samModule.moduleInterfaceId()) as SAMInterfaceId
  })

  switch (interfaceId) {
    case interfaceIds.ISAM: {
      const samContract = SAM__factory.connect(samAddress, providerOrSigner)

      const [info, platformFeeBPS] = await Promise.all([
        samContract.samInfo(editionAddress),
        samContract.platformFeeBPS(),
      ])

      const structuredInfo: ExpandTypeChainStructOutput<SAMInfoStructOutput> = info

      return { ...structuredInfo, platformFeeBPS, platformPerTxFlatFee: BigNumber.from(0) }
    }
    case interfaceIds.ISAMV1_1: {
      const samContract = SAMV1_1__factory.connect(samAddress, providerOrSigner)
      const info: ExpandTypeChainStructOutput<V1_1SAMInfoStructOutput> = await samContract.samInfo(editionAddress)
      return { ...info }
    }
    default:
      exhaustiveGuard(interfaceId)
  }
}
