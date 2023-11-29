import { z } from "zod";

const SerialIDArraySchema = z
  .array(z.number().int().nonnegative().min(1))
  .refine((nums) => Array.from(new Set(nums)));
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

export const CreateArtistRequestSchema = z.object({
  stageName: z.string(), // TODO: stricter validation on this
  label: z.number().int().nonnegative().min(1),
  groups: SerialIDArraySchema.optional().optional(),
  icon: z.string().length(21).optional(),
  banner: z.string().length(21).optional(),
});

export const CreateGroupRequestSchema = z.object({
  name: z.string(),
  label: z.number().int().nonnegative().min(1),
  icon: z.string().length(21).optional(),
  banner: z.string().length(21).optional(),
  artists: SerialIDArraySchema.optional(),
});

export type CreateGroupRequest = z.infer<typeof CreateGroupRequestSchema>;
