import axios from "axios";
import { buildV1Request } from "../config";
import { UploadMediaResponse } from "@alvaldi/common";

export const uploadMedia = async (media: File) => {
  const form = new FormData();
  form.append("media", media);

  const url = buildV1Request("/media/upload");
  const { data } = await axios.post<UploadMediaResponse>(url, form, {
    withCredentials: true,
  });

  return data.id;
};
