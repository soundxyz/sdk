/* eslint-disable @next/next/no-img-element */

'use client'

import { Embed } from '@/components/iframe'
import { Spinner } from '@/components/spinner'
import { WalletPrivateKeyInput } from '@/components/walletInput'
import { soundApi } from '@/context/sound'
import { publicClient } from '@/context/wagmi'
import { useWallet } from '@/context/wallet'
import { useEditionVersion } from '@/hooks/edition'
import { Box, Link, Text, TextFieldInput } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { formatEther } from 'viem'

export const contractAddress = '0x0638741d244b7896a6527bd79a699335aa81831d'

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

  const [quantity, setQuantity] = useState(1)

  const quantityNumber = Number.isSafeInteger(quantity) && quantity > 0 ? quantity : null

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
        })
        .then((v) => v.data)
    },
  })

  const { data: sellPrice } = useQuery({
    queryKey: [EDITION_V1, 'sam-sell-price', contractAddress, samAddress, quantityNumber],
    queryFn() {
      if (!wallet || !samAddress || !quantityNumber) return null

      return publicClient.editionV1.sam.sell.sellPrice({
        editionAddress: contractAddress,
        samAddress,
      })({
        offset: 1000,
        quantity: quantityNumber,
      })
    },
  })

  const { data: buyPrice } = useQuery({
    queryKey: [EDITION_V1, 'sam-buy-price', contractAddress, samAddress, quantityNumber],
    queryFn() {
      if (!wallet || !samAddress || !quantityNumber) return null

      return publicClient.editionV1.sam.buy
        .buyPrice({
          editionAddress: contractAddress,
          samAddress,
        })({
          offset: 1000,
          quantity: quantityNumber,
        })
        .then((v) => v.total)
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

          <Text>Supply: {samInfo.supply}</Text>

          {ownedTokens && <Text>Owned Tokens: {ownedTokens.join()}</Text>}

          <Box className="flex flex-row gap-2">
            <Text>Quantity</Text>
            <TextFieldInput value={quantity} type="number" onChange={(ev) => setQuantity(ev.target.valueAsNumber)} />
          </Box>

          {buyPrice != null ? <Text>Buy Price: {Number(formatEther(buyPrice)).toPrecision(5)} ETH</Text> : null}

          {sellPrice != null ? <Text>Sell Price: {Number(formatEther(sellPrice)).toPrecision(5)} ETH</Text> : null}
        </>
      )}
    </main>
  )
}
