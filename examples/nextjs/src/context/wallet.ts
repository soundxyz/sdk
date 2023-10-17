import { proxy, useSnapshot } from 'valtio'
import { derive } from 'valtio/utils'
import { createWalletClient, http, isHash, isHex } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { RPC_URL, chain } from './wagmi'

const WalletInput = proxy({
  privateKey: '',
})

export function useWalletPrivateKey() {
  return useSnapshot(WalletInput, { sync: true }).privateKey
}

export function setWalletPrivateKey(privateKey: string) {
  WalletInput.privateKey = privateKey
}

const WalletState = derive({
  wallet(get) {
    const privateKey = get(WalletInput).privateKey

    if (!privateKey) return null

    if (!isHex(privateKey, { strict: true }) || privateKey.length !== 66) return null

    const account = privateKeyToAccount(privateKey)

    const walletClient = createWalletClient({
      transport: http(RPC_URL),
      account,
      chain,
    })

    return {
      walletClient,
      account,
    }
  },
})

export function useWallet() {
  return useSnapshot(WalletState)
}
