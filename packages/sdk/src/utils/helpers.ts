import { isAddress } from '@ethersproject/address'
import { InvalidAddressError } from '../errors'
import keccak256 from 'keccak256'
import type { BigNumber } from '@ethersproject/bignumber'
import type { AddressInputType } from '../types'
import { CUSTOM_ERRORS, NULL_ADDRESS } from './constants'
import {
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundEditionV1_1__factory,
} from '@soundxyz/sound-protocol/typechain'

export function validateAddress({
  type,
  address,
  notNull,
}: {
  type: AddressInputType
  address: string
  notNull?: boolean
}) {
  if (notNull && address === NULL_ADDRESS) {
    throw new InvalidAddressError({ type, address, message: 'Address cannot be null address' })
  }

  if (!isAddress(address)) {
    throw new InvalidAddressError({ type, address })
  }
}

export function getSaltAsBytes32(salt: string | number) {
  return '0x' + keccak256(salt.toString()).toString('hex')
}

export function getLazyOption<T extends object>(option: T | (() => T | Promise<T>)) {
  return typeof option === 'function' ? option() : option
}

export function scaleAmount({ amount, multiplier }: { amount: BigNumber; multiplier: number }) {
  return amount.mul(multiplier * 100).div(100)
}

/**
 * Accepts data string from a transaction response,
 * parses the contract function that was called,
 * and returns a map of the potential errors for the given function.
 */
export function getErrorSelectors(data: string) {
  const functionSelector = data.slice(0, 10)

  const editionInterface = SoundEditionV1_1__factory.createInterface()
  const rangeMinterInterface = RangeEditionMinter__factory.createInterface()
  const merkleMinterInteface = MerkleDropMinter__factory.createInterface()

  switch (functionSelector) {
    case rangeMinterInterface.getSighash('mint'): {
      return {
        [editionInterface.getSighash('ExceedsEditionAvailableSupply')]: CUSTOM_ERRORS.ExceedsEditionAvailableSupply,
        [rangeMinterInterface.getSighash('ExceedsAvailableSupply')]: CUSTOM_ERRORS.ExceedsAvailableSupply,
        [rangeMinterInterface.getSighash('ExceedsMaxPerAccount')]: CUSTOM_ERRORS.ExceedsMaxPerAccount,
      }
    }
    case merkleMinterInteface.getSighash('mint'): {
      return {
        [editionInterface.getSighash('ExceedsEditionAvailableSupply')]: CUSTOM_ERRORS.ExceedsEditionAvailableSupply,
        [merkleMinterInteface.getSighash('ExceedsAvailableSupply')]: CUSTOM_ERRORS.ExceedsAvailableSupply,
        [merkleMinterInteface.getSighash('ExceedsMaxPerAccount')]: CUSTOM_ERRORS.ExceedsMaxPerAccount,
      }
    }
    default: {
      console.error('Unknown function selector:', functionSelector)
      return {}
    }
  }
}
