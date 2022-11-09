import { assert, describe, test, clearStore, beforeAll, afterAll } from 'matchstick-as/assembly/index'
import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ExampleEntity } from '../generated/schema'
import { OwnershipHandoverCanceled } from '../generated/SoundCreatorV1/SoundCreatorV1'
import { handleOwnershipHandoverCanceled } from '../src/sound-creator-v-1'
import { createOwnershipHandoverCanceledEvent } from './sound-creator-v-1-utils'

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let pendingOwner = Address.fromString('0x0000000000000000000000000000000000000001')
    let newOwnershipHandoverCanceledEvent = createOwnershipHandoverCanceledEvent(pendingOwner)
    handleOwnershipHandoverCanceled(newOwnershipHandoverCanceledEvent)
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
      'pendingOwner',
      '0x0000000000000000000000000000000000000001',
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
