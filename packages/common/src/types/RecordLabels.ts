export type BasicRecordLabel = {
  id: number;
  name: string;
  iconImageUrl?: string | null;
  bannerImageUrl?: string | null;
};

export type CreateRecordLabelResponse = {
  id: number;
  name: string;
};

export type GetRecordLabelListResponse = {
  data: BasicRecordLabel[];
  hasNext: boolean;
};
