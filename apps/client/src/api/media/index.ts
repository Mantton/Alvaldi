import axios from "axios";
import { buildAuthHeader, buildV1Request } from "../config";
import { UploadMediaResponse } from "@alvaldi/common";

export const uploadMedia = async (media: File, token: string) => {
  const form = new FormData();
  form.append("media", media);

  const url = buildV1Request("/media/upload");
  const { data } = await axios.post<UploadMediaResponse>(url, form, {
    headers: buildAuthHeader(token),
  });

  return data.id;
};
