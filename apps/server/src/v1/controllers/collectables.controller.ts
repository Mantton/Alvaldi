import { getAuthenticatedUser } from "@/utils/request";
import {
  CreateCollectableRequest,
  GenericCreateRequestResponse,
} from "@alvaldi/common";
import { createCollectableRecord } from "../services/collectables.service";

type CreateCollectableRequestHandler = TRequestHandler<
  CreateCollectableRequest,
  any,
  any,
  GenericCreateRequestResponse
>;

export const handleCreateCollectableRequest: CreateCollectableRequestHandler =
  async (req, res, next) => {
    try {
      const user = await getAuthenticatedUser(req);
      const body = req.body;
      const id = await createCollectableRecord(user, body);
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  };
