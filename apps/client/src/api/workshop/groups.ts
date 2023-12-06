import {
  BasicGroupInfo,
  CreateGroupRequest,
  GenericCreateRequestResponse,
  GenericGetListResponse,
} from "@alvaldi/common";
import { v1Client } from "../config";

export const workShopCreateNewGroup = async (body: CreateGroupRequest) => {
  const path = "/groups";
  const { data } = await v1Client.put<GenericCreateRequestResponse>(path, body);
  return data.id;
};

export const workShopGetAllGroups = async (label?: number) => {
  const path = "/groups";
  const { data } = await v1Client.get<GenericGetListResponse<BasicGroupInfo>>(
    path,
    { params: { label } },
  );
  return data.data;
};
