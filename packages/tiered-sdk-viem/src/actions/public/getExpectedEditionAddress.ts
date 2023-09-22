import type { Address, Chain, Hex, PublicClient, Transport } from 'viem'
import { soundCreatorV1Abi } from '../../abi/sound-creator-v1'
import { getSaltAsBytes32 } from '../../utils/helpers'

export type GetExpectedEditionAddressParams = {
  creatorAddress: Address
  deployer: Address
  salt?: string | number
}

export type GetExpectedEditionAddressReturnType = {
  formattedSalt: Hex
  editionAddress: Address
  exists: boolean
}

export async function getExpectedEditionAddress<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { deployer, salt: customSalt, creatorAddress }: GetExpectedEditionAddressParams,
): Promise<GetExpectedEditionAddressReturnType> {
  const formattedSalt = getSaltAsBytes32(customSalt || Math.random() * 1_000_000_000_000_000)

  const [editionAddress, exists] = await client.readContract({
    abi: soundCreatorV1Abi,
    address: creatorAddress,
    functionName: 'soundEditionAddress',
    args: [deployer, formattedSalt],
  })

  return {
    formattedSalt,
    editionAddress,
    exists,
  }
}
