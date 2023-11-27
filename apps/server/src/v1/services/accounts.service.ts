import db from "@/clients/postgres";
import { accounts } from "@/db/schema/accounts";
import { BasicAccountInfo } from "@/types/accounts";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { clerkClient } from "@clerk/clerk-sdk-node";
/**
 * creates a new user from a clerk user.
 * @param user A clerk user JSON Object
 */
export const createAccount = async (providerId: string) => {
  type NewUser = typeof accounts.$inferInsert;
  const handle = uuidv4();
  const record: NewUser = {
    providerId,
    handle,
  };

  await db.transaction(async (tx) => {
    const [{ id }] = await tx
      .insert(accounts)
      .values(record)
      .returning({ id: accounts.id });

    const handle = `collector${id}`;
    await tx.update(accounts).set({ handle }).where(eq(accounts.id, id));
  });
};

/**
 * creates a new user from an authenticated clerk account
 * @param providerId the authenticated user id
 */
export const createAccountFromClerk = async (providerId: string) => {
  return createAccount(providerId);
};

export const getAccountWithProviderID = async (
  id: string
): Promise<BasicAccountInfo | null> => {
  const [user] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.providerId, id));

  if (!user) return null;

  return { handle: user.handle, points: user.points };
};
