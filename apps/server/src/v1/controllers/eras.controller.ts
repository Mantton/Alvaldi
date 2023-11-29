import { BadRequestError } from "@/errors";
import { getAuthenticatedUser } from "@/utils/request";
import {
  CreateEraRequest,
  GenericCreateRequestResponse,
} from "@alvaldi/common";
import { createEraRecord } from "../services/eras.service";

type CreateEraRequestHandler = TRequestHandler<
  CreateEraRequest,
  any,
  any,
  GenericCreateRequestResponse
>;
export const handleCreateEraRequest: CreateEraRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { body } = req;
    // provided both artists & groups
    if (body.artists && body.group) throw new BadRequestError();
    const userId = await getAuthenticatedUser(req);

    const id = await createEraRecord(userId, body);

    res.status(201).send({ id });
  } catch (error) {
    next(error);
  }
};
