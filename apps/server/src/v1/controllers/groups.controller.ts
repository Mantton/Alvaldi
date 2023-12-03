import { getAuthenticatedUser } from "@/utils/request";
import {
  CreateGroupRequestSchema,
  GenericCreateRequestResponse,
  GetAllGroupsQueryParams,
} from "@alvaldi/common";
import { z } from "zod";
import { createGroupRecord, getAllGroups } from "../services/groups.service";

type CreateGroupRequestHandler = TRequestHandler<
  z.infer<typeof CreateGroupRequestSchema>,
  any,
  any,
  GenericCreateRequestResponse
>;
export const handleCreateGroupRequest: CreateGroupRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userId = await getAuthenticatedUser(req);
    const id = await createGroupRecord(userId, req.body);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllGroupsRequest: GetRequestHandler<
  GetAllGroupsQueryParams
> = async (req, res, next) => {
  try {
    const { page, label } = req.query;
    const results = await getAllGroups(page, label);
    res.json({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
