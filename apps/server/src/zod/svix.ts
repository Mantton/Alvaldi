import { z } from "zod";

/**
 * Required Headers Provided by clerk to verify validity of webhook
 */
export const SVIXWebhookHeadersSchema = z.object({
  "svix-id": z.string().min(1),
  "svix-timestamp": z.string().min(1),
  "svix-signature": z.string().min(1),
});
