import db from "@/clients/postgres";
import { accountsTable } from "@/db/schema/accounts";
import { UnauthorizedRequestError } from "@/errors";
import { eq } from "drizzle-orm";
import type { Request } from "express";

export const getAuthenticatedUser = async (request: Request) => {
  const providerId = request.auth.userId;

  // if no provider on request & the request REQUIRES an authenticated user, throw Unauthorized
  if (!providerId) throw new UnauthorizedRequestError();
  // TODO: Check Cache First
  // Check DB

  const users = await db
    .select({ id: accountsTable.id })
    .from(accountsTable)
    .where(eq(accountsTable.providerId, providerId));

  if (!users.length) throw new UnauthorizedRequestError();

  return users?.[0].id;
};
