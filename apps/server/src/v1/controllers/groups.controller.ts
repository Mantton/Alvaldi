import { getAuthenticatedUser } from "@/utils/request";
import {
  CreateGroupRequestSchema,
  GenericCreateRequestResponse,
} from "@alvaldi/common";
import { z } from "zod";
import { createGroupRecord } from "../services/groups.service";

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
