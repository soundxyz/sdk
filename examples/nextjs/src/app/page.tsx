'use client'

import { WalletPrivateKeyInput } from '@/components/walletInput'
import { useWallet } from '@/context/wallet'
import { useBalance } from 'wagmi'

export default function Home() {
  const { wallet } = useWallet()

  const balance = useBalance({
    address: wallet?.account.address,
    watch: true,
  })

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
      </div>
    </main>
  )
}
