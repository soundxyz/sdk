import { isAddress } from '@ethersproject/address'
import { InvalidAddressError } from '../errors'
import keccak256 from 'keccak256'
import type { BigNumber } from '@ethersproject/bignumber'
import type { AddressInputType } from '../types'
import { failureReasons, NULL_ADDRESS } from './constants'
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

export function getErrorMessages(data: string) {
  const firstFourBytes = data.slice(0, 10)

  const editionInterface = SoundEditionV1_1__factory.createInterface()
  const rangeMinterInterface = RangeEditionMinter__factory.createInterface()
  const merkleMinterInteface = MerkleDropMinter__factory.createInterface()

  const editionMintSignature = editionInterface.getSighash('mint')
  const rangeMintSignature = rangeMinterInterface.getSighash('mint')
  const merkleMintSignature = merkleMinterInteface.getSighash('mint')

  switch (firstFourBytes) {
    case editionMintSignature: {
      return {
        [editionInterface.getSighash('ExceedsEditionAvailableSupply')]:
          failureReasons.edition.ExceedsEditionAvailableSupply,
      }
    }
    case rangeMintSignature: {
      return {
        [rangeMinterInterface.getSighash('ExceedsAvailableSupply')]: failureReasons.minters.ExceedsAvailableSupply,
        [rangeMinterInterface.getSighash('ExceedsMaxPerAccount')]: failureReasons.minters.ExceedsMaxPerAccount,
      }
    }
    case merkleMintSignature: {
      return {
        [merkleMinterInteface.getSighash('ExceedsAvailableSupply')]: failureReasons.minters.ExceedsAvailableSupply,
        [merkleMinterInteface.getSighash('ExceedsMaxPerAccount')]: failureReasons.minters.ExceedsMaxPerAccount,
      }
    }
    default: {
      console.error('Unknown function selector:', firstFourBytes)
      return {}
    }
  }
}
