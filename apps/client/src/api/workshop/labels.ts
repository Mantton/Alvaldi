import {
  CreateRecordLabelRequest,
  CreateRecordLabelResponse,
  GetRecordLabelListResponse,
} from "@alvaldi/common";
import { buildV1Request } from "../config";
import axios from "axios";

export const getWorkshopRecordLabelList = async (page: number = 1) => {
  const path = "/labels" + new URLSearchParams({ page: page.toString() });
  const url = buildV1Request(path);

  const response = await fetch(url);
  const data: GetRecordLabelListResponse = await response.json();
  return data;
};

export const createNewRecordLabel = async (body: CreateRecordLabelRequest) => {
  const path = "/labels";
  const url = buildV1Request(path);
  const { data } = await axios.put<CreateRecordLabelResponse>(url, body, {
    withCredentials: true,
  });

  return data;
};
