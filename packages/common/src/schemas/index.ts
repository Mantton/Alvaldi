import { z } from "zod";
import { CollectableRarity, PackGroup } from "../types";

const SerialIDArraySchema = z
  .array(z.number().int().nonnegative().min(1))
  .nonempty()
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
  stageName: z.string().min(2), // TODO: stricter validation on this
  label: z.number().int().nonnegative().min(1),
  groups: SerialIDArraySchema.optional().optional(),
  icon: z.string().length(21).optional(),
  banner: z.string().length(21).optional(),
});

export const CreateGroupRequestSchema = z.object({
  name: z.string().min(2), // TODO: stricter validation on this
  label: z.number().int().nonnegative().min(1),
  icon: z.string().length(21).optional(),
  banner: z.string().length(21).optional(),
  artists: SerialIDArraySchema.optional(),
});

export const CreateEraRequestSchema = z.object({
  name: z.string().min(2), // TODO: stricter validation
  date: z.date().optional(), // TODO: required formats? research

  // BE will require one or the other with `group` taking priority
  group: z.number().nonnegative().min(1).optional(),
  artists: SerialIDArraySchema.optional(),

  // images
  icon: z.string().length(21).optional(),
  banner: z.string().length(21).optional(),
});

export const CreateCollectableRequestSchema = z.object({
  era: z.number().int().nonnegative().min(1),
  media: z.string().length(21),
  rarity: z.nativeEnum(CollectableRarity),
  // BE will require one or the other with `group` taking priority
  group: z.number().nonnegative().min(1).optional(),
  artists: SerialIDArraySchema.optional(),
});

export const BuyPackRequestSchema = z.object({
  rarity: z.nativeEnum(CollectableRarity),
  group: z.nativeEnum(PackGroup),
  identifier: z.number().nonnegative().min(1),
});

export type CreateGroupRequest = z.infer<typeof CreateGroupRequestSchema>;
export type CreateArtistRequest = z.infer<typeof CreateArtistRequestSchema>;
export type CreateRecordLabelRequest = z.infer<
  typeof CreateRecordLabelRequestSchema
>;
export type CreateEraRequest = z.infer<typeof CreateEraRequestSchema>;
export type CreateCollectableRequest = z.infer<
  typeof CreateCollectableRequestSchema
>;
export type BuyPackRequest = z.infer<typeof BuyPackRequestSchema>;
