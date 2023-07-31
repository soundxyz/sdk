import {
  InvalidMerkleProofError,
  InvalidOffsetError,
  InvalidQuantityError,
  SamNotFoundError,
  UnsupportedMinterError,
} from '../../errors'
import type { SAM, SoundContractValidation, TransactionGasOptions } from '../../types'
import { MINT_FALLBACK_GAS_LIMIT, MINT_GAS_LIMIT_MULTIPLIER, NULL_ADDRESS } from '../../utils/constants'
import { isMerkleProof, scaleAmount, validateAddress } from '../../utils/helpers'
import { isSoundV1_2_OrGreater } from '../edition/interface'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import type { SamBuyOptions, SamEditionAddress, SamSellOptions } from './types'
import { interfaceIds } from '@soundxyz/sound-protocol/interfaceIds'
import { soundEditionV1_2Abi } from '../../abi/sound-edition-v1_2'
import { samv1Abi } from '../../abi/sam-v1'
import { samV1_1Abi } from '../../abi/sam-v1_1'

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

    const { readContract } = await this.expectClient()

    validateAddress(editionAddress, {
      type: 'SOUND_EDITION',
    })

    return readContract({
      abi: soundEditionV1_2Abi,
      address: editionAddress,
      functionName: 'sam',
    }).then((value) => (value === NULL_ADDRESS ? null : value))
  })
}

export async function SamSell(
  this: SoundClientInstance,
  { editionAddress }: SamEditionAddress,
  {
    tokenIds,

    minimumPayout,

    attributonId = 0n,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,

    assumeValidSoundContract = false,
  }: SamSellOptions,
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })

  if (!samAddress) throw new SamNotFoundError({ contractAddress: editionAddress })

  const { wallet, userAddress } = await this.expectWallet()

  const tokenIdsContract = tokenIds.map((v) => BigInt(v)).sort((a, b) => (a > b ? 1 : -1))

  const txnOverrides = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } satisfies TransactionGasOptions

  validateAddress(editionAddress, {
    type: 'SOUND_EDITION',
  })

  const args = [editionAddress, tokenIdsContract, minimumPayout, userAddress, attributonId] as const

  const contractParameters = {
    abi: samv1Abi,
    account: userAddress,
    address: userAddress,
    chain: wallet.chain,
    functionName: 'sell',
    args,
    ...txnOverrides,
  } as const

  if (txnOverrides.gas) {
    return wallet.writeContract(contractParameters).then((transactionHash) => ({ transactionHash }))
  }

  try {
    const client = await this.expectClient()

    const gasEstimate = await client.estimateContractGas(contractParameters)

    // Add a buffer to the gas estimate to account for node provider estimate variance.

    txnOverrides.gas = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
  } catch (err) {
    // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
    txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
  }

  return wallet
    .writeContract({
      ...contractParameters,
      ...txnOverrides,
      args,
    })
    .then((transactionHash) => ({ transactionHash }))
}

export async function SamBuy(
  this: SoundClientInstance,
  { editionAddress }: SamEditionAddress,
  {
    quantity,
    maxTotalValue,

    affiliate = NULL_ADDRESS,
    affiliateProof = [],

    attributonId = 0n,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,

    assumeValidSoundContract = false,
  }: SamBuyOptions,
) {
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })

  if (!samAddress) throw new SamNotFoundError({ contractAddress: editionAddress })

  validateAddress(affiliate, {
    type: 'AFFILIATE',
  })

  validateAddress(editionAddress, {
    type: 'SOUND_EDITION',
  })

  const { wallet, userAddress } = await this.expectWallet()

  const txnOverrides = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } satisfies TransactionGasOptions

  // const samContract = SAM__factory.connect(samAddress, signer)

  if (!isMerkleProof(affiliateProof)) {
    throw new InvalidMerkleProofError({
      proof: affiliateProof,
    })
  }

  const args = [editionAddress, userAddress, quantity, affiliate, affiliateProof, attributonId] as const

  const contractParameters = {
    abi: samv1Abi,
    account: userAddress,
    address: userAddress,
    chain: wallet.chain,
    functionName: 'buy',
    args,
    value: maxTotalValue,
    ...txnOverrides,
  } as const

  if (txnOverrides.gas) {
    return wallet.writeContract(contractParameters).then((transactionHash) => ({ transactionHash }))
  }

  try {
    const client = await this.expectClient()

    // Add a buffer to the gas estimate to account for node provider estimate variance.
    const gasEstimate = await client.estimateContractGas(contractParameters)

    txnOverrides.gas = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
  } catch (err) {
    // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
    txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
  }

  return wallet.writeContract({
    ...contractParameters,
    ...txnOverrides,
  })
}

export async function SamTotalSellPrice(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract = false }: SamEditionAddress,
  { offset, quantity }: { offset: number; quantity: number },
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })

  if (!samAddress) return null

  validateAddress(editionAddress, {
    type: 'SOUND_EDITION',
  })

  const { readContract } = await this.expectClient()

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0) throw new InvalidOffsetError({ offset })

  return readContract({
    abi: samv1Abi,
    address: samAddress,
    functionName: 'totalSellPrice',
    args: [editionAddress, offset, quantity],
  })
}

export async function SamTotalBuyPrice(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract = false }: SamEditionAddress,
  { offset, quantity }: { offset: number; quantity: number },
) {
  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })

  if (!samAddress) return null

  validateAddress(editionAddress, {
    type: 'SOUND_EDITION',
  })

  const { readContract } = await this.expectClient()

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0) throw new InvalidOffsetError({ offset })

  const [total, platformFee, artistFee, goldenEggFee, affiliateFee] = await readContract({
    abi: samv1Abi,
    address: samAddress,
    functionName: 'totalBuyPriceAndFees',
    args: [editionAddress, offset, quantity],
  })

  return {
    total,
    platformFee,
    artistFee,
    goldenEggFee,
    affiliateFee,
  }
}

export async function SamEditionInfo(
  this: SoundClientInstance,
  { editionAddress, assumeValidSoundContract = false }: SamEditionAddress,
): Promise<SAM | null> {
  const samAddress = await SamContractAddress.call(this, { editionAddress, assumeValidSoundContract })
  if (!samAddress) return null

  const {
    expectClient,
    instance: { idempotentCachedCall },
  } = this

  const { readContract } = await expectClient()

  const interfaceId = await idempotentCachedCall(`minter-interface-id-${samAddress}`, async () => {
    return readContract({
      abi: samv1Abi,
      address: samAddress,
      functionName: 'moduleInterfaceId',
    })
  })

  validateAddress(editionAddress, {
    type: 'SOUND_EDITION',
  })

  switch (interfaceId) {
    case interfaceIds.ISAM: {
      const [info, platformFeeBPS] = await Promise.all([
        readContract({
          abi: samv1Abi,
          address: samAddress,
          functionName: 'samInfo',
          args: [editionAddress],
        }),
        readContract({
          abi: samv1Abi,
          address: samAddress,
          functionName: 'platformFeeBPS',
        }),
      ])

      return { ...info, platformFeeBPS, platformPerTxFlatFee: 0n }
    }
    case interfaceIds.ISAMV1_1: {
      return readContract({
        abi: samV1_1Abi,
        address: samAddress,
        functionName: 'samInfo',
        args: [editionAddress],
      })
    }
    default:
      throw new UnsupportedMinterError({
        interfaceId,
      })
  }
}
