export type CreateRecordLabelResponse = {
  success: true;
  data: {
    id: number;
    name: string;
  };
};

export type UploadMediaResponse = {
  success: true;
  data: {
    id: string;
  };
};
