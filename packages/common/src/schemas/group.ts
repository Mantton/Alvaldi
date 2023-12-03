import { z } from "zod";
import {
  GetRequestWithPageParamSchema,
  NumericStringSchema,
  SerialIDArraySchema,
} from "./utils";

export const CreateGroupRequestSchema = z.object({
  name: z.string().min(2), // TODO: stricter validation on this
  label: z.number().int().nonnegative().min(1),
  icon: z.string().length(21).optional(),
  banner: z.string().length(21).optional(),
  artists: SerialIDArraySchema.optional(),
});

export type CreateGroupRequest = z.infer<typeof CreateGroupRequestSchema>;

export const GetAllGroupsRequestQueryParamsSchema =
  GetRequestWithPageParamSchema.merge(
    z.object({
      label: NumericStringSchema.optional(),
    })
  );

export type GetAllGroupsQueryParams = z.infer<
  typeof GetAllGroupsRequestQueryParamsSchema
>;
