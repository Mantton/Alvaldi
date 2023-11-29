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

export type CreateArtistResponse = {
  id: number;
};

export type BasicArtistInfo = {
  id: number;
  stageName: string;
  iconImageUrl: string | null;
  bannerImageUrl: string | null;
};
