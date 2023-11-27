import { z } from "zod";

export const CreateRecordLabelRequestSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .trim()
    .min(3)
    .max(40),
});
