import type { Interface } from '@ethersproject/abi'
import { Zero } from '@ethersproject/constants'
import { BigNumber } from '@ethersproject/bignumber'

export function getInterfaceID(contractInterface: Interface): string {
  let interfaceID: BigNumber = Zero
  const functions: string[] = Object.keys(contractInterface.functions)
  for (let i = 0; i < functions.length; i++) {
    interfaceID = interfaceID.xor(contractInterface.getSighash(functions[i]))
  }

  return interfaceID.toString()
}
