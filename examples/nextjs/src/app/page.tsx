'use client'

import { ContractAddressInput } from '@/components/contractInput'
import { EditionInfo } from '@/components/editionInfo'
import { WalletPrivateKeyInput } from '@/components/walletInput'
import { useContractAddress } from '@/context/contractAddress'
import { useWallet } from '@/context/wallet'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useBlockNumber, useBalance } from 'wagmi'

export default function Home() {
  const { wallet } = useWallet()

  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const { data: balance, queryKey } = useBalance({
    address: wallet?.account.address,
  })
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey })
  }, [blockNumber, queryClient, queryKey])

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
            <p>{balance?.decimals != null ? `${Number(balance.decimals).toFixed(5)} eth` : 'Loading...'}</p>
            <br />
          </>
        )}

        <br />
        <br />

        <ContractAddressInput />

        <br />
        <br />
        <p>Valid Contract Address: {isContractAddressHydrated ? contractAddress ?? 'not set' : 'Loading...'}</p>

        <br />
        <br />
        <EditionInfo />
      </div>
    </main>
  )
}
