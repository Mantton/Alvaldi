import cache from "@/clients/cache";
import db from "@/clients/postgres";
import { isProduction } from "@/config/env";
import { accountsTable } from "@/db/schema/accounts";
import { UnauthorizedRequestError } from "@/errors";
import { createAccountFromClerk } from "@/v1/services/accounts.service";
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

  if (!users.length) {
    if (isProduction()) throw new UnauthorizedRequestError();

    const id = await createAccountFromClerk(providerId);
    await cache.setGrouped("account", providerId, id.toString());
    return id;
  }

  const id = users?.[0].id;
  await cache.setGrouped("account", providerId, id.toString());
  return id;
};
