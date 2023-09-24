import type { Address, Chain, Hex, PublicClient, Transport } from 'viem'
import { SOUND_CREATOR_V2_ABI, SOUND_CREATOR_V2_ADDRESS } from '../../abi/sound-creator-v2'
import { SOUND_EDITION_V2_IMPLEMENTATION_ADDRESS } from '../../abi/sound-edition-v2'
import { getSaltAsBytes32 } from '../../utils/helpers'

export type GetExpectedEditionAddressParams = {
  deployer: Address
  salt?: string | number
}

export type GetExpectedEditionAddressReturnType = {
  formattedSalt: Hex
  edition: Address
  exists: boolean
}

export async function getExpectedEditionAddress<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { deployer, salt: customSalt }: GetExpectedEditionAddressParams,
): Promise<GetExpectedEditionAddressReturnType> {
  const formattedSalt = getSaltAsBytes32(customSalt || Math.random() * 1_000_000_000_000_000)

  const [edition, exists] = await client.readContract({
    abi: SOUND_CREATOR_V2_ABI,
    address: SOUND_CREATOR_V2_ADDRESS,
    functionName: 'soundEditionAddress',
    args: [SOUND_EDITION_V2_IMPLEMENTATION_ADDRESS, deployer, formattedSalt],
  })

  return {
    formattedSalt,
    edition,
    exists,
  }
}
