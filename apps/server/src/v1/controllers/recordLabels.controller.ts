import { getAuthenticatedUser } from "@/utils/request";
import type {
  CreateRecordLabelRequest,
  CreateRecordLabelResponse,
} from "@alvaldi/common";
import {
  createRecordLabel,
  getRecordLabels,
} from "../services/recordLabels.service";
import { RequestHandler } from "express";

type HandleCreateRecordLabelRequest = TRequestHandler<
  CreateRecordLabelRequest,
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
    const userID = await getAuthenticatedUser(req);
    const { name, icon, banner } = req.body;

    const data = await createRecordLabel(userID, name, icon, banner);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const handleGetRecordLabel: RequestHandler = async (req, res, next) => {
  try {
    const data = await getRecordLabels();

    // TODO: Page Param
    // if (data.data.length === 0 && page != 1) {
    //   throw new BadRequestError();
    // }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
