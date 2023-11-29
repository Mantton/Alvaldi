import { getAuthenticatedUser } from "@/utils/request";
import { createArtistRecord } from "../services/artists.service";
import {
  CreateArtistRequest,
  GenericCreateRequestResponse,
} from "@alvaldi/common";

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
