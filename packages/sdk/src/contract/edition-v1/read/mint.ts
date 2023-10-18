import type { Address, Chain, PublicClient } from 'viem'
import { soundEditionV1_2Abi } from '../abi/sound-edition-v1_2'
import { minterAbiMap, type MintSchedule } from './schedules'
import type { MerkleProvider, TransactionGasOptions } from '../../../utils/types'
import { interfaceIds } from '../../interfaceIds'
import {
  BigIntMax,
  BigIntMin,
  MINT_FALLBACK_GAS_LIMIT,
  MINT_GAS_LIMIT_MULTIPLIER,
  NULL_ADDRESS,
  exhaustiveGuard,
  scaleAmount,
} from '../../../utils/helpers'
import { InvalidQuantityError } from '../../../utils/errors'

export async function numberOfTokensOwned<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  { editionAddress, userAddress }: { editionAddress: Address; userAddress: Address },
) {
  return await client
    .readContract({
      abi: soundEditionV1_2Abi,
      address: editionAddress,
      functionName: 'balanceOf',
      args: [userAddress],
    })
    .then((value) => Number(value))
}

export async function numberMinted<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  { editionAddress, userAddress }: { editionAddress: Address; userAddress: Address },
) {
  return await client.readContract({
    abi: soundEditionV1_2Abi,
    address: editionAddress,
    functionName: 'numberMinted',
    args: [userAddress],
  })
}

export async function eligibleQuantity<Client extends Pick<PublicClient, 'multicall' | 'readContract'>>(
  client: Client,
  {
    merkleProvider,
  }: {
    merkleProvider: MerkleProvider
  },
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
  if (timestamp < mintSchedule.startTime || timestamp > mintSchedule.endTime || mintSchedule.mintPaused) {
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
      const proof = await merkleProvider.merkleProof({
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
  const [editionTotalMinted, editionMaxMintable] = await client.multicall({
    contracts: [
      {
        abi: soundEditionV1_2Abi,
        address: mintSchedule.editionAddress,
        functionName: 'totalMinted',
      },
      {
        abi: soundEditionV1_2Abi,
        address: mintSchedule.editionAddress,
        functionName: 'editionMaxMintable',
      },
    ],
    allowFailure: false,
  })

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
    ? client.readContract({
        abi: minterAbiMap[interfaceIds.IMerkleDropMinterV2_1],
        address: mintSchedule.minterAddress,
        functionName: 'mintCount',
        args: [mintSchedule.editionAddress, mintSchedule.mintId, userAddress],
      })
    : numberMinted(client, {
        editionAddress: mintSchedule.editionAddress,
        userAddress,
      }))
  const eligibleForUserOnSchedule = BigInt(mintSchedule.maxMintablePerAccount) - mintedByUserFromSchedule
  const scheduleEligibleQty = BigIntMin(BigInt(remainingForSchedule), eligibleForUserOnSchedule)

  // Return the minimum of the two. The number of tokens minted within the mint schedule
  // can never exceed the number of tokens available for the edition.
  return BigIntMax(0n, BigIntMin(scheduleEligibleQty, editionRemainingQty))
}

export interface MintOptions extends TransactionGasOptions {
  quantity: number
  mintSchedule: MintSchedule

  userAddress: Address

  affiliate?: Address

  /**
   * Chain of edition to be minted
   */
  chain: Chain
}

export interface MintToOptions extends MintOptions {
  mintTo: Address
}

interface MintParameters {
  readonly interfaceId: keyof typeof minterAbiMap
  readonly abi: (typeof minterAbiMap)[keyof typeof minterAbiMap]
  readonly mint:
    | {
        readonly type: 'mint'
        readonly input: {
          readonly args: readonly unknown[]
          readonly account: `0x${string}`
          readonly address: `0x${string}`
          readonly chain: Chain
          readonly functionName: 'mint'
          readonly value: bigint
        }
        readonly gasEstimate: bigint | null
      }
    | {
        readonly type: 'not-eligible'
      }
}

export async function editionMintParameters<
  Client extends Pick<PublicClient, 'estimateContractGas' | 'multicall' | 'readContract'>,
>(
  client: Client,
  { merkleProvider }: { merkleProvider: MerkleProvider },
  {
    quantity,
    mintSchedule,
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    userAddress,
    chain,
    affiliate = NULL_ADDRESS,
  }: MintOptions,
) {
  if (quantity <= 0 || Math.floor(quantity) !== quantity) throw new InvalidQuantityError({ quantity })

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

  const eligibleMintQuantity = await eligibleQuantity(
    client,
    {
      merkleProvider,
    },
    {
      mintSchedule,
      userAddress,
    },
  )
  if (eligibleMintQuantity < quantity) {
    return {
      interfaceId: mintSchedule.interfaceId,
      abi: minterAbiMap[mintSchedule.interfaceId],

      mint: {
        type: 'not-eligible',
      },
    } as const satisfies MintParameters
  }

  switch (mintSchedule.interfaceId) {
    case interfaceIds.IRangeEditionMinter:
    case interfaceIds.IRangeEditionMinterV2:
    case interfaceIds.IRangeEditionMinterV2_1: {
      const interfaceId = interfaceIds.IRangeEditionMinter
      const abi = minterAbiMap[interfaceId]
      const args = [mintSchedule.editionAddress, BigInt(mintSchedule.mintId), quantity, affiliate] as const

      let gasEstimate: bigint | null

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        gasEstimate = txnOverrides.gas = scaleAmount({
          amount: await client.estimateContractGas({
            abi: minterAbiMap[interfaceIds.IRangeEditionMinterV2_1],
            ...sharedWriteContractParameters,
            ...txnOverrides,
            args,
          }),
          multiplier: MINT_GAS_LIMIT_MULTIPLIER,
        })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT

        gasEstimate = null
      }

      return {
        interfaceId: interfaceIds.IRangeEditionMinter,
        abi,
        mint: {
          type: 'mint',
          input: {
            args,
            ...sharedWriteContractParameters,
            ...txnOverrides,
          },
          gasEstimate,
        },
      } as const satisfies MintParameters
    }

    case interfaceIds.IMerkleDropMinter:
    case interfaceIds.IMerkleDropMinterV2:
    case interfaceIds.IMerkleDropMinterV2_1: {
      const interfaceId = interfaceIds.IMerkleDropMinterV2_1
      const abi = minterAbiMap[interfaceId]

      const proof = await merkleProvider.merkleProof({
        merkleRoot: mintSchedule.merkleRoot,
        userAddress,
      })

      if (!proof?.length) {
        return {
          abi,
          interfaceId,
          mint: {
            type: 'not-eligible',
          },
        } as const satisfies MintParameters
      }

      const args = [mintSchedule.editionAddress, mintSchedule.mintId, quantity, proof, affiliate] as const
      let gasEstimate: bigint | null

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        gasEstimate = txnOverrides.gas = scaleAmount({
          amount: await client.estimateContractGas({
            abi: minterAbiMap[interfaceIds.IMerkleDropMinterV2_1],
            ...sharedWriteContractParameters,
            ...txnOverrides,
            args,
          }),
          multiplier: MINT_GAS_LIMIT_MULTIPLIER,
        })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
        gasEstimate = null
      }

      return {
        abi,
        interfaceId,
        mint: {
          type: 'mint',
          input: {
            args,
            ...sharedWriteContractParameters,
            ...txnOverrides,
          },
          gasEstimate,
        },
      } as const satisfies MintParameters
    }
    default: {
      exhaustiveGuard(mintSchedule)
    }
  }
}

export async function editionMintToParameters<
  Client extends Pick<PublicClient, 'estimateContractGas' | 'multicall' | 'readContract'>,
>(
  client: Client,
  { merkleProvider }: { merkleProvider: MerkleProvider },
  {
    quantity,
    mintSchedule,
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    userAddress,
    chain,
    affiliate = NULL_ADDRESS,
  }: MintOptions,
) {
  if (quantity <= 0 || Math.floor(quantity) !== quantity) throw new InvalidQuantityError({ quantity })

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

  switch (mintSchedule.interfaceId) {
    case interfaceIds.IRangeEditionMinterV2:
    case interfaceIds.IRangeEditionMinterV2_1: {
      const eligibleMintQuantity = await eligibleQuantity(
        client,
        {
          merkleProvider,
        },
        {
          mintSchedule,
          /**
           * Is the mintTo quantity eligiblity relative to the address of the user or the mintTo address?
           */
          userAddress,
        },
      )
      if (eligibleMintQuantity < quantity) {
        return {
          interfaceId: mintSchedule.interfaceId,
          abi: minterAbiMap[mintSchedule.interfaceId],

          mint: {
            type: 'not-eligible',
          },
        } as const satisfies MintParameters
      }

      const interfaceId = interfaceIds.IRangeEditionMinter
      const abi = minterAbiMap[interfaceId]
      const args = [mintSchedule.editionAddress, BigInt(mintSchedule.mintId), quantity, affiliate] as const

      let gasEstimate: bigint | null

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        gasEstimate = txnOverrides.gas = scaleAmount({
          amount: (gasEstimate = await client.estimateContractGas({
            abi: minterAbiMap[interfaceIds.IRangeEditionMinterV2_1],
            ...sharedWriteContractParameters,
            ...txnOverrides,
            args,
          })),
          multiplier: MINT_GAS_LIMIT_MULTIPLIER,
        })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT

        gasEstimate = null
      }

      return {
        interfaceId: interfaceIds.IRangeEditionMinter,
        abi,
        mint: {
          type: 'mint',
          input: {
            args,
            ...sharedWriteContractParameters,
            ...txnOverrides,
          },
          gasEstimate,
        },
      } as const satisfies MintParameters
    }

    default: {
      return {
        abi: minterAbiMap[mintSchedule.interfaceId],
        interfaceId: mintSchedule.interfaceId,
        mint: {
          type: 'not-eligible',
        },
      } as const satisfies MintParameters
    }
  }
}
