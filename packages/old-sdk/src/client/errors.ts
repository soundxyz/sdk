import { InvalidTxHashError } from '../errors'
import { ContractErrorName } from '../types'
import { ContractErrorSigHashToName, NULL_BYTES32 } from '../utils/constants'
import { SoundClientInstance } from './instance'

export async function getContractError(this: SoundClientInstance, txHash: string): Promise<ContractErrorName | null> {
  if (
    txHash === NULL_BYTES32 ||
    txHash.slice(0, 2) !== '0x' ||
    // Tx hash is 32 bytes, which is 64 hex characters + '0x'
    txHash.length !== 66
  ) {
    throw new InvalidTxHashError({ txHash })
  }

  const provider = await this.expectProvider()
  const tx = await provider.getTransaction(txHash)

  if (!tx) return null

  try {
    // Simulate the original transaction
    const response = await provider.call(
      {
        to: tx.to,
        from: tx.from,
        nonce: tx.nonce,
        gasLimit: tx.gasLimit,
        gasPrice: tx.gasPrice,
        data: tx.data,
        value: tx.value,
        chainId: tx.chainId,
        type: tx.type ?? undefined,
        accessList: tx.accessList,
      },
      tx.blockNumber,
    )

    // If this is a failed transaction, the first 4 bytes of the response
    // will be the custom error selector (hash of its signature)
    const firstFourBytes = response.slice(0, 10)
    const contractError = ContractErrorSigHashToName[firstFourBytes]

    if (!contractError) return null

    return contractError
  } catch (err) {
    this.instance.onUnhandledError(err)
    return null
  }
}
