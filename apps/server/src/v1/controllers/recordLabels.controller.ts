import { getAuthenticatedUser } from "@/utils/request";
import type {
  CreateRecordLabelRequestSchema,
  CreateRecordLabelResponse,
} from "@alvaldi/common";
import { z } from "zod";
import { createRecordLabel } from "../services/recordLabels.service";

type HandleCreateRecordLabelRequest = TRequestHandler<
  z.infer<typeof CreateRecordLabelRequestSchema>,
  any,
  any,
  CreateRecordLabelResponse
>;

export const handleCreateRecordLabel: HandleCreateRecordLabelRequest = async (
  req,
  res,
  next
) => {
  try {
    req;
    const userID = await getAuthenticatedUser(req);
    const { name } = req.body;

    const data = await createRecordLabel(userID, name);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
