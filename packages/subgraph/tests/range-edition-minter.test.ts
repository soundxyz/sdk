import { assert, describe, test, clearStore, beforeAll, afterAll } from 'matchstick-as/assembly/index'
import { Address, BigInt } from '@graphprotocol/graph-ts'
import { ExampleEntity } from '../generated/schema'
import { AffiliateFeeSet } from '../generated/RangeEditionMinter/RangeEditionMinter'
import { handleAffiliateFeeSet } from '../src/range-edition-minter'
import { createAffiliateFeeSetEvent } from './range-edition-minter-utils'

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let edition = Address.fromString('0x0000000000000000000000000000000000000001')
    let mintId = BigInt.fromI32(234)
    let bps = 123
    let newAffiliateFeeSetEvent = createAffiliateFeeSetEvent(edition, mintId, bps)
    handleAffiliateFeeSet(newAffiliateFeeSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('ExampleEntity created and stored', () => {
    assert.entityCount('ExampleEntity', 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      'ExampleEntity',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      'edition',
      '0x0000000000000000000000000000000000000001',
    )
    assert.fieldEquals('ExampleEntity', '0xa16081f360e3847006db660bae1c6d1b2e17ec2a', 'mintId', '234')
    assert.fieldEquals('ExampleEntity', '0xa16081f360e3847006db660bae1c6d1b2e17ec2a', 'bps', '123')

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
