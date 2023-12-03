import { Router } from "express";
import { RequiresAuth } from "../middlewares";
import {
  handleCreateArtistRequest,
  handleGetAllArtistsRequest,
} from "../controllers/artists.controller";
import {
  BodyMatchesSchema,
  QueryMatchesSchema,
} from "../middlewares/validation";
import {
  CreateArtistRequestSchema,
  GetAllArtistsRequestQueryParamsSchema,
} from "@alvaldi/common";

export const ArtistsRouter = Router();

ArtistsRouter.put(
  "/",
  [RequiresAuth, BodyMatchesSchema(CreateArtistRequestSchema)],
  handleCreateArtistRequest
);

ArtistsRouter.get(
  "/",
  [QueryMatchesSchema(GetAllArtistsRequestQueryParamsSchema)],
  handleGetAllArtistsRequest
);

export default ArtistsRouter;
