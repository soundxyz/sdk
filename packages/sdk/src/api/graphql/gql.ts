export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Ethereum address */
  Address: string
  /** A string that cannot be passed as an empty value */
  CountryCode: string
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string
  /** Ethereum name service value with `.eth` suffix */
  ENS: string
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: string
  /** A string that cannot be passed as an empty value */
  NonEmptyString: string
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number
  /** Integers that will have a value greater than 0. */
  PositiveInt: number
  /** Semantic version string */
  SemanticVersion: string
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: number
  /** UUID v4 */
  UUID: string
  /** Represents NULL values */
  Void: null
}

/** Filter activity feed */
export type ActivityFeedFilterArgs = {
  /** Only get activity feed of certain type */
  activityFeedType?: ActivityFeedType
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
  LIKES: 'LIKES',
  POSTS: 'POSTS',
  RELEASE_DROPPED: 'RELEASE_DROPPED',
} as const

export type ActivityFeedGroupFilterOption =
  (typeof ActivityFeedGroupFilterOption)[keyof typeof ActivityFeedGroupFilterOption]
/** Activity feed type */
export const ActivityFeedType = {
  GLOBAL: 'GLOBAL',
  NOTABLE_COLLECTORS: 'NOTABLE_COLLECTORS',
  USER: 'USER',
} as const

export type ActivityFeedType = (typeof ActivityFeedType)[keyof typeof ActivityFeedType]
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
  /** Genre names to filter on for collector's releases */
  genres?: InputMaybe<Array<Genres>>
  /** Should it include artists as collectors */
  includeArtists?: Scalars['Boolean']
  /** Location ids to filter on for collector's releases */
  locationIds?: InputMaybe<Array<Scalars['String']>>
  /** Should it only include collectors with a valid username (twitterHandle, ens or displayName) */
  onlyWithUsername?: Scalars['Boolean']
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
  /** Genre names to filter on for shelf songs */
  genres?: InputMaybe<Array<Genres>>
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

/** Artist activity feed action type filter option */
export const ArtistActivityFeedActivityTypeFilterOption = {
  ALL: 'ALL',
  COLLECTIONS: 'COLLECTIONS',
  LIKES: 'LIKES',
  PLAYLISTS: 'PLAYLISTS',
  POSTS: 'POSTS',
  RELEASES: 'RELEASES',
} as const

export type ArtistActivityFeedActivityTypeFilterOption =
  (typeof ArtistActivityFeedActivityTypeFilterOption)[keyof typeof ArtistActivityFeedActivityTypeFilterOption]
/** Filter artist activity types */
export type ArtistActivityFeedFilterArgs = {
  /** Only get activity of given action type */
  activityTypes?: Array<ArtistActivityFeedActivityTypeFilterOption>
  /** Only get activity by the given group */
  types?: Array<ArtistActivityFeedTypeFilterOption>
}

/** Artist activity feed type filter option */
export const ArtistActivityFeedTypeFilterOption = {
  ALL: 'ALL',
  ARTIST: 'ARTIST',
  COLLECTOR: 'COLLECTOR',
  RELEASE: 'RELEASE',
} as const

export type ArtistActivityFeedTypeFilterOption =
  (typeof ArtistActivityFeedTypeFilterOption)[keyof typeof ArtistActivityFeedTypeFilterOption]
/** Artist application status */
export const ArtistApplicationStatus = {
  ACCEPTED: 'ACCEPTED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
} as const

export type ArtistApplicationStatus = (typeof ArtistApplicationStatus)[keyof typeof ArtistApplicationStatus]
/** Pagination paramaters for artist collectors */
export type ArtistCollectorCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ArtistCollectorCursorConnectionSort
}

/** Customize sort of collectors */
export type ArtistCollectorCursorConnectionSort = {
  /** Sort by first nft collected date */
  firstNftCollectedDate?: InputMaybe<SortOrder>
  /** Sort by amount nfts collected, with tie-breaker of earliest collector first */
  nftsCount?: InputMaybe<SortOrder>
}

/** Filter for paginated artists */
export type ArtistCursorFilterArgs = {
  /** Genre names to filter on for artist's releases */
  genres?: InputMaybe<Array<Genres>>
  /** Specify whether artist already has at least one collector (minted release) */
  hasCollector?: InputMaybe<Scalars['Boolean']>
  /** Specify whether artist already has at least one release */
  hasMintedRelease?: InputMaybe<Scalars['Boolean']>
  /** Specify whether artist already has at least one release */
  hasRelease?: InputMaybe<Scalars['Boolean']>
  /** Location IDs from Google Places API to filter on for artist's releases */
  locationIds?: InputMaybe<Array<Scalars['String']>>
  /** Specify season to be filtered */
  season?: InputMaybe<ArtistSeason>
}

/** Artist releases author filter option */
export const ArtistReleasesAuthorFilterOption = {
  ALL: 'ALL',
  ONLY_APPEARS_ON: 'ONLY_APPEARS_ON',
  ONLY_AUTHORED_RELEASES: 'ONLY_AUTHORED_RELEASES',
} as const

export type ArtistReleasesAuthorFilterOption =
  (typeof ArtistReleasesAuthorFilterOption)[keyof typeof ArtistReleasesAuthorFilterOption]
/** Artist releases credit split filter option */
export const ArtistReleasesCreditSplitFilterOption = {
  ALL: 'ALL',
  ONLY_CREDIT_SPLITS: 'ONLY_CREDIT_SPLITS',
  ONLY_NO_CREDIT_SPLITS: 'ONLY_NO_CREDIT_SPLITS',
} as const

export type ArtistReleasesCreditSplitFilterOption =
  (typeof ArtistReleasesCreditSplitFilterOption)[keyof typeof ArtistReleasesCreditSplitFilterOption]
/** Filter for artist releases. Default is only for artist sounds. */
export type ArtistReleasesFilter = {
  /** Filters on release credit split status */
  creditSplit?: ArtistReleasesCreditSplitFilterOption
  /** Excludes specific releaseIds */
  excludeReleaseIds?: Array<Scalars['UUID']>
  /** Filters on release with specified mint time status */
  mintTimeStatus?: Array<MintTimeStatus>
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption
  /** Filters on release author status */
  releaseAuthor?: ArtistReleasesAuthorFilterOption
  /** Filters on release type */
  releaseType?: Array<ReleaseType>
}

/** Filter the artists to be searched */
export type ArtistSearchFilter = {
  /** Genre names to filter on for artist's releases */
  genres?: InputMaybe<Array<Genres>>
  /** Only include artists that either have or don't have collectors */
  hasCollectors?: InputMaybe<Scalars['Boolean']>
  /** Location IDs from Google Places API to filter on for artist's releases */
  locationIds?: InputMaybe<Array<Scalars['String']>>
}

/** Customize sort of releases */
export type ArtistSearchSort = {
  /** Sort by creation date */
  createdAt?: InputMaybe<SortOrder>
  /** Sort by number of mints of each release */
  totalMinted?: InputMaybe<SortOrder>
  /** Sort by total volume of all artist releases */
  totalVolume?: InputMaybe<SortOrder>
}

/** Types of seasons for artists */
export const ArtistSeason = {
  GENESIS: 'GENESIS',
  SEASON_FOUR: 'SEASON_FOUR',
  SEASON_ONE: 'SEASON_ONE',
  SEASON_THREE: 'SEASON_THREE',
  SEASON_TWO: 'SEASON_TWO',
} as const

export type ArtistSeason = (typeof ArtistSeason)[keyof typeof ArtistSeason]
/** Defines sort order of Artist fields, array index defines tiebreaking */
export type ArtistSortInput = {
  /** Field to be sorted */
  field: SearchArtistsSortEnum
  /** Sort ascending or descending */
  order: SortOrder
}

/** Types of release sales */
export const AuctionType = {
  FIXED_QUANTITY: 'FIXED_QUANTITY',
  FIXED_QUANTITY_WITH_GA: 'FIXED_QUANTITY_WITH_GA',
  OPEN_EDITION: 'OPEN_EDITION',
  OPEN_EDITION_WITH_GA: 'OPEN_EDITION_WITH_GA',
  OPEN_EDITION_WITH_SAM: 'OPEN_EDITION_WITH_SAM',
  RANGE_BOUND: 'RANGE_BOUND',
} as const

export type AuctionType = (typeof AuctionType)[keyof typeof AuctionType]
/** Chain name supported on the platform */
export const ChainType = {
  GOERLI: 'GOERLI',
  MAINNET: 'MAINNET',
  OPTIMISM: 'OPTIMISM',
  OPTIMISM_GOERLI: 'OPTIMISM_GOERLI',
} as const

export type ChainType = (typeof ChainType)[keyof typeof ChainType]
/** Name of the collection market */
export const CollectionMarketType = {
  AIRDROP: 'AIRDROP',
  BONDING_CURVE_SALE: 'BONDING_CURVE_SALE',
  PRIMARY_SALE: 'PRIMARY_SALE',
  SECONDARY_SALE: 'SECONDARY_SALE',
} as const

export type CollectionMarketType = (typeof CollectionMarketType)[keyof typeof CollectionMarketType]
/** Filter collector feed activity types */
export type CollectorActivityFeedFilterArgs = {
  /** Only get activity of given type */
  types?: Array<CollectorActivityFeedTypeFilterOption>
}

/** Collector activity feed type filter option */
export const CollectorActivityFeedTypeFilterOption = {
  ALL: 'ALL',
  COLLECTIONS: 'COLLECTIONS',
  LIKES: 'LIKES',
  PLAYLISTS: 'PLAYLISTS',
} as const

export type CollectorActivityFeedTypeFilterOption =
  (typeof CollectorActivityFeedTypeFilterOption)[keyof typeof CollectorActivityFeedTypeFilterOption]
/** Pagination parameters of collector comments */
export type CollectorCommentCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: CollectorCommentCursorConnectionSort
}

/** Customize sort of release shelves */
export type CollectorCommentCursorConnectionSort = {
  /** Sort by date of comment creation */
  createdAt?: InputMaybe<SortOrder>
}

/** Filter the releases to be searched */
export type CollectorSearchFilter = {
  /** Genre names to filter on for collector's releases */
  genres?: InputMaybe<Array<Genres>>
  /** Location ids to filter on for collector's releases */
  locationIds?: InputMaybe<Array<Scalars['String']>>
}

/** Customize sort of collectors */
export type CollectorSearchSort = {
  /** Sort by number of distinct artists the collector backed */
  artistsBacked?: InputMaybe<SortOrder>
  /** Sort by creation date */
  createdAt?: InputMaybe<SortOrder>
  /** Sort by number of nfts */
  nftsCount?: InputMaybe<SortOrder>
  /** Sort by number of mints of each release */
  totalMinted?: InputMaybe<SortOrder>
  /** Sort by total volume of all collector releases */
  totalVolume?: InputMaybe<SortOrder>
}

/** Defines sort order of Collector fields, array index defines tiebreaking */
export type CollectorSortInput = {
  /** Field to be sorted */
  field: SearchCollectorsSortEnum
  /** Sort ascending or descending */
  order: SortOrder
}

/** Input for release by contract */
export type ContractReleaseInput = {
  /** Contract address */
  contractAddress: Scalars['Address']
  /** Optional edition identifier */
  editionId?: InputMaybe<Scalars['String']>
}

/** Contract type on chain */
export const ContractType = {
  ARTIST: 'ARTIST',
  EDITION: 'EDITION',
  TIERED_EDITION: 'TIERED_EDITION',
} as const

export type ContractType = (typeof ContractType)[keyof typeof ContractType]
/** Credit role type */
export const CreditRoleType = {
  ARTIST: 'ARTIST',
  CURATOR: 'CURATOR',
  OTHER: 'OTHER',
  PRODUCER: 'PRODUCER',
  REMIXER: 'REMIXER',
  SONGWRITER: 'SONGWRITER',
  VISUAL_ARTIST: 'VISUAL_ARTIST',
} as const

export type CreditRoleType = (typeof CreditRoleType)[keyof typeof CreditRoleType]
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

/** Input for draftAllowListFromRelease query */
export type DraftAllowlistFromReleaseInput = {
  /** Merkle tree root */
  merkleRoot: Scalars['String']
  /** Release identifier */
  releaseId: Scalars['UUID']
}

/** Different draft allow list types */
export const DraftAllowlistType = {
  ARTIST_COLLECTORS: 'ARTIST_COLLECTORS',
  MANUALLY_ADDED_COLLECTORS: 'MANUALLY_ADDED_COLLECTORS',
  RELEASE_COLLECTORS: 'RELEASE_COLLECTORS',
} as const

export type DraftAllowlistType = (typeof DraftAllowlistType)[keyof typeof DraftAllowlistType]
/** Filter the edition owned tokenIds result */
export type EditionOwnedTokenIdsFilter = {
  /** Should it include golden egg */
  includeGoldenEgg?: Scalars['Boolean']
}

/** Input for editionOwnedTokenIds query */
export type EditionOwnedTokenIdsInput = {
  /** Edition contract address */
  editionContractAddress: Scalars['Address']
  /** Filter the tokenIds */
  filter?: EditionOwnedTokenIdsFilter
  /** Limit the amount of token ids to be returned. By default there is no limit */
  limit?: InputMaybe<Scalars['PositiveInt']>
  /** Public address of owner */
  ownerPublicAddress: Scalars['Address']
  /** Customize sort behavior */
  sort?: NftCursorConnectionSort
}

/** List of genres available on the platform */
export const Genres = {
  AFROBEAT: 'AFROBEAT',
  ALTERNATIVE_ROCK: 'ALTERNATIVE_ROCK',
  AMBIENT: 'AMBIENT',
  BOUNCE: 'BOUNCE',
  CLASSICAL: 'CLASSICAL',
  COUNTRY: 'COUNTRY',
  DANCEHALL: 'DANCEHALL',
  DANCE_EDM: 'DANCE_EDM',
  DEEP_HOUSE: 'DEEP_HOUSE',
  DISCO: 'DISCO',
  DOWNTEMPO: 'DOWNTEMPO',
  DRUM_BASS: 'DRUM_BASS',
  DUBSTEP: 'DUBSTEP',
  ELECTRONIC: 'ELECTRONIC',
  EXPERIMENTAL: 'EXPERIMENTAL',
  FOLK_SINGER_SONGWRITER: 'FOLK_SINGER_SONGWRITER',
  HIP_HOP_RAP: 'HIP_HOP_RAP',
  HOUSE: 'HOUSE',
  INDIE: 'INDIE',
  JAZZ_BLUES: 'JAZZ_BLUES',
  LATIN: 'LATIN',
  LOFI: 'LOFI',
  METAL: 'METAL',
  PIANO: 'PIANO',
  POP: 'POP',
  REGGAE: 'REGGAE',
  REGGAETON: 'REGGAETON',
  ROCK: 'ROCK',
  R_B_SOUL: 'R_B_SOUL',
  SOUNDTRACK: 'SOUNDTRACK',
  TECHNO: 'TECHNO',
  TRANCE: 'TRANCE',
  TRAP: 'TRAP',
  TRIPHOP: 'TRIPHOP',
  WORLD: 'WORLD',
} as const

export type Genres = (typeof Genres)[keyof typeof Genres]
/** Customize iframe html parameters */
export type IframeHtmlParameters = {
  /** Customize height */
  height: Scalars['String']
  /** Customize style */
  style: Scalars['String']
  /** Customize width */
  width: Scalars['String']
}

/** Status of Key Client */
export const KeyClientStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export type KeyClientStatus = (typeof KeyClientStatus)[keyof typeof KeyClientStatus]
/** License for the release */
export const LicenseType = {
  ALL_RIGHTS_RESERVED: 'ALL_RIGHTS_RESERVED',
  CREATIVE_COMMONS: 'CREATIVE_COMMONS',
} as const

export type LicenseType = (typeof LicenseType)[keyof typeof LicenseType]
/** Input used for link query */
export type LinkInput = {
  /** Link slug */
  slug: Scalars['NonEmptyString']
}

/** Type of media entity, either Images or Audio */
export const MediaType = {
  ARTIST_BANNER_IMAGE: 'ARTIST_BANNER_IMAGE',
  ARTIST_COLLECTORS_CSV: 'ARTIST_COLLECTORS_CSV',
  ARTIST_FREE_SALE_ALLOWLIST: 'ARTIST_FREE_SALE_ALLOWLIST',
  ARTIST_PRESALE_ALLOWLIST: 'ARTIST_PRESALE_ALLOWLIST',
  AUDIO: 'AUDIO',
  AUDIO_128K: 'AUDIO_128K',
  AUDIO_192K: 'AUDIO_192K',
  AUDIO_256K: 'AUDIO_256K',
  AUDIO_HLS: 'AUDIO_HLS',
  AVATAR_IMAGE: 'AVATAR_IMAGE',
  DRAFT_ALLOWLISTED_ADDRESSES_CSV: 'DRAFT_ALLOWLISTED_ADDRESSES_CSV',
  MERKLE_TREE_CSV: 'MERKLE_TREE_CSV',
  RELEASE_BANNER_IMAGE: 'RELEASE_BANNER_IMAGE',
  RELEASE_COVER_IMAGE: 'RELEASE_COVER_IMAGE',
  RELEASE_GA_COVER_IMAGE: 'RELEASE_GA_COVER_IMAGE',
  RELEASE_GA_WEB_ANIMATED_IMAGE: 'RELEASE_GA_WEB_ANIMATED_IMAGE',
  RELEASE_GA_WEB_STATIC_AUTOGEN_IMAGE: 'RELEASE_GA_WEB_STATIC_AUTOGEN_IMAGE',
  RELEASE_GA_WEB_STATIC_IMAGE: 'RELEASE_GA_WEB_STATIC_IMAGE',
  RELEASE_GOLDEN_EGG_IMAGE: 'RELEASE_GOLDEN_EGG_IMAGE',
  RELEASE_HOLDERS_CSV: 'RELEASE_HOLDERS_CSV',
  RELEASE_WEB_ANIMATED_GOLDEN_EGG_IMAGE: 'RELEASE_WEB_ANIMATED_GOLDEN_EGG_IMAGE',
  RELEASE_WEB_ANIMATED_IMAGE: 'RELEASE_WEB_ANIMATED_IMAGE',
  RELEASE_WEB_STATIC_AUTOGEN_IMAGE: 'RELEASE_WEB_STATIC_AUTOGEN_IMAGE',
  RELEASE_WEB_STATIC_IMAGE: 'RELEASE_WEB_STATIC_IMAGE',
  SHELF_COVER_IMAGE: 'SHELF_COVER_IMAGE',
  TMP_ARTIST_BANNER_AUTOGEN_IMAGE: 'TMP_ARTIST_BANNER_AUTOGEN_IMAGE',
  TMP_AVATAR_AUTOGEN_IMAGE: 'TMP_AVATAR_AUTOGEN_IMAGE',
  TMP_USER_BANNER_AUTOGEN_IMAGE: 'TMP_USER_BANNER_AUTOGEN_IMAGE',
  USER_BANNER_IMAGE: 'USER_BANNER_IMAGE',
} as const

export type MediaType = (typeof MediaType)[keyof typeof MediaType]
/** Mint current time status */
export const MintTimeStatus = {
  PAST: 'PAST',
  UPCOMING: 'UPCOMING',
} as const

export type MintTimeStatus = (typeof MintTimeStatus)[keyof typeof MintTimeStatus]
/** Filter minted releases */
export type MintedReleasesCursorFilterArgs = {
  /** Specify up to 50 contracts to filter the releases */
  contracts?: InputMaybe<Array<ContractReleaseInput>>
  /** Only get releases from specified genres */
  genre?: InputMaybe<Array<Scalars['String']>>
  /** Only get releases from specified genres */
  genres?: InputMaybe<Array<Genres>>
  /** Remove currently-featured releases from results */
  hideFeatured?: InputMaybe<Scalars['Boolean']>
  /** Location ids to filter on for releases */
  locationIds?: InputMaybe<Array<Scalars['String']>>
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

/** Platform type */
export const PlatformType = {
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  WEB: 'WEB',
} as const

export type PlatformType = (typeof PlatformType)[keyof typeof PlatformType]
/** Filter PlaylistAction details */
export type PlaylistActionFilterArgs = {
  /** If set, only show artist owned releases in paginated release results. Does not apply if the playlist is owned by the artist */
  releaseArtistId?: InputMaybe<Scalars['UUID']>
}

/** Cursor connection parameters */
export type PlaylistActionReleasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the number of nodes to be fetched, to be used with "after", with a maximum of 25 nodes */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the number of nodes to be fetched, to be used with "before", with a maximum of 25 nodes */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Sort the releases ascending or descending by release creation date */
  sort?: SortOrder
}

/** Pagination paramaters for release chart ranks */
export type PlaylistChartRankCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: PlaylistChartRankCursorConnectionSort
}

/** Customize sort of collectors */
export type PlaylistChartRankCursorConnectionSort = {
  /** Sort by playlist chart current rank */
  currentRank?: InputMaybe<SortOrder>
}

/** Playlist input */
export type PlaylistInput = {
  /** Association ID based on type of playlist */
  associationId?: InputMaybe<Scalars['String']>
  /** Type of playlist */
  type: PlaylistType
}

/** Currently supported playlists */
export const PlaylistType = {
  ARTIST: 'ARTIST',
  HOLDER: 'HOLDER',
  HOME: 'HOME',
} as const

export type PlaylistType = (typeof PlaylistType)[keyof typeof PlaylistType]
/** Cursor connection parameters for Post Comments */
export type PostCommentCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: PostCommentCursorConnectionSort
}

/** Customize the sort behavior of Post Comments pagination */
export type PostCommentCursorConnectionSort = {
  /** Sort by created date */
  createdAt?: InputMaybe<SortOrder>
}

/** Pagination parameters of referred users */
export type ReferredUsersCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 25 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 25 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ReferredUsersCursorConnectionSort
}

/** Customize the sort behavior of release affiliates total purchases */
export type ReferredUsersCursorConnectionSort = {
  /** Sort by purchase block number */
  blockNumber?: InputMaybe<SortOrder>
}

/** Input for referred users within release affiliate total purchases */
export type ReferredUsersInput = {
  /** Pagination parameters */
  pagination?: ReferredUsersCursorConnectionArgs
}

/** Filter release activity types */
export type ReleaseActivityFeedFilterArgs = {
  /** Only get activity of given type */
  types?: Array<ReleaseActivityFeedTypeFilterOption>
}

/** Release activity feed input parameters */
export type ReleaseActivityFeedInput = {
  /** Only get activities of given types */
  filter?: ReleaseActivityFeedFilterArgs
  /** Pagination parameters */
  pagination?: CursorConnectionArgs
}

/** Release activity feed type filter option */
export const ReleaseActivityFeedTypeFilterOption = {
  ALL: 'ALL',
  COLLECTIONS: 'COLLECTIONS',
  LIKES: 'LIKES',
  PLAYLISTS: 'PLAYLISTS',
  RELEASES: 'RELEASES',
} as const

export type ReleaseActivityFeedTypeFilterOption =
  (typeof ReleaseActivityFeedTypeFilterOption)[keyof typeof ReleaseActivityFeedTypeFilterOption]
/** Release album reveal filter option */
export const ReleaseAlbumRevealFilterOption = {
  ALL: 'ALL',
  ONLY_NOT_REVEALED_ALBUMS: 'ONLY_NOT_REVEALED_ALBUMS',
  ONLY_REVEALED_ALBUMS: 'ONLY_REVEALED_ALBUMS',
} as const

export type ReleaseAlbumRevealFilterOption =
  (typeof ReleaseAlbumRevealFilterOption)[keyof typeof ReleaseAlbumRevealFilterOption]
/** Input for releaseAllowlist query */
export type ReleaseAllowlistInput = {
  /** Merkle tree root */
  merkleRoot: Scalars['String']
  /** Release identifier */
  releaseId: Scalars['UUID']
}

/** Input for releaseChart query */
export type ReleaseChartByLastDayInput = {
  /** Locate chart using the last date of the period (inclusive) */
  lastDayOfChartInclusive: Scalars['DateTime']
}

/** Pagination paramaters for release charts */
export type ReleaseChartCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ReleaseChartCursorConnectionSort
}

/** Customize sort of release charts */
export type ReleaseChartCursorConnectionSort = {
  /** Sort by release chart period end exclusive */
  periodEndExclusive?: InputMaybe<SortOrder>
}

/** Input for releaseChart query */
export type ReleaseChartInput = {
  /** Filter on periodEnd date */
  periodEndExclusive: Scalars['DateTime']
}

/** Pagination paramaters for release chart ranks */
export type ReleaseChartRankCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ReleaseChartRankCursorConnectionSort
}

/** Customize sort of collectors */
export type ReleaseChartRankCursorConnectionSort = {
  /** Sort by release chart current rank */
  currentRank?: InputMaybe<SortOrder>
}

/** Input for releaseChartRank query */
export type ReleaseChartRankInput = {
  /** Release Chart Rank entity id */
  id: Scalars['UUID']
}

/** Input for releaseChart query */
export type ReleaseChartsInput = {
  /** Cursor connection parameters */
  pagination?: ReleaseChartCursorConnectionArgs
}

/** Pagination parameters for release collectors */
export type ReleaseCollectorCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior */
  sort?: ReleaseCollectorCursorConnectionSort
  /** The NFT tier you want to select for ReleaseCollectors, defaults All */
  tier?: InputMaybe<TierNFT>
}

/** Customize sort of collectors */
export type ReleaseCollectorCursorConnectionSort = {
  /** Sort by first nft collected date */
  firstNftCollectedDate?: InputMaybe<SortOrder>
  /** Sort by amount ga nfts collected, with tie-breaker of earliest collector first */
  gaNftsCount?: InputMaybe<SortOrder>
  /** Sort by lowest owned serial number */
  lowestOwnedSerialNumber?: InputMaybe<SortOrder>
  /** Sort by amount nfts collected, with tie-breaker of earliest collector first */
  nftsCount?: InputMaybe<SortOrder>
  /** Sort by vips first, then ga, tie-breaker of first nft collected date */
  priorityFirstNftDate?: InputMaybe<SortOrder>
  /** Sort by vips first, then ga, tie-breaker most nfts collected */
  priorityTop?: InputMaybe<SortOrder>
  /** Sort by amount vip nfts collected, with tie-breaker of earliest collector first */
  vipNftsCount?: InputMaybe<SortOrder>
}

/** Release featured status */
export const ReleaseFeaturedStatus = {
  ALL: 'ALL',
  HOT: 'HOT',
} as const

export type ReleaseFeaturedStatus = (typeof ReleaseFeaturedStatus)[keyof typeof ReleaseFeaturedStatus]
/** Input for "releaseFromToken" query */
export type ReleaseFromTokenInput = {
  /** Contract address of release */
  contractAddress: Scalars['Address']
  /** Token chain identifier */
  tokenId: Scalars['String']
}

/** Filter the releases to be searched */
export type ReleaseSearchFilter = {
  /** Filter releases that are made by specified artists. You can only specify up to 51 artists. */
  artistIds?: InputMaybe<Array<Scalars['UUID']>>
  /** Genre names to filter on for releases */
  genres?: InputMaybe<Array<Genres>>
  /** Only include releases that either have or don't have collectors */
  hasCollectors?: InputMaybe<Scalars['Boolean']>
  /** Location ids to filter on for releases */
  locationIds?: InputMaybe<Array<Scalars['String']>>
  /** Only get release with specified status */
  releaseStatus?: InputMaybe<Array<ReleaseStatus>>
  /** Filters on release type */
  type?: InputMaybe<Array<ReleaseType>>
}

/** Customize sort of releases */
export type ReleaseSearchSort = {
  /** Sort by time the release was minted */
  mintStartTime?: InputMaybe<SortOrder>
  /** Sort by number of mints of each release */
  totalMinted?: InputMaybe<SortOrder>
  /** Sort by total volume of each release */
  totalVolume?: InputMaybe<SortOrder>
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
  /** Sort by shelf score */
  score?: InputMaybe<SortOrder>
}

/** Filter release shelves */
export type ReleaseShelvesFilter = {
  /** Filter shelves to be included by identifier. You can only specify up to 51 shelves. */
  shelfIds?: InputMaybe<Array<Scalars['UUID']>>
  /** Filter shelves types to be included */
  type?: InputMaybe<Array<ShelfType>>
}

/** Defines sort order of Release fields, array index defines tiebreaking */
export type ReleaseSortInput = {
  /** Field to be sorted */
  field: SearchReleasesSortEnum
  /** Sort ascending or descending */
  order: SortOrder
}

/** Release current status type */
export const ReleaseStatus = {
  AVAILABLE_TO_MINT: 'AVAILABLE_TO_MINT',
  SOLD_OUT: 'SOLD_OUT',
  UPCOMING: 'UPCOMING',
} as const

export type ReleaseStatus = (typeof ReleaseStatus)[keyof typeof ReleaseStatus]
/** Release type, currently the platform only supports "SINGLE" */
export const ReleaseType = {
  ALBUM: 'ALBUM',
  ALBUM_TRACK: 'ALBUM_TRACK',
  SINGLE: 'SINGLE',
} as const

export type ReleaseType = (typeof ReleaseType)[keyof typeof ReleaseType]
/** Input for Release.webEmbed */
export type ReleaseWebEmbedInput = {
  /** Customize html parameters */
  html?: IframeHtmlParameters
  /** Referral address */
  referralAddress?: InputMaybe<Scalars['Address']>
}

/** Customize webapp uri parameters of release */
export type ReleaseWebappUriInput = {
  /** Referral address */
  referralAddress?: InputMaybe<Scalars['Address']>
}

export const ReleasesCollectorSortEnum = {
  FIRST_NFT_COLLECTED_DATE: 'FIRST_NFT_COLLECTED_DATE',
  NFTS_COUNT: 'NFTS_COUNT',
} as const

export type ReleasesCollectorSortEnum = (typeof ReleasesCollectorSortEnum)[keyof typeof ReleasesCollectorSortEnum]
/** Pagination parameters for releases connection */
export type ReleasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
  /** Start after the first "skip" entities based. It can't be specified alongside "after" or "before" */
  skip?: InputMaybe<Scalars['NonNegativeInt']>
  /** Customize sort behavior of releases pagination */
  sort?: ReleasesCursorConnectionSort
}

/** Customize sort behavior of releases pagination */
export type ReleasesCursorConnectionSort = {
  /** Sort by createdAt of release */
  createdAt?: InputMaybe<SortOrder>
  /** Sort by mintStartTime of release */
  mintStartTime?: InputMaybe<SortOrder>
}

/** Filter releases */
export type ReleasesCursorFilterArgs = {
  /** Filter by getting releases of the artists followed by the specified user identifier */
  artistFollowedByUser?: InputMaybe<Scalars['UUID']>
  /** Specify up to 50 contracts to filter the releases */
  contracts?: InputMaybe<Array<ContractReleaseInput>>
  /** Filters on release featured status */
  featuredStatus?: InputMaybe<ReleaseFeaturedStatus>
  /** Only get releases from specified genres */
  genre?: InputMaybe<Array<Scalars['String']>>
  /** Only get releases from specified genres */
  genres?: InputMaybe<Array<Genres>>
  /** Remove currently-featured releases from results */
  hideFeatured?: InputMaybe<Scalars['Boolean']>
  /** Location ids to filter on for releases */
  locationIds?: InputMaybe<Array<Scalars['String']>>
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
  releaseType?: InputMaybe<Array<ReleaseType>>
  /** Only get releases from specified seasons */
  season?: InputMaybe<Array<ArtistSeason>>
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

export const SearchArtistsSortEnum = {
  CREATED_AT: 'CREATED_AT',
  TOTAL_MINTED: 'TOTAL_MINTED',
  TOTAL_VOLUME: 'TOTAL_VOLUME',
} as const

export type SearchArtistsSortEnum = (typeof SearchArtistsSortEnum)[keyof typeof SearchArtistsSortEnum]
export const SearchCollectorsSortEnum = {
  ARTISTS_BACKED: 'ARTISTS_BACKED',
  CREATED_AT: 'CREATED_AT',
  NFTS_COUNT: 'NFTS_COUNT',
  TOTAL_MINTED: 'TOTAL_MINTED',
  TOTAL_VOLUME: 'TOTAL_VOLUME',
} as const

export type SearchCollectorsSortEnum = (typeof SearchCollectorsSortEnum)[keyof typeof SearchCollectorsSortEnum]
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
  text?: InputMaybe<Scalars['String']>
}

export const SearchReleasesSortEnum = {
  MINT_START_TIME: 'MINT_START_TIME',
  TOTAL_MINTED: 'TOTAL_MINTED',
  TOTAL_VOLUME: 'TOTAL_VOLUME',
} as const

export type SearchReleasesSortEnum = (typeof SearchReleasesSortEnum)[keyof typeof SearchReleasesSortEnum]
export const SearchShelvesSortEnum = {
  CREATED_AT: 'CREATED_AT',
  NUM_LIKES: 'NUM_LIKES',
  NUM_REFERRAL_PURCHASES: 'NUM_REFERRAL_PURCHASES',
} as const

export type SearchShelvesSortEnum = (typeof SearchShelvesSortEnum)[keyof typeof SearchShelvesSortEnum]
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
  /** Sort by created at date */
  createdAt?: InputMaybe<SortOrder>
  /** Sort by shelf index value */
  index?: InputMaybe<SortOrder>
}

/** Cursor connection parameters for shelf ordered releases */
export type ShelfOrderedReleaseCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>
}

/** Customize sort behavior of shelf releases */
export type ShelfReleasesSort = {
  /** Sort by release added to shelf date */
  addedToShelfDate?: InputMaybe<SortOrder>
  /** Sort by release index of shelf */
  index?: SortOrder
}

/** Filter the shelf to be searched */
export type ShelfSearchFilter = {
  /** Genre names to filter on for shelf songs */
  genres?: InputMaybe<Array<Genres>>
}

/** Customize sorting of shelves */
export type ShelfSearchSort = {
  /** Sort by time playlist was created */
  createdAt?: InputMaybe<SortOrder>
  /** Sort by number of likes */
  numLikes?: InputMaybe<SortOrder>
  /** Sort by number of referral purchases (Mints Driven) */
  numReferralPurchases?: InputMaybe<SortOrder>
}

/** Defines sort order of Shelf fields, array index defines tiebreaking */
export type ShelfSortInput = {
  /** Field to be sorted */
  field: SearchShelvesSortEnum
  /** Sort ascending or descending */
  order: SortOrder
}

/** Shelf type */
export const ShelfType = {
  DEFAULT: 'DEFAULT',
  USER_LIKED_SOUNDS: 'USER_LIKED_SOUNDS',
} as const

export type ShelfType = (typeof ShelfType)[keyof typeof ShelfType]
/** Filter based the type of shelf */
export const ShelfTypeFilter = {
  ALL: 'ALL',
  LIKED: 'LIKED',
  USER_CREATED: 'USER_CREATED',
} as const

export type ShelfTypeFilter = (typeof ShelfTypeFilter)[keyof typeof ShelfTypeFilter]
/** Input for Shelf.webEmbed */
export type ShelfWebEmbedInput = {
  /** Customize html parameters */
  html?: IframeHtmlParameters
}

/** Key the release was written in */
export const SongKeyType = {
  A_FLAT_MAJOR: 'A_FLAT_MAJOR',
  A_MAJOR: 'A_MAJOR',
  A_MINOR: 'A_MINOR',
  B_FLAT_MAJOR: 'B_FLAT_MAJOR',
  B_FLAT_MINOR: 'B_FLAT_MINOR',
  B_MAJOR: 'B_MAJOR',
  B_MINOR: 'B_MINOR',
  C_MAJOR: 'C_MAJOR',
  C_MINOR: 'C_MINOR',
  C_SHARP_MINOR: 'C_SHARP_MINOR',
  D_FLAT_MAJOR: 'D_FLAT_MAJOR',
  D_MAJOR: 'D_MAJOR',
  D_MINOR: 'D_MINOR',
  E_FLAT_MAJOR: 'E_FLAT_MAJOR',
  E_FLAT_MINOR: 'E_FLAT_MINOR',
  E_MAJOR: 'E_MAJOR',
  E_MINOR: 'E_MINOR',
  F_MAJOR: 'F_MAJOR',
  F_MINOR: 'F_MINOR',
  F_SHARP_MAJOR: 'F_SHARP_MAJOR',
  F_SHARP_MINOR: 'F_SHARP_MINOR',
  G_MAJOR: 'G_MAJOR',
  G_MINOR: 'G_MINOR',
  G_SHARP_MINOR: 'G_SHARP_MINOR',
} as const

export type SongKeyType = (typeof SongKeyType)[keyof typeof SongKeyType]
/** Ascending or Descending sort */
export const SortOrder = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]
/** The Tier of the NFT owned by ReleaseCollector */
export const TierNFT = {
  ALL: 'ALL',
  GA: 'GA',
  VIP: 'VIP',
} as const

export type TierNFT = (typeof TierNFT)[keyof typeof TierNFT]
/** Mode that differentiates behavior of tier schedule */
export const TierScheduleMode = {
  DEFAULT: 'DEFAULT',
  VERIFY_MERKLE: 'VERIFY_MERKLE',
  VERIFY_SIGNATURE: 'VERIFY_SIGNATURE',
} as const

export type TierScheduleMode = (typeof TierScheduleMode)[keyof typeof TierScheduleMode]
/** Time period to aggregate trending table queries */
export const TimePeriodAggEnum = {
  ALL_TIME: 'ALL_TIME',
  ONE_DAY: 'ONE_DAY',
  ONE_MONTH: 'ONE_MONTH',
  SEVEN_DAY: 'SEVEN_DAY',
} as const

export type TimePeriodAggEnum = (typeof TimePeriodAggEnum)[keyof typeof TimePeriodAggEnum]
/** Input for top affiliate curators query */
export type TopAffiliateCuratorsInput = {
  /** Limit the amount to be returned, Up to 100 */
  limit?: Scalars['PositiveInt']
  /** Sort logic used */
  sort: TopCuratorsSortEnum
  /** For what time period the data should come from */
  timePeriod: TopChartTimePeriodEnum
}

/** Input for top artists query */
export type TopArtistsInput = {
  /** Limit the amount to be returned, Up to 100 */
  limit?: Scalars['PositiveInt']
  /** Sort logic used */
  sort: TrendingArtistsSortEnum
  /** For what time period the data should come from */
  timePeriod: TopChartTimePeriodEnum
}

/** Time period to aggregate top chart queries */
export const TopChartTimePeriodEnum = {
  ALL_TIME: 'ALL_TIME',
  SEVEN_DAY: 'SEVEN_DAY',
  THIRTY_DAY: 'THIRTY_DAY',
} as const

export type TopChartTimePeriodEnum = (typeof TopChartTimePeriodEnum)[keyof typeof TopChartTimePeriodEnum]
export const TopCuratorsSortEnum = {
  MINTS: 'MINTS',
  SOUNDS_REFERRED: 'SOUNDS_REFERRED',
  TOTAL_AFFILIATE_EARNED: 'TOTAL_AFFILIATE_EARNED',
  TOTAL_VOLUME: 'TOTAL_VOLUME',
} as const

export type TopCuratorsSortEnum = (typeof TopCuratorsSortEnum)[keyof typeof TopCuratorsSortEnum]
/** Input for topPlaylists query */
export type TopPlaylistsInput = {
  /** Limit the amount to be returned, Up to 100 */
  limit?: Scalars['PositiveInt']
  /** Sort logic used */
  sort: TrendingPlaylistsSortEnum
  /** For what time period the data should come from */
  timePeriod: TimePeriodAggEnum
}

/** Type of sort parameter used for trending artists */
export const TrendingArtistsSortEnum = {
  NFTS_SOLD: 'NFTS_SOLD',
  PRIMARY_SALES: 'PRIMARY_SALES',
  SECONDARY_SALES: 'SECONDARY_SALES',
  TOTAL_SALES: 'TOTAL_SALES',
  UNIQUE_COLLECTORS: 'UNIQUE_COLLECTORS',
} as const

export type TrendingArtistsSortEnum = (typeof TrendingArtistsSortEnum)[keyof typeof TrendingArtistsSortEnum]
/** Type of sort paratemer used for trending collectors */
export const TrendingCollectorsSortEnum = {
  CREATORS_SUPPORTED: 'CREATORS_SUPPORTED',
  NFTS_BOUGHT: 'NFTS_BOUGHT',
  TOTAL_SPENT: 'TOTAL_SPENT',
} as const

export type TrendingCollectorsSortEnum = (typeof TrendingCollectorsSortEnum)[keyof typeof TrendingCollectorsSortEnum]
/** Trending indicator type */
export const TrendingIndicator = {
  DOWN: 'DOWN',
  NEW: 'NEW',
  SAME: 'SAME',
  UP: 'UP',
} as const

export type TrendingIndicator = (typeof TrendingIndicator)[keyof typeof TrendingIndicator]
/** Type of sort paratemer used for trending playlists */
export const TrendingPlaylistsSortEnum = {
  LIKES: 'LIKES',
} as const

export type TrendingPlaylistsSortEnum = (typeof TrendingPlaylistsSortEnum)[keyof typeof TrendingPlaylistsSortEnum]
/** Type of sort paratemer used for trending releases */
export const TrendingReleasesSortEnum = {
  NFTS_SOLD: 'NFTS_SOLD',
  PRIMARY_SALES: 'PRIMARY_SALES',
  SECONDARY_SALES: 'SECONDARY_SALES',
  TOTAL_SALES: 'TOTAL_SALES',
  UNIQUE_COLLECTORS: 'UNIQUE_COLLECTORS',
} as const

export type TrendingReleasesSortEnum = (typeof TrendingReleasesSortEnum)[keyof typeof TrendingReleasesSortEnum]
/** User relation type */
export const TypeOfRelation = {
  FOLLOWING: 'FOLLOWING',
} as const

export type TypeOfRelation = (typeof TypeOfRelation)[keyof typeof TypeOfRelation]
/** Filter of User.collectedReleases paginated field */
export type UserCollectedReleasesFilter = {
  /** Filters on a list of specified genres */
  genres?: InputMaybe<Array<Genres>>
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption
  /** Filter on a list of specified release ids */
  releaseIds?: InputMaybe<Array<Scalars['UUID']>>
  /** Text search on release title or artist's name or handle */
  text?: InputMaybe<Scalars['NonEmptyString']>
  /** Filters on release type */
  type?: InputMaybe<Array<ReleaseType>>
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

/** Filter the shelves of a user */
export type UserShelvesFilter = {
  /** Case-insensitive text search on shelves names */
  text?: InputMaybe<Scalars['NonEmptyString']>
  /** Filter by different types of shelves available for users. */
  type?: ShelfTypeFilter
}

/** Input of VersionSupported query */
export type VersionStatusInput = {
  /** Platform type */
  platform: PlatformType
  /** Semantic version */
  version: Scalars['SemanticVersion']
}

export type TestQueryVariables = Exact<{ [key: string]: never }>

export type TestQuery = { __typename: 'Query' }

export const Test = `query Test{__typename}`
