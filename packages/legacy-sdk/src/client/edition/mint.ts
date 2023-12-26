import { InvalidQuantityError, NotEligibleMint } from '../../errors'
import type {
  EstimatableTransaction,
  MintOptions,
  MintSchedule,
  MintToOptions,
  TransactionGasOptions,
} from '../../types'
import { MINT_FALLBACK_GAS_LIMIT, MINT_GAS_LIMIT_MULTIPLIER, minterAbiMap, NULL_ADDRESS } from '../../utils/constants'
import { BigIntMax, BigIntMin, exhaustiveGuard, scaleAmount } from '../../utils/helpers'
import { SoundClientInstance } from '../instance'
import { getMerkleProof } from './merkle'
import { isSchedulePaused } from './schedules'
import { soundEditionV1_2Abi } from '../../abi/sound-edition-v1_2'
import { interfaceIds } from '../../constants'
import type { Address, Hex } from 'viem'

export async function numberOfTokensOwned(
  this: SoundClientInstance,
  { editionAddress, userAddress }: { editionAddress: Address; userAddress: Address },
) {
  const { readContract } = await this.expectClient()

  return readContract({
    abi: soundEditionV1_2Abi,
    address: editionAddress,
    functionName: 'balanceOf',
    args: [userAddress],
  }).then((value) => Number(value))
}

export async function numberMinted(
  this: SoundClientInstance,
  { editionAddress, userAddress }: { editionAddress: Address; userAddress: Address },
) {
  const { readContract } = await this.expectClient()

  return readContract({
    abi: soundEditionV1_2Abi,
    address: editionAddress,
    functionName: 'numberMinted',
    args: [userAddress],
  })
}

async function mintHelper(
  this: SoundClientInstance,
  {
    mintSchedule,
    quantity,
    affiliate = NULL_ADDRESS,
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    skipQuantityChecks = false,
    merkleProof,
    chain,
  }: MintOptions,
): Promise<EstimatableTransaction> {
  if (quantity <= 0 || Math.floor(quantity) !== quantity) throw new InvalidQuantityError({ quantity })

  const { userAddress, wallet } = await this.expectWallet()

  let eligibleMintQuantity: bigint | undefined

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

  const value =
    (mintSchedule.price + mintSchedule.platformPerTokenFee) * BigInt(quantity) + mintSchedule.platformPerTransactionFee

  const txnOverrides = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } satisfies TransactionGasOptions

  const sharedWriteContractParameters = {
    account: userAddress,
    address: mintSchedule.minterAddress,
    chain,
    functionName: 'mint',
    value,
  } as const

  const client = await this.expectClient()

  const interfaceId = mintSchedule.interfaceId

  switch (interfaceId) {
    case interfaceIds.IRangeEditionMinter:
    case interfaceIds.IRangeEditionMinterV2:
    case interfaceIds.IRangeEditionMinterV2_1: {
      const args = [mintSchedule.editionAddress, BigInt(mintSchedule.mintId), quantity, affiliate] as const

      async function startTransaction() {
        const transactionHash = await wallet.writeContract({
          abi: minterAbiMap[interfaceIds.IRangeEditionMinter],
          ...sharedWriteContractParameters,
          ...txnOverrides,
          args,
        })

        return {
          transactionHash,
        }
      }

      if (txnOverrides.gas) {
        return {
          gasEstimate: txnOverrides.gas,
          startTransaction,
        }
      }

      try {
        const gasEstimate = await client.estimateContractGas({
          abi: minterAbiMap[interfaceIds.IRangeEditionMinterV2_1],
          ...sharedWriteContractParameters,
          ...txnOverrides,
          args,
        })

        // Add a buffer to the gas estimate to account for node provider estimate variance.
        txnOverrides.gas = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
      }

      return {
        gasEstimate: txnOverrides.gas,
        startTransaction,
      }
    }

    case interfaceIds.IMerkleDropMinter:
    case interfaceIds.IMerkleDropMinterV2:
    case interfaceIds.IMerkleDropMinterV2_1: {
      let proof: Hex[] | null

      if (merkleProof === undefined) {
        const params = {
          address: mintSchedule.minterAddress,
          functionName: 'mintInfo',
          args: [mintSchedule.editionAddress, mintSchedule.mintId],
        } as const
        const { merkleRootHash: merkleRoot } = await (interfaceId === interfaceIds.IMerkleDropMinter
          ? client.readContract({
              ...params,
              abi: minterAbiMap[interfaceId],
            })
          : interfaceId === interfaceIds.IMerkleDropMinterV2
            ? client.readContract({
                ...params,
                abi: minterAbiMap[interfaceId],
              })
            : client.readContract({
                ...params,
                abi: minterAbiMap[interfaceId],
              }))

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

      const args = [mintSchedule.editionAddress, mintSchedule.mintId, quantity, proof, affiliate] as const

      async function startTransaction() {
        const transactionHash = await wallet.writeContract({
          abi: minterAbiMap[interfaceIds.IMerkleDropMinterV2_1],
          ...sharedWriteContractParameters,
          ...txnOverrides,
          args,
        })

        return {
          transactionHash,
        }
      }

      if (txnOverrides.gas) {
        return {
          gasEstimate: txnOverrides.gas,
          startTransaction,
        }
      }

      try {
        const gasEstimate = await client.estimateContractGas({
          abi: minterAbiMap[interfaceIds.IMerkleDropMinterV2_1],
          ...sharedWriteContractParameters,
          ...txnOverrides,
          args,
        })

        // Add a buffer to the gas estimate to account for node provider estimate variance.

        txnOverrides.gas = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
      }

      return {
        gasEstimate: txnOverrides.gas,
        startTransaction,
      }
    }

    default: {
      exhaustiveGuard(interfaceId)
    }
  }
}

export async function estimateMint(this: SoundClientInstance, mintOptions: MintOptions): Promise<bigint> {
  return mintHelper.call(this, mintOptions).then(({ gasEstimate }) => gasEstimate)
}

export async function mint(
  this: SoundClientInstance,
  mintOptions: MintOptions,
): Promise<{
  transactionHash: `0x${string}`
}> {
  return mintHelper.call(this, mintOptions).then(({ startTransaction }) => startTransaction())
}

async function mintToHelper(
  this: SoundClientInstance,
  {
    affiliate = NULL_ADDRESS,
    affiliateProof = [],
    attributonId = 0n,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    mintSchedule,
    mintToAddress,
    quantity,
    chain,
    skipQuantityChecks = false,
    merkleProof,
  }: MintToOptions,
): Promise<EstimatableTransaction> {
  if (quantity <= 0 || Math.floor(quantity) !== quantity) throw new InvalidQuantityError({ quantity })

  const { wallet, userAddress } = await this.expectWallet()

  const toAddress = mintToAddress ?? userAddress

  let eligibleMintQuantity: bigint | undefined

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

  const value =
    (mintSchedule.price + mintSchedule.platformPerTokenFee) * BigInt(quantity) + mintSchedule.platformPerTransactionFee

  const txnOverrides = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } satisfies TransactionGasOptions

  const sharedWriteContractParameters = {
    account: userAddress,
    address: mintSchedule.minterAddress,
    chain,
    functionName: 'mintTo',
    value,
  } as const

  const interfaceId = mintSchedule.interfaceId

  switch (interfaceId) {
    case interfaceIds.IRangeEditionMinterV2:
    case interfaceIds.IRangeEditionMinterV2_1: {
      const args = [
        mintSchedule.editionAddress,
        BigInt(mintSchedule.mintId),
        toAddress,
        quantity,
        affiliate,
        affiliateProof,
        attributonId,
      ] as const

      async function startTransaction() {
        const transactionHash = await wallet.writeContract({
          abi: minterAbiMap[interfaceIds.IRangeEditionMinterV2_1],
          ...sharedWriteContractParameters,
          ...txnOverrides,
          args,
        })

        return {
          transactionHash,
        }
      }

      if (txnOverrides.gas) {
        return {
          gasEstimate: txnOverrides.gas,
          startTransaction,
        }
      }

      try {
        const client = await this.expectClient()

        const gasEstimate = await client.estimateContractGas({
          abi: minterAbiMap[interfaceIds.IRangeEditionMinterV2_1],
          ...sharedWriteContractParameters,
          ...txnOverrides,
          args,
        })

        // Add a buffer to the gas estimate to account for node provider estimate variance.

        txnOverrides.gas = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
      }

      return {
        gasEstimate: txnOverrides.gas,
        startTransaction,
      }
    }

    case interfaceIds.IMerkleDropMinterV2:
    case interfaceIds.IMerkleDropMinterV2_1: {
      let proof: Hex[] | null

      if (merkleProof === undefined) {
        const client = await this.expectClient()

        const params = {
          address: mintSchedule.minterAddress,
          functionName: 'mintInfo',
          args: [mintSchedule.editionAddress, mintSchedule.mintId],
        } as const

        const { merkleRootHash: merkleRoot } = await (interfaceId === interfaceIds.IMerkleDropMinterV2
          ? client.readContract({
              ...params,
              abi: minterAbiMap[interfaceId],
            })
          : client.readContract({
              ...params,
              abi: minterAbiMap[interfaceId],
            }))

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

      const args = [
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

      async function startTransaction() {
        const transactionHash = await wallet.writeContract({
          abi: minterAbiMap[interfaceIds.IMerkleDropMinterV2_1],
          ...sharedWriteContractParameters,
          ...txnOverrides,
          args,
        })

        return {
          transactionHash,
        }
      }

      if (txnOverrides.gas) {
        return {
          gasEstimate: txnOverrides.gas,
          startTransaction,
        }
      }

      try {
        const client = await this.expectClient()

        const gasEstimate = await client.estimateContractGas({
          abi: minterAbiMap[interfaceIds.IMerkleDropMinterV2_1],
          ...sharedWriteContractParameters,
          ...txnOverrides,
          args,
        })

        // Add a buffer to the gas estimate to account for node provider estimate variance.
        txnOverrides.gas = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
      }

      return {
        gasEstimate: txnOverrides.gas,
        startTransaction,
      }
    }

    default: {
      exhaustiveGuard(interfaceId)
    }
  }
}

export async function estimateMintTo(this: SoundClientInstance, mintOptions: MintToOptions): Promise<bigint> {
  return mintToHelper.call(this, mintOptions).then(({ gasEstimate }) => gasEstimate)
}
export async function mintTo(
  this: SoundClientInstance,
  mintOptions: MintToOptions,
): Promise<{
  transactionHash: `0x${string}`
}> {
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
    userAddress: Address
  },
): Promise<bigint> {
  // check valid mint time
  if (timestamp < mintSchedule.startTime || timestamp > mintSchedule.endTime || isSchedulePaused(mintSchedule)) {
    return 0n
  }

  // Checks for child minter custom logic
  switch (mintSchedule.mintType) {
    case 'RangeEdition': {
      const maxQty = timestamp < mintSchedule.cutoffTime ? mintSchedule.maxMintableUpper : mintSchedule.maxMintableLower

      if (mintSchedule.totalMinted >= maxQty) {
        return 0n
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
        return 0n
      }
      break
    }
  }

  // Get the edition's remaining token quantity.
  const { readContract } = await this.expectClient()

  const [editionTotalMinted, editionMaxMintable] = await Promise.all([
    readContract({
      abi: soundEditionV1_2Abi,
      address: mintSchedule.editionAddress,
      functionName: 'totalMinted',
    }),

    readContract({
      abi: soundEditionV1_2Abi,
      address: mintSchedule.editionAddress,
      functionName: 'editionMaxMintable',
    }),
  ])

  const editionRemainingQty = BigInt(editionMaxMintable) - editionTotalMinted

  if (!editionRemainingQty) {
    return 0n
  }

  // Get eligible quantity for the user on this mint schedule.
  const remainingForSchedule =
    (typeof mintSchedule.maxMintable === 'function' ? mintSchedule.maxMintable(timestamp) : mintSchedule.maxMintable) -
    mintSchedule.totalMinted

  const mintedByUserFromSchedule = await (mintSchedule.interfaceId === interfaceIds.IMerkleDropMinterV2 ||
  mintSchedule.interfaceId === interfaceIds.IMerkleDropMinterV2_1
    ? readContract({
        abi: minterAbiMap[interfaceIds.IMerkleDropMinterV2_1],
        address: mintSchedule.minterAddress,
        functionName: 'mintCount',
        args: [mintSchedule.editionAddress, mintSchedule.mintId, userAddress],
      })
    : numberMinted.call(this, {
        editionAddress: mintSchedule.editionAddress,
        userAddress,
      }))
  const eligibleForUserOnSchedule = BigInt(mintSchedule.maxMintablePerAccount) - mintedByUserFromSchedule
  const scheduleEligibleQty = BigIntMin(BigInt(remainingForSchedule), eligibleForUserOnSchedule)

  // Return the minimum of the two. The number of tokens minted within the mint schedule
  // can never exceed the number of tokens available for the edition.
  return BigIntMax(0n, BigIntMin(scheduleEligibleQty, editionRemainingQty))
}
