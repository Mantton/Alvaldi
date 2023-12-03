import {
  CreateArtistRequest,
  GenericCreateRequestResponse,
} from "@alvaldi/common";
import { v1Client } from "../config";

export const workShopCreateNewArtist = async (body: CreateArtistRequest) => {
  const path = "/artists";

  const { data } = await v1Client.put<GenericCreateRequestResponse>(path, body);

  return data.id;
};
