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
import { retryAsync } from '@soundxyz/sdk/utils/helpers'
import { useMutation, useQuery } from '@tanstack/react-query'
import assert from 'assert'
import { useState } from 'react'
import { formatEther } from 'viem'

const contractAddress = '0x0638741d244b7896a6527bd79a699335aa81831d'

const EDITION_V1 = 'edition-v1'

export default function EditionV1SAM() {
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

  const { data: samAddress } = useQuery({
    queryKey: [EDITION_V1, 'sam-address', contractAddress],
    enabled: isSoundEditionV1,
    queryFn() {
      return publicClient.editionV1.sam.samAddress({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: samInfo } = useQuery({
    queryKey: [EDITION_V1, 'sam-info', samAddress, contractAddress],
    queryFn() {
      if (!samAddress) return null

      return publicClient.editionV1.sam.info({
        editionAddress: contractAddress,
        samAddress,
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

  const { wallet } = useWallet()

  const [quantityInput, setQuantity] = useState(1)

  const quantity = Number.isSafeInteger(quantityInput) && quantityInput > 0 ? quantityInput : null

  const { data: ownedTokens } = useQuery({
    queryKey: [EDITION_V1, 'owned-tokens', contractAddress, wallet?.account.address],
    queryFn() {
      if (!wallet) return null

      return soundApi
        .editionOwnedTokenIds({
          editionContractAddress: contractAddress,
          ownerPublicAddress: wallet.account.address,
          sort: {
            serialNumber: 'DESC',
          },
          filter: {
            includeGoldenEgg: false,
          },
        })
        .then((v) => v.data)
    },
    refetchInterval: 1000,
  })

  const samInfoSupply = samInfo?.supply
  const ownedTokensLength = ownedTokens?.length

  const { data: sellPrice } = useQuery({
    queryKey: [EDITION_V1, 'sam-sell-price', contractAddress, samAddress, quantity, ownedTokensLength, samInfoSupply],
    queryFn() {
      if (
        !wallet ||
        !samAddress ||
        !ownedTokensLength ||
        !quantity ||
        ownedTokensLength < quantity ||
        !samInfoSupply ||
        samInfoSupply < quantity
      ) {
        return null
      }

      return publicClient.editionV1.sam.sellPrice({
        editionAddress: contractAddress,
        samAddress,
        offset: 0,
        quantity,
      })
    },
  })

  const { data: buyPrice } = useQuery({
    queryKey: [EDITION_V1, 'sam-buy-price', contractAddress, samAddress, quantity],
    queryFn() {
      if (!samAddress || !quantity) return null

      return publicClient.editionV1.sam
        .buyPrice({
          editionAddress: contractAddress,
          samAddress,
          offset: 0,
          quantity,
        })
        .then((v) => v.total)
    },
  })

  const [message, setMessage] = useState('')

  const { data: samBuyParams } = useQuery({
    queryKey: [EDITION_V1, 'sam-buy', contractAddress, samAddress, buyPrice?.toString()],
    queryFn() {
      if (!wallet || !samAddress || !buyPrice || !quantity) return null

      return publicClient.editionV1.sam.buyParameters({
        editionAddress: contractAddress,
        samAddress,

        account: wallet.account,
        chain: wallet.walletClient.chain,
        maxTotalValue: buyPrice,
        mintTo: wallet.account.address,
        quantity,
      })
    },
  })

  const { mutate: samBuy, isPending: samBuyIsPending } = useMutation({
    async mutationFn() {
      assert(samBuyParams?.type === 'mint' && wallet && quantity)

      setMessage(`Buying ${quantity}...`)

      const hash = await wallet.walletClient.editionV1.sam.buy(samBuyParams)

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
      queryClient.invalidateQueries({
        queryKey: [EDITION_V1],
      })
    },
  })

  const tokenIdsToSell = quantity ? ownedTokens?.slice(0, quantity) : null

  const { data: samSellParams } = useQuery({
    queryKey: [EDITION_V1, 'sam-sell', contractAddress, samAddress, quantity, sellPrice?.toString(), tokenIdsToSell],
    queryFn() {
      if (!wallet || !samAddress || !sellPrice || !quantity || !tokenIdsToSell || tokenIdsToSell.length !== quantity)
        return null

      return publicClient.editionV1.sam.sellParameters({
        editionAddress: contractAddress,
        samAddress,

        account: wallet.account,
        chain: wallet.walletClient.chain,

        minimumPayout: sellPrice,
        tokenIds: tokenIdsToSell,
      })
    },
  })

  const { mutate: samSell, isPending: samSellIsPending } = useMutation({
    async mutationFn() {
      assert(samSellParams?.type === 'available' && wallet && quantity)

      setMessage(`Selling ${quantity}...`)

      const hash = await wallet.walletClient.editionV1.sam.sell(samSellParams)

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

      setMessage(`- Successfully sold ${quantity} -`)

      if (receipt.status !== 'success') throw Error('Transaction failed')
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [EDITION_V1],
      })
    },
  })

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-5">
      <WalletPrivateKeyInput />

      <p>{contractAddress}</p>

      {!soundEditionInfo || !soundEditionApi?.data || !samAddress || !samInfo ? (
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
          <Text>Sam Address</Text>
          <Text>{samAddress}</Text>
          <Text>SAM Supply: {samInfo.supply}</Text>
          {ownedTokens && <Text>Owned Tokens: {ownedTokens.join()}</Text>}

          {message ? <Text>{message}</Text> : null}

          <Box className="flex flex-row gap-2">
            <Text>Quantity</Text>
            <TextFieldInput
              min={1}
              value={quantityInput}
              type="number"
              onChange={(ev) => setQuantity(ev.target.valueAsNumber)}
            />
          </Box>
          <Text>Buy Price: {buyPrice ? Number(formatEther(buyPrice)).toPrecision(5) : '...'} ETH</Text>
          <Button
            className="!cursor-pointer"
            disabled={samBuyParams?.type !== 'mint' || samBuyIsPending}
            onClick={() => samBuy()}
          >
            Buy
          </Button>
          <Text>Sell Price: {sellPrice ? Number(formatEther(sellPrice)).toPrecision(5) : '...'} ETH</Text>

          <Button
            className="!cursor-pointer"
            disabled={samSellParams?.type !== 'available' || samSellIsPending}
            onClick={() => samSell()}
          >
            Sell
          </Button>
        </>
      )}
    </main>
  )
}
