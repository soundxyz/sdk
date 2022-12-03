export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: string
  BigInt: string
  Bytes: string
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

export type Minter = {
  /**
   * Address of the minter.
   *
   */
  address: Scalars['Bytes']
  /**
   * The affiliate fee in basis points.
   *
   */
  affiliateFeeBPS: Scalars['Int']
  /**
   * Song edition mint config is associated with.
   *
   */
  edition: Song
  /**
   * End timestamp of sale (in seconds since unix epoch).
   *
   */
  endTime: Scalars['Int']
  id: Scalars['ID']
  /**
   * Mint ID associated with the minter.
   *
   */
  mintId: Scalars['BigInt']
  /**
   * Sale price in ETH for minting a single token.
   *
   */
  price: Scalars['BigInt']
  /**
   * Start timestamp of sale (in seconds since unix epoch).
   *
   */
  startTime: Scalars['Int']
}

export type Minter_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  affiliateFeeBPS?: InputMaybe<Scalars['Int']>
  affiliateFeeBPS_gt?: InputMaybe<Scalars['Int']>
  affiliateFeeBPS_gte?: InputMaybe<Scalars['Int']>
  affiliateFeeBPS_in?: InputMaybe<Array<Scalars['Int']>>
  affiliateFeeBPS_lt?: InputMaybe<Scalars['Int']>
  affiliateFeeBPS_lte?: InputMaybe<Scalars['Int']>
  affiliateFeeBPS_not?: InputMaybe<Scalars['Int']>
  affiliateFeeBPS_not_in?: InputMaybe<Array<Scalars['Int']>>
  edition?: InputMaybe<Scalars['String']>
  edition_?: InputMaybe<Song_filter>
  edition_contains?: InputMaybe<Scalars['String']>
  edition_contains_nocase?: InputMaybe<Scalars['String']>
  edition_ends_with?: InputMaybe<Scalars['String']>
  edition_ends_with_nocase?: InputMaybe<Scalars['String']>
  edition_gt?: InputMaybe<Scalars['String']>
  edition_gte?: InputMaybe<Scalars['String']>
  edition_in?: InputMaybe<Array<Scalars['String']>>
  edition_lt?: InputMaybe<Scalars['String']>
  edition_lte?: InputMaybe<Scalars['String']>
  edition_not?: InputMaybe<Scalars['String']>
  edition_not_contains?: InputMaybe<Scalars['String']>
  edition_not_contains_nocase?: InputMaybe<Scalars['String']>
  edition_not_ends_with?: InputMaybe<Scalars['String']>
  edition_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  edition_not_in?: InputMaybe<Array<Scalars['String']>>
  edition_not_starts_with?: InputMaybe<Scalars['String']>
  edition_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  edition_starts_with?: InputMaybe<Scalars['String']>
  edition_starts_with_nocase?: InputMaybe<Scalars['String']>
  endTime?: InputMaybe<Scalars['Int']>
  endTime_gt?: InputMaybe<Scalars['Int']>
  endTime_gte?: InputMaybe<Scalars['Int']>
  endTime_in?: InputMaybe<Array<Scalars['Int']>>
  endTime_lt?: InputMaybe<Scalars['Int']>
  endTime_lte?: InputMaybe<Scalars['Int']>
  endTime_not?: InputMaybe<Scalars['Int']>
  endTime_not_in?: InputMaybe<Array<Scalars['Int']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  mintId?: InputMaybe<Scalars['BigInt']>
  mintId_gt?: InputMaybe<Scalars['BigInt']>
  mintId_gte?: InputMaybe<Scalars['BigInt']>
  mintId_in?: InputMaybe<Array<Scalars['BigInt']>>
  mintId_lt?: InputMaybe<Scalars['BigInt']>
  mintId_lte?: InputMaybe<Scalars['BigInt']>
  mintId_not?: InputMaybe<Scalars['BigInt']>
  mintId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  price?: InputMaybe<Scalars['BigInt']>
  price_gt?: InputMaybe<Scalars['BigInt']>
  price_gte?: InputMaybe<Scalars['BigInt']>
  price_in?: InputMaybe<Array<Scalars['BigInt']>>
  price_lt?: InputMaybe<Scalars['BigInt']>
  price_lte?: InputMaybe<Scalars['BigInt']>
  price_not?: InputMaybe<Scalars['BigInt']>
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  startTime?: InputMaybe<Scalars['Int']>
  startTime_gt?: InputMaybe<Scalars['Int']>
  startTime_gte?: InputMaybe<Scalars['Int']>
  startTime_in?: InputMaybe<Array<Scalars['Int']>>
  startTime_lt?: InputMaybe<Scalars['Int']>
  startTime_lte?: InputMaybe<Scalars['Int']>
  startTime_not?: InputMaybe<Scalars['Int']>
  startTime_not_in?: InputMaybe<Array<Scalars['Int']>>
}

export const Minter_orderBy = {
  address: 'address',
  affiliateFeeBPS: 'affiliateFeeBPS',
  edition: 'edition',
  endTime: 'endTime',
  id: 'id',
  mintId: 'mintId',
  price: 'price',
  startTime: 'startTime',
} as const

export type Minter_orderBy = typeof Minter_orderBy[keyof typeof Minter_orderBy]
/** Defines the order direction, either ascending or descending */
export const OrderDirection = {
  asc: 'asc',
  desc: 'desc',
} as const

export type OrderDirection = typeof OrderDirection[keyof typeof OrderDirection]
export type Query = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  minter?: Maybe<Minter>
  minters: Array<Minter>
  searchSongs: Array<Song>
  song?: Maybe<Song>
  songs: Array<Song>
}

export type Query_metaArgs = {
  block?: InputMaybe<Block_height>
}

export type QueryminterArgs = {
  block?: InputMaybe<Block_height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerymintersArgs = {
  block?: InputMaybe<Block_height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Minter_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Minter_filter>
}

export type QuerysearchSongsArgs = {
  block?: InputMaybe<Block_height>
  first?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  text: Scalars['String']
}

export type QuerysongArgs = {
  block?: InputMaybe<Block_height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerysongsArgs = {
  block?: InputMaybe<Block_height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Song_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Song_filter>
}

export type Song = {
  /**
   * Address of the song.
   *
   */
  address: Scalars['Bytes']
  /**
   * Base URI for the tokenId.
   *
   */
  baseURI: Scalars['String']
  /**
   * Contract URI for OpenSea storefront.
   *
   */
  contractURI: Scalars['String']
  /**
   * Address that receives primary and secondary royalties.
   *
   */
  fundingRecipient: Scalars['Bytes']
  id: Scalars['ID']
  /**
   * Address of metadata module.
   *
   */
  metadataModule?: Maybe<Scalars['Bytes']>
  /**
   * Minters associated with the song.
   *
   */
  minters?: Maybe<Array<Minter>>
  /**
   * Name of the collection.
   *
   */
  name: Scalars['String']
  /**
   * Deployer of the contract.
   *
   */
  owner: Scalars['Bytes']
  /**
   * The royalty BPS (basis points).
   *
   */
  royaltyBPS: Scalars['Int']
  /**
   * Symbol of the collection.
   *
   */
  symbol: Scalars['String']
}

export type SongmintersArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Minter_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Minter_filter>
}

export type Song_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  baseURI?: InputMaybe<Scalars['String']>
  baseURI_contains?: InputMaybe<Scalars['String']>
  baseURI_contains_nocase?: InputMaybe<Scalars['String']>
  baseURI_ends_with?: InputMaybe<Scalars['String']>
  baseURI_ends_with_nocase?: InputMaybe<Scalars['String']>
  baseURI_gt?: InputMaybe<Scalars['String']>
  baseURI_gte?: InputMaybe<Scalars['String']>
  baseURI_in?: InputMaybe<Array<Scalars['String']>>
  baseURI_lt?: InputMaybe<Scalars['String']>
  baseURI_lte?: InputMaybe<Scalars['String']>
  baseURI_not?: InputMaybe<Scalars['String']>
  baseURI_not_contains?: InputMaybe<Scalars['String']>
  baseURI_not_contains_nocase?: InputMaybe<Scalars['String']>
  baseURI_not_ends_with?: InputMaybe<Scalars['String']>
  baseURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  baseURI_not_in?: InputMaybe<Array<Scalars['String']>>
  baseURI_not_starts_with?: InputMaybe<Scalars['String']>
  baseURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  baseURI_starts_with?: InputMaybe<Scalars['String']>
  baseURI_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractURI?: InputMaybe<Scalars['String']>
  contractURI_contains?: InputMaybe<Scalars['String']>
  contractURI_contains_nocase?: InputMaybe<Scalars['String']>
  contractURI_ends_with?: InputMaybe<Scalars['String']>
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_gt?: InputMaybe<Scalars['String']>
  contractURI_gte?: InputMaybe<Scalars['String']>
  contractURI_in?: InputMaybe<Array<Scalars['String']>>
  contractURI_lt?: InputMaybe<Scalars['String']>
  contractURI_lte?: InputMaybe<Scalars['String']>
  contractURI_not?: InputMaybe<Scalars['String']>
  contractURI_not_contains?: InputMaybe<Scalars['String']>
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']>
  contractURI_not_ends_with?: InputMaybe<Scalars['String']>
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_not_in?: InputMaybe<Array<Scalars['String']>>
  contractURI_not_starts_with?: InputMaybe<Scalars['String']>
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_starts_with?: InputMaybe<Scalars['String']>
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']>
  fundingRecipient?: InputMaybe<Scalars['Bytes']>
  fundingRecipient_contains?: InputMaybe<Scalars['Bytes']>
  fundingRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>
  fundingRecipient_not?: InputMaybe<Scalars['Bytes']>
  fundingRecipient_not_contains?: InputMaybe<Scalars['Bytes']>
  fundingRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  metadataModule?: InputMaybe<Scalars['Bytes']>
  metadataModule_contains?: InputMaybe<Scalars['Bytes']>
  metadataModule_in?: InputMaybe<Array<Scalars['Bytes']>>
  metadataModule_not?: InputMaybe<Scalars['Bytes']>
  metadataModule_not_contains?: InputMaybe<Scalars['Bytes']>
  metadataModule_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  minters_?: InputMaybe<Minter_filter>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  owner?: InputMaybe<Scalars['Bytes']>
  owner_contains?: InputMaybe<Scalars['Bytes']>
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>
  owner_not?: InputMaybe<Scalars['Bytes']>
  owner_not_contains?: InputMaybe<Scalars['Bytes']>
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  royaltyBPS?: InputMaybe<Scalars['Int']>
  royaltyBPS_gt?: InputMaybe<Scalars['Int']>
  royaltyBPS_gte?: InputMaybe<Scalars['Int']>
  royaltyBPS_in?: InputMaybe<Array<Scalars['Int']>>
  royaltyBPS_lt?: InputMaybe<Scalars['Int']>
  royaltyBPS_lte?: InputMaybe<Scalars['Int']>
  royaltyBPS_not?: InputMaybe<Scalars['Int']>
  royaltyBPS_not_in?: InputMaybe<Array<Scalars['Int']>>
  symbol?: InputMaybe<Scalars['String']>
  symbol_contains?: InputMaybe<Scalars['String']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_ends_with?: InputMaybe<Scalars['String']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_gt?: InputMaybe<Scalars['String']>
  symbol_gte?: InputMaybe<Scalars['String']>
  symbol_in?: InputMaybe<Array<Scalars['String']>>
  symbol_lt?: InputMaybe<Scalars['String']>
  symbol_lte?: InputMaybe<Scalars['String']>
  symbol_not?: InputMaybe<Scalars['String']>
  symbol_not_contains?: InputMaybe<Scalars['String']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  symbol_starts_with?: InputMaybe<Scalars['String']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export const Song_orderBy = {
  address: 'address',
  baseURI: 'baseURI',
  contractURI: 'contractURI',
  fundingRecipient: 'fundingRecipient',
  id: 'id',
  metadataModule: 'metadataModule',
  minters: 'minters',
  name: 'name',
  owner: 'owner',
  royaltyBPS: 'royaltyBPS',
  symbol: 'symbol',
} as const

export type Song_orderBy = typeof Song_orderBy[keyof typeof Song_orderBy]
export type Subscription = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  minter?: Maybe<Minter>
  minters: Array<Minter>
  song?: Maybe<Song>
  songs: Array<Song>
}

export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>
}

export type SubscriptionminterArgs = {
  block?: InputMaybe<Block_height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionmintersArgs = {
  block?: InputMaybe<Block_height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Minter_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Minter_filter>
}

export type SubscriptionsongArgs = {
  block?: InputMaybe<Block_height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionsongsArgs = {
  block?: InputMaybe<Block_height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Song_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Song_filter>
}

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export const _SubgraphErrorPolicy_ = {
  /** Data will be returned even if the subgraph has indexing errors */
  allow: 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny: 'deny',
} as const

export type _SubgraphErrorPolicy_ = typeof _SubgraphErrorPolicy_[keyof typeof _SubgraphErrorPolicy_]
export type MintersQueryVariables = Exact<{
  editionAddress: Scalars['Bytes']
}>

export type MintersQuery = {
  songs: Array<{ id: string; address: string; minters?: Array<{ id: string; mintId: string; address: string }> | null }>
}

export const Minters = `query Minters($editionAddress:Bytes!){songs(where:{address:$editionAddress}){id address minters{id mintId address}}}`
