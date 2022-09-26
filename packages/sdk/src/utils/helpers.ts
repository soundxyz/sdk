import { isAddress } from '@ethersproject/address'
import { InvalidAddressError } from '../errors'
import keccak256 from 'keccak256'

export function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new InvalidAddressError({ address: contractAddress })
  }
}

export function getSaltAsBytes32(salt: string | number) {
  return '0x' + keccak256(salt.toString()).toString('hex')
}

const IdempotentCache: Record<string, unknown> = {}
const IdempotentCachePromises: Record<string, Promise<unknown>> = {}

export function IdempotentCachedCall<T>(key: string, cb: () => Promise<T>): Promise<T> | T {
  if (key in IdempotentCache) return IdempotentCache[key] as T

  return ((IdempotentCachePromises[key] as Promise<T> | undefined) ||= cb()
    .then((value) => {
      IdempotentCache[key] = value
      return value
    })
    .finally(() => {
      delete IdempotentCachePromises[key]
    }))
}
