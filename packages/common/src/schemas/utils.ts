import { z } from "zod";

export const SerialIDArraySchema = z
  .array(z.number().int().nonnegative().min(1))
  .nonempty()
  .refine((nums) => Array.from(new Set(nums)));

export const NumericStringSchema = z.string().regex(/^\d+$/).transform(Number);
export const GetRequestWithPageParamSchema = z.object({
  page: NumericStringSchema.optional().default("1"),
});
