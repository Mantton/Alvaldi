import db from "@/clients/postgres";
import { accounts } from "@/db/schema/accounts";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

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
