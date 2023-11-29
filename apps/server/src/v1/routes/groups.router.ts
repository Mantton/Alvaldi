import { Router } from "express";
import { RequiresAuth } from "../middlewares";
import { BodyMatchesSchema } from "../middlewares/validation";
import { CreateGroupRequestSchema } from "@alvaldi/common";
import { handleCreateGroupRequest } from "../controllers/groups.controller";

export const GroupsRouter = Router();

GroupsRouter.put(
  "/",
  [RequiresAuth, BodyMatchesSchema(CreateGroupRequestSchema)],
  handleCreateGroupRequest
);

export default GroupsRouter;
