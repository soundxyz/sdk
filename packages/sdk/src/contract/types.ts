import type { Account, Address, Chain, Hex } from 'viem'

export interface MintParameters {
  readonly interfaceId?: Hex
  readonly abi: unknown
  readonly mint:
    | {
        readonly type: 'mint'
        readonly input: {
          readonly args: readonly unknown[]
          readonly account: `0x${string}` | Account
          readonly address: `0x${string}`
          readonly chain: Chain
          readonly functionName: 'mint' | 'mintTo'
          readonly value: bigint
        }
        readonly gasEstimate: bigint | null
      }
    | {
        readonly type: 'not-eligible'
      }
}

export type ContractCall = {
  contractAddress: Address
  calldata: Address
}
