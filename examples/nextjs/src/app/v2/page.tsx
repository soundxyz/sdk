/* eslint-disable @next/next/no-img-element */
'use client'

import { Embed } from '@/components/iframe'
import { Spinner } from '@/components/spinner'
import { WalletPrivateKeyInput } from '@/components/walletInput'
import { queryClient } from '@/context/reactQuery'
import { soundApi } from '@/context/sound'
import { publicClient } from '@/context/wagmi'
import { useWallet } from '@/context/wallet'
import { useEditionVersion } from '@/hooks/edition'
import { Box, Button, Link, Text, TextFieldInput } from '@radix-ui/themes'
import type { SuperMinterSchedule } from '@soundxyz/sdk/contract/edition-v2/read/info'
import { retryAsync } from '@soundxyz/sdk/utils/helpers'
import { useMutation, useQuery } from '@tanstack/react-query'
import assert from 'assert'
import { useState } from 'react'
import { formatEther } from 'viem'

const contractAddress = '0xdbf9b088be61ab28820cd1d74592f78f5b8624fa'

const EDITION_V2 = 'edition-v2'

function EditionSchedule({ schedule }: { schedule: SuperMinterSchedule }) {
  const { wallet } = useWallet()

  const [quantityInput, setQuantity] = useState(1)

  const quantity = Number.isSafeInteger(quantityInput) && quantityInput > 0 ? quantityInput : null

  const [message, setMessage] = useState('')

  const { data: mintParameters, refetch } = useQuery({
    queryKey: [EDITION_V2, 'mint-params', schedule.tier, schedule.scheduleNum, wallet?.account.address, quantity],
    queryFn() {
      if (!wallet || !quantity) return null

      return publicClient.editionV2.mintParameters({
        account: wallet.account,
        chain: wallet.walletClient.chain,
        schedule,
        quantity,
        editionAddress: contractAddress,
        mintTo: wallet.account.address,
      })
    },
  })

  const {
    mutate: mint,
    isPending: isPendingMint,
    error,
  } = useMutation({
    async mutationFn() {
      assert(wallet && quantity)

      assert(mintParameters?.mint.type === 'mint')

      setMessage('Minting...')

      const hash = await wallet.walletClient.editionV2.mint(mintParameters.mint)

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
        queryKey: [EDITION_V2],
      })
    },
  })

  const apiInfo = useApiInfo()

  const coverImage =
    (schedule.tier === 0
      ? apiInfo?.data?.gaCoverImage?.url
      : schedule.tier === 1
      ? apiInfo?.data?.vipCoverImage?.url
      : null) ?? apiInfo?.data?.coverImage.url

  return (
    <div key={schedule.scheduleNum.toString() + schedule.tier.toString()} className="flex flex-col gap-5">
      <h2>
        {schedule.mode === 'VERIFY_MERKLE'
          ? 'Presale Limited Edition'
          : schedule.tier === 0
          ? 'Forever Edition'
          : 'Limited Edition'}
      </h2>

      {coverImage ? <img className="w-[100px]" src={coverImage} alt="Cover Image" /> : null}

      {message ? <Text>{message}</Text> : null}

      {error ? <Text className="w-[200px] whitespace-pre">Error: {error.message}</Text> : null}

      {isPendingMint ? <Spinner /> : null}

      <p>Total Minted: {schedule.minted}</p>

      <Box className="flex flex-row gap-2">
        <Text>Quantity</Text>
        <TextFieldInput
          min={1}
          value={quantityInput}
          type="number"
          onChange={(ev) => setQuantity(ev.target.valueAsNumber)}
        />
      </Box>

      {mintParameters?.mint.type === 'mint' && <Text>Price: {formatEther(mintParameters.mint.input.value)} ETH</Text>}

      {mintParameters?.mint.type === 'mint' && mintParameters.mint.gasEstimate == null && (
        <Text>Purchase could fail due to missing funds</Text>
      )}

      {mintParameters?.mint.type === 'not-eligible' && <Text>Wallet is not eligible for purchase</Text>}

      <Button
        variant="classic"
        disabled={mintParameters?.mint.type !== 'mint' || isPendingMint}
        className="cursor-pointer"
        type="button"
        onClick={() => mint()}
      >
        Mint
      </Button>
    </div>
  )
}

function useApiInfo() {
  const { data: soundEditionApi } = useQuery({
    queryKey: [EDITION_V2, 'api', contractAddress],
    queryFn() {
      return soundApi.editionRelease({
        contractAddress,
      })
    },
  })

  return soundEditionApi
}

export default function EditionV2Fixed() {
  const { data: { isSoundEditionV2 } = {} } = useEditionVersion({
    contractAddress,
  })
  const { data: soundEditionInfo } = useQuery({
    queryKey: [EDITION_V2, 'info', contractAddress],
    enabled: isSoundEditionV2,
    queryFn() {
      return publicClient.editionV2.info({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: soundEditionApi } = useQuery({
    queryKey: [EDITION_V2, 'api', contractAddress],
    queryFn() {
      return soundApi.editionRelease({
        contractAddress,
      })
    },
  })

  const { data: { schedules: soundEditionSchedules } = {} } = useQuery({
    queryKey: [EDITION_V2, 'schedules', contractAddress],
    enabled: isSoundEditionV2,
    queryFn() {
      return publicClient.editionV2.mintSchedules({
        editionAddress: contractAddress,
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

          <Text>Golden Egg</Text>
          <img className="w-[100px]" src={soundEditionApi.data.goldenEggImage.url} alt="Egg Game Image" />

          {soundEditionSchedules?.map((schedule) => {
            return (
              <EditionSchedule key={schedule.scheduleNum.toString() + schedule.tier.toString()} schedule={schedule} />
            )
          })}
        </>
      )}
    </main>
  )
}
