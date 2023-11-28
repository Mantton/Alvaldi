import { z } from "zod";

export const CreateRecordLabelRequestSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .trim()
    .min(3)
    .max(40),

  icon: z.string().length(21).optional(),
  banner: z.string().length(21).optional(),
});
