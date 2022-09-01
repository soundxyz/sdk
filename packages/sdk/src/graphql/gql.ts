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
  Address: string
  CountryCode: string
  DateTime: string
  EmailAddress: string
  JSON: unknown
  NonEmptyString: string
  NonNegativeInt: number
  PositiveInt: number
  Timestamp: number
  URL: string
  UUID: string
  Void: null
}

/** AWS Presigned upload */
export type AwsPresignedPost = {
  __typename?: 'AWSPresignedPost'
  /** JSON Fields associated with upload */
  fields: Scalars['JSON']
  /** Upload key of authenticated user */
  uploadKey: Scalars['String']
  /** Target URL for upload process */
  url: Scalars['String']
}

/** Allocation input for credit split creation */
export type Allocation = {
  /** Owner address of allocation */
  ownerAddress: Scalars['Address']
  /** Percent of allocation */
  percent: Scalars['Float']
  /** Roles associated with credit allocation */
  roles: Array<Scalars['String']>
}

/** Possible options of role update input */
export const AlterRole = {
  /** Administrator of platform */
  Admin: 'ADMIN',
  /** Member of artist relations team */
  ArtistRelations: 'ARTIST_RELATIONS',
} as const

export type AlterRole = typeof AlterRole[keyof typeof AlterRole]
/** Artist Entity */
export type Artist = Node & {
  __typename?: 'Artist'
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
export type ArtistCollectorsArgs = {
  pagination?: CursorConnectionArgs
}

/** Artist Entity */
export type ArtistMintedReleasesPaginatedArgs = {
  filter?: InputMaybe<ArtistMintedReleasesFilter>
  pagination?: CursorConnectionArgs
}

/** Artist Entity */
export type ArtistNumMintedReleasesArgs = {
  filter?: InputMaybe<ArtistMintedReleasesFilter>
}

/** Data for Artist minting auction process */
export type ArtistAuctionOverrides = {
  __typename?: 'ArtistAuctionOverrides'
  /** Artist user wallet public address associated to auction options */
  artistAddress: Scalars['String']
  /** Date of creation of options */
  createdAt: Scalars['DateTime']
  /** Identifier of options entity */
  id: Scalars['ID']
}

/** ArtistCollector */
export type ArtistCollector = Node & {
  __typename?: 'ArtistCollector'
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
  __typename?: 'ArtistCollectorConnection'
  /** Edges of current page */
  edges: Array<ArtistCollectorConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Artist Collector Connection */
export type ArtistCollectorConnectionEdge = Edge & {
  __typename?: 'ArtistCollectorConnectionEdge'
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** ArtistCollector node */
  node: ArtistCollector
}

/** Cursor connection paramaters */
export type ArtistCollectorCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Sort the artist collectors ascending or descending relative to the user creation date */
  sort?: SortOrder
}

/** Artist Collectors wrapper entity */
export type ArtistCollectors = {
  __typename?: 'ArtistCollectors'
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
  __typename?: 'ArtistConnection'
  /** Edges of current page */
  edges: Array<ArtistConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Artist Connection */
export type ArtistConnectionEdge = Edge & {
  __typename?: 'ArtistConnectionEdge'
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Artist node */
  node: Artist
}

/** Cursor connection paramaters */
export type ArtistCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
}

/** Filter for paginated artists */
export type ArtistCursorFilterArgs = {
  /** Specify whether artist already has at least one minted release */
  hasMintedRelease?: InputMaybe<Scalars['Boolean']>
  /** Specify season to be filtered */
  season?: InputMaybe<ArtistSeason>
}

/** Default reference artist minting release options for administration */
export type ArtistDefaultOptions = {
  __typename?: 'ArtistDefaultOptions'
  /** Auction options union based on type */
  auction: Array<Auction>
}

/** Artist invite entity to manage artist invitations */
export type ArtistInvite = {
  __typename?: 'ArtistInvite'
  /** Date of invite creation */
  createdAt: Scalars['DateTime']
  /** Artist identifier */
  id: Scalars['ID']
  /** User that receives invitation */
  invitee: User
  /** User that sent invitation */
  inviter: Artist
  /** Status of invitation */
  status: Scalars['String']
}

/** Artist meta configuration input */
export type ArtistMetaInput = {
  /** Gem Collection URL */
  gemCollectionUrl?: InputMaybe<Scalars['URL']>
}

/** Filter artist minted releases based on whether artist uploaded release or artist is credited on a split */
export type ArtistMintedReleasesCursorFilterArgs = {
  /** Includes songs where that artist has a split */
  appearsOn?: InputMaybe<Scalars['Boolean']>
  /** Includes songs uploaded by artist */
  sounds?: InputMaybe<Scalars['Boolean']>
}

/** Filter for artist minted releases */
export type ArtistMintedReleasesFilter = {
  /** Filter if the release has credit splits */
  hasCreditSplits?: InputMaybe<Scalars['Boolean']>
}

/** Artist minting release options */
export type ArtistReleaseOptions = {
  __typename?: 'ArtistReleaseOptions'
  /** Auction options union based on type */
  auction: Array<Auction>
  /** Artist has no time restriction for minting */
  hasNoTimeRestriction: Scalars['Boolean']
  /** Does the artist have access to splits functionality */
  hasSplitsAccess: Scalars['Boolean']
}

/** Types of seasons for artists */
export const ArtistSeason = {
  Genesis: 'GENESIS',
  SeasonOne: 'SEASON_ONE',
  SeasonThree: 'SEASON_THREE',
  SeasonTwo: 'SEASON_TWO',
} as const

export type ArtistSeason = typeof ArtistSeason[keyof typeof ArtistSeason]
/** Union of auction sale types */
export type Auction = PermissionedAuction | PermissionlessAuction | RangeBoundAuction

/** Release info upload step info */
export type AuctionConfigurationUploadStepInfo = {
  __typename?: 'AuctionConfigurationUploadStepInfo'
  /** Type of auction */
  auctionType: AuctionType
  /** Min mint supply of auction */
  minQuantity: Scalars['Int']
  /** Max mint supply of auction */
  permissionedQuantity: Scalars['Int']
  /** Presale mint auction configurations */
  presaleMint?: Maybe<AuctionUploadStepInfo>
  /** Public mint auction configurations */
  publicMint: AuctionUploadStepInfo
}

/** Release auction configuration upload step input values */
export type AuctionConfigurationUploadStepInput = {
  /** Type of auction */
  auctionType: AuctionType
  /** Min mint supply of auction */
  minQuantity: Scalars['Int']
  /** Max mint supply of auction */
  permissionedQuantity: Scalars['Int']
  /** Presale mint auction configurations */
  presaleMint?: InputMaybe<AuctionUploadStepInput>
  /** Public mint auction configurations */
  publicMint: AuctionUploadStepInput
}

/** Customize auction options based on type of sale */
export type AuctionInputRef = {
  /** Permissioned sales */
  permissioned?: InputMaybe<PermissionedAuctionInput>
  /** Permissionless sales */
  permissionless?: InputMaybe<PermissionlessAuctionInput>
  /** Range bound sales */
  rangeBound?: InputMaybe<RangeBoundAuctionInput>
}

/** Special meta options relation to auction */
export type AuctionMetaInput = {
  /** Allow split functionality */
  hasSplitsAccess: Scalars['Boolean']
}

/** Types of release sales */
export const AuctionType = {
  Permissioned: 'PERMISSIONED',
  Permissionless: 'PERMISSIONLESS',
  RangeBound: 'RANGE_BOUND',
} as const

export type AuctionType = typeof AuctionType[keyof typeof AuctionType]
/** Release info upload step info */
export type AuctionUploadStepInfo = {
  __typename?: 'AuctionUploadStepInfo'
  /** List of public addresses to allow for auction */
  allowList: Array<Scalars['String']>
  /** Price per mint */
  price: Scalars['Float']
  /** Max supply for auction */
  quantity: Scalars['Int']
  /** Start time of auction */
  startTime: Scalars['Int']
}

/** Release rewards upload step input values */
export type AuctionUploadStepInput = {
  /** List of public addresses to allow for auction */
  allowList: Array<Scalars['Address']>
  /** Price per mint */
  price: Scalars['Float']
  /** Max supply for auction */
  quantity: Scalars['Int']
  /** Auction start time */
  startTime: Scalars['Int']
}

/** Input for selectSongSlotUsingChainData mutation */
export type ChainDataSongSlotSelection = {
  /** Amount paid in Wei */
  amountPaidInWei: Scalars['String']
  /** Block number of NFT */
  blockNumber: Scalars['Int']
  /** Contract address of release */
  contractAddress: Scalars['Address']
  /** Chosen song slot */
  songSlot: Scalars['Int']
  /** Chain token identifier */
  tokenId: Scalars['String']
}

/** Input of "changeRoleForUser" mutation */
export type ChangeRoleInput = {
  /** Wallet public address of user */
  publicAddress: Scalars['Address']
  /** Role to be set for specified user */
  role: AlterRole
  /** Set if specified role is going to be enabled or disabled */
  value: Scalars['Boolean']
}

/** Chat Channel entity */
export type ChatChannel = {
  __typename?: 'ChatChannel'
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
  __typename?: 'ChatChannelMember'
  /** Date of creation of member in chat channel */
  createdAt: Scalars['DateTime']
  /** Unique identifier of Chat Channel Member entity */
  id: Scalars['ID']
  /** Role of member in chat channel */
  role: Scalars['String']
  /** User entity of member */
  user: User
}

/** Member type in chat channels */
export const ChatChannelMemberType = {
  Admin: 'ADMIN',
  Artist: 'ARTIST',
  Participant: 'PARTICIPANT',
  ReleaseHolder: 'RELEASE_HOLDER',
} as const

export type ChatChannelMemberType = typeof ChatChannelMemberType[keyof typeof ChatChannelMemberType]
/** Types of chat channel permissions */
export const ChatChannelPermissionType = {
  Admin: 'ADMIN',
  All: 'ALL',
  Artist: 'ARTIST',
  AuthUser: 'AUTH_USER',
  SoundHolders: 'SOUND_HOLDERS',
} as const

export type ChatChannelPermissionType = typeof ChatChannelPermissionType[keyof typeof ChatChannelPermissionType]
/** Chat Channel Type */
export const ChatChannelType = {
  Artist: 'ARTIST',
  Direct: 'DIRECT',
  Group: 'GROUP',
  Homepage: 'HOMEPAGE',
  Release: 'RELEASE',
  Unknown: 'UNKNOWN',
} as const

export type ChatChannelType = typeof ChatChannelType[keyof typeof ChatChannelType]
/** Chat message entity */
export type ChatMessage = Node & {
  __typename?: 'ChatMessage'
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
  __typename?: 'ChatMessageConnectionEdge'
  /** Pagination cursor */
  cursor: Scalars['String']
  /** Chat message node */
  node: ChatMessage
}

/** Chat message status */
export const ChatMessageStatus = {
  Hidden: 'HIDDEN',
  Visible: 'VISIBLE',
} as const

export type ChatMessageStatus = typeof ChatMessageStatus[keyof typeof ChatMessageStatus]
/** Paginated connection of Chat messages */
export type ChatMessagesConnection = Connection & {
  __typename?: 'ChatMessagesConnection'
  /** Edges of current page */
  edges: Array<ChatMessageConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Simplified version of Release entity filtered on the owner public address */
export type CollectedRelease = Node & {
  __typename?: 'CollectedRelease'
  /** Artist of release */
  artist: Artist
  /** Cover image of release */
  coverImage: Media
  /** Release creation date */
  createdAt: Scalars['DateTime']
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
}

/** Paginated collected releases connection */
export type CollectedReleaseConnection = Connection & {
  __typename?: 'CollectedReleaseConnection'
  /** Edges of current page */
  edges: Array<CollectedReleaseConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Collected Release Connection */
export type CollectedReleaseConnectionEdge = Edge & {
  __typename?: 'CollectedReleaseConnectionEdge'
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Collected Release node */
  node: CollectedRelease
}

/** Comment entity */
export type Comment = {
  __typename?: 'Comment'
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

/** Contract methods of transactions */
export const ContractMethod = {
  ArtistCreatorCreateArtist: 'ARTIST_CREATOR__CREATE_ARTIST',
  ArtistBuyEdition: 'ARTIST__BUY_EDITION',
  ArtistCreateEdition: 'ARTIST__CREATE_EDITION',
  ArtistWithdrawFunds: 'ARTIST__WITHDRAW_FUNDS',
  SplitMainCreateSplit: 'SPLIT_MAIN__CREATE_SPLIT',
  SplitMainDistributeEth: 'SPLIT_MAIN__DISTRIBUTE_ETH',
  SplitMainWithdraw: 'SPLIT_MAIN__WITHDRAW',
} as const

export type ContractMethod = typeof ContractMethod[keyof typeof ContractMethod]
/** Contract type, currently the playform only supports "ARTIST" */
export const ContractType = {
  Artist: 'ARTIST',
} as const

export type ContractType = typeof ContractType[keyof typeof ContractType]
/** Input for createChatChannel mutation */
export type CreateChatChannelInput = {
  /** Optional associationId to be paired with "type" */
  associationId?: InputMaybe<Scalars['UUID']>
  /** Name for new chat channel */
  name: Scalars['String']
  /** Type of new chat channel */
  type: ChatChannelType
}

/** Input for createKeyClient mutation */
export type CreateKeyClient = {
  /** Human-readable name of Key Client to be created */
  name: Scalars['NonEmptyString']
  /** Set the initial status of the specified Key Client */
  status?: KeyClientStatus
}

/** Input for createPresale mutation */
export type CreatePresaleInput = {
  /** How many minutes before the public sale */
  minutesBefore: Scalars['Int']
  /** Customize how many seconds of buffer are given to whitelist transactions expirations */
  pendingTxSecondsBuffer?: InputMaybe<Scalars['Int']>
  /** How many NFTs to be sold for presale */
  presaleAmount: Scalars['Int']
  /** Presale Configuration identifier */
  presaleConfigurationId: Scalars['UUID']
  /** Media associated with new Presale */
  presaleMedia?: InputMaybe<Array<PresaleMediaInput>>
  /** Whitelist rules for new presale */
  whitelistRule: Array<WhitelistRuleInput>
}

/** Input for createRelease mutation */
export type CreateReleaseInput = {
  /** Behind the music text */
  behindTheMusic: Scalars['String']
  /** Cover image */
  coverImage: UploadedMedia
  /** Release description */
  description?: InputMaybe<Scalars['String']>
  /** Release genre */
  genre: Scalars['String']
  /** Special golden egg image */
  goldenEggImage: UploadedMedia
  /** Custom rewards */
  rewards?: InputMaybe<Array<RewardInput>>
  /** Title of release */
  title: Scalars['String']
  /** Uploaded tracks */
  tracks: Array<TrackUpload>
  /** Release type */
  type: ReleaseType
}

/** Credit allocation entity */
export type CreditAllocation = {
  __typename?: 'CreditAllocation'
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

/** Credit allocation upload step info */
export type CreditAllocationUploadStepInfo = {
  __typename?: 'CreditAllocationUploadStepInfo'
  /** Owner public address of allocation */
  ownerAddress: Scalars['String']
  /** Percent of allocation */
  percent: Scalars['Float']
  /** Roles associated with credit allocation */
  roles: Array<CreditRoleType>
}

/** Credit role type */
export const CreditRoleType = {
  Artist: 'ARTIST',
  Curator: 'CURATOR',
  Other: 'OTHER',
  Producer: 'PRODUCER',
  Songwriter: 'SONGWRITER',
} as const

export type CreditRoleType = typeof CreditRoleType[keyof typeof CreditRoleType]
/** Credit split entity */
export type CreditSplit = {
  __typename?: 'CreditSplit'
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
  __typename?: 'Currencies'
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

/** Input fields to delete shelf */
export type DeleteShelfInput = {
  /** Shelf id to delete */
  shelfId: Scalars['UUID']
}

/** Input for setQueueDisabledArtists mutation */
export type DisabledQueueArtistInput = {
  /** List of artists to disable queue functionality */
  artists: Array<Scalars['String']>
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
  __typename?: 'EggGame'
  /** Block hash of egg game calculation */
  finalSerialBlockHash: Scalars['String']
  /** EggGame identifier */
  id: Scalars['ID']
  /** Nft of egg game winner */
  nft: Nft
  /** Serial number of nft with egg game */
  winningSerialNum: Scalars['Int']
}

/** Base Error */
export type Error = {
  /** Descriptive message of error */
  message: Scalars['String']
}

/** Event type */
export const EventType = {
  EditionPurchased: 'EDITION_PURCHASED',
  OrdersMatched: 'ORDERS_MATCHED',
  Transfer: 'TRANSFER',
  Unknown: 'UNKNOWN',
} as const

export type EventType = typeof EventType[keyof typeof EventType]
/** Event entity */
export type EventV2 = Node & {
  __typename?: 'EventV2'
  /** Artist contract address */
  artistContractAddress: Scalars['String']
  /** Timestamp on blockchain of event */
  blockTimestamp: Scalars['DateTime']
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

/** Feature flag entity to describe flagged functionality */
export type FeatureFlag = {
  __typename?: 'FeatureFlag'
  /** Creation date of feature flag */
  createdAt: Scalars['DateTime']
  /** Feature flag UUID */
  id: Scalars['ID']
  /** Name of feature flag */
  name: Scalars['String']
  /** Last update of feature flag value */
  updatedAt: Scalars['DateTime']
  /** Arbitrary string value, it could be need to be parsed stringified json */
  value: Scalars['String']
}

/** Type of feature to be set */
export const FeatureType = {
  Chat: 'CHAT',
  Queue: 'QUEUE',
  Release: 'RELEASE',
  Splits: 'SPLITS',
} as const

export type FeatureType = typeof FeatureType[keyof typeof FeatureType]
/** Filter Key Clients pagination */
export type FilterKeyClients = {
  status?: InputMaybe<Array<KeyClientStatus>>
}

/** Type of rules flags to be set for presale requirements */
export const FlagType = {
  /** Whitelist all artist holders */
  AllArtistHolders: 'ALL_ARTIST_HOLDERS',
  /** Whitelist all sound holders */
  AllSoundHolders: 'ALL_SOUND_HOLDERS',
  /** Any user is eligible for whitelist */
  UnrestrictedWhitelist: 'UNRESTRICTED_WHITELIST',
} as const

export type FlagType = typeof FlagType[keyof typeof FlagType]
/** Input fields to follow user */
export type FollowUserInput = {
  /** User id to follow */
  user: Scalars['UUID']
}

/** Result of manually synchronizing transactions */
export type ForceSyncPendingTransactionsInfo = {
  __typename?: 'ForceSyncPendingTransactionsInfo'
  /** How many transactions updates failed. Check runtime logs for more information */
  failed: Scalars['Int']
  /** How many transactions updates were processed successfully */
  ok: Scalars['Int']
  /** Hash of transactions found as pending */
  transactionHashes: Array<Scalars['String']>
}

/** Genre entity */
export type Genre = {
  __typename?: 'Genre'
  /** Date of creation */
  createdAt: Scalars['DateTime']
  /** Genre associated UUID */
  id: Scalars['ID']
  /** Genre name */
  name: Scalars['String']
  /** Date of last update of genre */
  updatedAt: Scalars['DateTime']
}

/** User+Release specific queue status entity */
export type GetQueueStatus = {
  __typename?: 'GetQueueStatus'
  /** User UUID */
  id: Scalars['ID']
  /** Is user eligible to join the release queue */
  isEligible?: Maybe<Scalars['Boolean']>
  /** Is user currently in waiting queue */
  isInQueue: Scalars['Boolean']
  /** Is current queue sale schedule sold out */
  isSoldOut?: Maybe<Scalars['Boolean']>
  /** Presale configuration associated with queue status */
  presaleConfig?: Maybe<PresaleConfiguration>
  /** Whitelist information if queue has been transfered to whitelist */
  whitelistInfo?: Maybe<WhitelistObj>
}

/** Input field to check if auth user is following */
export type IsFollowingInput = {
  /** User id to check if auth user is following */
  user: Scalars['UUID']
}

/** Client key management entity */
export type KeyClient = Node & {
  __typename?: 'KeyClient'
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

/** Paginated connection of Key Clients */
export type KeyClientConnection = Connection & {
  __typename?: 'KeyClientConnection'
  /** Edges of current page */
  edges: Array<KeyClientConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Key Client Connection */
export type KeyClientConnectionEdge = Edge & {
  __typename?: 'KeyClientConnectionEdge'
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Key Client node */
  node: KeyClient
}

/** Cursor connection paramaters */
export type KeyClientCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 50 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 50 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Sort the key clients ascending or descending relative to the entity creation date */
  sort?: SortOrder
}

/** Status of Key Client */
export const KeyClientStatus = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
} as const

export type KeyClientStatus = typeof KeyClientStatus[keyof typeof KeyClientStatus]
/** Paginated latest sales events */
export type LatestSalesConnection = Connection & {
  __typename?: 'LatestSalesConnection'
  /** Edges of current page */
  edges: Array<LatestSalesConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of LatestSales Connection */
export type LatestSalesConnectionEdge = Edge & {
  __typename?: 'LatestSalesConnectionEdge'
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

/** Given string doesn't have the minimum expected length */
export type LengthError = Error & {
  __typename?: 'LengthError'
  /** Descriptive message of error */
  message: Scalars['String']
  /** Minimum string length required */
  minLength: Scalars['Int']
}

/** License for the release */
export const LicenseType = {
  AllRightsReserved: 'ALL_RIGHTS_RESERVED',
  CreativeCommons: 'CREATIVE_COMMONS',
} as const

export type LicenseType = typeof LicenseType[keyof typeof LicenseType]
/** Media entity */
export type Media = {
  __typename?: 'Media'
  /** AWS S3 Bucket */
  bucket: Scalars['String']
  /** Media entity identifier */
  id: Scalars['ID']
  /** AWS S3 File key */
  key: Scalars['String']
  /** CDN Url */
  url: Scalars['String']
}

/** Type of media entity, either Images or Audio */
export const MediaType = {
  ArtistBannerImage: 'ARTIST_BANNER_IMAGE',
  Audio: 'AUDIO',
  AudioTranscoded: 'AUDIO_TRANSCODED',
  AvatarImage: 'AVATAR_IMAGE',
  ReleaseBannerImage: 'RELEASE_BANNER_IMAGE',
  ReleaseCoverImage: 'RELEASE_COVER_IMAGE',
  ReleaseGoldenEggImage: 'RELEASE_GOLDEN_EGG_IMAGE',
  UserBannerImage: 'USER_BANNER_IMAGE',
} as const

export type MediaType = typeof MediaType[keyof typeof MediaType]
/** Release info upload step info */
export type MediaUploadStepInfo = {
  __typename?: 'MediaUploadStepInfo'
  /** Media type to be uploaded */
  mediaType: MediaType
  /** Upload key received from Query.signedUploadParams */
  uploadKey: Scalars['String']
}

/** Merkle tree entity */
export type MerkleTree = {
  __typename?: 'MerkleTree'
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
  __typename?: 'MerkleTreeProof'
  /** Merkle proof */
  proof: Array<Scalars['String']>
  /** Unhashed leaf in merkle tree */
  unhashedLeaf?: Maybe<Scalars['String']>
}

/** Release info upload step info */
export type MetadataUploadStepInfo = {
  __typename?: 'MetadataUploadStepInfo'
  /** Release beats per minute */
  beatsPerMinute?: Maybe<Scalars['Int']>
  /** Release key */
  key?: Maybe<SongKeyType>
  /** License for the release */
  license?: Maybe<LicenseType>
  /** Location where the release was created */
  location?: Maybe<Scalars['CountryCode']>
  /** Release lyrics */
  lyrics?: Maybe<Scalars['String']>
}

/** Release metadata upload step input values */
export type MetadataUploadStepInput = {
  /** Release beats per minute */
  beatsPerMinute?: InputMaybe<Scalars['Int']>
  /** Release key */
  key?: InputMaybe<SongKeyType>
  /** License for the release */
  license?: InputMaybe<LicenseType>
  /** Location where the release was created */
  location?: InputMaybe<Scalars['CountryCode']>
  /** Release lyrics */
  lyrics?: InputMaybe<Scalars['String']>
}

/** Mint current time status */
export const MintTimeStatus = {
  Past: 'PAST',
  Upcoming: 'UPCOMING',
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
  __typename?: 'Mutation'
  /** [ADMIN] Accept or reject artist invitation */
  acceptOrRejectArtist: ArtistInvite
  /** [ADMIN] Add sale schedule to specified Presale Configuration */
  addSaleSchedule: SaleSchedule
  /** [ADMIN] Add a public address as shadow banned */
  addShadowBanAddress: Array<ShadowBannedAddress>
  /** [ADMIN] Add Signing Key to specified artist contract */
  addSigningKey?: Maybe<Scalars['Void']>
  /** [ADMIN | ARTIST_RELATIONS] Configure auction meta options of specific artist */
  artistAuctionMeta: ArtistAuctionOverrides
  /** [ADMIN | ARTIST_RELATIONS] Configure specific artist minting options */
  artistMintingOption: ArtistAuctionOverrides
  /** [ADMIN] Change the role of a specified user */
  changeRoleForUser: UserRoles
  /** [ARTIST] Upsert release mint edition creation from the client-side. An alternative to wait until the transaction is completed and automatically acknowledged on background processes. */
  clientCreateEditionUpsert: Release
  /** [AUTHENTICATED] Upsert bought NFT entity from the client-side. An alternative to wait until the transaction is completed and automatically acknowledged on background processes */
  clientNftUpsert?: Maybe<Nft>
  /** [AUTHENTICATED] Create artist entity for authenticated user, User has to be allowed to create artist profile beforehand */
  createArtist: User
  /** [ADMIN] Create chat channel */
  createChatChannel: ChatChannel
  /** [ARTIST] Create credit split for specified release */
  createCreditSplit: CreditSplit
  /** [ADMIN] Create Key Client */
  createKeyClient: KeyClient
  /** [ADMIN | ARTIST] Create a new presale for specified Presale Configuration */
  createPresale: SaleSchedule
  /** [ARTIST] Create release */
  createRelease: Release
  /** [ADMIN] Delete specified sale schedule */
  deleteSaleSchedule: Scalars['Void']
  /** [AUTHENTICATED] Delete shelf for user */
  deleteShelf?: Maybe<Scalars['Void']>
  /** [ARTIST] Delete unminted release */
  deleteUnmintedRelease: Release
  /** [ADMIN] Flush all the PENDING whitelist rows to be set as FAILED */
  flushWhitelistRows?: Maybe<Scalars['Void']>
  /** [AUTHENTICATED] Follow user of input userId */
  followUser: UserRelation
  /** [ADMIN] Manually sync pending transactions */
  forceSyncPendingTransactions: ForceSyncPendingTransactionsInfo
  /** [PUBLIC] Generate auth challenge for given public address and give back new nonce */
  generateAuthChallenge: Scalars['Int']
  /** [ADMIN] Invalidate API Metadata of specified artist */
  invalidateMetadata?: Maybe<Scalars['Void']>
  /** [ARTIST] Invite another user to be artist on the platform */
  inviteArtist: ArtistInvite
  /** [PUBLIC] Check if specified queue is open */
  isQueueOpen?: Maybe<Scalars['Boolean']>
  /** [AUTHENTICATED] Join the queue of specified release. If the release sale hasn't started yet it fails. Please use "isQueueOpen" mutation to prevent issues with timing of mutation */
  joinQueue: Queue
  /** [AUTHENTICATED] Leave the queue of specified release */
  leaveQueue?: Maybe<Queue>
  /** [AUTHENTICATED] Move shelf index down and swap */
  moveShelfDown: Array<Shelf>
  /** [AUTHENTICATED] Move shelf index up and swap */
  moveShelfUp: Array<Shelf>
  /** [ARTIST] Prepare release to be minted, pinning media files */
  prepareMint: Release
  /** [AUTHENTICATED] Manually register transaction of nft buy */
  registerBuyEditionTx: Transaction
  /** [ARTIST] Manually register transaction of artist contract creation */
  registerCreateArtistTx: Transaction
  /** [ARTIST] Manually register split transaction */
  registerCreateSplitTx: Transaction
  /** [ARTIST] Manually register transaction of minted release */
  registerReleaseMintTx: Transaction
  /** [AUTHENTICATED] Register transaction replacement */
  registerReplacementTx: Transaction
  /** [AUTHENTICATED] Register split balance distribution transaction */
  registerSplitBalanceTx: Transaction
  /** [AUTHENTICATED] Register withdraw from split transaction */
  registerWithdrawFromSplitTx: Transaction
  /** [AUTHENTICATED] Manually register transaction to withdraw funds */
  registerWithdrawFundsTx: Transaction
  /** [ADMIN] Remove public address from shadow ban list */
  removeShadowBanAddress: Array<ShadowBannedAddress>
  /** [PUBLIC] Report a track play session stop */
  reportPlayStopped?: Maybe<Scalars['Void']>
  /** [AUTHENTICATED] Reset twitter handle of authenticated user */
  resetTwitter: User
  /** [ADMIN] Configure season-based meta-auction options */
  seasonAuctionMeta: SeasonAuctionDefaults
  /** [ADMIN] Change season-based auction options */
  seasonMintingOption: SeasonAuctionDefaults
  /** [AUTHENTICATED] Select song slot using chain data instead of NFT identifier */
  selectSongSlotUsingChainData: Nft
  /** [AUTHENTICATED] Select song slot for owned NFT */
  selectSongSlotUsingNftId: Nft
  /** [AUTHENTICATED] Send chat message to specified channel if allowed */
  sendChatMessage: Scalars['ID']
  /** [ARTIST_RELATIONS | ADMIN] Set artist metadata */
  setArtistMeta: Artist
  /** [ADMIN] Manually set the last processed block number, used primarily by sound.xyz watcher */
  setBlockNumber: Scalars['String']
  /** [AUTHENTICATED] Set comment for specified Nft */
  setComment: Nft
  /** [ARTIST] Set special configurations into artist entity */
  setContractArgs: Artist
  /** [AUTHENTICATED] Update authenticated user display name */
  setDisplayName: User
  /** [ADMIN] Set the currently enabled users with chat */
  setEnabledChatUsers: Array<ChatChannelPermissionType>
  /** [ADMIN] Set specified feature flag as defined */
  setFeatureFlag: FeatureFlag
  /** [AUTHENTICATED] Update releases to be returned in featured sounds */
  setFeaturedSounds: User
  /** [ADMIN] Set the invite limit for specified artist */
  setInviteLimit: User
  /** [ADMIN] Set if Queue Captcha is disabled for specified release */
  setMainQueueCaptchaDisabled: Scalars['Boolean']
  /** [ADMIN] Set the whitelisted artists to have no time restrictions for minting */
  setNoTimeRestrictionArtistList: Array<Scalars['String']>
  /** [ADMIN] Set the number of top collectors of specified artist */
  setNumTopCollectors?: Maybe<Scalars['Void']>
  /** [ARTIST | ADMIN] Set the release presale configuration (Doesn't include presales, for presales "createPresale" mutation) */
  setPresaleConfiguration: PresaleConfiguration
  /** [ADMIN] Set the currently-disabled list of artist without queue */
  setQueueDisabledArtists: QueueDisabledArtists
  /** [ADMIN] Set if the release can be minted more than once */
  setReleaseCanBeMintedMoreThanOnce: Scalars['Boolean']
  /** [ADMIN | ARTIST_RELATIONS] Set details of release */
  setReleaseDetails: Release
  /** [ADMIN | ARTIST_RELATIONS] Set special metadata of release */
  setReleaseMeta: Release
  /** [AUTHENTICATED] Set input list of releaseIds to input shelfId */
  setReleasesForShelf: Shelf
  /** [ADMIN] Set season for specified artist */
  setSeasonForArtist: Artist
  /** [ADMIN | ARTIST_RELATIONS] Set artist role to specified public address */
  setUserArtistRole: User
  /** [AUTHENTICATED] Unfollow user of input userId */
  unfollowUser: UserRelation
  /** [ARTIST | ARTIST_RELATIONS | ADMIN] Update specified/authenticated artist OpenSea collection URL */
  updateArtistOpenseaHandle: User
  /** [ARTIST] Update authenticated artist Spotify URL */
  updateArtistSpotifyUrl: Artist
  /** [AUTHENTICATED] Update authenticated user description */
  updateDescription: User
  /** [AUTHENTICATED] Update authenticated user email */
  updateEmail: User
  /** [ADMIN] Update existing Key Client */
  updateKeyClient: KeyClient
  /** [ARTIST] Update release */
  updateRelease: Release
  /** [ADMIN] Update the specified sale schedule */
  updateSalesSchedule: SaleSchedule
  /** [AUTHENTICATED] Update authenticated user Instagram handle */
  updateUserInstagramHandle: User
  /** [AUTHENTICATED] Upload media content for authenticated user's profile */
  uploadUserMedia: User
  /** [ARTIST] Upsert artist banner image */
  upsertArtistBannerImage: Artist
  /** [AUTHENTICATED] Upsert shelf for user. If id is passed in as input, mutation will update shelf. Otherwise, mutation will create new shelf */
  upsertShelf: Shelf
  /** [ARTIST] Update or create upload step of release */
  upsertUploadStep: UploadStep
  /** [PUBLIC] Verify given auth challenge */
  verifyAuthChallenge: Scalars['String']
  /** [AUTHENTICATED] Verify twitter handle */
  verifyTwitter: User
}

/** Mutations */
export type MutationAcceptOrRejectArtistArgs = {
  inviteId: Scalars['UUID']
  isAccepted: Scalars['Boolean']
}

/** Mutations */
export type MutationAddSaleScheduleArgs = {
  presaleConfigurationId: Scalars['UUID']
  saleSchedule: SaleScheduleInput
}

/** Mutations */
export type MutationAddShadowBanAddressArgs = {
  publicAddress: Scalars['Address']
  reason?: InputMaybe<Scalars['String']>
}

/** Mutations */
export type MutationAddSigningKeyArgs = {
  artistContractAddress?: InputMaybe<Scalars['Address']>
  privateKey: Scalars['String']
}

/** Mutations */
export type MutationArtistAuctionMetaArgs = {
  artistAddress: Scalars['Address']
  metaType?: InputMaybe<AuctionMetaInput>
}

/** Mutations */
export type MutationArtistMintingOptionArgs = {
  artistAddress: Scalars['Address']
  auctionType: AuctionInputRef
}

/** Mutations */
export type MutationChangeRoleForUserArgs = {
  input: ChangeRoleInput
}

/** Mutations */
export type MutationClientCreateEditionUpsertArgs = {
  txHash: Scalars['String']
}

/** Mutations */
export type MutationClientNftUpsertArgs = {
  txHash: Scalars['String']
}

/** Mutations */
export type MutationCreateArtistArgs = {
  soundHandle: Scalars['String']
}

/** Mutations */
export type MutationCreateChatChannelArgs = {
  input: CreateChatChannelInput
}

/** Mutations */
export type MutationCreateCreditSplitArgs = {
  creditAllocations: Array<Allocation>
  creditSplitId?: InputMaybe<Scalars['UUID']>
  releaseId: Scalars['UUID']
}

/** Mutations */
export type MutationCreateKeyClientArgs = {
  input: CreateKeyClient
}

/** Mutations */
export type MutationCreatePresaleArgs = {
  input: CreatePresaleInput
}

/** Mutations */
export type MutationCreateReleaseArgs = {
  input: CreateReleaseInput
}

/** Mutations */
export type MutationDeleteSaleScheduleArgs = {
  saleScheduleId: Scalars['UUID']
}

/** Mutations */
export type MutationDeleteShelfArgs = {
  input: DeleteShelfInput
}

/** Mutations */
export type MutationDeleteUnmintedReleaseArgs = {
  id: Scalars['UUID']
}

/** Mutations */
export type MutationFlushWhitelistRowsArgs = {
  cutOff?: InputMaybe<Scalars['Int']>
  presaleConfigurationId: Scalars['UUID']
}

/** Mutations */
export type MutationFollowUserArgs = {
  input: FollowUserInput
}

/** Mutations */
export type MutationGenerateAuthChallengeArgs = {
  publicAddress: Scalars['String']
}

/** Mutations */
export type MutationInvalidateMetadataArgs = {
  artistSoundHandle?: Scalars['String']
}

/** Mutations */
export type MutationInviteArtistArgs = {
  twitterHandle: Scalars['String']
}

/** Mutations */
export type MutationIsQueueOpenArgs = {
  presaleId: Scalars['UUID']
}

/** Mutations */
export type MutationJoinQueueArgs = {
  captchaCode?: InputMaybe<Scalars['String']>
  releaseId: Scalars['UUID']
}

/** Mutations */
export type MutationLeaveQueueArgs = {
  releaseId: Scalars['UUID']
}

/** Mutations */
export type MutationMoveShelfDownArgs = {
  input: SetShelfOrderInput
}

/** Mutations */
export type MutationMoveShelfUpArgs = {
  input: SetShelfOrderInput
}

/** Mutations */
export type MutationPrepareMintArgs = {
  input: PrepareMintInput
}

/** Mutations */
export type MutationRegisterBuyEditionTxArgs = {
  hash: Scalars['String']
  releaseId: Scalars['UUID']
}

/** Mutations */
export type MutationRegisterCreateArtistTxArgs = {
  hash: Scalars['String']
}

/** Mutations */
export type MutationRegisterCreateSplitTxArgs = {
  creditSplitId: Scalars['UUID']
  hash: Scalars['String']
}

/** Mutations */
export type MutationRegisterReleaseMintTxArgs = {
  hash: Scalars['String']
  releaseId: Scalars['UUID']
}

/** Mutations */
export type MutationRegisterReplacementTxArgs = {
  originalHash: Scalars['String']
  replacementHash: Scalars['String']
}

/** Mutations */
export type MutationRegisterSplitBalanceTxArgs = {
  creditSplitId: Scalars['UUID']
  hash: Scalars['String']
}

/** Mutations */
export type MutationRegisterWithdrawFromSplitTxArgs = {
  hash: Scalars['String']
}

/** Mutations */
export type MutationRegisterWithdrawFundsTxArgs = {
  hash: Scalars['String']
  releaseId: Scalars['UUID']
}

/** Mutations */
export type MutationRemoveShadowBanAddressArgs = {
  publicAddress: Scalars['Address']
}

/** Mutations */
export type MutationReportPlayStoppedArgs = {
  input: ReportPlayStoppedInput
}

/** Mutations */
export type MutationSeasonAuctionMetaArgs = {
  metaType?: InputMaybe<AuctionMetaInput>
  seasonName: Scalars['String']
}

/** Mutations */
export type MutationSeasonMintingOptionArgs = {
  auctionType: AuctionInputRef
  seasonName: Scalars['String']
}

/** Mutations */
export type MutationSelectSongSlotUsingChainDataArgs = {
  input: ChainDataSongSlotSelection
}

/** Mutations */
export type MutationSelectSongSlotUsingNftIdArgs = {
  nftId: Scalars['UUID']
  songSlot: Scalars['Int']
}

/** Mutations */
export type MutationSendChatMessageArgs = {
  input: SendChatMessageInput
}

/** Mutations */
export type MutationSetArtistMetaArgs = {
  input: SetArtistMetaInput
}

/** Mutations */
export type MutationSetBlockNumberArgs = {
  blockNumber: Scalars['String']
}

/** Mutations */
export type MutationSetCommentArgs = {
  message: Scalars['String']
  nftId: Scalars['UUID']
  signature: Scalars['String']
}

/** Mutations */
export type MutationSetContractArgsArgs = {
  name: Scalars['String']
  tokenSymbol: Scalars['String']
}

/** Mutations */
export type MutationSetDisplayNameArgs = {
  displayName: Scalars['String']
}

/** Mutations */
export type MutationSetEnabledChatUsersArgs = {
  channelPermissions: Array<ChatChannelPermissionType>
}

/** Mutations */
export type MutationSetFeatureFlagArgs = {
  name: Scalars['String']
  type: FeatureType
  value: Scalars['String']
}

/** Mutations */
export type MutationSetFeaturedSoundsArgs = {
  releaseIds: Array<Scalars['UUID']>
}

/** Mutations */
export type MutationSetInviteLimitArgs = {
  artistAddress: Scalars['Address']
  inviteLimit: Scalars['Int']
}

/** Mutations */
export type MutationSetMainQueueCaptchaDisabledArgs = {
  isDisabled: Scalars['Boolean']
  releaseId: Scalars['String']
}

/** Mutations */
export type MutationSetNoTimeRestrictionArtistListArgs = {
  newArtists: Array<Scalars['String']>
  shouldAppend: Scalars['Boolean']
}

/** Mutations */
export type MutationSetNumTopCollectorsArgs = {
  artistId: Scalars['UUID']
  numTop: Scalars['Int']
}

/** Mutations */
export type MutationSetPresaleConfigurationArgs = {
  data: PresaleConfigurationInput
}

/** Mutations */
export type MutationSetQueueDisabledArtistsArgs = {
  input: DisabledQueueArtistInput
}

/** Mutations */
export type MutationSetReleaseCanBeMintedMoreThanOnceArgs = {
  releaseId: Scalars['UUID']
  value: Scalars['Boolean']
}

/** Mutations */
export type MutationSetReleaseDetailsArgs = {
  input: SetReleaseDetailsInput
}

/** Mutations */
export type MutationSetReleaseMetaArgs = {
  input: SetReleaseMetaInput
}

/** Mutations */
export type MutationSetReleasesForShelfArgs = {
  input: SetReleasesForShelfInput
}

/** Mutations */
export type MutationSetSeasonForArtistArgs = {
  artistId: Scalars['UUID']
  season: Scalars['String']
}

/** Mutations */
export type MutationSetUserArtistRoleArgs = {
  hasArtistRole: Scalars['Boolean']
  publicAddress: Scalars['Address']
}

/** Mutations */
export type MutationUnfollowUserArgs = {
  input: UnfollowUserInput
}

/** Mutations */
export type MutationUpdateArtistOpenseaHandleArgs = {
  artistAddress?: InputMaybe<Scalars['Address']>
  openseaCollectionUrl?: InputMaybe<Scalars['URL']>
}

/** Mutations */
export type MutationUpdateArtistSpotifyUrlArgs = {
  spotifyUrl?: InputMaybe<Scalars['String']>
}

/** Mutations */
export type MutationUpdateDescriptionArgs = {
  description: Scalars['String']
}

/** Mutations */
export type MutationUpdateEmailArgs = {
  email?: InputMaybe<Scalars['EmailAddress']>
}

/** Mutations */
export type MutationUpdateKeyClientArgs = {
  input: UpdateKeyClient
}

/** Mutations */
export type MutationUpdateReleaseArgs = {
  input: UpdateReleaseInput
}

/** Mutations */
export type MutationUpdateSalesScheduleArgs = {
  input: UpdateSaleScheduleInput
}

/** Mutations */
export type MutationUpdateUserInstagramHandleArgs = {
  instagramHandle?: InputMaybe<Scalars['String']>
}

/** Mutations */
export type MutationUploadUserMediaArgs = {
  content: UploadedMedia
}

/** Mutations */
export type MutationUpsertArtistBannerImageArgs = {
  bannerImage: UploadedMedia
}

/** Mutations */
export type MutationUpsertShelfArgs = {
  input: UpsertShelfInput
}

/** Mutations */
export type MutationUpsertUploadStepArgs = {
  input: UpsertReleaseUploadStepInput
}

/** Mutations */
export type MutationVerifyAuthChallengeArgs = {
  publicAddress: Scalars['String']
  signedMessage: Scalars['String']
}

/** Mutations */
export type MutationVerifyTwitterArgs = {
  tweetId: Scalars['String']
  twitterHandle: Scalars['String']
}

/** NFT Entity */
export type Nft = Node & {
  __typename?: 'Nft'
  /** Amount paid in Wei for NFT */
  amountPaidInWei: Scalars['String']
  /** Comment set for NFT */
  comment?: Maybe<Comment>
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
  __typename?: 'NftConnection'
  /** Edges of current page */
  edges: Array<NftConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** NFT Node edge */
export type NftConnectionEdge = Edge & {
  __typename?: 'NftConnectionEdge'
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
  __typename?: 'NftWithComment'
  /** Amount paid in Wei for NFT */
  amountPaidInWei: Scalars['String']
  /** Avatar URL of Nft owner */
  avatarUrl?: Maybe<Scalars['String']>
  /** Comment of NFT */
  comment: Comment
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

/** Input for onChainStartTime query */
export type OnChainStartTimeInput = {
  /** Type of auction type to be used as reference */
  auctionType: AuctionType
  /** Release listening party start date to be used as reference */
  listeningPartyStartDate: Scalars['DateTime']
  /** Release identifier */
  releaseId: Scalars['UUID']
}

/** Require only holders of specific contracts */
export type OnlyTokenHolders = {
  __typename?: 'OnlyTokenHolders'
  /** Token Contract Address */
  tokenContractAddress: Scalars['String']
  /** Token Symbol from Contract */
  tokenSymbol?: Maybe<Scalars['String']>
  /** Token Threshold to qualify on whitelist */
  tokenThresholdToQualify: Scalars['String']
}

/** Input to define configuration for OnlyTokenHolders whitelist rule */
export type OnlyTokenHoldersInput = {
  /** Token Contract public address */
  tokenContractAddress?: InputMaybe<Scalars['Address']>
  /** Token threshold to qualify */
  tokenThresholdToQualify?: InputMaybe<Scalars['String']>
}

/** Input to define configuration for OnlyTokenHolders Media */
export type OnlyTokenHoldersMediaInput = {
  /** Collection Name */
  collectionName?: InputMaybe<Scalars['String']>
  /** URI for Icon Overlay */
  iconOverlayURI?: InputMaybe<Scalars['String']>
  /** List of custom Image URIs */
  imageURIs?: InputMaybe<Array<Scalars['String']>>
  /** Social Links */
  socialLinks?: InputMaybe<SocialLinksInput>
}

/** Require Top Collectors flag */
export type OnlyTopCollectors = {
  __typename?: 'OnlyTopCollectors'
  /** How many of the top collectors are allowed */
  topNum: Scalars['Int']
}

/** Input to define configuration for OnlyTopCollectors whitelist rule */
export type OnlyTopCollectorsInput = {
  /** How many of the first top collectors are allowed for the whitelist rule */
  topNum?: InputMaybe<Scalars['Int']>
}

/** Pagination helper information */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** Cursor shorthand of the last node from current page */
  endCursor?: Maybe<Scalars['String']>
  /** Does the current connection have a next page */
  hasNextPage: Scalars['Boolean']
  /** Does the current connection have a previous page */
  hasPreviousPage: Scalars['Boolean']
  /** Cursor shorthand of the first node from current page */
  startCursor?: Maybe<Scalars['String']>
}

/** Auction options associated with permissioned sales */
export type PermissionedAuction = {
  __typename?: 'PermissionedAuction'
  /** List of different eth prices options */
  priceOptions: Array<Scalars['Float']>
  /** List of different quantity options */
  quantityOptions: Array<Scalars['Int']>
  /** Signing address for minting process */
  signingAddress: Scalars['String']
}

/** Input options to customize permissioned auctions */
export type PermissionedAuctionInput = {
  /** List of different eth prices options */
  priceOptions: Array<Scalars['Float']>
  /** List of different quantity options */
  quantityOptions: Array<Scalars['Int']>
}

/** Auction options associated with permissionless sales */
export type PermissionlessAuction = {
  __typename?: 'PermissionlessAuction'
  /** List of different eth prices options */
  priceOptions: Array<Scalars['Float']>
  /** List of different quantity options */
  quantityOptions: Array<Scalars['Int']>
}

/** Input options to customize permisionless auctions */
export type PermissionlessAuctionInput = {
  /** List of different eth prices options */
  priceOptions: Array<Scalars['Float']>
  /** List of different quantity options */
  quantityOptions: Array<Scalars['Int']>
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
  __typename?: 'PlaylistArtist'
  artistId: Scalars['ID']
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']
  /** Track list */
  tracks: Array<PlaylistTrack>
}

/** Playlist of tracks of a holder' NFTs */
export type PlaylistHolder = Playlist & {
  __typename?: 'PlaylistHolder'
  /** Holder public address */
  holderPublicAddress: Scalars['String']
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']
  /** Track list */
  tracks: Array<PlaylistTrack>
}

/** Playlist used for Homepage and fallback for extra pages */
export type PlaylistHome = Playlist & {
  __typename?: 'PlaylistHome'
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
  __typename?: 'PlaylistTrack'
  /** Artist ID */
  artistId: Scalars['ID']
  /** Track ID */
  id: Scalars['ID']
  /** Release ID */
  releaseId: Scalars['ID']
}

/** Currently supported playlists */
export const PlaylistType = {
  Artist: 'ARTIST',
  Holder: 'HOLDER',
  Home: 'HOME',
} as const

export type PlaylistType = typeof PlaylistType[keyof typeof PlaylistType]
/** Input for updateRelease mutation */
export type PrepareMintInput = {
  /** Auction type */
  auctionType: AuctionType
  /** Release identifier */
  releaseId: Scalars['UUID']
}

/** Main configuration entity of release sale */
export type PresaleConfiguration = {
  __typename?: 'PresaleConfiguration'
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

/** Main input of "setPresaleConfiguration" mutation */
export type PresaleConfigurationInput = {
  /** End time of public release sale */
  endTime: Scalars['DateTime']
  /** Amount to be set available on public release drop */
  presaleAmount: Scalars['String']
  /** Release identifier */
  releaseId: Scalars['UUID']
  /** Start time of public release sale */
  startTime: Scalars['DateTime']
  /** Custom rules to be set for whitelisting process */
  whitelistRule?: InputMaybe<Array<WhitelistRuleInput>>
}

/** Presale Media information */
export type PresaleMediaInfo = {
  __typename?: 'PresaleMediaInfo'
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

/** Sale Schedule media configuration */
export type PresaleMediaInput = {
  /** Media applied used for onlyTokenHolders whitelist rule */
  onlyTokenHolders?: InputMaybe<OnlyTokenHoldersMediaInput>
}

/** Type of presale whitelist algorithm */
export const PresaleType = {
  /** First in first out */
  Fifo: 'FIFO',
} as const

export type PresaleType = typeof PresaleType[keyof typeof PresaleType]
/** Queries */
export type Query = {
  __typename?: 'Query'
  /** [ADMIN | ARTIST_RELATIONS] Get all artist invites of the platform */
  allArtistInvites: Array<ArtistInvite>
  /**
   * [PUBLIC] Get all minted releases. Warning, this query is going to be removed soon, use paginated queries instead
   * @deprecated Use paginated queries instead
   */
  allMintedReleases: Array<Release>
  /** [PUBLIC] Get all minted releases */
  allMintedReleasesPaginated: ReleaseConnection
  /**
   * [ARTIST] Get all unminted releases of authenticated artist
   * @deprecated Use `unmintedReleasesPaginated` instead. Will be removed on September 27, 2022
   */
  allUnmintedReleases: Array<Release>
  /** [PUBLIC] Artist by UUID */
  artist?: Maybe<Artist>
  /** [PUBLIC] Artist by handle */
  artistByHandle?: Maybe<Artist>
  /** Get the nft collectors of the specified artist */
  artistCollectors: ArtistCollectors
  /** [ADMIN | ARTIST_RELATIONS] Default reference artist minting release options of specified artist */
  artistDefaultMintingOptions: ArtistDefaultOptions
  /** [ARTIST] Get all artist invites sent by authenticated artist */
  artistInvites: Array<ArtistInvite>
  /** [ARTIST] Get artist minting options of authenticated artist. Given artist id has to match authenticated artist */
  artistMintingOptions: ArtistReleaseOptions
  /** [ARTIST] Get specified release regardless of mint status. If specified release is not created by authenticated artist, it fails. */
  artistRelease: Release
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
  /** [AUTHENTICATED] Returns whether auth user is following input userId */
  isFollowing: Scalars['Boolean']
  /** [PUBLIC] Check if Queue Captcha is disabled for specified release */
  isMainQueueCaptchaDisabled?: Maybe<Scalars['Boolean']>
  /** [ADMIN] Get all the existing Key Clients */
  keyClients: KeyClientConnection
  /** [PUBLIC] Get the latest events */
  latestEventsPaginated: LatestSalesConnection
  /** [PUBLIC] Get merkle tree information */
  merkleTree: MerkleTree
  /** [PUBLIC] Get merkle tree information */
  merkleTreeProof?: Maybe<MerkleTreeProof>
  /** [PUBLIC] Get minted release by Artist sound handle and release title slug */
  mintedRelease?: Maybe<Release>
  /** [PUBLIC] Get all minted releases of an artist */
  mintedReleases: ReleaseConnection
  /** [PUBLIC] Current UNIX date to test caching */
  now: Scalars['Int']
  /** [PUBLIC] Test query to get the date of calculation of resolver based using response cache */
  nowCached: Scalars['Timestamp']
  /** [ARTIST] Get the amount of top collectors associated with authenticated artist */
  numTopCollectors?: Maybe<Scalars['Int']>
  /** [ARTIST] Get onChainStartTime of specified release */
  onChainStartTime: Scalars['DateTime']
  /** [PUBLIC] Past minted releases */
  pastMintedReleases: ReleaseConnection
  /** [PUBLIC] Get playlist based on given type and associationId */
  playlist?: Maybe<Playlist>
  /** [PUBLIC] Presale Configuration of specified Release */
  presaleConfiguration?: Maybe<PresaleConfiguration>
  /** [AUTHENTICATED] Get list of artists with queue feature disabled */
  queueDisabledArtists?: Maybe<QueueDisabledArtists>
  /** [AUTHENTICATED] Queue status of authenticated user on specified release */
  queueStatus?: Maybe<GetQueueStatus>
  /** [PUBLIC] Get release by id */
  release?: Maybe<Release>
  /** [PUBLIC] Can the specified release be minted more than once */
  releaseCanBeMintedMoreThanOnce: Scalars['Boolean']
  /** [PUBLIC] List of genres that have at least 1 past minted release */
  releaseGenres: Array<Genre>
  /** Search releases or artists based on text inputs */
  search: SearchResult
  /** [ADMIN | ARTIST_RELATIONS] Get default reference season-based auction options */
  seasonDefaultMintingOptions: SeasonDefaultOptions
  /** [ADMIN] Get currently shadow-banned public addresses */
  shadowBanAddresses: Array<ShadowBannedAddress>
  /** [PUBLIC] Get specified shelf by id */
  shelf: Shelf
  /** [ARTIST] Get signature to be used for creating artist contract */
  signature: Scalars['String']
  /** [AUTHENTICATED] Request media upload */
  signedUploadParams: AwsPresignedPost
  /** [ARTIST] Get Signing Address for minting process */
  signingAddress: SigningAddress
  /** [ADMIN | ARTIST_RELATIONS] Get basic stats */
  stats: Stats
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
  /** [ARTIST] Get paginated unminted releases of authenticated artist */
  unmintedReleasesPaginated: ReleaseConnection
  /** [PUBLIC] Upcoming minted releases */
  upcomingMintedReleases: ReleaseConnection
  /** [ARTIST] Get upload steps of specified release */
  uploadSteps: Array<UploadStep>
  /** [PUBLIC] Get specified user by id */
  user?: Maybe<User>
  /** [PUBLIC] Get specified user by public address */
  userByAddress?: Maybe<User>
  /** [PUBLIC] Get specified user by sound handle */
  userByArtistHandle?: Maybe<User>
  /** [AUTHENTICATED] Check status of relationship of authenticated user with specified users */
  userRelationStatuses: Array<UserRelationStatus>
}

/** Queries */
export type QueryAllArtistInvitesArgs = {
  pendingOnly?: InputMaybe<Scalars['Boolean']>
}

/** Queries */
export type QueryAllMintedReleasesPaginatedArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>
  pagination?: MintedReleasesCursorConnectionArgs
}

/** Queries */
export type QueryArtistArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryArtistByHandleArgs = {
  soundHandle: Scalars['String']
}

/** Queries */
export type QueryArtistCollectorsArgs = {
  input: ArtistCollectorsInput
}

/** Queries */
export type QueryArtistDefaultMintingOptionsArgs = {
  artistAddress: Scalars['Address']
}

/** Queries */
export type QueryArtistMintingOptionsArgs = {
  artistId: Scalars['UUID']
}

/** Queries */
export type QueryArtistReleaseArgs = {
  releaseId: Scalars['UUID']
}

/** Queries */
export type QueryArtistsArgs = {
  filter?: InputMaybe<ArtistCursorFilterArgs>
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryAudioFromTrackArgs = {
  trackId: Scalars['UUID']
}

/** Queries */
export type QueryChatMessagesArgs = {
  channelId: Scalars['UUID']
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryCreditSplitArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryDiscoverChatChannelArgs = {
  input: DiscoverChatChannelInput
}

/** Queries */
export type QueryEggGameArgs = {
  releaseId: Scalars['UUID']
}

/** Queries */
export type QueryEligibleUsersForPresaleArgs = {
  presaleConfigurationId: Scalars['UUID']
}

/** Queries */
export type QueryIsFollowingArgs = {
  input: IsFollowingInput
}

/** Queries */
export type QueryIsMainQueueCaptchaDisabledArgs = {
  releaseId: Scalars['String']
}

/** Queries */
export type QueryKeyClientsArgs = {
  filter?: InputMaybe<FilterKeyClients>
  pagination?: KeyClientCursorConnectionArgs
}

/** Queries */
export type QueryLatestEventsPaginatedArgs = {
  filter?: InputMaybe<LatestSalesCursorFilterArgs>
  pagination?: LatestSalesCursorConnectionArgs
}

/** Queries */
export type QueryMerkleTreeArgs = {
  root: Scalars['String']
}

/** Queries */
export type QueryMerkleTreeProofArgs = {
  root: Scalars['String']
  unhashedLeaf: Scalars['String']
}

/** Queries */
export type QueryMintedReleaseArgs = {
  releaseSlug: Scalars['String']
  soundHandle: Scalars['String']
}

/** Queries */
export type QueryMintedReleasesArgs = {
  filter: ArtistMintedReleasesCursorFilterArgs
  id: Scalars['UUID']
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryNowCachedArgs = {
  ttlSeconds?: Scalars['Int']
}

/** Queries */
export type QueryOnChainStartTimeArgs = {
  input: OnChainStartTimeInput
}

/** Queries */
export type QueryPastMintedReleasesArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryPlaylistArgs = {
  input: PlaylistInput
}

/** Queries */
export type QueryPresaleConfigurationArgs = {
  releaseId: Scalars['UUID']
}

/** Queries */
export type QueryQueueStatusArgs = {
  releaseId: Scalars['UUID']
}

/** Queries */
export type QueryReleaseArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryReleaseCanBeMintedMoreThanOnceArgs = {
  releaseId: Scalars['String']
}

/** Queries */
export type QuerySearchArgs = {
  input: SearchInput
}

/** Queries */
export type QuerySeasonDefaultMintingOptionsArgs = {
  seasonName: Scalars['String']
}

/** Queries */
export type QueryShelfArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QuerySignedUploadParamsArgs = {
  uploadRequest: UploadRequest
}

/** Queries */
export type QueryTopNftsOwnedCollectorsArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryTrackArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryTrendingArtistInfoArgs = {
  sort: TrendingArtistsSortEnum
  timePeriod: TimePeriodAggEnum
}

/** Queries */
export type QueryTrendingCollectorsArgs = {
  sort: TrendingCollectorsSortEnum
  timePeriod: TimePeriodAggEnum
}

/** Queries */
export type QueryUnmintedReleasesPaginatedArgs = {
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryUpcomingMintedReleasesArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>
  pagination?: CursorConnectionArgs
}

/** Queries */
export type QueryUploadStepsArgs = {
  releaseId: Scalars['UUID']
}

/** Queries */
export type QueryUserArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryUserByAddressArgs = {
  publicAddress: Scalars['Address']
}

/** Queries */
export type QueryUserByArtistHandleArgs = {
  soundHandle: Scalars['String']
}

/** Queries */
export type QueryUserRelationStatusesArgs = {
  users: Array<Scalars['UUID']>
}

/** Queue entity */
export type Queue = {
  __typename?: 'Queue'
  id: Scalars['ID']
  presaleConfigurationId: Scalars['ID']
  status: QueueStatus
  userId: Scalars['ID']
}

/** Entity for artist with queue feature disabled */
export type QueueDisabledArtists = {
  __typename?: 'QueueDisabledArtists'
  /** List of artists with queue feature disabled */
  disabledArtists: Array<Scalars['String']>
}

/** Types of Queue Status states */
export const QueueStatus = {
  /** Queue position timed out */
  Expired: 'EXPIRED',
  /** Queue was left manually */
  LeftQueue: 'LEFT_QUEUE',
  /** Queue position has been transfered to whitelist */
  TransferredToWhitelist: 'TRANSFERRED_TO_WHITELIST',
  /** Queue active and waiting for updates */
  Waiting: 'WAITING',
} as const

export type QueueStatus = typeof QueueStatus[keyof typeof QueueStatus]
/** Input for queueStatus subscription */
export type QueueStatusSubscriptionInput = {
  /** Authentication token of user */
  authToken: Scalars['String']
  /** Release identifier of queue status to get queue status updates from */
  releaseId: Scalars['UUID']
}

/** Auction options associated with range bound sales */
export type RangeBoundAuction = {
  __typename?: 'RangeBoundAuction'
  /** List of different options of maximum quantity */
  maxOptions: Array<Scalars['Int']>
  /** List of different options of minimum quantity */
  minOptions: Array<Scalars['Int']>
  /** Minting period duration in minutes */
  mintingPeriodMins: Scalars['Int']
  /** List of different eth prices options */
  priceOptions: Array<Scalars['Float']>
  /** Signing address for minting process */
  signingAddress: Scalars['String']
}

/** Input options to customize range bound auctions */
export type RangeBoundAuctionInput = {
  /** List of different options of maximum quantity */
  maxOptions: Array<Scalars['Int']>
  /** List of different options of minimum quantity */
  minOptions: Array<Scalars['Int']>
  /** Minting period duration in minutes */
  mintingPeriodMins: Scalars['Int']
  /** List of different eth prices options */
  priceOptions: Array<Scalars['Float']>
}

/** Release entity */
export type Release = Node & {
  __typename?: 'Release'
  /** Artist of release */
  artist: Artist
  /** Artist contract address */
  artistContractAddress: Scalars['String']
  /** Available balance to withdraw for an edition */
  balanceToWithdraw?: Maybe<Scalars['String']>
  /** Behind the music text */
  behindTheMusic: Scalars['String']
  /** Currently claimed song slots */
  claimedSongSlots: Array<Scalars['Int']>
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
  /** Final quantity for a release. Will be defined once a sale finishes */
  finalQuantity?: Maybe<Scalars['Int']>
  /** Last sale schedule end time as ISO Date String */
  finalSaleScheduleEndTime?: Maybe<Scalars['DateTime']>
  /** Last sale schedule end time as number of milliseconds since the ECMAScript epoch. */
  finalSaleScheduleEndTimestamp?: Maybe<Scalars['Timestamp']>
  /** Public address of address to receive the transactions funds */
  fundingRecipient: Scalars['String']
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
export type ReleaseNftsPaginatedArgs = {
  pagination?: NftCursorConnectionArgs
}

/** Paginated releases connection */
export type ReleaseConnection = Connection & {
  __typename?: 'ReleaseConnection'
  /** Edges of current page */
  edges: Array<ReleaseConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Release Connection */
export type ReleaseConnectionEdge = Edge & {
  __typename?: 'ReleaseConnectionEdge'
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Release node */
  node: Release
}

/** Input values for release admin update */
export type ReleaseDetailsInput = {
  /** Artist story of release */
  behindTheMusic?: InputMaybe<Scalars['String']>
  /** Description of release */
  description?: InputMaybe<Scalars['String']>
  /** Description of golden egg */
  eggDescription?: InputMaybe<Scalars['String']>
  /** Season of release */
  season?: InputMaybe<Scalars['String']>
  /** Title of release */
  title?: InputMaybe<Scalars['String']>
  /** Title slug of release */
  titleSlug?: InputMaybe<Scalars['String']>
  /** E.g. Playlist, Album, EP, Single, Compilation */
  type?: InputMaybe<Scalars['String']>
}

/** Release info upload step info */
export type ReleaseInfoUploadStepInfo = {
  __typename?: 'ReleaseInfoUploadStepInfo'
  /** Behind the music text */
  behindTheMusic: Scalars['String']
  /** Cover image */
  coverImage: MediaUploadStepInfo
  /** Genre */
  genre: Scalars['String']
  /** Title */
  title: Scalars['String']
  /** Token symbol */
  tokenSymbol: Scalars['String']
  /** Uploaded tracks */
  tracks: Array<TrackUploadStepInfo>
  /** Release type */
  type: Scalars['String']
  /** Text to introduce song to supporters */
  welcomeComment: Scalars['String']
}

/** Release info upload step input values */
export type ReleaseInfoUploadStepInput = {
  /** Behind the music text */
  behindTheMusic: Scalars['String']
  /** Cover image */
  coverImage: UploadedMedia
  /** Release genre */
  genre: Scalars['String']
  /** Title */
  title: Scalars['String']
  /** Token symbol */
  tokenSymbol: Scalars['String']
  /** Uploaded tracks */
  tracks: Array<TrackUpload>
  /** Release type */
  type: ReleaseType
  /** Text to introduce song to supporters */
  welcomeComment: Scalars['String']
}

/** Meta input values for release */
export type ReleaseMetaInput = {
  /** Associated laylo.com url */
  layloUrl?: InputMaybe<Scalars['URL']>
}

/** Release current status type */
export const ReleaseStatus = {
  AvailableToMint: 'AVAILABLE_TO_MINT',
  SoldOut: 'SOLD_OUT',
} as const

export type ReleaseStatus = typeof ReleaseStatus[keyof typeof ReleaseStatus]
/** Release type, currently the platform only supports "SINGLE" */
export const ReleaseType = {
  Album: 'ALBUM',
  Compilation: 'COMPILATION',
  Ep: 'EP',
  Playlist: 'PLAYLIST',
  Single: 'SINGLE',
} as const

export type ReleaseType = typeof ReleaseType[keyof typeof ReleaseType]
/** Different upload steps for a release */
export type ReleaseUploadStepInput = {
  /** Auction configuration inputs */
  auctionConfiguration?: InputMaybe<AuctionConfigurationUploadStepInput>
  /** Release metadata upload step inputs */
  metadata?: InputMaybe<MetadataUploadStepInput>
  /** Release info upload step inputs */
  releaseInfo?: InputMaybe<ReleaseInfoUploadStepInput>
  /** Rewards upload step inputs */
  rewards?: InputMaybe<RewardsUploadStepInput>
  /** Credit allocations of credit split */
  splits?: InputMaybe<SplitsUploadStepInput>
}

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
  __typename?: 'RequireAnySoundHolder'
  enabled: Scalars['Boolean']
}

/** Require Artist Sound Holder flag */
export type RequireArtistSoundHolder = {
  __typename?: 'RequireArtistSoundHolder'
  enabled: Scalars['Boolean']
}

/** Require Twitter Verification flag */
export type RequireTwitterVerification = {
  __typename?: 'RequireTwitterVerification'
  enabled: Scalars['Boolean']
}

/** Reward entity */
export type Reward = {
  __typename?: 'Reward'
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

/** Custom rewards input */
export type RewardInput = {
  /** Reward description */
  description: Scalars['String']
  /** Reward name */
  title: Scalars['String']
}

/** Release info upload step info */
export type RewardUploadStepInfo = {
  __typename?: 'RewardUploadStepInfo'
  /** Reward description */
  description: Scalars['String']
  /** Reward name */
  title: Scalars['String']
}

/** Release info upload step info */
export type RewardsUploadStepInfo = {
  __typename?: 'RewardsUploadStepInfo'
  /** Special golden egg image */
  goldenEggImage: MediaUploadStepInfo
  /** Custom rewards */
  rewards: Array<RewardUploadStepInfo>
}

/** Release rewards upload step input values */
export type RewardsUploadStepInput = {
  /** Special golden egg image */
  goldenEggImage: UploadedMedia
  /** Custom rewards */
  rewards?: InputMaybe<Array<RewardInput>>
}

/** Single sale schedule information of Release Presale Configuration */
export type SaleSchedule = {
  __typename?: 'SaleSchedule'
  /** Amount of people to be allowed to be whitelist at the same time, it's usually better to set it as the same as presaleAmount */
  cohortSize: Scalars['Int']
  /** End Time of Sale Schedule */
  endTime: Scalars['DateTime']
  /** UUID of Sale Schedule entity */
  id: Scalars['ID']
  /** Is the current sale schedule presale */
  isPresale: Scalars['Boolean']
  /** Special information related to onlyTokenHolders whitelist rule if present */
  onlyTokenHoldersInfo: Array<PresaleMediaInfo>
  /** Presale amount to be sold */
  presaleAmount: Scalars['Int']
  /** Start Time of Sale Schedule */
  startTime: Scalars['DateTime']
  /** Whitelist Rules of sale schedule */
  whitelistRulesParsed: Array<WhitelistRules>
}

/** Types of Sale Schedule flags */
export const SaleScheduleFlagType = {
  /** This saleSchedule is an open edition */
  OpenEditionEnabled: 'OPEN_EDITION_ENABLED',
} as const

export type SaleScheduleFlagType = typeof SaleScheduleFlagType[keyof typeof SaleScheduleFlagType]
/** Input configuration of sale schedule creation and updates */
export type SaleScheduleInput = {
  /** Amount of people to be allowed to be whitelist at the same time, it's usually better to set it as the same as presaleAmount */
  cohortSize: Scalars['Int']
  /** End time of sale schedule */
  endTime: Scalars['DateTime']
  /** Amount to be allowed to be sold for sale schedule */
  presaleAmount: Scalars['Int']
  /** Custom presale media */
  presaleMedia?: InputMaybe<Array<PresaleMediaInput>>
  /** Start time of sale schedule */
  startTime: Scalars['DateTime']
  /** Custom whitelist rules */
  whitelistRules?: InputMaybe<Array<WhitelistRuleInput>>
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
  __typename?: 'SearchResult'
  /** Artists that match the search input, including artists where any of their releases matches the given input */
  artists: Array<Artist>
  /** Unique identifier of search result */
  id: Scalars['ID']
  /** Releases that match the search input, including releases where the artist name matches the given input */
  releases: Array<Release>
}

/** Season auction defaults for sales */
export type SeasonAuctionDefaults = {
  __typename?: 'SeasonAuctionDefaults'
  /** Creation date of entity */
  createdAt: Scalars['DateTime']
  /** Season auction defaults entity identifier */
  id: Scalars['ID']
  /** Default season */
  season: Scalars['String']
}

/** Default reference season-based auction options for administration */
export type SeasonDefaultOptions = {
  __typename?: 'SeasonDefaultOptions'
  /** Auction options union based on type */
  auction: Array<Auction>
}

/** Input for sendChatMessage mutation */
export type SendChatMessageInput = {
  asAdmin?: InputMaybe<Scalars['Boolean']>
  channelId: Scalars['UUID']
  message: Scalars['String']
  randomUUID: Scalars['UUID']
}

/** Input for setArtistMeta mutation */
export type SetArtistMetaInput = {
  /** Artist identifier */
  artistId: Scalars['String']
  /** Artist meta configuration data */
  metaType?: InputMaybe<ArtistMetaInput>
}

/** Input for setReleaseDetails mutation */
export type SetReleaseDetailsInput = {
  /** Release details input values */
  releaseDetails: ReleaseDetailsInput
  /** Release identifier */
  releaseId: Scalars['String']
}

/** Input for setReleaseMeta mutation */
export type SetReleaseMetaInput = {
  /** Meta input values */
  metaType?: InputMaybe<ReleaseMetaInput>
  /** Release identifier */
  releaseId: Scalars['String']
}

/** Input fields to set releases to shelf */
export type SetReleasesForShelfInput = {
  /** List of releaseIds to set to shelf */
  releaseIds: Array<Scalars['UUID']>
  /** Shelf id to set releases to */
  shelfId: Scalars['UUID']
}

/** Input fields to set index values of user shelves */
export type SetShelfOrderInput = {
  /** ShelfId to set index ordering */
  shelfId: Scalars['UUID']
}

/** Shadow banned address */
export type ShadowBannedAddress = {
  __typename?: 'ShadowBannedAddress'
  /** Date of ban creation */
  createdAt: Scalars['DateTime']
  /** Public address wallet */
  publicAddress: Scalars['String']
  /** Optional reason behind ban */
  reason?: Maybe<Scalars['String']>
}

/** Shelf entity */
export type Shelf = Node & {
  __typename?: 'Shelf'
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
export type ShelfCollectedReleasesArgs = {
  pagination?: ShelfStackCursorConnectionArgs
}

/** Paginated shelves connection */
export type ShelfConnection = Connection & {
  __typename?: 'ShelfConnection'
  /** Edges of current page */
  edges: Array<ShelfConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Shelf Node edge */
export type ShelfConnectionEdge = Edge & {
  __typename?: 'ShelfConnectionEdge'
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
  __typename?: 'ShelfStack'
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

/** Paginated shelf stacks connection */
export type ShelfStackConnection = Connection & {
  __typename?: 'ShelfStackConnection'
  /** Edges of current page */
  edges: Array<ShelfStackConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Shelf stack node edge */
export type ShelfStackConnectionEdge = Edge & {
  __typename?: 'ShelfStackConnectionEdge'
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
  Default: 'DEFAULT',
} as const

export type ShelfType = typeof ShelfType[keyof typeof ShelfType]
/** Signing Address Entity */
export type SigningAddress = {
  __typename?: 'SigningAddress'
  /** Signing Address on chain */
  signingAddress: Scalars['String']
}

/** Social Links */
export type SocialLinks = {
  __typename?: 'SocialLinks'
  /** Instagram Platform */
  instagramLink?: Maybe<Scalars['String']>
  /** OpenSea Platform */
  openseaLink?: Maybe<Scalars['String']>
  /** Twitter Platform */
  twitterLink?: Maybe<Scalars['String']>
}

/** Input for customizing social links */
export type SocialLinksInput = {
  /** Instagram Platform */
  instagramLink?: InputMaybe<Scalars['String']>
  /** OpenSea Platform */
  openseaLink?: InputMaybe<Scalars['String']>
  /** Twitter Platform */
  twitterLink?: InputMaybe<Scalars['String']>
}

/** Key the release was written in */
export const SongKeyType = {
  Key_1D: 'KEY_1D',
  Key_1M: 'KEY_1M',
  Key_2D: 'KEY_2D',
  Key_2M: 'KEY_2M',
  Key_3D: 'KEY_3D',
  Key_3M: 'KEY_3M',
  Key_4D: 'KEY_4D',
  Key_4M: 'KEY_4M',
  Key_5D: 'KEY_5D',
  Key_5M: 'KEY_5M',
  Key_6D: 'KEY_6D',
  Key_6M: 'KEY_6M',
  Key_7D: 'KEY_7D',
  Key_7M: 'KEY_7M',
  Key_8D: 'KEY_8D',
  Key_8M: 'KEY_8M',
  Key_9D: 'KEY_9D',
  Key_9M: 'KEY_9M',
  Key_10D: 'KEY_10D',
  Key_10M: 'KEY_10M',
  Key_11D: 'KEY_11D',
  Key_11M: 'KEY_11M',
  Key_12D: 'KEY_12D',
  Key_12M: 'KEY_12M',
} as const

export type SongKeyType = typeof SongKeyType[keyof typeof SongKeyType]
/** Ascending or Descending sort */
export const SortOrder = {
  Asc: 'ASC',
  Desc: 'DESC',
} as const

export type SortOrder = typeof SortOrder[keyof typeof SortOrder]
/** Splits upload step info */
export type SplitsUploadStepInfo = {
  __typename?: 'SplitsUploadStepInfo'
  /** Splits auction configurations */
  splits: Array<CreditAllocationUploadStepInfo>
}

/** Splits upload step input values */
export type SplitsUploadStepInput = {
  /** Credit allocations of credit split */
  splits: Array<Allocation>
}

/** Basic stats information */
export type Stats = {
  __typename?: 'Stats'
  /** Total artists in the platform */
  totalArtists: Scalars['Float']
  /** Total unique collectors in the platform */
  totalUniqueCollectors: Scalars['Float']
  /** Total users in the platform */
  totalUsers: Scalars['Float']
}

/** Realtime Subscriptions */
export type Subscription = {
  __typename?: 'Subscription'
  /** [PUBLIC] Subscribe to updates of specified chat channel messages */
  chatChannelMessages: ChatMessage
  count: Scalars['Int']
  /** [AUTHENTICATED] Receive queue status updates. When release is sold out, the subscription is closed earlier. */
  queueStatus: GetQueueStatus
  /** [PUBLIC] Subscribe to release updates */
  release: Release
  /** [PUBLIC] Subscribe to updates of release nfts */
  releaseNfts: Nft
  /** [PUBLIC] Subscribe to updates of release nfts comments */
  releaseNftsComments: NftWithComment
  /** [PUBLIC] Subscribe to the latest token sales updates */
  tokenSales: EventV2
  /** [AUTHENTICATED] Subscribe to transactions related to authenticated user */
  transaction: Transaction
}

/** Realtime Subscriptions */
export type SubscriptionChatChannelMessagesArgs = {
  chatChannelId: Scalars['UUID']
}

/** Realtime Subscriptions */
export type SubscriptionCountArgs = {
  n?: Scalars['Int']
}

/** Realtime Subscriptions */
export type SubscriptionQueueStatusArgs = {
  input: QueueStatusSubscriptionInput
}

/** Realtime Subscriptions */
export type SubscriptionReleaseArgs = {
  id: Scalars['UUID']
}

/** Realtime Subscriptions */
export type SubscriptionReleaseNftsArgs = {
  releaseId: Scalars['UUID']
}

/** Realtime Subscriptions */
export type SubscriptionReleaseNftsCommentsArgs = {
  releaseId: Scalars['UUID']
}

/** Realtime Subscriptions */
export type SubscriptionTransactionArgs = {
  authToken: Scalars['String']
}

/** Time period to aggregate trending table queries */
export const TimePeriodAggEnum = {
  AllTime: 'ALL_TIME',
  OneDay: 'ONE_DAY',
  OneMonth: 'ONE_MONTH',
  SevenDay: 'SEVEN_DAY',
} as const

export type TimePeriodAggEnum = typeof TimePeriodAggEnum[keyof typeof TimePeriodAggEnum]
/** Total raised on Ethereum and USD */
export type TotalRaised = {
  __typename?: 'TotalRaised'
  eth: Scalars['Float']
  usd: Scalars['Float']
}

/** Track entity */
export type Track = {
  __typename?: 'Track'
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
  __typename?: 'TrackAudio'
  /** Track audio */
  audio?: Maybe<Media>
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

/** Uploaded track information */
export type TrackUpload = {
  /** Duration of track in seconds */
  duration: Scalars['Int']
  /** Details of uploaded track file */
  fileDetail: UploadedMedia
  /** Normalized peaks of track */
  normalizedPeaks: Array<Scalars['Int']>
  /** Title of track */
  title: Scalars['String']
}

/** Release info upload step info */
export type TrackUploadStepInfo = {
  __typename?: 'TrackUploadStepInfo'
  /** Duration of track in seconds */
  duration: Scalars['Int']
  /** Details of uploaded track file */
  fileDetail: MediaUploadStepInfo
  /** Normalized peaks of track */
  normalizedPeaks: Array<Scalars['Int']>
  /** Title */
  title: Scalars['String']
}

/** Transaction entity */
export type Transaction = {
  __typename?: 'Transaction'
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
  __typename?: 'TrendingArtistInfo'
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
  NftsSold: 'NFTS_SOLD',
  PrimarySales: 'PRIMARY_SALES',
  SecondarySales: 'SECONDARY_SALES',
  TotalSales: 'TOTAL_SALES',
  UniqueCollectors: 'UNIQUE_COLLECTORS',
} as const

export type TrendingArtistsSortEnum = typeof TrendingArtistsSortEnum[keyof typeof TrendingArtistsSortEnum]
/** Trending Collector information */
export type TrendingCollectorInfo = {
  __typename?: 'TrendingCollectorInfo'
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
  CreatorsSupported: 'CREATORS_SUPPORTED',
  NftsBought: 'NFTS_BOUGHT',
  TotalSpent: 'TOTAL_SPENT',
} as const

export type TrendingCollectorsSortEnum = typeof TrendingCollectorsSortEnum[keyof typeof TrendingCollectorsSortEnum]
/** User relation type */
export const TypeOfRelation = {
  Following: 'FOLLOWING',
} as const

export type TypeOfRelation = typeof TypeOfRelation[keyof typeof TypeOfRelation]
/** Input fields to unfollow user */
export type UnfollowUserInput = {
  /** User id to unfollow */
  user: Scalars['UUID']
}

/** Input for updateKeyClient */
export type UpdateKeyClient = {
  /** Identifier of existing Key Client */
  id: Scalars['UUID']
  /** Change the name of the specified Key Client */
  name?: InputMaybe<Scalars['NonEmptyString']>
  /** Change the status of the specified Key Client */
  status?: InputMaybe<KeyClientStatus>
}

/** Input for updateRelease mutation */
export type UpdateReleaseInput = {
  /** Behind the music text */
  behindTheMusic: Scalars['String']
  /** Cover image */
  coverImage: UploadedMedia
  /** Release description */
  description?: InputMaybe<Scalars['String']>
  /** Release genre */
  genre: Scalars['String']
  /** Special golden egg image */
  goldenEggImage: UploadedMedia
  /** Release identifier */
  id: Scalars['UUID']
  /** Custom rewards */
  rewards?: InputMaybe<Array<RewardInput>>
  /** Title of release */
  title: Scalars['String']
  /** Uploaded tracks */
  tracks: Array<TrackUpload>
  /** Release type */
  type: ReleaseType
}

/** Input for updateSalesSchedule mutation */
export type UpdateSaleScheduleInput = {
  /** Sale Schedule Flags to be set */
  flags?: InputMaybe<Array<SaleScheduleFlagType>>
  /** End time to be set */
  newEndTime?: InputMaybe<Scalars['DateTime']>
  /** Presale amount to be set */
  newPresaleAmount?: InputMaybe<Scalars['Int']>
  /** Start time to be set */
  newStartTime?: InputMaybe<Scalars['DateTime']>
  /** Presale Media configuration */
  presaleMedia?: InputMaybe<Array<PresaleMediaInput>>
  /** Sale Schedule identifier */
  saleScheduleId: Scalars['UUID']
  /** Whitelist Rules for Sale Schedule */
  whitelistRules?: InputMaybe<Array<WhitelistRuleInput>>
}

/** Input for signedUploadParams mutation */
export type UploadRequest = {
  /** File name of media to be uploaded */
  fileName: Scalars['String']
  /** Media type to be uploaded */
  mediaType: MediaType
}

/** Upload step entity */
export type UploadStep = {
  __typename?: 'UploadStep'
  /** Upload step creation date */
  createdAt: Scalars['DateTime']
  /** Upload step identifier */
  id: Scalars['ID']
  /** Is release step already completed */
  isComplete: Scalars['Boolean']
  /** Upload step name */
  name: Scalars['String']
  /** Corresponding release of upload step */
  release: Release
  /** Upload step number */
  step: Scalars['Int']
  /** Step info */
  stepInfo?: Maybe<UploadStepInfo>
}

/** Union of different upload step infos */
export type UploadStepInfo =
  | AuctionConfigurationUploadStepInfo
  | MetadataUploadStepInfo
  | ReleaseInfoUploadStepInfo
  | RewardsUploadStepInfo
  | SplitsUploadStepInfo

/** Media to be uploaded */
export type UploadedMedia = {
  /** Media type to be uploaded */
  mediaType: MediaType
  /** Upload key received from Query.signedUploadParams */
  uploadKey: Scalars['String']
}

/** Input for upsertUploadStep mutation */
export type UpsertReleaseUploadStepInput = {
  /** Upload step info input */
  info: ReleaseUploadStepInput
  /** Release identifier */
  releaseId: Scalars['String']
  /** Step number */
  step: Scalars['Int']
}

/** Input fields to upsert shelf */
export type UpsertShelfInput = {
  /** Upsert shelf description */
  description?: InputMaybe<Scalars['String']>
  /** Shelf id to update */
  id?: InputMaybe<Scalars['UUID']>
  /** Upsert shelf name */
  name?: InputMaybe<Scalars['String']>
  /** Upsert shelf type */
  type?: InputMaybe<ShelfType>
}

/** User entity */
export type User = Node & {
  __typename?: 'User'
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
  /** Returns whether user has at least one shelf with at least one release  */
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
export type UserCollectedReleasesArgs = {
  pagination?: CursorConnectionArgs
}

/** User entity */
export type UserFollowersArgs = {
  pagination?: CursorConnectionArgs
}

/** User entity */
export type UserFollowingArgs = {
  pagination?: CursorConnectionArgs
}

/** User entity */
export type UserNftsPaginatedArgs = {
  filter?: InputMaybe<UserNftsConnectionFilters>
  pagination?: NftCursorConnectionArgs
}

/** User entity */
export type UserShelvesArgs = {
  pagination?: ShelfCursorConnectionArgs
}

/** Paginated connection of Users */
export type UserConnection = Connection & {
  __typename?: 'UserConnection'
  /** Edges of current page */
  edges: Array<UserConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of User Connection */
export type UserConnectionEdge = Edge & {
  __typename?: 'UserConnectionEdge'
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
  __typename?: 'UserRelation'
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
  __typename?: 'UserRelationConnection'
  /** Edges of current page */
  edges: Array<UserRelationConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** User Relation Node edge */
export type UserRelationConnectionEdge = Edge & {
  __typename?: 'UserRelationConnectionEdge'
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** User Relation Entity */
  node: UserRelation
}

/** User Relation Status */
export type UserRelationStatus = {
  __typename?: 'UserRelationStatus'
  /** Is the authenticated user following the target user */
  isFollowing: Scalars['Boolean']
  /** ID of target user */
  userId: Scalars['String']
}

/** Roles available for users */
export type UserRoles = {
  __typename?: 'UserRoles'
  /** Administrator of platform */
  isAdmin: Scalars['Boolean']
  /** Member of artist relations team */
  isArtistRelations: Scalars['Boolean']
}

/** Exchanged ammounts pretty equivalents */
export type ValueExchangedPrettyType = {
  __typename?: 'ValueExchangedPrettyType'
  /** Formatted Ethereum value */
  eth: Scalars['String']
}

/** Whitelist position of user */
export type WhitelistObj = {
  __typename?: 'WhitelistObj'
  /** Expiry time of whitelist position */
  expiryTime: Scalars['DateTime']
  /** Mint signature associated with whitelist position */
  signatureToMint?: Maybe<Scalars['String']>
  /** Exclusive ticket number associated with whitelist position (To be re-used if whitelist position expires) */
  ticketNumber: Scalars['Int']
}

/** Input to define whitelist rules to be set for the new sale schedule */
export type WhitelistRuleInput = {
  /** Require to hold NFTs from a specific address with a custom threshold */
  onlyTokenHolders?: InputMaybe<OnlyTokenHoldersInput>
  /** Require to be classified as a top collector of the platform, with custom parameters */
  onlyTopCollectors?: InputMaybe<OnlyTopCollectorsInput>
  /** Require to hold any other NFT from the Sound.xyz platform */
  requireAnySoundHolder?: InputMaybe<Scalars['Boolean']>
  /** Require to hold any other NFT from the same artist */
  requireArtistSoundHolder?: InputMaybe<Scalars['Boolean']>
  /** Require Twitter verification to be whitelisted */
  requireTwitterVerification?: InputMaybe<Scalars['Boolean']>
}

/** Union of different types of whitelist rules */
export type WhitelistRules =
  | OnlyTokenHolders
  | OnlyTopCollectors
  | RequireAnySoundHolder
  | RequireArtistSoundHolder
  | RequireTwitterVerification

export type TestQueryVariables = Exact<{ [key: string]: never }>

export type TestQuery = { __typename: 'Query' }

export const Test = `query Test{__typename}`
