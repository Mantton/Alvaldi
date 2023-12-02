export * from "./RecordLabels";

export type GenericCreateRequestResponse = {
  id: number;
};

export type UploadMediaResponse = {
  id: string;
};

export type BasicOwnerInfo = {
  id: number;
  handle: string;
  iconImageUrl?: string | null;
};
export type BasicArtistInfo = {
  id: number;
  stageName: string;
  iconImageUrl?: string | null;
  bannerImageUrl?: string | null;
};

export type BasicGroupInfo = {
  id: number;
  name: string;
  iconImageUrl?: string | null;
  bannerImageUrl?: string | null;
};

export type BasicEraInfo = {
  id: number;
  title: string;
  iconImageUrl?: string | null;
  bannerImageUrl?: string | null;
};
export type PopulatedEraInfo = {
  id: number;
  title: string;
  iconImageUrl?: string | null;
  bannerImageUrl?: string | null;
  group: BasicGroupInfo | null;
  artists: BasicArtistInfo[];
};

export type PopulatedCollectableInfo = {
  id: number;
  mediaUrl?: string | null;
  era?: BasicEraInfo | null;
  group?: BasicGroupInfo | null;
  artists?: BasicArtistInfo[];
  rarity: RarityString;
};

export type RarityString =
  | "common"
  | "superior"
  | "rare"
  | "elite"
  | "legendary"
  | "celestial";

export enum CollectableRarity {
  COMMON = "common",
  SUPERIOR = "superior",
  RARE = "rare",
  ELITE = "elite",
  LEGENDARY = "legendary",
  CELESTIAL = "celestial",
}

export enum PackGroup {
  ARTIST = "artist",
  ERA = "era",
  GROUP = "group",
  LABEL = "label",
  BOY_GROUP = "boyGroup",
  GIRL_GROUP = "girlGroup",
  ALL = "all",
}

export type CardInfo = {
  id: number;
  mintDate: Date;
  collectable: PopulatedCollectableInfo;
  owner: BasicOwnerInfo;
};
