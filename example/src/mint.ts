import assert from 'assert'

import { clientSigner } from './clientSigner'
import { signer } from './signer'
import { goerliProvider } from './alchemy'
import { fromUnixTime } from 'date-fns'

const exampleEditionAddress = '0xFC6Bdee583f3738F69FeeF4BaCf9069aC086Ad77'

const editionContract = clientSigner.edition.info({
  contractAddress: exampleEditionAddress,
}).contract

const editionInfo = await editionContract.info

editionInfo.symbol

assert.strictEqual(editionInfo.name, 'SDK Example')

console.log(editionInfo)

assert.strictEqual(editionInfo.mintConcluded, false)

const { schedules, activeSchedules } = await clientSigner.edition.mintSchedules({
  editionAddress: exampleEditionAddress,
})

assert.strictEqual(activeSchedules.length, 2, 'Unexpected amount of schedules')
assert.strictEqual(schedules.length, 2, 'Unexpected amount of schedules')

assert.deepStrictEqual(schedules, activeSchedules)

const [merkleDrop, openEditionDrop] = activeSchedules

assert(merkleDrop?.mintType === 'MerkleDrop', "Unexpected first example drop isn't merkle")

assert(openEditionDrop?.mintType === 'RangeEdition', "Unexpected second example drop isn't range edition")

assert(
  (await clientSigner.edition.eligibleQuantity({
    mintSchedule: merkleDrop,
    userAddress: signer.address,
  })) > 0,
  "Example account can't collect from presale anymore",
)

const currentlyOwnedNumberOfTokens = await clientSigner.edition.numberOfTokensOwned({
  editionAddress: exampleEditionAddress,
  userAddress: signer.address,
})

console.log(
  `Wallet ${signer.address} currently owns ${currentlyOwnedNumberOfTokens} tokens. Trying to buy another one from a merkle drop...`,
)

{
  const mintTransaction = await clientSigner.edition.mint({
    mintSchedule: merkleDrop,
    quantity: 1,
  })

  console.log('Mint transaction has been sent, waiting for completion...')

  const receipt = await mintTransaction.wait()

  const confirmedDate = fromUnixTime((await goerliProvider.getBlock(receipt.blockNumber)).timestamp)

  console.log(
    `Mint has been confirmed at ${confirmedDate}. Now wallet ${
      signer.address
    } owns ${await clientSigner.edition.numberOfTokensOwned({
      editionAddress: exampleEditionAddress,
      userAddress: signer.address,
    })}`,
  )
}

console.log(`Wallet ${signer.address} is now trying to buy another one from the public open edition...`)

{
  const mintTransaction = await clientSigner.edition.mint({
    mintSchedule: openEditionDrop,
    quantity: 1,
  })

  console.log('Mint transaction has been sent, waiting for completion...')

  const receipt = await mintTransaction.wait()

  const confirmedDate = fromUnixTime((await goerliProvider.getBlock(receipt.blockNumber)).timestamp)

  console.log(
    `Mint has been confirmed at ${confirmedDate}. Now wallet ${
      signer.address
    } owns ${await clientSigner.edition.numberOfTokensOwned({
      editionAddress: exampleEditionAddress,
      userAddress: signer.address,
    })}`,
  )
}
