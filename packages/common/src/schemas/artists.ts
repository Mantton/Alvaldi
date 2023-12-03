import { z } from "zod";
import {
  GetRequestWithPageParamSchema,
  NumericStringSchema,
  SerialIDArraySchema,
} from "./utils";

export const CreateArtistRequestSchema = z.object({
  stageName: z.string().min(2), // TODO: stricter validation on this
  label: z.number().int().nonnegative().min(1),
  groups: SerialIDArraySchema.optional().optional(),
  icon: z.string().length(21).optional(),
  banner: z.string().length(21).optional(),
});

export type CreateArtistRequest = z.infer<typeof CreateArtistRequestSchema>;

export const GetAllArtistsRequestQueryParamsSchema =
  GetRequestWithPageParamSchema.merge(
    z.object({
      label: NumericStringSchema.optional(),
    })
  );

export type GetAllArtistsQueryParams = z.infer<
  typeof GetAllArtistsRequestQueryParamsSchema
>;
