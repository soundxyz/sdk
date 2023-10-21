/* eslint-disable @next/next/no-img-element */
'use client'

import { Embed } from '@/components/iframe'
import { Spinner } from '@/components/spinner'
import { WalletPrivateKeyInput } from '@/components/walletInput'
import { soundApi } from '@/context/sound'
import { publicClient } from '@/context/wagmi'
import { useWallet } from '@/context/wallet'
import { useEditionVersion } from '@/hooks/edition'
import { Box, Button, Link, Text, TextFieldInput } from '@radix-ui/themes'
import type { MintSchedule } from '@soundxyz/sdk/contract/edition-v1/read/schedules'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import assert from 'assert'
import { queryClient } from '@/context/reactQuery'
import { formatEther } from 'viem'
import { retryAsync } from '@soundxyz/sdk'

const contractAddress = '0x946bba3ab4fa3931850390df93a070295c78e433'

const EDITION_V1 = 'edition-v1'

function EditionSchedule({ schedule }: { schedule: MintSchedule }) {
  const { wallet } = useWallet()

  const [quantityInput, setQuantity] = useState(1)

  const quantity = Number.isSafeInteger(quantityInput) && quantityInput > 0 ? quantityInput : null

  const [message, setMessage] = useState('')

  const { data: mintParameters, refetch } = useQuery({
    queryKey: [
      EDITION_V1,
      'mint-params',
      schedule.minterAddress,
      schedule.mintId.toString(),
      wallet?.account.address,
      quantity,
    ],
    queryFn() {
      if (!wallet) return undefined

      if (!quantity) return undefined

      return publicClient.editionV1.mintParameters({
        account: wallet.account,
        chain: wallet.walletClient.chain,
        mintSchedule: schedule,
        quantity,
      })
    },
  })

  const { mutate, isPending, error } = useMutation({
    async mutationFn() {
      assert(wallet && quantity && mintParameters?.mint.type === 'mint')

      setMessage('Minting...')

      const hash = await wallet.walletClient.editionV1.mint(mintParameters.mint)

      setMessage('Waiting for transaction...')

      const receipt = await retryAsync(
        () =>
          publicClient.getTransactionReceipt({
            hash,
          }),
        {
          attempts: 10,
          interval: 500,
        },
      )

      setMessage(`- Successfully minted ${quantity} -`)

      if (receipt.status !== 'success') throw Error('Transaction failed')
    },
    onSuccess() {
      refetch()
      queryClient.invalidateQueries({
        queryKey: [EDITION_V1],
      })
    },
  })

  return (
    <div key={schedule.minterAddress + schedule.mintId} className="flex flex-col gap-5">
      <p>{schedule.mintType}</p>
      <p>Total Minted: {schedule.totalMinted}</p>

      {message ? <Text>{message}</Text> : null}

      {error ? <Text className="w-[200px] whitespace-pre">Error: {error.message}</Text> : null}

      {isPending ? <Spinner /> : null}

      <Box className="flex flex-row gap-2">
        <Text>Quantity</Text>
        <TextFieldInput
          min={1}
          value={quantityInput}
          type="number"
          onChange={(ev) => setQuantity(ev.target.valueAsNumber)}
        />
      </Box>

      {mintParameters?.mint.type === 'mint' && <Text>Price {formatEther(mintParameters.mint.input.value)} ETH</Text>}

      {mintParameters?.mint.type === 'mint' && mintParameters.mint.gasEstimate == null && (
        <Text>Purchase could fail due to missing funds</Text>
      )}

      {mintParameters?.mint.type === 'not-eligible' && <Text>Wallet is not eligible for purchase</Text>}

      <Button
        variant="classic"
        disabled={mintParameters?.mint.type !== 'mint' || isPending}
        className="cursor-pointer"
        type="button"
        onClick={() => mutate()}
      >
        Mint
      </Button>
    </div>
  )
}

export default function EditionV1Fixed() {
  const { data: { isSoundEditionV1 } = {} } = useEditionVersion({
    contractAddress,
  })
  const { data: soundEditionInfo } = useQuery({
    queryKey: [EDITION_V1, 'info', contractAddress],
    enabled: isSoundEditionV1,
    queryFn() {
      return publicClient.editionV1.info({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: { schedules: soundEditionSchedules } = {} } = useQuery({
    queryKey: [EDITION_V1, 'schedules', contractAddress],
    enabled: isSoundEditionV1,
    queryFn() {
      return publicClient.editionV1.mintSchedules({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: soundEditionApi } = useQuery({
    queryKey: [EDITION_V1, 'api', contractAddress],
    queryFn() {
      return soundApi.editionRelease({
        contractAddress,
      })
    },
  })

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-5">
      <WalletPrivateKeyInput />

      <p>{contractAddress}</p>

      {!soundEditionInfo || !soundEditionApi?.data ? (
        <Spinner />
      ) : (
        <>
          <p>{soundEditionInfo.name}</p>

          <Link href={soundEditionApi.data.webappUri} target="_blank">
            {soundEditionApi.data.webappUri}
          </Link>

          <div className="w-[600px]">
            <Embed embedUri={soundEditionApi.data.webEmbed} />
          </div>

          <Text>Cover Image</Text>
          <img className="w-[100px]" src={soundEditionApi.data.coverImage.url} alt="Cover Image" />

          <Text>Golden Egg</Text>
          <img className="w-[100px]" src={soundEditionApi.data.goldenEggImage.url} alt="Egg Game Image" />

          {soundEditionSchedules?.map((schedule) => {
            return <EditionSchedule key={schedule.minterAddress + schedule.mintId} schedule={schedule} />
          })}
        </>
      )}
    </main>
  )
}
