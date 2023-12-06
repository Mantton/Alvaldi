import {
  BasicArtistInfo,
  CreateArtistRequest,
  GenericCreateRequestResponse,
  GenericGetListResponse,
} from "@alvaldi/common";
import { v1Client } from "../config";

export const workShopCreateNewArtist = async (body: CreateArtistRequest) => {
  const path = "/artists";

  const { data } = await v1Client.put<GenericCreateRequestResponse>(path, body);

  return data.id;
};

export const workShopGetAllArtists = async (label?: number) => {
  const path = "/artists";
  const { data } = await v1Client.get<GenericGetListResponse<BasicArtistInfo>>(
    path,
    { params: { label } },
  );
  return data.data;
};
