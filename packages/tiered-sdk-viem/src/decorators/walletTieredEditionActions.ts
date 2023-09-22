import type { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import {
  writeCreateTieredEdition,
  type WriteCreateTieredEditionParameters,
} from '../actions/wallet/writeCreateTieredEdition'

export type WalletTieredEditionActions = {
  writeCreateTieredEdition: (args: WriteCreateTieredEditionParameters) => Promise<WriteContractReturnType>
  WriteMintTieredEdition: (args: WriteCreateTieredEditionParameters) => Promise<WriteContractReturnType>
}

export function walletTieredEditionActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
>(client: WalletClient<TTransport, TChain, TAccount>): WalletTieredEditionActions {
  return {
    writeCreateTieredEdition: (args) => writeCreateTieredEdition(client, args),
    WriteMintTieredEdition: (args) => writeCreateTieredEdition(client, args),
  }
}
