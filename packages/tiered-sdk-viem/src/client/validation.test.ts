import type { Address } from 'viem'
import { encodeFunctionData } from 'viem/utils'
import { beforeAll, describe, expect, test } from 'vitest'
import { didntThrowExpectedError } from '../../test/helpers'
import { ALICE, DEFAULT_SALT, forkBlockNumber } from '../../test/test-constants'
import { contractAddressFromTransaction, testSoundClient, testViemClient } from '../../test/test-utils'
import { SoundCreatorV1Config } from '../abi/sound-creator-v1'
import { SoundEditionV2Config } from '../abi/sound-edition-v2'
import { InvalidAddressError } from '../errors'

import { NON_NULL_ADDRESS, NULL_ADDRESS, UINT32_MAX } from '../utils/constants'

let creatorAddress: Address

beforeAll(async () => {
  await expect(testViemClient.getBlockNumber()).resolves.toBe(forkBlockNumber)

  const editionImplementationTxHash = await testViemClient.deployContract({
    ...SoundEditionV2Config,
    account: ALICE,
  })
  const editionImplementationAddress = await contractAddressFromTransaction({
    hash: editionImplementationTxHash,
  })

  const creatorHash = await testViemClient.deployContract({
    ...SoundCreatorV1Config,
    args: [editionImplementationAddress],
    account: ALICE,
  })

  creatorAddress = await contractAddressFromTransaction({ hash: creatorHash })
})

describe('isSoundEdition', () => {
  test("Should throw error if the address isn't valid", async () => {
    const BAD_ADDRESS = 'not an address'

    const err1 = await testSoundClient
      .isSoundEdition({ editionAddress: BAD_ADDRESS })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error.message).to.equal('Invalid address')
        expect(error.type).equal('SOUND_EDITION')
        expect(error.address).equal(BAD_ADDRESS)

        return error
      })

    const err2 = await testSoundClient
      .isSoundEdition({ editionAddress: BAD_ADDRESS })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).to.be.instanceOf(InvalidAddressError)
        expect(error.message).to.equal('Invalid address')
        expect(error.type).equal('SOUND_EDITION')
        expect(error.address).equal(BAD_ADDRESS)

        return error
      })

    expect(err1).instanceOf(Error)
    expect(err2).instanceOf(Error)

    expect(err1).not.equal(err2)
  })

  test('Correctly identifies SoundEdition addresses', async () => {
    let isEdition = await testSoundClient.isSoundEdition({ editionAddress: ALICE })
    expect(isEdition).to.be.false

    const editionInitData = encodeFunctionData({
      abi: SoundEditionV2Config.abi,
      functionName: 'initialize',
      args: [
        {
          name: 'Song Name',
          symbol: 'SYMBOL',
          baseURI: 'https://baseURI.com',
          contractURI: 'https://contractURI.com',
          fundingRecipient: NON_NULL_ADDRESS,
          royaltyBPS: 0,
          isMetadataFrozen: false,
          operatorFilteringEnabled: false,
          isCreateTierFrozen: false,
          metadataModule: NULL_ADDRESS,
          tierCreations: [
            {
              tier: 0,
              cutoffTime: UINT32_MAX,
              isFrozen: false,
              maxMintableLower: UINT32_MAX,
              maxMintableUpper: UINT32_MAX,
              mintRandomnessEnabled: true,
            },
          ],
        },
      ],
    })

    console.log(editionInitData)

    // compute the edition address, while kicking off the transaction to create it
    const [asd, res] = await Promise.all([
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

    const [editionAddress] = asd

    console.log(res)

    isEdition = await testSoundClient.isSoundEdition({ editionAddress })
    expect(isEdition).to.be.true
  })
})
