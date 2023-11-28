import type { UploadMediaResponse } from "@alvaldi/common";
import type { RequestHandler } from "express";
import { storeMedia } from "../services/media.service";
import { getAuthenticatedUser } from "@/utils/request";

export const handleFileUpload: RequestHandler<
  any,
  UploadMediaResponse
> = async (req, res, next) => {
  try {
    const userId = await getAuthenticatedUser(req);
    const file = req.file;
    if (!file) {
      res.sendStatus(400);
      return;
    }

    const data = await storeMedia(file, userId);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
