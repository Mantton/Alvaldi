import { getAuthenticatedUser } from "@/utils/request";
import {
  CreateArtistRequestSchema,
  CreateArtistResponse,
} from "@alvaldi/common";
import { z } from "zod";
import { createArtistRecord } from "../services/artists.service";

type HandleCreateArtistRequestHandler = TRequestHandler<
  z.infer<typeof CreateArtistRequestSchema>,
  any,
  any,
  CreateArtistResponse
>;

export const handleCreateArtistRequest: HandleCreateArtistRequestHandler =
  async (req, res, next) => {
    try {
      const user = await getAuthenticatedUser(req);
      const body = req.body;
      const id = await createArtistRecord(body, user);
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  };
