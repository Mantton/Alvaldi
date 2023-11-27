import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import type { RequestHandler } from "express";
import { Webhook } from "svix";
import { SVIXWebhookHeadersSchema } from "@/zod/svix";
import { CLERK_WEBHOOK_SECRET } from "@/config/env";
import { didReceiveClerkEvent } from "../services/webhook.service";

/**
 * Handles a user creation event
 *
 * Reference: https://docs.svix.com/receiving/verifying-payloads/how#nodejs-express
 */
export const handleClerkEvent: RequestHandler = async (req, res, next) => {
  const { body, headers } = req;

  let event: WebhookEvent;
  try {
    // validate headers
    const validatedHeaders = await SVIXWebhookHeadersSchema.parseAsync(headers);

    // verify webhook
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    event = wh.verify(JSON.stringify(body), validatedHeaders) as WebhookEvent;
    // consume webhook
    try {
      await didReceiveClerkEvent(event);
    } catch (error) {
      console.error(error);
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
