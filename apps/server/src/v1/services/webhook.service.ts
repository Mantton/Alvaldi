import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { createAccount } from "./accounts.service";

/**
 * called to handle an incoming clerk event
 * @param event A Clerk Webhook event
 */
export const didReceiveClerkEvent = async ({ type, data }: WebhookEvent) => {
  switch (type) {
    case "user.created":
      await createAccount(data.id);
      break;
    case "user.updated":
    case "user.deleted":
  }
};
