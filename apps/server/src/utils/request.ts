import cache from "@/clients/cache";
import db from "@/clients/postgres";
import { accountsTable } from "@/db/schema/accounts";
import { UnauthorizedRequestError } from "@/errors";
import { eq } from "drizzle-orm";
import type { Request } from "express";

export const getAuthenticatedUser = async (request: Request) => {
  const providerId = request.auth.userId;

  // if no provider on request throw Unauthorized
  if (!providerId) throw new UnauthorizedRequestError();
  // Check Cache
  const cacheId = await cache.getGrouped("account", providerId);
  if (cacheId) {
    const accID = parseInt(cacheId);
    return accID;
  }

  // Check DB
  const users = await db
    .select({ id: accountsTable.id })
    .from(accountsTable)
    .where(eq(accountsTable.providerId, providerId));

  if (!users.length) throw new UnauthorizedRequestError();

  const id = users?.[0].id;
  await cache.setGrouped("account", providerId, id.toString());
  return id;
};
