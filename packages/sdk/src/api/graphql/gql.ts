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
  /** A string that cannot be passed as an empty value */
  NonEmptyString: string
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

/** Activity Feed entity */
export type ActivityFeed = {
  /** Paginated activity feed groups of activity feed. */
  activityFeedGroups: ActivityFeedGroupConnection
  /** Activity feed UUID */
  id: Scalars['ID']
}

/** Activity Feed entity */
export type ActivityFeedactivityFeedGroupsArgs = {
  filter?: ActivityFeedGroupFilterArgs
  pagination?: CursorConnectionArgs
}

/** Filter activity feed */
export type ActivityFeedFilterArgs = {
  /** Only get activity feed of certain type */
  activityFeedType?: ActivityFeedType
}

/** Activity Feed Group entity */
export type ActivityFeedGroup = Node & {
  /** Activity feed group UUID */
  id: Scalars['ID']
  /** Activity feed group info */
  information: ActivityFeedGroupInfo
  /** Activity feed group timestamp of most recent activity occurance */
  latestActivityOccurenceAt: Scalars['Timestamp']
  /** Activity feed group ranking score */
  rankingScore: Scalars['Int']
}

/** Activity feed group collected release entity */
export type ActivityFeedGroupCollectedRelease = {
  /** Amount paid in Wei for all purchases of a single release within activity feed group */
  amountPaidInWei: Scalars['String']
  /** Returns whether user has purchased the golden egg within the activity feed group */
  hasGoldenEgg: Scalars['Boolean']
  /** Most recent user that release was purchased from */
  mostRecentPurchasedFromUser: User
  /** Release corresponding to activity feed group collected release entity */
  release: Release
  /** Release backers that are prioritized based on following status */
  releaseSocialProof: ActivityFeedReleaseSocialProof
  /** Amount of nfts of a single release within activity feed group */
  totalOwnedEditions: Scalars['Int']
  /** Total number of unique users that release was purchased from */
  totalUsersPurchasedFrom: Scalars['Int']
}

/** Paginated activity feed group connection */
export type ActivityFeedGroupConnection = Connection & {
  /** Edges of current page */
  edges: Array<ActivityFeedGroupConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of Activity Feed Group Connection */
export type ActivityFeedGroupConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Activity Feed Group node */
  node: ActivityFeedGroup
}

/** Activity feed group featured collector entity */
export type ActivityFeedGroupFeaturedCollector = {
  /** Amount paid in Wei for most recent purchase action in activity feed group by collector */
  amountPaidInWei: Scalars['String']
  /** User corresponding to activity feed group featured collector entity */
  user: User
}

/** Filter activity feed groups */
export type ActivityFeedGroupFilterArgs = {
  /** Only get activity feed groups of certain type */
  types?: Array<ActivityFeedGroupFilterOption>
}

/** Activity feed group filter option */
export const ActivityFeedGroupFilterOption = {
  ADDED_TO_PLAYLIST: 'ADDED_TO_PLAYLIST',
  ALL: 'ALL',
  COLLECTED: 'COLLECTED',
  RELEASE_DROPPED: 'RELEASE_DROPPED',
} as const

export type ActivityFeedGroupFilterOption =
  typeof ActivityFeedGroupFilterOption[keyof typeof ActivityFeedGroupFilterOption]
/** Union of activity feed group info */
export type ActivityFeedGroupInfo =
  | ReleaseDroppedAggregate
  | ReleasesAddedToShelfAggregate
  | ShelfCreatedAggregate
  | SongCollectedByManyAggregate
  | UserCollectedManySongsAggregate

/** Social proof of release in activity feed based on user authentication */
export type ActivityFeedReleaseSocialProof = {
  /** Release backers that are prioritized based on following status */
  socialProofCollectors: Array<User>
}

/** Activity feed type */
export const ActivityFeedType = {
  GLOBAL: 'GLOBAL',
  USER: 'USER',
} as const

export type ActivityFeedType = typeof ActivityFeedType[keyof typeof ActivityFeedType]
/** Pagination parameters for allCollectors */
export type AllCollectorsCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: AllCollectorsCursorConnectionSort
}

/** Customize sort of collectors */
export type AllCollectorsCursorConnectionSort = {
  /** Sort by date of user first being connected in platform */
  createdAt?: InputMaybe<SortOrder>
}

/** Filter the allCollectors result */
export type AllCollectorsFilter = {
  /** Should it include artists as collectors */
  includeArtists?: Scalars['Boolean']
}

/** Input for allCollectors query */
export type AllCollectorsInput = {
  /** Filter the collectors */
  filter?: AllCollectorsFilter
  /** Pagination parameters of collectors */
  pagination?: AllCollectorsCursorConnectionArgs
}

/** Pagination parameters for allShelves */
export type AllShelvesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: AllShelvesCursorConnectionSort
}

/** Customize sort of shelves */
export type AllShelvesCursorConnectionSort = {
  /** Sort by date of playlist being created */
  createdAt?: InputMaybe<SortOrder>
}

/** Filter the shelves of allShelves query */
export type AllShelvesFilter = {
  /** Filter the shelves based on the expected types */
  type?: Array<ShelfTypeFilter>
}

/** Input for allShelves query */
export type AllShelvesInput = {
  /** Filter the shelves, by default it gives all the user created shelves */
  filter?: AllShelvesFilter
  /** Pagination parameters, by default it gives the last 10 shelves created */
  pagination?: AllShelvesCursorConnectionArgs
}

/** Artist Entity */
export type Artist = Node & {
  /** Banner image of artist page */
  bannerImage?: Maybe<Media>
  /** Paginated collectors of artist. */
  collectors: ArtistCollectorConnection
  /** Creation date of artist entity */
  createdAt: Scalars['DateTime']
  /** Gem Collection URL */
  gemCollectionUrl?: Maybe<Scalars['String']>
  /** Artist identifier */
  id: Scalars['ID']
  /** Paginated minted releases of artist. */
  mintedReleasesPaginated: ReleaseConnection
  /** Name of artist */
  name?: Maybe<Scalars['String']>
  /** Number of unique nft collectors of artist */
  numCollectors: Scalars['Int']
  /** How many minted releases for artist */
  numMintedReleases: Scalars['Int']
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
  /** Cursor connection parameters */
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

/** Artist contract earnings */
export type ArtistContractEarning = {
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String']
  /** Address of the artist contract */
  contractAddress: Scalars['String']
  /** Edition id for the release */
  editionId: Scalars['String']
  /** Total eth on the contract */
  totalBalance: Scalars['String']
}

/** Filter for paginated artists */
export type ArtistCursorFilterArgs = {
  /** Specify whether artist already has at least one minted release */
  hasMintedRelease?: InputMaybe<Scalars['Boolean']>
  /** Specify season to be filtered */
  season?: InputMaybe<ArtistSeason>
}

/** Artist minted releases author filter option */
export const ArtistMintedReleasesAuthorFilterOption = {
  ALL: 'ALL',
  ONLY_APPEARS_ON: 'ONLY_APPEARS_ON',
  ONLY_AUTHORED_RELEASES: 'ONLY_AUTHORED_RELEASES',
} as const

export type ArtistMintedReleasesAuthorFilterOption =
  typeof ArtistMintedReleasesAuthorFilterOption[keyof typeof ArtistMintedReleasesAuthorFilterOption]
/** Artist minted releases credit split filter option */
export const ArtistMintedReleasesCreditSplitFilterOption = {
  ALL: 'ALL',
  ONLY_CREDIT_SPLITS: 'ONLY_CREDIT_SPLITS',
  ONLY_NO_CREDIT_SPLITS: 'ONLY_NO_CREDIT_SPLITS',
} as const

export type ArtistMintedReleasesCreditSplitFilterOption =
  typeof ArtistMintedReleasesCreditSplitFilterOption[keyof typeof ArtistMintedReleasesCreditSplitFilterOption]
/** Filter for artist minted releases. Default is only for artist sounds. */
export type ArtistMintedReleasesFilter = {
  /** Filters on release credit split status */
  creditSplit?: ArtistMintedReleasesCreditSplitFilterOption
  /** Filters on release with specified mint time status */
  mintTimeStatus?: Array<MintTimeStatus>
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption
  /** Filters on release author status */
  releaseAuthor?: ArtistMintedReleasesAuthorFilterOption
  /** Filters on release type */
  releaseType?: Array<ReleaseType>
}

/** Types of seasons for artists */
export const ArtistSeason = {
  GENESIS: 'GENESIS',
  SEASON_FOUR: 'SEASON_FOUR',
  SEASON_ONE: 'SEASON_ONE',
  SEASON_THREE: 'SEASON_THREE',
  SEASON_TWO: 'SEASON_TWO',
} as const

export type ArtistSeason = typeof ArtistSeason[keyof typeof ArtistSeason]
/** Simplified version of Release entity filtered on the owner public address */
export type CollectedRelease = Node & {
  /**
   * Artist of release
   * @deprecated Please use CollectedRelease.release.artist
   */
  artist: Artist
  /**
   * Contract associated to Sound Edition
   * @deprecated Please use CollectedRelease.release.contract
   */
  contract: Contract
  /**
   * Cover image of release
   * @deprecated Please use CollectedRelease.release.coverImage
   */
  coverImage: Media
  /**
   * Release creation date
   * @deprecated Please use CollectedRelease.release.createdAt
   */
  createdAt: Scalars['DateTime']
  /**
   * Associated external url
   * @deprecated Please use CollectedRelease.release.externalUrl
   */
  externalUrl?: Maybe<Scalars['String']>
  /**
   * Final quantity for a release. Will be defined once a sale finishes
   * @deprecated Please use CollectedRelease.release.finalQuantity
   */
  finalQuantity?: Maybe<Scalars['Int']>
  /**
   * Last sale schedule end time as number of milliseconds since the ECMAScript epoch.
   * @deprecated Please use CollectedRelease.release.finalSaleScheduleEndTimestamp
   */
  finalSaleScheduleEndTimestamp?: Maybe<Scalars['Timestamp']>
  /** First backed nft of collected release */
  firstNftOwned?: Maybe<Nft>
  /** Returns golden egg if user owns, otherwise null */
  goldenEgg?: Maybe<EggGame>
  /**
   * Special golden egg image
   * @deprecated Please use eggGame.goldenEggImage
   */
  goldenEggImage?: Maybe<Media>
  /** Unique identifier of release */
  id: Scalars['ID']
  /** List of owned nft serial numbers in ascending serial number order */
  ownedSerialNumbers: Array<Scalars['Int']>
  /**
   * Public listening party start time
   * @deprecated Please use CollectedRelease.release.publicListeningParty
   */
  publicListeningPartyStart: Scalars['DateTime']
  /**
   * Lower bound quantity for a releases main sale.
   * @deprecated Please use CollectedRelease.release.quantityLowerBound
   */
  quantityLowerBound: Scalars['Int']
  /**
   * Upper bound quantity for a releases main sale.
   * @deprecated Please use CollectedRelease.release.quantityUpperBound
   */
  quantityUpperBound: Scalars['Int']
  /** Release entity */
  release: Release
  /**
   * Release title
   * @deprecated Please use CollectedRelease.release.title
   */
  title: Scalars['String']
  /**
   * Release title slug
   * @deprecated Please use CollectedRelease.release.titleSlug
   */
  titleSlug: Scalars['String']
  /**
   * Track of release
   * @deprecated Please use CollectedRelease.release.track
   */
  track: Track
  /**
   * Type of Release
   * @deprecated Please use CollectedRelease.release.type
   */
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

/** Input for release by contract */
export type ContractReleaseInput = {
  /** Contract address */
  contractAddress: Scalars['Address']
  /** Optional edition identifier */
  editionId?: InputMaybe<Scalars['String']>
}

/** Contract type, currently the playform only supports "ARTIST" */
export const ContractType = {
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
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Sort the connection ascending or descending */
  sort?: SortOrder
}

/** Container of Node and the Cursor from the Node */
export type Edge = {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Node entity */
  node: Node
}

/** Edition contract earnings */
export type EditionContractEarning = {
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String']
  /** Address of the edition contract */
  contractAddress: Scalars['String']
  /** Total eth on the contract */
  totalBalance: Scalars['String']
}

/** EggGame Entity */
export type EggGame = {
  /** Block hash of egg game calculation */
  finalSerialBlockHash: Scalars['String']
  /** Special golden egg image */
  goldenEggImage?: Maybe<Media>
  /** EggGame identifier */
  id: Scalars['ID']
  /** Nft of egg game winner */
  nft: Nft
  /** Serial number of nft with egg game */
  winningSerialNum: Scalars['Int']
}

/** Event type */
export const EventType = {
  AIRDROP: 'AIRDROP',
  EDITION_PURCHASED: 'EDITION_PURCHASED',
  ORDERS_MATCHED: 'ORDERS_MATCHED',
  TRANSFER: 'TRANSFER',
  UNKNOWN: 'UNKNOWN',
} as const

export type EventType = typeof EventType[keyof typeof EventType]
/** Event entity */
export type EventV2 = Node & {
  /** Timestamp on blockchain of event */
  blockTimestamp: Scalars['DateTime']
  /** Contract address */
  contractAddress: Scalars['String']
  /** Date of creation of event entity */
  createdAt: Scalars['DateTime']
  /** Edition identifier */
  editionId?: Maybe<Scalars['String']>
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
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
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

/** Input used for link query */
export type LinkInput = {
  /** Link slug */
  slug: Scalars['NonEmptyString']
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
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
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
  /** Specify up to 50 contracts to filter the releases */
  contracts?: InputMaybe<Array<ContractReleaseInput>>
  /** Only get releases from specified genres */
  genre?: InputMaybe<Array<Scalars['String']>>
  /** Remove currently-featured releases from results */
  hideFeatured?: InputMaybe<Scalars['Boolean']>
  /** Only get releases less or equal to than specified mint time */
  mintTimeMaxDate?: InputMaybe<Scalars['Timestamp']>
  /** Only get releases greater than or equal to specified mint time */
  mintTimeMinDate?: InputMaybe<Scalars['Timestamp']>
  /** Only get release with specified mint time status */
  mintTimeStatus?: InputMaybe<Array<MintTimeStatus>>
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: InputMaybe<ReleaseAlbumRevealFilterOption>
  /** Only get release with specified status */
  releaseStatus?: InputMaybe<Array<ReleaseStatus>>
  /** Filters on release type */
  releaseType?: Array<ReleaseType>
  /** Only get releases from specified seasons */
  season?: InputMaybe<Array<ArtistSeason>>
}

/** Minting access configuration information. */
export type MintingAccess = {
  /** Whether the access list was manually uploaded. */
  manuallyUploaded: Scalars['Boolean']
  /** The time when sound holders for artist were captured. */
  soundCollectorsSnapshotAt: Scalars['Timestamp']
  /** Whether the sound toggle was used to give sale access. */
  soundToggleUsed: Scalars['Boolean']
}

/** Input for mintingAccessConfig query */
export type MintingAccessConfigInput = {
  /** Merkle root of the sale. */
  merkleRoot: Scalars['String']
  /** Minting type identifier. */
  mintingType: MintingAccessConfigMintingType
  /** Release identifier. */
  releaseId: Scalars['UUID']
}

/** Different minting types for mintingAccessConfig query */
export const MintingAccessConfigMintingType = {
  FREE: 'FREE',
  PRESALE: 'PRESALE',
} as const

export type MintingAccessConfigMintingType =
  typeof MintingAccessConfigMintingType[keyof typeof MintingAccessConfigMintingType]
/** Mutations */
export type Mutation = {
  /** [PUBLIC] Generate auth challenge for given public address and give back new nonce */
  generateAuthChallenge: Scalars['Int']
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
  /** OpenSea metadata attributes. */
  openSeaMetadataAttributes: Array<OpenSeaMetadataAttribute>
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
  /**
   * Blockchain date of the last transfer state
   * @deprecated Please use Nft.updatedAt
   */
  updatedAtBlockTime: Scalars['DateTime']
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
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
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

/** Input for "nft" Query */
export type NftInput = {
  /** Contract address of edition */
  contractAddress: Scalars['Address']
  /** Token unique identifier within edition */
  tokenId: Scalars['String']
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
  /** If the Nft owner is an artist, returns the name of the artist */
  ownerArtistName?: Maybe<Scalars['String']>
  /** Display name of owner */
  ownerDisplayName?: Maybe<Scalars['String']>
  /** Public wallet address of owner */
  ownerPublicAddress: Scalars['String']
  /** Twitter handle of owner */
  ownerTwitterHandle?: Maybe<Scalars['String']>
  /** Nft owner username */
  ownerUsername: Scalars['String']
  /**
   * Timestamp of purchased date
   * @deprecated Please use NftWithComment.updatedAt
   */
  purchasedAt: Scalars['Timestamp']
  /** Acumulative serial number */
  serialNumber: Scalars['Int']
  /** Song slot reserved by NFT */
  songSlot: Scalars['Int']
  /** Unique chain token identifier */
  tokenId: Scalars['String']
  /** Last update date of NFT */
  updatedAt: Scalars['Timestamp']
}

/** Base node */
export type Node = {
  /** Node identifier */
  id: Scalars['ID']
}

/** OpenSea Metadata Attribute */
export type OpenSeaMetadataAttribute = {
  /** Trait type */
  traitType?: Maybe<Scalars['String']>
  /** Value */
  value: Scalars['String']
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

/** Playlist action entity */
export type PlaylistAction = {
  /** Playlist action id */
  id: Scalars['ID']
}

/** Paginated playlist action connection */
export type PlaylistActionConnection = Connection & {
  /** Edges of current page */
  edges: Array<PlaylistActionConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Edge of playlist action connection */
export type PlaylistActionConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Playlist action node */
  node: PlaylistAction
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
/** Queries */
export type Query = {
  /** [PUBLIC] Activity Feed with filter parameters */
  activityFeed?: Maybe<ActivityFeed>
  /** Paginate through all collectors of the system */
  allCollectors: UserConnection
  /** [PUBLIC] Get all minted releases */
  allMintedReleasesPaginated: ReleaseConnection
  /** Paginate through all shelves of the system */
  allShelves: ShelfConnection
  /** [PUBLIC] Artist by UUID */
  artist?: Maybe<Artist>
  /** [PUBLIC] Artist by handle */
  artistByHandle?: Maybe<Artist>
  /** [PUBLIC] Get the nft collectors of the specified artist */
  artistCollectors: ArtistCollectors
  /** [PUBLIC] Get all artists of platform. */
  artists: ArtistConnection
  /** [PUBLIC] Get audio from track */
  audioFromTrack: TrackAudio
  /** [PUBLIC] Get authenticated user information, if any */
  authUser?: Maybe<User>
  /** [PUBLIC] Get credit split by id */
  creditSplit?: Maybe<CreditSplit>
  /** [PUBLIC] Get currencies conversions */
  currencies: Currencies
  /** [PUBLIC] Get EggGame of specified release */
  eggGame?: Maybe<EggGame>
  /** [PUBLIC] Get feature flag value by name */
  featureFlag?: Maybe<FeatureFlag>
  /** [PUBLIC] Get currently-featured releases */
  featuredReleases: Array<Release>
  /**
   * [PUBLIC] Global Activity Feed
   * @deprecated Please use activityFeed query with activityFeedType.GLOBAL filter
   */
  globalActivityFeed?: Maybe<ActivityFeed>
  /** [PUBLIC] Get the latest events */
  latestEventsPaginated: LatestSalesConnection
  /** [PUBLIC] Get a node based on specific slug */
  link?: Maybe<Node>
  /** [PUBLIC] Get merkle tree information */
  merkleTree: MerkleTree
  /** [PUBLIC] Get merkle tree information */
  merkleTreeProof?: Maybe<MerkleTreeProof>
  /** [PUBLIC] Get minted release by Artist sound handle and release title slug */
  mintedRelease?: Maybe<Release>
  /** [PUBLIC] Get minting access configuration for a merkle root. */
  mintingAccessConfig?: Maybe<MintingAccess>
  /** [PUBLIC] Request nft with contract fields */
  nft: Nft
  /** [PUBLIC] Current UNIX date to test caching */
  now: Scalars['Int']
  /** [PUBLIC] Test query to get the date of calculation of resolver based using response cache */
  nowCached: Scalars['Timestamp']
  /** [PUBLIC] Get playlist based on given type and associationId */
  playlist?: Maybe<Playlist>
  /** [PUBLIC] Activity Feed with filter parameters */
  playlistActivityFeed?: Maybe<PlaylistActionConnection>
  /** [PUBLIC] Get release by id */
  release?: Maybe<Release>
  /** [PUBLIC] Get all users that collected the same release in one activity feed group. */
  releaseCollectedByManyUsers: UserConnection
  /** [PUBLIC] Get release by contract address */
  releaseContract: Release
  /** [PUBLIC] List of genres that have at least 1 past minted release, sorted by popularity */
  releaseGenres: Array<Genre>
  /** Search releases or artists based on text inputs */
  search: SearchResult
  /** [PUBLIC] Get specified shelf by id */
  shelf: Shelf
  /** [PUBLIC] Top collectors of artist by number of nfts owned */
  topNftsOwnedCollectors?: Maybe<Array<ArtistCollector>>
  /** [PUBLIC] Get total raised of the whole platform */
  totalRaised: TotalRaised
  /** [PUBLIC] Total count of minted releases */
  totalReleasesCount: Scalars['Int']
  /** [PUBLIC] Get track by id */
  track?: Maybe<Track>
  /** [PUBLIC] Get trending artists information */
  trendingArtistInfo: Array<TrendingArtistInfo>
  /** [PUBLIC] Get trending collectors information */
  trendingCollectors: Array<TrendingCollectorInfo>
  /** [PUBLIC] Get specified user by id */
  user?: Maybe<User>
  /** [PUBLIC] Get specified user by public address */
  userByAddress?: Maybe<User>
  /** [PUBLIC] Get specified user by sound handle */
  userByArtistHandle?: Maybe<User>
}

/** Queries */
export type QueryactivityFeedArgs = {
  filter?: ActivityFeedFilterArgs
}

/** Queries */
export type QueryallCollectorsArgs = {
  input?: AllCollectorsInput
}

/** Queries */
export type QueryallMintedReleasesPaginatedArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>
  pagination?: MintedReleasesCursorConnectionArgs
}

/** Queries */
export type QueryallShelvesArgs = {
  input?: AllShelvesInput
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
export type QuerycreditSplitArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryeggGameArgs = {
  releaseId: Scalars['UUID']
}

/** Queries */
export type QueryfeatureFlagArgs = {
  name: Scalars['String']
}

/** Queries */
export type QuerylatestEventsPaginatedArgs = {
  filter?: InputMaybe<LatestSalesCursorFilterArgs>
  pagination?: LatestSalesCursorConnectionArgs
}

/** Queries */
export type QuerylinkArgs = {
  input: LinkInput
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
export type QuerymintingAccessConfigArgs = {
  input: MintingAccessConfigInput
}

/** Queries */
export type QuerynftArgs = {
  input: NftInput
}

/** Queries */
export type QuerynowCachedArgs = {
  ttlSeconds?: Scalars['Int']
}

/** Queries */
export type QueryplaylistArgs = {
  input: PlaylistInput
}

/** Queries */
export type QueryplaylistActivityFeedArgs = {
  pagination?: CursorConnectionArgs
  playlistId: Scalars['UUID']
}

/** Queries */
export type QueryreleaseArgs = {
  id: Scalars['UUID']
}

/** Queries */
export type QueryreleaseCollectedByManyUsersArgs = {
  activityFeedGroupId: Scalars['UUID']
  pagination?: CursorConnectionArgs
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
export type QuerytotalReleasesCountArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>
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
  /** Number of nfts airdropped */
  airdropCount: Scalars['Int']
  /** Artist of release */
  artist: Artist
  /** CDN url CSV of users that own a release nft or null if no release backers */
  backerCSVUrl?: Maybe<Scalars['String']>
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
  /** Address set as funds recipient on the contract */
  fundingAddress: Scalars['String']
  /** Genre of Release */
  genre: Genre
  /**
   * Special golden egg image
   * @deprecated Please use eggGame.goldenEggImage
   */
  goldenEggImage: Media
  /** Is the release a range bound edition */
  hasRangeBoundSale: Scalars['Boolean']
  /** Release identifier */
  id: Scalars['ID']
  /** Is release sold out relative to the final quantity */
  isFinalSoldOut: Scalars['Boolean']
  /** Whether release is minted */
  isMinted: Scalars['Boolean']
  /** Associated laylo.com url */
  layloUrl?: Maybe<Scalars['String']>
  /** Associated market place url */
  marketPlaceUrl?: Maybe<Scalars['String']>
  /** Public sale start time in UNIX timestamp */
  mintStartTime: Scalars['Int']
  /** Public sale start timestamp */
  mintStartTimestamp: Scalars['Timestamp']
  /** NFTs of Release */
  nftsPaginated: NftConnection
  /** Unique number of users that own a release nft */
  numBackers: Scalars['Int']
  /** Amount of sold NFTs */
  numSold: Scalars['Int']
  /** Associated opensea url */
  openseaUrl?: Maybe<Scalars['String']>
  /** Max Quantity for a releases presale. */
  presaleUpperBound?: Maybe<Scalars['Int']>
  /** Price in Wei */
  price: Scalars['String']
  /** Public listening party start time as number of milliseconds since the ECMAScript epoch. */
  publicListeningParty: Scalars['Timestamp']
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
  /** Creator royalty basis points */
  royaltyBps: Scalars['Int']
  /** Minting periods */
  saleSchedules: Array<SaleSchedule>
  /** Edition schedule identifiers, used to optimize chain calls */
  scheduleIds?: Maybe<Array<ScheduleIdentifier>>
  /** Season associated to release */
  season?: Maybe<Scalars['String']>
  /** Shelves where the release has been added to */
  shelves: ShelfConnection
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

/** Release entity */
export type ReleaseshelvesArgs = {
  filter?: InputMaybe<ReleaseShelvesFilter>
  pagination?: ReleaseShelvesCursorConnectionArgs
}

/** Release album reveal filter option */
export const ReleaseAlbumRevealFilterOption = {
  ALL: 'ALL',
  ONLY_NOT_REVEALED_ALBUMS: 'ONLY_NOT_REVEALED_ALBUMS',
  ONLY_REVEALED_ALBUMS: 'ONLY_REVEALED_ALBUMS',
} as const

export type ReleaseAlbumRevealFilterOption =
  typeof ReleaseAlbumRevealFilterOption[keyof typeof ReleaseAlbumRevealFilterOption]
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

/** Union of release contract types */
export type ReleaseContractEarning = ArtistContractEarning | EditionContractEarning

/** Release dropped aggregate */
export type ReleaseDroppedAggregate = {
  /** Release dropped action in activity feed group */
  release: Release
}

/** Release earnings of a user */
export type ReleaseEarnings = Node & {
  /** Earnings on a contract. */
  earning: ReleaseContractEarning
  /** Id of the associated release */
  id: Scalars['ID']
  /** Ownership percentage of the user in the release */
  ownershipPercent: Scalars['Float']
  /** release primary revenue */
  primaryRevenue: Scalars['String']
  /** Release entity */
  release: Release
  /** Release secondary royalties */
  secondaryRoyalties: Scalars['String']
  /** Split contract earnings associated to release. */
  splitContract?: Maybe<SplitsContractEarning>
  /** Split main balance attributable to release */
  splitMainBalanceFromRelease: Scalars['String']
  /** Total withdrawable amount for user */
  totalWithdrawableForUser: Scalars['String']
}

/** Edge of Release Earnings Connection */
export type ReleaseEarningsConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Release Earnings node */
  node: ReleaseEarnings
}

/** Pagination parameters of release shelves */
export type ReleaseShelvesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ReleaseShelvesCursorConnectionSort
}

/** Customize sort of release shelves */
export type ReleaseShelvesCursorConnectionSort = {
  /** Sort by date of release being added in the shelf */
  addedAtDate?: InputMaybe<SortOrder>
}

/** Filter release shelves */
export type ReleaseShelvesFilter = {
  /** Filter shelves to be included by identifier. You can only specify up to 51 shelves. */
  shelfIds?: InputMaybe<Array<Scalars['UUID']>>
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
  ALBUM_TRACK: 'ALBUM_TRACK',
  SINGLE: 'SINGLE',
} as const

export type ReleaseType = typeof ReleaseType[keyof typeof ReleaseType]
/** Releases added to playlist action entity */
export type ReleasesAddedToPlaylist = Node &
  PlaylistAction & {
    /** Date of action */
    date: Scalars['DateTime']
    /** Action id */
    id: Scalars['ID']
    /** Returns whether playlist was created with this action */
    isPlaylistCreated: Scalars['Boolean']
    /** New releases added to playlist in action */
    releasesAdded: Array<Release>
  }

/** Releases added to shelf aggregate */
export type ReleasesAddedToShelfAggregate = {
  /** New releases added to shelf in an activity feed group */
  releasesAdded: Array<ShelfRelease>
  /** Shelf that releases are added to in activity feed group */
  shelf?: Maybe<Shelf>
}

/** Release removed from playlist entity */
export type ReleasesRemovedFromPlaylist = Node &
  PlaylistAction & {
    /** Date of action */
    date: Scalars['DateTime']
    /** Action id */
    id: Scalars['ID']
    /** Release removed from playlist */
    releaseRemoved: Release
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
  /** Total minted for specific sale schedule associated with artist contracts. To not be used for new editions */
  artistContractTotalMinted?: Maybe<Scalars['Int']>
  /** End Time of Sale Schedule */
  endTime: Scalars['DateTime']
  /** UUID of Sale Schedule entity */
  id: Scalars['ID']
  /** Is the current sale schedule presale */
  isPresale: Scalars['Boolean']
  /** Amount to be allowed to be sold for sale schedule */
  maxMintable: Scalars['Int']
  /** Merkle tree root hash derived from sale schedule allowlist */
  merkleTreeRoot?: Maybe<Scalars['String']>
  /** Price for the specific sale schedule */
  price: Scalars['String']
  /** Start Time of Sale Schedule */
  startTime: Scalars['DateTime']
}

/** Edition schedule identifiers, used to optimize chain calls */
export type ScheduleIdentifier = {
  /** Identifier of schedules by minter address */
  mintIds: Array<Scalars['Int']>
  /** Minter address of schedule */
  minterAddress: Scalars['String']
}

/** Pagination arguments for search */
export type SearchConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 20 nodes. */
  first?: Scalars['PositiveInt']
}

/** Input for "search" query */
export type SearchInput = {
  /** How many entities to be fetched for fixed lists, maximum of 20 */
  limit?: Scalars['PositiveInt']
  /** Text search */
  text: Scalars['String']
}

/** Search result */
export type SearchResult = {
  /** Artists that match the search input, including artists where any of their releases matches the given input */
  artists: Array<Artist>
  /** Paginated artists that match the search input, including artists where any of their releases matches the given input */
  artistsPaginated: ArtistConnection
  /** Paginated collectors that match the search input within the ens, twitter handle, displayName and publicAddress */
  collectors: UserConnection
  /** Unique identifier of search result */
  id: Scalars['ID']
  /** Releases that match the search input, including releases where the artist name matches the given input */
  releases: Array<Release>
  /** Paginated releases that match the search input, including releases where the artist name matches the given input */
  releasesPaginated: ReleaseConnection
  /** Paginated shelves that match the search input within the shelf name, releases titles and artists names */
  shelves: ShelfConnection
}

/** Search result */
export type SearchResultartistsArgs = {
  limit?: InputMaybe<Scalars['PositiveInt']>
}

/** Search result */
export type SearchResultartistsPaginatedArgs = {
  pagination?: SearchConnectionArgs
}

/** Search result */
export type SearchResultcollectorsArgs = {
  pagination?: SearchConnectionArgs
}

/** Search result */
export type SearchResultreleasesArgs = {
  limit?: InputMaybe<Scalars['PositiveInt']>
}

/** Search result */
export type SearchResultreleasesPaginatedArgs = {
  pagination?: SearchConnectionArgs
}

/** Search result */
export type SearchResultshelvesArgs = {
  pagination?: SearchConnectionArgs
}

/** Shelf entity */
export type Shelf = Node & {
  /** Top 4 releases to be used as cover for shelf */
  coverReleases: Array<Release>
  /** Shelf creation date */
  createdAt: Scalars['DateTime']
  /** Shelf deletion date */
  deletedAt?: Maybe<Scalars['DateTime']>
  /** Description of shelf */
  description?: Maybe<Scalars['String']>
  /** Return shelves from where it was possibly extended. If the source shelf is not currently available, it's returned as null */
  extendedFrom?: Maybe<Array<Maybe<Shelf>>>
  /** Shelf identifier */
  id: Scalars['ID']
  /** Relative ordering of the shelves for each user */
  index: Scalars['Int']
  /** Number of likes for the shelf. */
  likes: Scalars['Int']
  /** Link slug used to reference and request specific shelf */
  linkSlug: Scalars['String']
  /** Shelf name */
  name: Scalars['String']
  /** Total play time of all releases in a shelf in seconds */
  playTimeInSeconds: Scalars['Int']
  /** Top 10 releases to be used as preview for shelf */
  previewReleases: Array<ShelfRelease>
  /** Number of releases in a shelf */
  releaseCount: Scalars['Int']
  /** List of release identifiers in the shelf, ordered ascendingly by index within shelf */
  releaseIds: Array<Scalars['String']>
  /** Paginated releases of shelf */
  releases: ShelfReleaseConnection
  /** List of track identifiers in the shelf, ordered ascendingly by index within shelf */
  trackIds: Array<Scalars['String']>
  /** Type of shelf */
  type: ShelfType
  /** Owner of shelf */
  user: User
}

/** Shelf entity */
export type ShelfreleasesArgs = {
  pagination?: ShelfReleaseCursorConnectionArgs
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

/** Shelf created aggregate */
export type ShelfCreatedAggregate = {
  /** Shelf creation action in activity feed group */
  shelf?: Maybe<Shelf>
}

/** Cursor connection parameters for shelves */
export type ShelfCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ShelfCursorConnectionSort
}

/** Customize the sort behavior of shelves pagination */
export type ShelfCursorConnectionSort = {
  /** Sort by shelf index value */
  index?: InputMaybe<SortOrder>
}

/** Shelf release entity */
export type ShelfRelease = Node & {
  /** Date of release being added in shelf */
  addedAt: Scalars['Timestamp']
  /** Shelf Release identifier */
  id: Scalars['ID']
  /** Index of release within shelf */
  index: Scalars['Int']
  /** First backed nft of possibly collected release */
  ownedFirstNft?: Maybe<Nft>
  /** Returns golden egg if user owns, otherwise null */
  ownedGoldenEgg?: Maybe<EggGame>
  /** List of possibly owned nft serial numbers in ascending serial number order. If user does not own the release, it returns null */
  ownedSerialNumbers?: Maybe<Array<Scalars['Int']>>
  /** Release of the shelf */
  release: Release
}

/** Paginated shelf release connection */
export type ShelfReleaseConnection = Connection & {
  /** Edges of current page */
  edges: Array<ShelfReleaseConnectionEdge>
  /** Pagination helpers information */
  pageInfo: PageInfo
}

/** Shelf release node edge */
export type ShelfReleaseConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']
  /** Shelf release entity */
  node: ShelfRelease
}

/** Cursor connection parameters for shelf releases */
export type ShelfReleaseCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ShelfReleaseCursorConnectionSort
}

/** Customize the sort behavior of releases within shelf pagination */
export type ShelfReleaseCursorConnectionSort = {
  /** Sort by date when the release was added into shelf */
  addedAtDate?: InputMaybe<SortOrder>
  /** Sort by release index value */
  index?: InputMaybe<SortOrder>
}

/** Shelf type */
export const ShelfType = {
  DEFAULT: 'DEFAULT',
  USER_LIKED_SOUNDS: 'USER_LIKED_SOUNDS',
} as const

export type ShelfType = typeof ShelfType[keyof typeof ShelfType]
/** Filter based the type of shelf */
export const ShelfTypeFilter = {
  USER_CREATED: 'USER_CREATED',
} as const

export type ShelfTypeFilter = typeof ShelfTypeFilter[keyof typeof ShelfTypeFilter]
/** Song collected by many aggregate */
export type SongCollectedByManyAggregate = {
  /** Release corresponding to most recent purchase action in activity feed group */
  collectedRelease: ActivityFeedGroupCollectedRelease
  /** Featured collectors that purchased same release in an activity feed group */
  featuredCollectors: Array<ActivityFeedGroupFeaturedCollector>
  /** Number of collectors that purchased same release in an activity feed group */
  numCollectors: Scalars['Int']
}

/** Ascending or Descending sort */
export const SortOrder = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

export type SortOrder = typeof SortOrder[keyof typeof SortOrder]
/** Splits contract earnings */
export type SplitsContractEarning = {
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String']
  /** Address of the split wallet */
  contractAddress: Scalars['String']
  /** List of addresses that are on the split. Sorted for passing into distributeEth transaction */
  participantAddresses: Array<Scalars['String']>
  /** List of allocations for each participant. Matches ordering of participantAddresses */
  participantAllocations: Array<Scalars['Int']>
  /** Total eth on the contract */
  totalBalance: Scalars['String']
}

/** Realtime Subscriptions */
export type Subscription = {
  /** [PUBLIC] Subscribe to updates of activity feed groups of a particular activity feed */
  activityFeedGroup: SubscriptionActivityFeedGroup
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
export type SubscriptionactivityFeedGroupArgs = {
  activityFeedId: Scalars['UUID']
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

/** Union of subscription activity feed group types */
export type SubscriptionActivityFeedGroup = SubscriptionNewActivityFeedGroup | SubscriptionUpdatedActivityFeedGroup

/** Entity of new activity feed group created */
export type SubscriptionNewActivityFeedGroup = {
  /** New activity feed group id created */
  activityFeedGroupId: Scalars['String']
  /** Typename of activity feed group information */
  activityFeedGroupInformationTypename: Scalars['String']
}

/** Entity of updated activity feed group */
export type SubscriptionUpdatedActivityFeedGroup = {
  /** Updated activity feed group id */
  activityFeedGroupId: Scalars['String']
  /** Typename of activity feed group information */
  activityFeedGroupInformationTypename: Scalars['String']
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
  /** Track audio post-reveal of release */
  revealedAudio?: Maybe<Media>
  /** Track original audio (non-transcoded) post-reveal of release */
  revealedAudioOriginal?: Maybe<Media>
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
  /** Total amount of collected release of user */
  collectedReleasesCount: Scalars['Int']
  /** List of all the identifiers of releases currently collected by the user. If no releases have been collected yet, it returns null instead of an empty list */
  collectedReleasesIds?: Maybe<Array<Scalars['String']>>
  /** Rank of user for number of bought nfts */
  collectorPosition?: Maybe<Scalars['Int']>
  /** User entity creation */
  createdAt: Scalars['DateTime']
  /** Credit allocations associated with user */
  creditAllocations: Array<CreditAllocation>
  /** Delegate wallet public address */
  delegateWalletAddress?: Maybe<Scalars['String']>
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
  /** Shelves count of the user */
  shelvesCount: Scalars['Int']
  /** Should the user show the splits feature */
  showSplitsFeature: Scalars['Boolean']
  /** The user's aggregated balance on the 0xSplits SplitMain contract */
  splitBalance: Scalars['String']
  /** Verifier twitter handle */
  twitterHandle?: Maybe<Scalars['String']>
  /** Returns user username */
  username: Scalars['String']
  /** The total amount of Sound revenue the user has fully withdrawn */
  withdrawnAmount: Scalars['String']
}

/** User entity */
export type UsercollectedReleasesArgs = {
  filter?: InputMaybe<UserCollectedReleasesFilter>
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
  filter?: InputMaybe<UserShelvesFilter>
  pagination?: ShelfCursorConnectionArgs
}

/** User entity */
export type UsershelvesCountArgs = {
  filter?: InputMaybe<UserShelvesFilter>
}

/** User collected many songs aggregate */
export type UserCollectedManySongsAggregate = {
  /** Releases corresponding to user collected many songs activity feed group */
  collectedReleases: Array<ActivityFeedGroupCollectedRelease>
  /** Number of releases that a user purchased in an activity feed group */
  numReleases: Scalars['Int']
  /** User that collected many songs in activity feed group */
  user: User
}

/** Filter of User.collectedReleases paginated field */
export type UserCollectedReleasesFilter = {
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption
  /** Text search on release title or artist's name or handle */
  text?: InputMaybe<Scalars['NonEmptyString']>
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

/** Cursor connection parameters */
export type UserCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Sort the users ascending or descending relative to the user creation date */
  sort?: SortOrder
}

/** Filter the NFTs of User */
export type UserNftsConnectionFilters = {
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

/** Filter the shelves of a user */
export type UserShelvesFilter = {
  /** Case-insensitive text search on shelves names */
  text?: InputMaybe<Scalars['NonEmptyString']>
}

/** Exchanged amount pretty equivalent */
export type ValueExchangedPrettyType = {
  /** Formatted Ethereum value */
  eth: Scalars['String']
}

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
    marketPlaceUrl?: string | null
    mintStartTime: number
    title: string
    behindTheMusic: string
    season?: string | null
    totalRaised: string
    totalRaisedPrimaryUsd: number
    totalRaisedSecondaryUsd: number
    genre: { id: string; name: string }
    track: {
      id: string
      duration: number
      normalizedPeaks: Array<number>
      revealedAudio?: { id: string; url: string } | null
    }
    artist: {
      id: string
      gemCollectionUrl?: string | null
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
    eggGame?: { id: string; winningSerialNum: number; goldenEggImage?: { id: string; url: string } | null } | null
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

export const MerkleProof = `query MerkleProof($root:String!$unhashedLeaf:String!){merkleTreeProof(root:$root unhashedLeaf:$unhashedLeaf){proof}}`
export const ReleaseInfo = `query ReleaseInfo($contractAddress:Address!$editionId:String){release:releaseContract(contractAddress:$contractAddress editionId:$editionId){id contractAddress editionId type externalUrl openseaUrl layloUrl marketPlaceUrl mintStartTime title behindTheMusic season totalRaised totalRaisedPrimaryUsd totalRaisedSecondaryUsd genre{id name}track{id duration normalizedPeaks revealedAudio{id url}}artist{id gemCollectionUrl season soundHandle spotifyUrl bannerImage{id url}user{id publicAddress description displayName email twitterHandle avatar{id url}bannerImage{id url}}}rewards{id description numOfBackers price title}coverImage{id url}eggGame{id winningSerialNum goldenEggImage{id url}}}}`
export const AudioFromTrack = `query AudioFromTrack($trackId:UUID!){audioFromTrack(trackId:$trackId){id duration audio{id url}revealTime}}`
export const Test = `query Test{__typename}`
