'use client'

import { Embed } from '@/components/iframe'
import { Spinner } from '@/components/spinner'
import { WalletPrivateKeyInput } from '@/components/walletInput'
import { soundApi } from '@/context/sound'
import { publicClient } from '@/context/wagmi'
import { useEditionVersion } from '@/hooks/edition'
import { Link } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'

const contractAddress = '0x946bba3ab4fa3931850390df93a070295c78e433'

export default function EditionV1Fixed() {
  const { data: { isSoundEditionV1 } = {} } = useEditionVersion({
    contractAddress,
  })
  const { data: soundEditionInfo } = useQuery({
    queryKey: ['edition-v1-info', contractAddress],
    enabled: isSoundEditionV1,
    queryFn() {
      return publicClient.editionV1.getEditionInfo({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: soundEditionApi } = useQuery({
    queryKey: ['edition-api', contractAddress],
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
        </>
      )}
    </main>
  )
}
