export type CreateRecordLabelResponse = {
  id: number;
  name: string;
};

export type GenericCreateRequestResponse = {
  id: number;
};

export type UploadMediaResponse = {
  id: string;
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

export type PopulatedEraInfo = {
  id: number;
  title: string;
  iconImageUrl?: string | null;
  bannerImageUrl?: string | null;
  group: BasicGroupInfo | null;
  artists: BasicArtistInfo[];
};
