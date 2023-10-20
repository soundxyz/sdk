'use client'

import { Embed } from '@/components/iframe'
import { Spinner } from '@/components/spinner'
import { WalletPrivateKeyInput } from '@/components/walletInput'
import { soundApi } from '@/context/sound'
import { publicClient } from '@/context/wagmi'
import { useEditionVersion } from '@/hooks/edition'
import { Link } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'

const contractAddress = '0xdbf9b088be61ab28820cd1d74592f78f5b8624fa'

export default function EditionV2Fixed() {
  const { data: { isSoundEditionV2 } = {} } = useEditionVersion({
    contractAddress,
  })
  const { data: soundEditionInfo } = useQuery({
    queryKey: ['edition-v2-info', contractAddress],
    enabled: isSoundEditionV2,
    queryFn() {
      return publicClient.editionV2.info({
        edition: contractAddress,
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
