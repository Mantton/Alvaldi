import { Router } from "express";
import { RequiresAuth } from "../middlewares";
import {
  BodyMatchesSchema,
  QueryMatchesSchema,
} from "../middlewares/validation";
import {
  CreateGroupRequestSchema,
  GetAllGroupsRequestQueryParamsSchema,
} from "@alvaldi/common";
import {
  handleCreateGroupRequest,
  handleGetAllGroupsRequest,
} from "../controllers/groups.controller";

export const GroupsRouter = Router();

GroupsRouter.put(
  "/",
  [RequiresAuth, BodyMatchesSchema(CreateGroupRequestSchema)],
  handleCreateGroupRequest
);

GroupsRouter.get(
  "/",
  [QueryMatchesSchema(GetAllGroupsRequestQueryParamsSchema)],
  handleGetAllGroupsRequest
);
export default GroupsRouter;
