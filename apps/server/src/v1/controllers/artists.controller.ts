import { getAuthenticatedUser } from "@/utils/request";
import { createArtistRecord, getAllArtists } from "../services/artists.service";
import {
  CreateArtistRequest,
  GenericCreateRequestResponse,
} from "@alvaldi/common";
import { GetAllArtistsQueryParams } from "@alvaldi/common";

type CreateArtistRequestHandler = TRequestHandler<
  CreateArtistRequest,
  any,
  any,
  GenericCreateRequestResponse
>;

export const handleCreateArtistRequest: CreateArtistRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const user = await getAuthenticatedUser(req);
    const body = req.body;
    const id = await createArtistRecord(body, user);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

export const handleGetAllArtistsRequest: GetRequestHandler<
  GetAllArtistsQueryParams
> = async (req, res, next) => {
  try {
    const { page, label } = req.query;

    const data = await getAllArtists(page, label);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
