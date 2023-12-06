import {
  CreateRecordLabelRequest,
  CreateRecordLabelResponse,
  GetRecordLabelListResponse,
} from "@alvaldi/common";
import { buildV1Request, v1Client } from "../config";
import axios from "axios";

export const getWorkshopRecordLabelList = async (page: number = 1) => {
  const path = "/labels";
  const { data } = await v1Client.get<GetRecordLabelListResponse>(path, {
    params: { page },
  });
  return data;
};

export const workShopCreateNewRecordLabel = async (
  body: CreateRecordLabelRequest,
) => {
  const path = "/labels";
  const url = buildV1Request(path);
  const { data } = await axios.put<CreateRecordLabelResponse>(url, body, {
    withCredentials: true,
  });

  return data;
};
