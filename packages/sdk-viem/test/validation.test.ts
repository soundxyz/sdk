import type { Address } from 'viem'
import { encodeFunctionData } from 'viem/utils'
import { beforeAll, describe, expect, test } from 'vitest'
import { ALICE, DEFAULT_SALT, EDITION_MAX, forkBlockNumber } from './test-constants'
import { contractAddressFromTransaction, testSoundClient, testViemClient } from './test-utils'
import { SoundCreatorV1Config } from '../src/abi/sound-creator-v1'
import { SoundEditionV1_2Config } from '../src/abi/sound-edition-v1_2'

import { NON_NULL_ADDRESS, NULL_ADDRESS, UINT32_MAX } from '../src/utils/constants'

let creatorAddress: Address

beforeAll(async () => {
  // ensure that the chain is forked to the correct block
  await expect(testViemClient.getBlockNumber()).resolves.toBe(forkBlockNumber)

  // deploy the edition implementation and then get its address
  const editionImplementationTxHash = await testViemClient.deployContract({
    ...SoundEditionV1_2Config,
    account: ALICE,
  })
  const editionImplementationAddress = await contractAddressFromTransaction({
    hash: editionImplementationTxHash,
  })

  // deploy the creator contract with the implementation set, and then get the creator address
  const creatorHash = await testViemClient.deployContract({
    ...SoundCreatorV1Config,
    args: [editionImplementationAddress],
    account: ALICE,
  })
  creatorAddress = await contractAddressFromTransaction({ hash: creatorHash })
})

describe('isSoundEdition', () => {
  test('Correctly identifies SoundEdition addresses', async () => {
    let isEdition = await testSoundClient.isSoundEdition({ editionAddress: ALICE })
    expect(isEdition).to.be.false

    const editionInitData = encodeFunctionData({
      abi: SoundEditionV1_2Config.abi,
      functionName: 'initialize',
      args: [
        'Song Name',
        'SYMBOL',
        NULL_ADDRESS,
        'https://baseURI.com',
        'https://contractURI.com',
        NON_NULL_ADDRESS,
        0, //royaltyBPS,
        EDITION_MAX, // maxMintableLower
        EDITION_MAX, // maxMintableUpper
        UINT32_MAX, // cutoffTime
        2,
      ],
    })

    // compute the edition address, while kicking off the transaction to create it
    const [[editionAddress]] = await Promise.all([
      testViemClient.readContract({
        abi: SoundCreatorV1Config.abi,
        address: creatorAddress,
        functionName: 'soundEditionAddress',
        args: [ALICE, DEFAULT_SALT],
      }),
      testViemClient
        .writeContract({
          abi: SoundCreatorV1Config.abi,
          address: creatorAddress,
          functionName: 'createSoundAndMints',
          args: [DEFAULT_SALT, editionInitData, [], []],
          account: ALICE,
        })
        .then((hash) => testViemClient.waitForTransactionReceipt({ hash })),
    ])

    isEdition = await testSoundClient.isSoundEdition({ editionAddress })
    expect(isEdition).to.be.true
  })
})
