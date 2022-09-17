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
  /** Ethereum address */
  Address: string
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number
  /** Integers that will have a value greater than 0. */
  PositiveInt: number
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: number
  /** UUID v4 */
  UUID: string
  /** Represents NULL values */
  Void: null
}

/** Artist Entity */
export type Artist = Node & {
  /** Artist contract address (public address) */
  artistContractAddress?: Maybe<Scalars['String']>
  /** Banner image of artist page */
  bannerImage?: Maybe<Media>
  /** Paginated collectors of artist. */
  collectors: ArtistCollectorConnection
  /** Contract artist id (acumulative unique id) */
  contractArtistId?: Maybe<Scalars['String']>
  /** Creation date of artist entity */
  createdAt: Scalars['DateTime']
  /** Gem Collection URL */
  gemCollectionUrl?: Maybe<Scalars['String']>
  /** Artist identifier */
  id: Scalars['ID']
  /** Invite limit */
  inviteLimit: Scalars['Int']
  /** Paginated minted releases of artist. */
  mintedReleasesPaginated: ReleaseConnection
  /** Name of artist */
  name?: Maybe<Scalars['String']>
  /** Number of unique nft collectors of artist */
  numCollectors: Scalars['Int']
  /** How many minted releases for artist */
  numMintedReleases: Scalars['Int']
  /** OpenSea Collection URL */
  openseaCollectionUrl?: Maybe<Scalars['String']>
  /** Genres of artist releases, with the most common genres first */
  releasesGenres: Array<Scalars['String']>
  /** Season associated with artist */
  season?: Maybe<Scalars['String']>
  /** Sound handle to be used on URLs */
  soundHandle?: Maybe<Scalars['String']>
  /** Spotify URL */
  spotifyUrl?: Maybe<Scalars['String']>
  /** Token symbol of contract */
  tokenSymbol?: Maybe<Scalars['String']>
  /** User entity of artist */
  user: User
}

/** Artist Entity */
export type ArtistcollectorsArgs = {
  pagination?: CursorConnectionArgs
}

/** Artist Entity */
export type ArtistmintedReleasesPaginatedArgs = {
  filter?: ArtistMintedReleasesFilter
  pagination?: CursorConnectionArgs
}

/** Artist Entity */
export type ArtistnumMintedReleasesArgs = {
  filter?: ArtistMintedReleasesFilter
}

/** ArtistCollector */
export type ArtistCollector = Node & {
  /** Amount of artist nfts owned */
  artistNftsOwned: Scalars['Int']
  /** First artist nft collected by user */
  firstNftCollected?: Maybe<Nft>
  /** Id of first artist nft collected by user */
  id: Scalars['ID']
  /** Collector user */
  user: User
}

/** Paginated connection of Artist Collectors */
export type ArtistCollectorConnection = Connection & {
  /** Edges of current page */
  edges: Array<ArtistCollectorConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Artist Collector Connection */
export type ArtistCollectorConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** ArtistCollector node */
  node: ArtistCollector
}

/** Artist Collectors wrapper entity */
export type ArtistCollectors = {
  /** Artist entity */
  artist: Artist
  /** Nft collectors of artist */
  collectors: UserConnection
}

/** Input for artistCollectors query */
export type ArtistCollectorsInput = {
  /** Artist unique identifier */
  artistId: Scalars['UUID']
  /** Cursor connection paramaters */
  pagination?: UserCursorConnectionArgs
}

/** Paginated connection of Artists */
export type ArtistConnection = Connection & {
  /** Edges of current page */
  edges: Array<ArtistConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Artist Connection */
export type ArtistConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Artist node */
  node: Artist
}

/** Filter for paginated artists */
export type ArtistCursorFilterArgs = {
  /** Specify whether artist already has at least one minted release */
  hasMintedRelease?: InputMaybe<Scalars['Boolean']>
  /** Specify season to be filtered */
  season?: InputMaybe<ArtistSeason>
}

/** Filter artist minted releases based on whether artist uploaded release or artist is credited on a split */
export type ArtistMintedReleasesCursorFilterArgs = {
  /** Includes songs where that artist has a split */
  appearsOn?: Scalars['Boolean']
  /** Includes songs uploaded by artist */
  sounds?: Scalars['Boolean']
}

/** Filter for artist minted releases. Default is only for artist sounds. */
export type ArtistMintedReleasesFilter = {
  /** Includes songs where that artist has a split */
  appearsOn?: Scalars['Boolean']
  /** Filter if the release has credit splits */
  hasCreditSplits?: InputMaybe<Scalars['Boolean']>
  /** Includes songs uploaded by artist */
  sounds?: Scalars['Boolean']
}

/** Types of seasons for artists */
export const ArtistSeason = {
  GENESIS: 'GENESIS',
  SEASON_ONE: 'SEASON_ONE',
  SEASON_THREE: 'SEASON_THREE',
  SEASON_TWO: 'SEASON_TWO',
} as const

export type ArtistSeason = typeof ArtistSeason[keyof typeof ArtistSeason]
/** Chat Channel entity */
export type ChatChannel = {
  /** Association identifier paired with "type" */
  associationId?: Maybe<Scalars['String']>
  /** Can the authenticated user send messages to the channel */
  canSendMessage: Scalars['Boolean']
  /** Date of creation of chat channel */
  createdAt: Scalars['DateTime']
  /** Unique identifier of chat channel */
  id: Scalars['ID']
  /** Members of chat channel */
  members: Array<ChatChannelMember>
  /** Name of chat channel */
  name: Scalars['String']
  /** Type of chat channel */
  type: ChatChannelType
}

/** Chat channel member entity */
export type ChatChannelMember = {
  /** Date of creation of member in chat channel */
  createdAt: Scalars['DateTime']
  /** Unique identifier of Chat Channel Member entity */
  id: Scalars['ID']
  /** Role of member in chat channel */
  role: Scalars['String']
  /** User entity of member */
  user: User
}

/** Chat Channel Type */
export const ChatChannelType = {
  ARTIST: 'ARTIST',
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
  HOMEPAGE: 'HOMEPAGE',
  RELEASE: 'RELEASE',
  UNKNOWN: 'UNKNOWN',
} as const

export type ChatChannelType = typeof ChatChannelType[keyof typeof ChatChannelType]
/** Chat message entity */
export type ChatMessage = Node & {
  /** Shorthand for user's avatar */
  avatar?: Maybe<Media>
  /** Channel identifier */
  channelId: Scalars['ID']
  /** Date of creation of message */
  createdAt: Scalars['DateTime']
  /** Unique identifier */
  id: Scalars['ID']
  /** Is message sent by an artist */
  isArtist: Scalars['Boolean']
  /** Message content */
  message: Scalars['String']
  /** Metadata associated with message */
  meta: Array<Scalars['String']>
  /** Current status of message */
  status: ChatMessageStatus
  /** Message creator user */
  user: User
  /** Message creator user identifier */
  userId: Scalars['ID']
}

/** Pagination chat message edge */
export type ChatMessageConnectionEdge = Edge & {
  /** Pagination cursor */
  cursor: Scalars['String']
  /** Chat message node */
  node: ChatMessage
}

/** Chat message status */
export const ChatMessageStatus = {
  HIDDEN: 'HIDDEN',
  VISIBLE: 'VISIBLE',
} as const

export type ChatMessageStatus = typeof ChatMessageStatus[keyof typeof ChatMessageStatus]
/** Paginated connection of Chat messages */
export type ChatMessagesConnection = Connection & {
  /** Edges of current page */
  edges: Array<ChatMessageConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Simplified version of Release entity filtered on the owner public address */
export type CollectedRelease = Node & {
  /** Artist of release */
  artist: Artist
  /** Contract associated to Sound Edition */
  contract: Contract
  /** Cover image of release */
  coverImage: Media
  /** Release creation date */
  createdAt: Scalars['DateTime']
  /** Associated external url */
  externalUrl?: Maybe<Scalars['String']>
  /** Final quantity for a release. Will be defined once a sale finishes */
  finalQuantity?: Maybe<Scalars['Int']>
  /** Last sale schedule end time as number of milliseconds since the ECMAScript epoch. */
  finalSaleScheduleEndTimestamp?: Maybe<Scalars['Timestamp']>
  /** First backed nft of collected release */
  firstNftOwned?: Maybe<Nft>
  /** Returns golden egg if user owns, otherwise null */
  goldenEgg?: Maybe<EggGame>
  /** Special golden egg image */
  goldenEggImage?: Maybe<Media>
  /** Unique identifier of release */
  id: Scalars['ID']
  /** List of owned nft serial numbers in ascending serial number order */
  ownedSerialNumbers: Array<Scalars['Int']>
  /** Public listening party start time */
  publicListeningPartyStart: Scalars['DateTime']
  /** Lower bound quantity for a releases main sale. */
  quantityLowerBound: Scalars['Int']
  /** Upper bound quantity for a releases main sale. */
  quantityUpperBound: Scalars['Int']
  /** Release title */
  title: Scalars['String']
  /** Release title slug */
  titleSlug: Scalars['String']
  /** Track of release */
  track: Track
  /** Type of Release */
  type: ReleaseType
}

/** Paginated collected releases connection */
export type CollectedReleaseConnection = Connection & {
  /** Edges of current page */
  edges: Array<CollectedReleaseConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Collected Release Connection */
export type CollectedReleaseConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Collected Release node */
  node: CollectedRelease
}

/** Comment entity */
export type Comment = {
  /** Comment unique identifier */
  id: Scalars['ID']
  /** Comment message content */
  message: Scalars['String']
  /** Comment chain signature */
  signature: Scalars['String']
  /** Last update date of comment */
  updatedAt: Scalars['DateTime']
}

/** Base connection for paginated results */
export type Connection = {
  /** Edges of current page */
  edges: Array<Edge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Contract entity */
export type Contract = {
  /** Contract address */
  contractAddress: Scalars['String']
  /** Type of contract */
  contractType: ContractType
  /** Date of creation */
  createdAt: Scalars['DateTime']
  /** Contract entity unique identifier */
  id: Scalars['ID']
  /** Contract owner */
  owner: User
  /** Public address of contract owner */
  ownerPublicAddress: Scalars['String']
  /** Date of last update */
  updatedAt: Scalars['DateTime']
}

/** Contract methods of transactions */
export const ContractMethod = {
  ARTIST_CREATOR__CREATE_ARTIST: 'ARTIST_CREATOR__CREATE_ARTIST',
  ARTIST__BUY_EDITION: 'ARTIST__BUY_EDITION',
  ARTIST__CREATE_EDITION: 'ARTIST__CREATE_EDITION',
  ARTIST__WITHDRAW_FUNDS: 'ARTIST__WITHDRAW_FUNDS',
  SOUND_CREATOR__CREATE_SOUND_AND_MINTS: 'SOUND_CREATOR__CREATE_SOUND_AND_MINTS',
  SOUND_EDITION__WITHDRAW_ETH: 'SOUND_EDITION__WITHDRAW_ETH',
  SPLIT_MAIN__CREATE_SPLIT: 'SPLIT_MAIN__CREATE_SPLIT',
  SPLIT_MAIN__DISTRIBUTE_ETH: 'SPLIT_MAIN__DISTRIBUTE_ETH',
  SPLIT_MAIN__WITHDRAW: 'SPLIT_MAIN__WITHDRAW',
} as const

export type ContractMethod = typeof ContractMethod[keyof typeof ContractMethod]
/** Contract type, currently the playform only supports "ARTIST" */
export const ContractType = {
  ALBUM: 'ALBUM',
  ARTIST: 'ARTIST',
  EDITION: 'EDITION',
} as const

export type ContractType = typeof ContractType[keyof typeof ContractType]
/** Credit allocation entity */
export type CreditAllocation = {
  /** Credit split associated with credit allocation */
  creditSplit: CreditSplit
  /** Credit allocation entity identifier */
  id: Scalars['ID']
  /** Owner of credit allocation */
  owner: User
  /** Percent of allocation */
  percent: Scalars['Float']
  /** Roles associated with credit allocation */
  roles: Array<Scalars['String']>
}

/** Credit split entity */
export type CreditSplit = {
  /** The amount of credit to be withdrawn from the split for the authenticated user. */
  balanceToWithdraw?: Maybe<Scalars['String']>
  /** Credit split creation date */
  createdAt: Scalars['DateTime']
  /** Credit allocation of credit split */
  creditAllocations: Array<CreditAllocation>
  /** Credit split identifier */
  id: Scalars['ID']
  /** Releases associated with credit split that are minted */
  mintedReleases: Array<Release>
  /** Releases associated with credit split */
  releases: Array<Release>
  /** Split contract address */
  splitAddress?: Maybe<Scalars['String']>
  /** Last update date of credit split entity */
  updatedAt: Scalars['DateTime']
}

/** Currencies conversions */
export type Currencies = {
  ethToUsd: Scalars['Float']
}

/** Base cursor connection arguments */
export type CursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Sort the connection ascending or descending */
  sort?: SortOrder
}

/** Input for discoverChatChannel query */
export type DiscoverChatChannelInput = {
  associationId?: InputMaybe<Scalars['UUID']>
  type: ChatChannelType
}

/** Container of Node and the Cursor from the Node */
export type Edge = {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Node entity */
  node: Node
}

/** EggGame Entity */
export type EggGame = {
  /** Block hash of egg game calculation */
  finalSerialBlockHash: Scalars['String']
  /** EggGame identifier */
  id: Scalars['ID']
  /** Nft of egg game winner */
  nft: Nft
  /** Serial number of nft with egg game */
  winningSerialNum: Scalars['Int']
}

/** Event type */
export const EventType = {
  EDITION_PURCHASED: 'EDITION_PURCHASED',
  ORDERS_MATCHED: 'ORDERS_MATCHED',
  TRANSFER: 'TRANSFER',
  UNKNOWN: 'UNKNOWN',
} as const

export type EventType = typeof EventType[keyof typeof EventType]
/** Event entity */
export type EventV2 = Node & {
  /** Artist contract address */
  artistContractAddress?: Maybe<Scalars['String']>
  /** Timestamp on blockchain of event */
  blockTimestamp: Scalars['DateTime']
  /** Contract address */
  contractAddress: Scalars['String']
  /** Date of creation of event entity */
  createdAt: Scalars['DateTime']
  /** Event type */
  eventType: EventType
  /** Source public address */
  fromAddress?: Maybe<Scalars['String']>
  /** User associated to source public address */
  fromAddressUser?: Maybe<User>
  /** Event identifier */
  id: Scalars['ID']
  /** Release associated with event */
  release?: Maybe<Release>
  /** Target public address */
  toAddress?: Maybe<Scalars['String']>
  /** User associated to target public address */
  toAddressUser?: Maybe<User>
  /** Token ID of associated NFT */
  tokenId: Scalars['String']
  /** Value exchanged in Wei */
  valueExchanged: Scalars['String']
  /** Formatted version of value exchanged */
  valueExchangedPretty: ValueExchangedPrettyType
}

/** Genre entity */
export type Genre = {
  /** Date of creation */
  createdAt: Scalars['DateTime']
  /** Genre associated UUID */
  id: Scalars['ID']
  /** Genre name */
  name: Scalars['String']
  /** Date of last update of genre */
  updatedAt: Scalars['DateTime']
}

/** Client key management entity */
export type KeyClient = Node & {
  /** Date of creation */
  createdAt: Scalars['DateTime']
  /** Unique identifier of client key */
  id: Scalars['ID']
  /** Key associated to client for authentication process */
  key: Scalars['String']
  /** Human-readable identifier of key client */
  name: Scalars['String']
  /** Status of Key Client */
  status: KeyClientStatus
  /** Date of last update */
  updatedAt: Scalars['DateTime']
}

/** Edge of Key Client Connection */
export type KeyClientConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Key Client node */
  node: KeyClient
}

/** Status of Key Client */
export const KeyClientStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export type KeyClientStatus = typeof KeyClientStatus[keyof typeof KeyClientStatus]
/** Paginated latest sales events */
export type LatestSalesConnection = Connection & {
  /** Edges of current page */
  edges: Array<LatestSalesConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of LatestSales Connection */
export type LatestSalesConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Event node */
  node: EventV2
}

/** Pagination parameters for Latest Sales connection */
export type LatestSalesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sorting latest sales */
  sort?: LatestSalesCursorConnectionSort
}

/** Customize sorting latest sales */
export type LatestSalesCursorConnectionSort = {
  /** Sort by blockchain timestamp */
  blockTimestamp?: InputMaybe<SortOrder>
  /** Sort by date of creation of event entity */
  createdAt?: InputMaybe<SortOrder>
}

/** Filter for paginated latest sales */
export type LatestSalesCursorFilterArgs = {
  /** Specify event types to be filtered */
  eventTypes?: InputMaybe<Array<EventType>>
}

/** Media entity */
export type Media = {
  /** AWS S3 Bucket */
  bucket: Scalars['String']
  /** Media entity identifier */
  id: Scalars['ID']
  /** AWS S3 File key */
  key: Scalars['String']
  /** CDN Url */
  url: Scalars['String']
}

/** Merkle tree entity */
export type MerkleTree = {
  /** Upload step creation date */
  createdAt: Scalars['DateTime']
  /** Upload step identifier */
  id: Scalars['ID']
  /** Number of leaves for merkle tree */
  leafCount: Scalars['Int']
  /** Merkle tree root */
  root: Scalars['String']
  /** List of unhashed leaves for merkle tree */
  unhashedLeaves: Array<Scalars['String']>
}

/** Merkle tree proof information */
export type MerkleTreeProof = {
  /** Merkle proof */
  proof: Array<Scalars['String']>
  /** Unhashed leaf in merkle tree */
  unhashedLeaf: Scalars['String']
}

/** Mint current time status */
export const MintTimeStatus = {
  PAST: 'PAST',
  UPCOMING: 'UPCOMING',
} as const

export type MintTimeStatus = typeof MintTimeStatus[keyof typeof MintTimeStatus]
/** Pagination parameters for Minted Releases connection */
export type MintedReleasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior of minted releases pagination */
  sort?: MintedReleasesCursorConnectionSort
}

/** Customize sort behavior of minted releases pagination */
export type MintedReleasesCursorConnectionSort = {
  /** Sort by createdAt of release */
  createdAt?: InputMaybe<SortOrder>
  /** Sort by mintStartTime of release */
  mintStartTime?: InputMaybe<SortOrder>
}

/** Filter minted releases */
export type MintedReleasesCursorFilterArgs = {
  /** Only get releases from specified genres */
  genre?: InputMaybe<Array<Scalars['String']>>
  /** Remove currently-featured releases from results */
  hideFeatured?: InputMaybe<Scalars['Boolean']>
  /** Only get release with specified mint time status */
  mintTimeStatus?: InputMaybe<Array<MintTimeStatus>>
  /** Only get release with specified status */
  releaseStatus?: InputMaybe<Array<ReleaseStatus>>
  /** Only get releases from specified seasons */
  season?: InputMaybe<Array<ArtistSeason>>
}

/** Mutations */
export type Mutation = {
  /** [PUBLIC] Generate auth challenge for given public address and give back new nonce */
  generateAuthChallenge: Scalars['Int']
  /** [PUBLIC] Check if specified queue is open */
  isQueueOpen?: Maybe<Scalars['Boolean']>
  /** [PUBLIC] Report a track play session stop */
  reportPlayStopped?: Maybe<Scalars['Void']>
  /** [PUBLIC] Verify given auth challenge */
  verifyAuthChallenge: Scalars['String']
}

/** Mutations */
export type MutationgenerateAuthChallengeArgs = {
  publicAddress: Scalars['String']
}

/** Mutations */
export type MutationisQueueOpenArgs = {
  presaleId: Scalars['UUID']
}

/** Mutations */
export type MutationreportPlayStoppedArgs = {
  input: ReportPlayStoppedInput
}

/** Mutations */
export type MutationverifyAuthChallengeArgs = {
  publicAddress: Scalars['String']
  signedMessage: Scalars['String']
}

/** NFT Entity */
export type Nft = Node & {
  /** Amount paid in Wei for NFT */
  amountPaidInWei: Scalars['String']
  /** Comment set for NFT */
  comment?: Maybe<Comment>
  /** Contract address */
  contractAddress: Scalars['String']
  /** Date of creation of NFT entity */
  createdAt: Scalars['DateTime']
  /** Block number of the nft mint */
  createdAtBlockNum: Scalars['Int']
  /** Blockchain created date of NFT */
  createdAtBlockTime?: Maybe<Scalars['DateTime']>
  /** Nft UUID */
  id: Scalars['ID']
  /** Is the NFT a golden egg */
  isGoldenEgg: Scalars['Boolean']
  /** Was the NFT bought on a presale */
  isPresaleNft: Scalars['Boolean']
  /** Owner of NFT */
  owner: User
  /** Release associated with NFT */
  release: Release
  /** Acumulative serial number */
  serialNumber: Scalars['Int']
  /** Song slot reserved by NFT */
  songSlot?: Maybe<Scalars['Int']>
  /** Unique chain token identifier */
  tokenId: Scalars['ID']
  /** Last update date of NFT */
  updatedAt: Scalars['DateTime']
  /** Block number of the last transfer state */
  updatedAtBlockNum: Scalars['Int']
}

/** Paginated NFTs connection */
export type NftConnection = Connection & {
  /** Edges of current page */
  edges: Array<NftConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** NFT Node edge */
export type NftConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** NFT Entity */
  node: Nft
}

/** Cursor connection parameters for NFTs */
export type NftCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: NftCursorConnectionSort
}

/** Customize the sort behavior of Nfts pagination */
export type NftCursorConnectionSort = {
  /** Sort by date of primary sale */
  primarySaleDate?: InputMaybe<SortOrder>
  /** Sort by date of last secondary sale with default value of primary sale date */
  secondarySaleDate?: InputMaybe<SortOrder>
  /** Sort by serial number */
  serialNumber?: InputMaybe<SortOrder>
}

/** Simplified version of Nft entity filtered to be with non-nullable comment */
export type NftWithComment = {
  /** Amount paid in Wei for NFT */
  amountPaidInWei: Scalars['String']
  /** Avatar URL of Nft owner */
  avatarUrl?: Maybe<Scalars['String']>
  /** Comment of NFT */
  comment: Comment
  /** Contract address */
  contractAddress: Scalars['String']
  /** Unique identifier of Nft */
  id: Scalars['ID']
  /** Was the NFT bought on a presale */
  isPresaleNft: Scalars['Boolean']
  /** If the Nft owner is an artist, returns the name of the artist */
  ownerArtistName?: Maybe<Scalars['String']>
  /** Public wallet address of owner */
  ownerPublicAddress: Scalars['String']
  /** Twitter handle of owner */
  ownerTwitterHandle?: Maybe<Scalars['String']>
  /** Timestamp of purchased date */
  purchasedAt: Scalars['Timestamp']
  /** Acumulative serial number */
  serialNumber: Scalars['Int']
  /** Song slot reserved by NFT */
  songSlot: Scalars['Int']
  /** Unique chain token identifier */
  tokenId: Scalars['String']
}

/** Base node */
export type Node = {
  /** Node identifier */
  id: Scalars['ID']
}

/** Require only holders of specific contracts */
export type OnlyTokenHolders = {
  /** Token Contract Address */
  tokenContractAddress: Scalars['String']
  /** Token Symbol from Contract */
  tokenSymbol?: Maybe<Scalars['String']>
  /** Token Threshold to qualify on whitelist */
  tokenThresholdToQualify: Scalars['String']
}

/** Require Top Collectors flag */
export type OnlyTopCollectors = {
  /** How many of the top collectors are allowed */
  topNum: Scalars['Int']
}

/** Pagination helper information */
export type PageInfo = {
  /** Cursor shorthand of the last node from current page */
  endCursor?: Maybe<Scalars['String']>
  /** Does the current connection have a next page */
  hasNextPage: Scalars['Boolean']
  /** Does the current connection have a previous page */
  hasPreviousPage: Scalars['Boolean']
  /** Cursor shorthand of the first node from current page */
  startCursor?: Maybe<Scalars['String']>
}

/** Playlist entity that contains tracks */
export type Playlist = {
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']
  /** Track list */
  tracks: Array<PlaylistTrack>
}

/** Playlist of tracks of an artist */
export type PlaylistArtist = Playlist & {
  artistId: Scalars['ID']
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']
  /** Track list */
  tracks: Array<PlaylistTrack>
}

/** Playlist of tracks of a holder' NFTs */
export type PlaylistHolder = Playlist & {
  /** Holder public address */
  holderPublicAddress: Scalars['String']
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']
  /** Track list */
  tracks: Array<PlaylistTrack>
}

/** Playlist used for Homepage and fallback for extra pages */
export type PlaylistHome = Playlist & {
  createdAt: Scalars['DateTime']
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']
  /** Track list */
  tracks: Array<PlaylistTrack>
}

/** Playlist input */
export type PlaylistInput = {
  /** Association ID based on type of playlist */
  associationId?: InputMaybe<Scalars['String']>
  /** Type of playlist */
  type: PlaylistType
}

/** Simplified track entity to only contain identifiers to associated entities */
export type PlaylistTrack = {
  /** Artist ID */
  artistId: Scalars['ID']
  /** Track ID */
  id: Scalars['ID']
  /** Release ID */
  releaseId: Scalars['ID']
}

/** Currently supported playlists */
export const PlaylistType = {
  ARTIST: 'ARTIST',
  HOLDER: 'HOLDER',
  HOME: 'HOME',
} as const

export type PlaylistType = typeof PlaylistType[keyof typeof PlaylistType]
/** Main configuration entity of release sale */
export type PresaleConfiguration = {
  /** Currently activate sale schedule, loosely-based on requested time */
  currentSaleSchedule?: Maybe<SaleSchedule>
  /** Most recent past sale schedule, loosely-based on requested time */
  getMostRecentSaleSchedule?: Maybe<SaleSchedule>
  /** Entity UUID */
  id: Scalars['ID']
  /** Release UUID of Presale Configuration */
  releaseId: Scalars['ID']
  /** List of sale schedule information of Release */
  saleSchedules: Array<SaleSchedule>
  /** Signing key UUID */
  signingKeyId: Scalars['String']
}

/** Presale Media information */
export type PresaleMediaInfo = {
  /** Collection Name */
  collectionName?: Maybe<Scalars['String']>
  /** Size of collection */
  collectionSize?: Maybe<Scalars['Int']>
  /** Contract Address */
  contractAddress?: Maybe<Scalars['String']>
  /** Custom description */
  description?: Maybe<Scalars['String']>
  /** Icon Overlay URIs */
  iconOverlayURI?: Maybe<Scalars['String']>
  /** Image URIs */
  imageURIs?: Maybe<Array<Scalars['String']>>
  /** Social Links of Sale */
  socialLinks?: Maybe<SocialLinks>
  /** Amount of unique holders */
  uniqueHolders?: Maybe<Scalars['Int']>
}

/** Queries */
export type Query = {
  /**
   * [PUBLIC] Get all minted releases. Warning, this query is going to be removed soon, use paginated queries instead
   * @deprecated Use paginated queries instead
   */
  allMintedReleases: Array<Release>
  /** [PUBLIC] Get all minted releases */
  allMintedReleasesPaginated: ReleaseConnection
  /** [PUBLIC] Artist by UUID */
  artist?: Maybe<Artist>
  /** [PUBLIC] Artist by handle */
  artistByHandle?: Maybe<Artist>
  /** Get the nft collectors of the specified artist */
  artistCollectors: ArtistCollectors
  /** [PUBLIC] Get all artists of platform. */
  artists: ArtistConnection
  /** [PUBLIC] Get audio from track */
  audioFromTrack: TrackAudio
  /** [PUBLIC] Get authenticated user information, if any */
  authUser?: Maybe<User>
  /** [PUBLIC] Get chat messages of specified chat channel */
  chatMessages: ChatMessagesConnection
  /** [PUBLIC] Get credit split by id */
  creditSplit?: Maybe<CreditSplit>
  /** [PUBLIC] Get currencies conversions */
  currencies: Currencies
  /** [PUBLIC] Check if specified chat channel type+id is available for specified authenticated user */
  discoverChatChannel?: Maybe<ChatChannel>
  /** [PUBLIC] Get EggGame of specified release */
  eggGame?: Maybe<EggGame>
  /** [PUBLIC] Get eligible users for presale on specified presale configuration */
  eligibleUsersForPresale: Array<User>
  /** [PUBLIC] Get currently-featured releases */
  featuredReleases: Array<Release>
  /** [PUBLIC] Check if Queue Captcha is disabled for specified release */
  isMainQueueCaptchaDisabled?: Maybe<Scalars['Boolean']>
  /** [PUBLIC] Get the latest events */
  latestEventsPaginated: LatestSalesConnection
  /** [PUBLIC] Get merkle tree information */
  merkleTree: MerkleTree
  /** [PUBLIC] Get merkle tree information */
  merkleTreeProof?: Maybe<MerkleTreeProof>
  /** [PUBLIC] Get minted release by Artist sound handle and release title slug */
  mintedRelease?: Maybe<Release>
  /**
   * [PUBLIC] Get all minted releases of an artist
   * @deprecated Use Artist.mintedReleasesPaginated instead
   */
  mintedReleases: ReleaseConnection
  /** [PUBLIC] Current UNIX date to test caching */
  now: Scalars['Int']
  /** [PUBLIC] Test query to get the date of calculation of resolver based using response cache */
  nowCached: Scalars['Timestamp']
  /** [PUBLIC] Past minted releases */
  pastMintedReleases: ReleaseConnection
  /** [PUBLIC] Get playlist based on given type and associationId */
  playlist?: Maybe<Playlist>
  /** [PUBLIC] Presale Configuration of specified Release */
  presaleConfiguration?: Maybe<PresaleConfiguration>
  /** [PUBLIC] Get release by id */
  release?: Maybe<Release>
  /** [PUBLIC] Can the specified release be minted more than once */
  releaseCanBeMintedMoreThanOnce: Scalars['Boolean']
  /** [PUBLIC] Get release by contract address */
  releaseContract: Release
  /** [PUBLIC] List of genres that have at least 1 past minted release */
  releaseGenres: Array<Genre>
  /** Search releases or artists based on text inputs */
  search: SearchResult
  /** [PUBLIC] Get specified shelf by id */
  shelf: Shelf
  /** [PUBLIC] Top collectors of artist by number of nfts owned */
  topNftsOwnedCollectors?: Maybe<Array<ArtistCollector>>
  /** [PUBLIC] Get total raised of the whole platform */
  totalRaised: TotalRaised
  /** [PUBLIC] Get track by id */
  track?: Maybe<Track>
  /** [PUBLIC] Get trending artists information */
  trendingArtistInfo: Array<TrendingArtistInfo>
  /** [PUBLIC] Get trending collectors information */
  trendingCollectors: Array<TrendingCollectorInfo>
  /** [PUBLIC] Upcoming minted releases */
  upcomingMintedReleases: ReleaseConnection
  /** [PUBLIC] Get specified user by id */
  user?: Maybe<User>
  /** [PUBLIC] Get specified user by public address */
  userByAddress?: Maybe<User>
  /** [PUBLIC] Get specified user by sound handle */
  userByArtistHandle?: Maybe<User>
}

/** Queries */
export type QueryallMintedReleasesPaginatedArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>
  pagination?: MintedReleasesCursorConnectionArgs
}

/** Queries */
export type QueryartistArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryartistByHandleArgs = {
  soundHandle: Scalars['String']
}

/** Queries */
export type QueryartistCollectorsArgs = {
  input: ArtistCollectorsInput
}

/** Queries */
export type QueryartistsArgs = {
  filter?: InputMaybe<ArtistCursorFilterArgs>
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryaudioFromTrackArgs = {
  trackId: Scalars['UUID']
}

/** Queries */
export type QuerychatMessagesArgs = {
  channelId: Scalars['UUID']
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QuerycreditSplitArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QuerydiscoverChatChannelArgs = {
  input: DiscoverChatChannelInput
}

/** Queries */
export type QueryeggGameArgs = {
  releaseId: Scalars['UUID']
}

/** Queries */
export type QueryeligibleUsersForPresaleArgs = {
  presaleConfigurationId: Scalars['UUID']
}

/** Queries */
export type QueryisMainQueueCaptchaDisabledArgs = {
  releaseId: Scalars['String']
}

/** Queries */
export type QuerylatestEventsPaginatedArgs = {
  filter?: InputMaybe<LatestSalesCursorFilterArgs>
  pagination?: LatestSalesCursorConnectionArgs
}

/** Queries */
export type QuerymerkleTreeArgs = {
  root: Scalars['String']
}

/** Queries */
export type QuerymerkleTreeProofArgs = {
  root: Scalars['String']
  unhashedLeaf: Scalars['String']
}

/** Queries */
export type QuerymintedReleaseArgs = {
  releaseSlug: Scalars['String']
  soundHandle: Scalars['String']
}

/** Queries */
export type QuerymintedReleasesArgs = {
  filter: ArtistMintedReleasesCursorFilterArgs
  id: Scalars['UUID']
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QuerynowCachedArgs = {
  ttlSeconds?: Scalars['Int']
}

/** Queries */
export type QuerypastMintedReleasesArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryplaylistArgs = {
  input: PlaylistInput
}

/** Queries */
export type QuerypresaleConfigurationArgs = {
  releaseId: Scalars['UUID']
}

/** Queries */
export type QueryreleaseArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryreleaseCanBeMintedMoreThanOnceArgs = {
  releaseId: Scalars['String']
}

/** Queries */
export type QueryreleaseContractArgs = {
  contractAddress: Scalars['Address']
  editionId?: InputMaybe<Scalars['String']>
}

/** Queries */
export type QuerysearchArgs = {
  input: SearchInput
}

/** Queries */
export type QueryshelfArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QuerytopNftsOwnedCollectorsArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QuerytrackArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QuerytrendingArtistInfoArgs = {
  sort: TrendingArtistsSortEnum
  timePeriod: TimePeriodAggEnum
}

/** Queries */
export type QuerytrendingCollectorsArgs = {
  sort: TrendingCollectorsSortEnum
  timePeriod: TimePeriodAggEnum
}

/** Queries */
export type QueryupcomingMintedReleasesArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryuserArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryuserByAddressArgs = {
  publicAddress: Scalars['Address']
}

/** Queries */
export type QueryuserByArtistHandleArgs = {
  soundHandle: Scalars['String']
}

/** Release entity */
export type Release = Node & {
  /** Artist of release */
  artist: Artist
  /**
   * Artist contract address
   * @deprecated Use contractAddress instead
   */
  artistContractAddress: Scalars['String']
  /** Available balance to withdraw for an edition */
  balanceToWithdraw?: Maybe<Scalars['String']>
  /** Behind the music text */
  behindTheMusic: Scalars['String']
  /** Currently claimed song slots */
  claimedSongSlots: Array<Scalars['Int']>
  /** Contract associated to Sound Edition */
  contract: Contract
  /** Contract address */
  contractAddress: Scalars['String']
  /** Cover image of release */
  coverImage: Media
  /** Release creation date */
  createdAt: Scalars['DateTime']
  /** Credit split associated with release, if any */
  creditSplit?: Maybe<CreditSplit>
  /** Users with credits of release */
  credits: Array<User>
  /** The current maximum quantity for a sale. */
  currentMaxQuantity: Scalars['Int']
  /** Description of release */
  description?: Maybe<Scalars['String']>
  /** Edition ID */
  editionId?: Maybe<Scalars['String']>
  /** EggGame of Release */
  eggGame?: Maybe<EggGame>
  /** Associated external url */
  externalUrl?: Maybe<Scalars['String']>
  /** Final quantity for a release. Will be defined once a sale finishes */
  finalQuantity?: Maybe<Scalars['Int']>
  /** Last sale schedule end time as ISO Date String */
  finalSaleScheduleEndTime?: Maybe<Scalars['DateTime']>
  /** Last sale schedule end time as number of milliseconds since the ECMAScript epoch. */
  finalSaleScheduleEndTimestamp?: Maybe<Scalars['Timestamp']>
  /** Genre of Release */
  genre: Genre
  /** Special golden egg image */
  goldenEggImage: Media
  /** Is the release a range bound edition */
  hasRangeBoundSale: Scalars['Boolean']
  /** Release identifier */
  id: Scalars['ID']
  /** Is release sold out relative to the final quantity */
  isFinalSoldOut: Scalars['Boolean']
  /** Associated laylo.com url */
  layloUrl?: Maybe<Scalars['String']>
  /** Public sale start time in UNIX timestamp */
  mintStartTime: Scalars['Int']
  /** NFTs of Release */
  nftsPaginated: NftConnection
  /** Amount of sold NFTs */
  numSold: Scalars['Int']
  /** On blockchain start time */
  onChainStartDateTime: Scalars['DateTime']
  /** On blockchain start time in UNIX timestamp */
  onChainStartTime: Scalars['Int']
  /** Associated opensea url */
  openseaUrl?: Maybe<Scalars['String']>
  /** Presale listening party start time */
  presaleListeningPartyStart?: Maybe<Scalars['DateTime']>
  /** Presale minting party start time */
  presaleMintStart?: Maybe<Scalars['DateTime']>
  /** Max Quantity for a releases presale. */
  presaleUpperBound?: Maybe<Scalars['Int']>
  /** Price in Wei */
  price: Scalars['String']
  /** Public listening party timestamp */
  publicListeningParty?: Maybe<Scalars['Timestamp']>
  /** Public listening party start time */
  publicListeningPartyStart: Scalars['DateTime']
  /** Public minting start time */
  publicMintStart: Scalars['DateTime']
  /** Quantity of available NFTs */
  quantity: Scalars['Int']
  /** Lower bound quantity for a releases main sale. */
  quantityLowerBound: Scalars['Int']
  /** Upper bound quantity for a releases main sale. */
  quantityUpperBound: Scalars['Int']
  /** Rewards of Release */
  rewards: Array<Reward>
  /** Season associated to release */
  season?: Maybe<Scalars['String']>
  /** Release title */
  title: Scalars['String']
  /** Slugified title */
  titleSlug: Scalars['String']
  /** Top 100 Nfts with comment, ordered by serial number ascendingly */
  topNftsWithComment: Array<NftWithComment>
  /** Total raised in Wei */
  totalRaised: Scalars['String']
  /** Total amount raised from primary sales converted from eth to usd */
  totalRaisedPrimaryUsd: Scalars['Float']
  /** Total amount raised from primary sales converted from eth to usd */
  totalRaisedSecondaryUsd: Scalars['Float']
  /** Track of release */
  track: Track
  /**
   * Tracks of release
   * @deprecated Prefer using Release.track instead
   */
  tracks: Array<Track>
  /** Type of Release */
  type: ReleaseType
  /** Total number of upload steps */
  uploadSteps: Scalars['Int']
  /** Number of upload steps already complete */
  uploadStepsComplete: Scalars['Int']
}

/** Release entity */
export type ReleasenftsPaginatedArgs = {
  pagination?: NftCursorConnectionArgs
}

/** Paginated releases connection */
export type ReleaseConnection = Connection & {
  /** Edges of current page */
  edges: Array<ReleaseConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Release Connection */
export type ReleaseConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Release node */
  node: Release
}

/** Release current status type */
export const ReleaseStatus = {
  AVAILABLE_TO_MINT: 'AVAILABLE_TO_MINT',
  SOLD_OUT: 'SOLD_OUT',
} as const

export type ReleaseStatus = typeof ReleaseStatus[keyof typeof ReleaseStatus]
/** Release type, currently the platform only supports "SINGLE" */
export const ReleaseType = {
  ALBUM: 'ALBUM',
  COMPILATION: 'COMPILATION',
  EP: 'EP',
  PLAYLIST: 'PLAYLIST',
  SINGLE: 'SINGLE',
} as const

export type ReleaseType = typeof ReleaseType[keyof typeof ReleaseType]
/** Input for reportPlayStopped mutation */
export type ReportPlayStoppedInput = {
  /** End of play session */
  finish: Scalars['Timestamp']
  /** Duration of play in seconds */
  listenDuration: Scalars['Int']
  /** Amount of pauses on the same session */
  pauseCount: Scalars['Int']
  /** Start of play session */
  start: Scalars['Timestamp']
  /** Track UUID */
  trackId: Scalars['UUID']
  /** Random UUID generated by client-side */
  uuid: Scalars['String']
}

/** Require Any Sound Holder flag */
export type RequireAnySoundHolder = {
  enabled: Scalars['Boolean']
}

/** Require Artist Sound Holder flag */
export type RequireArtistSoundHolder = {
  enabled: Scalars['Boolean']
}

/** Require Twitter Verification flag */
export type RequireTwitterVerification = {
  enabled: Scalars['Boolean']
}

/** Reward entity */
export type Reward = {
  /** Reward description */
  description: Scalars['String']
  /** Reward identifier */
  id: Scalars['ID']
  /** Amount of backers of reward */
  numOfBackers: Scalars['Int']
  /** Price of reward */
  price: Scalars['String']
  /** Reward title */
  title: Scalars['String']
}

/** Single sale schedule information of Release Presale Configuration */
export type SaleSchedule = {
  /** Amount of people to be allowed to be whitelist at the same time, it's usually better to set it as the same as presaleAmount */
  cohortSize: Scalars['Int']
  /** End Time of Sale Schedule */
  endTime: Scalars['DateTime']
  /** UUID of Sale Schedule entity */
  id: Scalars['ID']
  /** Is the current sale schedule presale */
  isPresale: Scalars['Boolean']
  /** Merkle tree root hash derived from sale schedule allowlist */
  merkleTreeRoot?: Maybe<Scalars['String']>
  /** Special information related to onlyTokenHolders whitelist rule if present */
  onlyTokenHoldersInfo: Array<PresaleMediaInfo>
  /** Presale amount to be sold */
  presaleAmount: Scalars['Int']
  /** Price for the specific sale schedule */
  price: Scalars['String']
  /** Start Time of Sale Schedule */
  startTime: Scalars['DateTime']
  /** Whitelist Rules of sale schedule */
  whitelistRulesParsed: Array<WhitelistRules>
}

/** Input for "search" query */
export type SearchInput = {
  /** How many entities to be fetched, maximum of 20 */
  limit?: Scalars['PositiveInt']
  /** Text search */
  text: Scalars['String']
}

/** Search result */
export type SearchResult = {
  /** Artists that match the search input, including artists where any of their releases matches the given input */
  artists: Array<Artist>
  /** Unique identifier of search result */
  id: Scalars['ID']
  /** Releases that match the search input, including releases where the artist name matches the given input */
  releases: Array<Release>
}

/** Shelf entity */
export type Shelf = Node & {
  /** Paginated collected releases of shelf */
  collectedReleases: CollectedReleaseConnection
  /** Shelf creation date */
  createdAt: Scalars['DateTime']
  /** Shelf deletion date */
  deletedAt?: Maybe<Scalars['DateTime']>
  /** Description of shelf */
  description?: Maybe<Scalars['String']>
  /** Shelf identifier */
  id: Scalars['ID']
  /** Relative ordering of the shelves for each user */
  index: Scalars['Int']
  /** Shelf name */
  name: Scalars['String']
  /** Total play time of all releases in a shelf in seconds */
  playTimeInSeconds: Scalars['Int']
  /** Number of releases in a shelf */
  releaseCount: Scalars['Int']
  /** List of trackIds in a shelf */
  trackIds: Array<Scalars['UUID']>
  /** Type of shelf */
  type: ShelfType
  /** Owner of shelf */
  user: User
}

/** Shelf entity */
export type ShelfcollectedReleasesArgs = {
  pagination?: ShelfStackCursorConnectionArgs
}

/** Paginated shelves connection */
export type ShelfConnection = Connection & {
  /** Edges of current page */
  edges: Array<ShelfConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Shelf Node edge */
export type ShelfConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Shelf Entity */
  node: Shelf
}

/** Cursor connection parameters for shelves */
export type ShelfCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ShelfCursorConnectionSort
}

/** Customize the sort behavior of Nfts pagination */
export type ShelfCursorConnectionSort = {
  /** Sort by shelf index value */
  index?: InputMaybe<SortOrder>
}

/** Shelf stack entity */
export type ShelfStack = Node & {
  /** Release creation date */
  createdAt: Scalars['DateTime']
  /** Release identifier */
  id: Scalars['ID']
  /** Release creation date */
  index: Scalars['Int']
  /** NFTs of Shelf stack */
  nfts: Array<Nft>
  /** Release of the shelf stack */
  release: Release
}

/** Shelf stack node edge */
export type ShelfStackConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Shelf stack entity */
  node: ShelfStack
}

/** Cursor connection parameters for shelf stacks */
export type ShelfStackCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ShelfStackCursorConnectionSort
}

/** Customize the sort behavior of Nfts pagination */
export type ShelfStackCursorConnectionSort = {
  /** Sort by shelf index value */
  index?: InputMaybe<SortOrder>
}

/** Shelf type */
export const ShelfType = {
  DEFAULT: 'DEFAULT',
} as const

export type ShelfType = typeof ShelfType[keyof typeof ShelfType]
/** Social Links */
export type SocialLinks = {
  /** Instagram Platform */
  instagramLink?: Maybe<Scalars['String']>
  /** OpenSea Platform */
  openseaLink?: Maybe<Scalars['String']>
  /** Twitter Platform */
  twitterLink?: Maybe<Scalars['String']>
}

/** Ascending or Descending sort */
export const SortOrder = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

export type SortOrder = typeof SortOrder[keyof typeof SortOrder]
/** Realtime Subscriptions */
export type Subscription = {
  /** [PUBLIC] Subscribe to updates of specified chat channel messages */
  chatChannelMessages: ChatMessage
  count: Scalars['Int']
  /** [PUBLIC] Subscribe to release updates */
  release: Release
  /** [PUBLIC] Subscribe to updates of release nfts */
  releaseNfts: Nft
  /** [PUBLIC] Subscribe to updates of release nfts comments */
  releaseNftsComments: NftWithComment
  /** [PUBLIC] Subscribe to the latest token sales updates */
  tokenSales: EventV2
}

/** Realtime Subscriptions */
export type SubscriptionchatChannelMessagesArgs = {
  chatChannelId: Scalars['UUID']
}

/** Realtime Subscriptions */
export type SubscriptioncountArgs = {
  n?: Scalars['Int']
}

/** Realtime Subscriptions */
export type SubscriptionreleaseArgs = {
  id: Scalars['UUID']
}

/** Realtime Subscriptions */
export type SubscriptionreleaseNftsArgs = {
  releaseId: Scalars['UUID']
}

/** Realtime Subscriptions */
export type SubscriptionreleaseNftsCommentsArgs = {
  releaseId: Scalars['UUID']
}

/** Time period to aggregate trending table queries */
export const TimePeriodAggEnum = {
  ALL_TIME: 'ALL_TIME',
  ONE_DAY: 'ONE_DAY',
  ONE_MONTH: 'ONE_MONTH',
  SEVEN_DAY: 'SEVEN_DAY',
} as const

export type TimePeriodAggEnum = typeof TimePeriodAggEnum[keyof typeof TimePeriodAggEnum]
/** Total raised on Ethereum and USD */
export type TotalRaised = {
  eth: Scalars['Float']
  usd: Scalars['Float']
}

/** Track entity */
export type Track = {
  /** Duration in seconds */
  duration: Scalars['Int']
  /** Track identifier */
  id: Scalars['ID']
  /** Normalized peaks of song */
  normalizedPeaks: Array<Scalars['Int']>
  /** Track's Release */
  release: Release
  /** Release Identifier */
  releaseId: Scalars['ID']
  /** Track title */
  title: Scalars['String']
  /** Track number relative to other tracks (unused) */
  trackNumber: Scalars['Int']
}

/** Track audio */
export type TrackAudio = {
  /** Track audio, transcoded version if available */
  audio?: Maybe<Media>
  /** Track audio, original non-transcoded version */
  audioOriginal?: Maybe<Media>
  /** Track duration in seconds */
  duration: Scalars['Int']
  /** Track identifier */
  id: Scalars['ID']
  /** Release entity of track */
  release: Release
  /** Release identifier */
  releaseId: Scalars['ID']
  /** Reveal time in UNIX timestamp of track based on authenticated user (if authenticated) */
  revealTime: Scalars['Int']
}

/** Transaction entity */
export type Transaction = {
  /** Chain identifier used for transaction */
  chainId: Scalars['Int']
  /** Contract method of transaction */
  contractMethod: ContractMethod
  /** Transaction hash on chain */
  hash: Scalars['String']
  /** Transaction identifier */
  id: Scalars['ID']
  /** Release identifier */
  releaseId?: Maybe<Scalars['String']>
  /** Transaction status, "pending", "failed" or "confirmed") */
  status: Scalars['String']
}

/** Trending Artist Info */
export type TrendingArtistInfo = {
  /** Artist entity */
  artist?: Maybe<Artist>
  /** Artist identifier */
  artistId: Scalars['ID']
  /** Amount of NFTs sold */
  nftsSold: Scalars['Int']
  /** Primary sales of artist in Wei */
  primarySales: Scalars['String']
  /** Primary sales of artist in USD */
  primarySalesUsd: Scalars['Float']
  /** Secondary sales of artist in Wei */
  secondarySales: Scalars['String']
  /** Secondary sales of artist in USD */
  secondarySalesUsd: Scalars['Float']
  /** Sum of primary and secondary sales in Wei */
  totalSales: Scalars['String']
  /** Sum of primary and secondary sales in USD */
  totalSalesUsd: Scalars['Float']
  /** Amount of unique collectors */
  uniqueCollectors: Scalars['Int']
}

/** Type of sort parameter used for trending artists */
export const TrendingArtistsSortEnum = {
  NFTS_SOLD: 'NFTS_SOLD',
  PRIMARY_SALES: 'PRIMARY_SALES',
  SECONDARY_SALES: 'SECONDARY_SALES',
  TOTAL_SALES: 'TOTAL_SALES',
  UNIQUE_COLLECTORS: 'UNIQUE_COLLECTORS',
} as const

export type TrendingArtistsSortEnum = typeof TrendingArtistsSortEnum[keyof typeof TrendingArtistsSortEnum]
/** Trending Collector information */
export type TrendingCollectorInfo = {
  /** Amount of unique creators supported */
  creatorsSupported: Scalars['Int']
  /** Amount of NFTs bought */
  nftsBought: Scalars['Int']
  /** Total spent in Wei */
  totalSpent: Scalars['String']
  /** Total spent in USD */
  totalSpentUsd: Scalars['Float']
  /** Collector user entity */
  user?: Maybe<User>
  /** User public address of the collector */
  userAddress: Scalars['String']
}

/** Type of sort paratemer used for trending collectors */
export const TrendingCollectorsSortEnum = {
  CREATORS_SUPPORTED: 'CREATORS_SUPPORTED',
  NFTS_BOUGHT: 'NFTS_BOUGHT',
  TOTAL_SPENT: 'TOTAL_SPENT',
} as const

export type TrendingCollectorsSortEnum = typeof TrendingCollectorsSortEnum[keyof typeof TrendingCollectorsSortEnum]
/** User relation type */
export const TypeOfRelation = {
  FOLLOWING: 'FOLLOWING',
} as const

export type TypeOfRelation = typeof TypeOfRelation[keyof typeof TypeOfRelation]
/** User entity */
export type User = Node & {
  /** Optional artist entity for users with artist profile */
  artist?: Maybe<Artist>
  /** From how many unique artists the users holds nfts */
  artistsBacked: Scalars['Float']
  /** The user's aggregated available balance on fully-owned releases + their SplitMain balance */
  availableToWithdraw: Scalars['String']
  /** User avatar */
  avatar?: Maybe<Media>
  /** Banner image for user profile */
  bannerImage?: Maybe<Media>
  /** Paginated collected releases of user */
  collectedReleases: CollectedReleaseConnection
  /** Rank of user for number of bought nfts */
  collectorPosition?: Maybe<Scalars['Int']>
  /** User entity creation */
  createdAt: Scalars['DateTime']
  /** Credit allocations associated with user */
  creditAllocations: Array<CreditAllocation>
  /** User custom description */
  description?: Maybe<Scalars['String']>
  /** Custom display name */
  displayName?: Maybe<Scalars['String']>
  /** Optional user email */
  email?: Maybe<Scalars['String']>
  /** User's ethereum name service domain */
  ens?: Maybe<Scalars['String']>
  /** List of releases in featured sounds */
  featuredSounds: Array<CollectedRelease>
  /** How many followers a user has */
  followerCount: Scalars['Int']
  /** Paginated followers of user */
  followers: UserRelationConnection
  /** Paginated following of user */
  following: UserRelationConnection
  /** How many users a user is following */
  followingCount: Scalars['Int']
  /** Does the user have the artist role to be able to have an artist profile */
  hasArtistRole: Scalars['Boolean']
  /** Returns whether user has at least one shelf with at least one release */
  hasShelfWithItems: Scalars['Boolean']
  /** User UUID */
  id: Scalars['ID']
  /** User instagram handle */
  instagramHandle?: Maybe<Scalars['String']>
  /** How many nfts a user owns */
  nftsOwned: Scalars['Int']
  /** Paginated NFTs owned by user */
  nftsPaginated: NftConnection
  /** Nonce for authentication purposes */
  nonce: Scalars['Int']
  /** Wallet public address */
  publicAddress: Scalars['String']
  /** Possible roles for user */
  roles: UserRoles
  /** Paginated shelves of user */
  shelves: ShelfConnection
  /** Should the user show the splits feature */
  showSplitsFeature: Scalars['Boolean']
  /** The user's aggregated balance on the 0xSplits SplitMain contract */
  splitBalance: Scalars['String']
  /** List of pending transactions associated with user */
  transactions: Array<Transaction>
  /** Verifier twitter handle */
  twitterHandle?: Maybe<Scalars['String']>
  /** The total amount of Sound revenue the user has fully withdrawn */
  withdrawnAmount: Scalars['String']
}

/** User entity */
export type UsercollectedReleasesArgs = {
  pagination?: CursorConnectionArgs
}

/** User entity */
export type UserfollowersArgs = {
  pagination?: CursorConnectionArgs
}

/** User entity */
export type UserfollowingArgs = {
  pagination?: CursorConnectionArgs
}

/** User entity */
export type UsernftsPaginatedArgs = {
  filter?: InputMaybe<UserNftsConnectionFilters>
  pagination?: NftCursorConnectionArgs
}

/** User entity */
export type UsershelvesArgs = {
  pagination?: ShelfCursorConnectionArgs
}

/** Paginated connection of Users */
export type UserConnection = Connection & {
  /** Edges of current page */
  edges: Array<UserConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of User Connection */
export type UserConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** User node */
  node: User
}

/** Cursor connection paramaters */
export type UserCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Sort the users ascending or descending relative to the user creation date */
  sort?: SortOrder
}

/** Filter the NFTs of User */
export type UserNftsConnectionFilters = {
  /** Only include Nfts that are already in a user shelf */
  isInShelf?: InputMaybe<Scalars['Boolean']>
  /** Only include Nfts from specified releases */
  releases?: InputMaybe<Array<Scalars['UUID']>>
}

/** User relation entity */
export type UserRelation = Node & {
  /** User relation creation date */
  createdAt: Scalars['DateTime']
  /** User relation identifier */
  id: Scalars['ID']
  /** Type of user relation */
  relation: TypeOfRelation
  /** UserA of relation */
  userA: User
  /** UserB of relation */
  userB: User
}

/** Paginated user relation connection */
export type UserRelationConnection = Connection & {
  /** Edges of current page */
  edges: Array<UserRelationConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** User Relation Node edge */
export type UserRelationConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** User Relation Entity */
  node: UserRelation
}

/** Roles available for users */
export type UserRoles = {
  /** Administrator of platform */
  isAdmin: Scalars['Boolean']
  /** Member of artist relations team */
  isArtistRelations: Scalars['Boolean']
}

/** Exchanged ammounts pretty equivalents */
export type ValueExchangedPrettyType = {
  /** Formatted Ethereum value */
  eth: Scalars['String']
}

/** Union of different types of whitelist rules */
export type WhitelistRules =
  | OnlyTokenHolders
  | OnlyTopCollectors
  | RequireAnySoundHolder
  | RequireArtistSoundHolder
  | RequireTwitterVerification

export type GenerateAuthChallengeMutationVariables = Exact<{
  publicAddress: Scalars['String']
}>

export type GenerateAuthChallengeMutation = { generateAuthChallenge: number }

export type VerifyAuthChallengeMutationVariables = Exact<{
  publicAddress: Scalars['String']
  signedMessage: Scalars['String']
}>

export type VerifyAuthChallengeMutation = { verifyAuthChallenge: string }

export type MerkleProofQueryVariables = Exact<{
  root: Scalars['String']
  unhashedLeaf: Scalars['String']
}>

export type MerkleProofQuery = { merkleTreeProof?: { proof: Array<string> } | null }

export type ReleaseInfoQueryVariables = Exact<{
  contractAddress: Scalars['Address']
  editionId?: InputMaybe<Scalars['String']>
}>

export type ReleaseInfoQuery = {
  release: {
    id: string
    contractAddress: string
    editionId?: string | null
    type: ReleaseType
    externalUrl?: string | null
    openseaUrl?: string | null
    layloUrl?: string | null
    title: string
    behindTheMusic: string
    season?: string | null
    totalRaised: string
    totalRaisedPrimaryUsd: number
    totalRaisedSecondaryUsd: number
    genre: { id: string; name: string }
    track: { id: string; duration: number; normalizedPeaks: Array<number> }
    artist: {
      id: string
      gemCollectionUrl?: string | null
      openseaCollectionUrl?: string | null
      season?: string | null
      soundHandle?: string | null
      spotifyUrl?: string | null
      bannerImage?: { id: string; url: string } | null
      user: {
        id: string
        publicAddress: string
        description?: string | null
        displayName?: string | null
        email?: string | null
        twitterHandle?: string | null
        avatar?: { id: string; url: string } | null
        bannerImage?: { id: string; url: string } | null
      }
    }
    rewards: Array<{ id: string; description: string; numOfBackers: number; price: string; title: string }>
    coverImage: { id: string; url: string }
    goldenEggImage: { id: string; url: string }
  }
}

export type AudioFromTrackQueryVariables = Exact<{
  trackId: Scalars['UUID']
}>

export type AudioFromTrackQuery = {
  audioFromTrack: { id: string; duration: number; revealTime: number; audio?: { id: string; url: string } | null }
}

export type TestQueryVariables = Exact<{ [key: string]: never }>

export type TestQuery = { __typename: 'Query' }

export const GenerateAuthChallenge = `mutation GenerateAuthChallenge($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}`
export const VerifyAuthChallenge = `mutation VerifyAuthChallenge($publicAddress:String!$signedMessage:String!){verifyAuthChallenge(publicAddress:$publicAddress signedMessage:$signedMessage)}`
export const MerkleProof = `query MerkleProof($root:String!$unhashedLeaf:String!){merkleTreeProof(root:$root unhashedLeaf:$unhashedLeaf){proof}}`
export const ReleaseInfo = `query ReleaseInfo($contractAddress:Address!$editionId:String){release:releaseContract(contractAddress:$contractAddress editionId:$editionId){id contractAddress editionId type externalUrl openseaUrl layloUrl title behindTheMusic season totalRaised totalRaisedPrimaryUsd totalRaisedSecondaryUsd genre{id name}track{id duration normalizedPeaks}artist{id gemCollectionUrl openseaCollectionUrl season soundHandle spotifyUrl bannerImage{id url}user{id publicAddress description displayName email twitterHandle avatar{id url}bannerImage{id url}}}rewards{id description numOfBackers price title}coverImage{id url}goldenEggImage{id url}}}`
export const AudioFromTrack = `query AudioFromTrack($trackId:UUID!){audioFromTrack(trackId:$trackId){id duration audio{id url}revealTime}}`
export const Test = `query Test{__typename}`
