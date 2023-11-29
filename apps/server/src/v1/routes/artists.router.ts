import { Router } from "express";
import { RequiresAuth } from "../middlewares";
import { handleCreateArtistRequest } from "../controllers/artists.controller";
import { BodyMatchesSchema } from "../middlewares/validation";
import { CreateArtistRequestSchema } from "@alvaldi/common";

export const ArtistsRouter = Router();

ArtistsRouter.put(
  "/",
  [RequiresAuth, BodyMatchesSchema(CreateArtistRequestSchema)],
  handleCreateArtistRequest
);

export default ArtistsRouter;
