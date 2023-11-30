import { Router } from "express";
import { RequiresAuth } from "../middlewares";
import { BodyMatchesSchema } from "../middlewares/validation";
import { CreateCollectableRequestSchema } from "@alvaldi/common";
import { handleCreateCollectableRequest } from "../controllers/collectables.controller";

export const CollectablesRouter = Router();

CollectablesRouter.put(
  "/",
  [RequiresAuth, BodyMatchesSchema(CreateCollectableRequestSchema)],
  handleCreateCollectableRequest
);

export default CollectablesRouter;
