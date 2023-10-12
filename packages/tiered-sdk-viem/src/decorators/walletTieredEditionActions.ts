import type { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import {
  writeCreateTieredEdition,
  type WriteCreateTieredEditionParameters,
} from '../actions/wallet/writeCreateTieredEdition'
import { writeMintTieredEdition, type WriteMintTieredEditionParameters } from '../actions/wallet/writeMintTieredEdition'

export type WalletTieredEditionActions = {
  writeCreateTieredEdition: (args: WriteCreateTieredEditionParameters) => Promise<WriteContractReturnType>
  writeMintTieredEdition: (args: WriteMintTieredEditionParameters) => Promise<WriteContractReturnType>
}

export function walletTieredEditionActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
>(client: WalletClient<TTransport, TChain, TAccount>): WalletTieredEditionActions {
  return {
    writeCreateTieredEdition: (args) => writeCreateTieredEdition(client, args),
    writeMintTieredEdition: (args) => writeMintTieredEdition(client, args),
  }
}
