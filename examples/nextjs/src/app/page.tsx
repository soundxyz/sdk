'use client'

import { ContractAddressInput } from '@/components/contractInput'
import { WalletPrivateKeyInput } from '@/components/walletInput'
import { useContractAddress } from '@/context/contractAddress'
import { useWallet } from '@/context/wallet'
import { useBalance } from 'wagmi'

export default function Home() {
  const { wallet } = useWallet()

  const balance = useBalance({
    address: wallet?.account.address,
    watch: true,
  })

  const {
    contractAddress,
    input: { isHydrated: isContractAddressHydrated },
  } = useContractAddress()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <br />
        <br />
        <br />
        <WalletPrivateKeyInput />

        <br />

        {wallet && (
          <>
            <p>Balance of {wallet.account.address}</p>
            <p>{balance.data ? `${Number(balance.data.formatted).toFixed(5)} eth` : 'Loading...'}</p>
            <br />
          </>
        )}

        <br />
        <br />

        <ContractAddressInput />

        <br />
        <br />
        <p>Valid Contract Address: {isContractAddressHydrated ? contractAddress ?? 'not set' : 'Loading...'}</p>
      </div>
    </main>
  )
}
