import type { WalletClient } from 'viem'
import type { SamBuyContractInput, SamSellContractInput } from '../read/sam'

export function SamBuy<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  { input }: SamBuyContractInput,
) {
  return client.writeContract(input)
}

export function SamSell<Client extends Pick<WalletClient, 'writeContract'>>(
  client: Client,
  { input }: SamSellContractInput,
) {
  return client.writeContract(input)
}
