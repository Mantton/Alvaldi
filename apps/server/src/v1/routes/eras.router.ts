import { Router } from "express";
import { RequiresAuth } from "../middlewares";
import { BodyMatchesSchema } from "../middlewares/validation";
import { CreateEraRequestSchema } from "@alvaldi/common";
import { handleCreateEraRequest } from "../controllers/eras.controller";

export const ErasRouter = Router();

ErasRouter.put(
  "/",
  [RequiresAuth, BodyMatchesSchema(CreateEraRequestSchema)],
  handleCreateEraRequest
);

export default ErasRouter;
