import {
  CreateGroupRequest,
  GenericCreateRequestResponse,
} from "@alvaldi/common";
import { v1Client } from "../config";

export const workShopCreateNewGroup = async (body: CreateGroupRequest) => {
  const path = "/groups";
  const { data } = await v1Client.put<GenericCreateRequestResponse>(path, body);
  return data.id;
};
