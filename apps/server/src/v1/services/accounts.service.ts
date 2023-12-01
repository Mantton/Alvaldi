import db from "@/clients/postgres";
import { accountsTable } from "@/db/schema/accounts";
import { BasicAccountInfo } from "@/types/accounts";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { adminsTable } from "@/db/schema/admins";
import { BadRequestError, InsufficientBalanceError } from "@/errors";
import { getPointsForPackKey } from "@/utils/packs";
/**
 * creates a new user from a clerk user.
 * @param user A clerk user JSON Object
 */
export const createAccount = async (providerId: string) => {
  type NewUser = typeof accountsTable.$inferInsert;
  const handle = uuidv4();
  const record: NewUser = {
    providerId,
    handle,
  };

  const id = await db.transaction(async (tx) => {
    const [{ id }] = await tx
      .insert(accountsTable)
      .values(record)
      .returning({ id: accountsTable.id });

    const handle = `collector${id}`;
    await tx
      .update(accountsTable)
      .set({ handle })
      .where(eq(accountsTable.id, id));
    return id;
  });

  // make first user admin
  if (id === 1) await setAccountAsAdministrator(id);
  return id;
};

/**
 * creates a new user from an authenticated clerk account
 * @param providerId the authenticated user id
 */
export const createAccountFromClerk = async (providerId: string) => {
  return createAccount(providerId);
};

/**
 * gets a stored user record based on their clerk id
 * @param id The ID of the user from Clerk
 * @returns the Accounts Record
 */
export const getAccountWithProviderID = async (
  id: string
): Promise<BasicAccountInfo | null> => {
  const [user] = await db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.providerId, id));

  if (!user) return null;

  return { handle: user.handle, points: user.points };
};

/**
 * Checks if a user is marked as an administrator
 * @param providerId The ID of the user from clerk
 * @returns a boolean indicating if the user is an administrator
 */
export const isAdministratorByProvider = async (providerId: string) => {
  const records = await db
    .select({ id: accountsTable.id })
    .from(accountsTable)
    .rightJoin(adminsTable, eq(adminsTable.accountId, accountsTable.id))
    .where(eq(accountsTable.providerId, providerId));

  return !!records.length;
};

/**
 * Checks if a user is marked as an administrator
 * @param id the serial id of the user
 * @returns a boolean indicating if a user is an administrator
 */
export const isAdministratorSerialID = async (id: number) => {
  const [user] = await db
    .select()
    .from(adminsTable)
    .where(eq(adminsTable.accountId, id));

  return !!user;
};

/**
 * makes the specified account an admin
 * @param id The serial ID of the user
 */
export const setAccountAsAdministrator = async (id: number) => {
  const isAdmin = await isAdministratorSerialID(id);
  if (isAdmin) return; // already admin do nothing
  await db.insert(adminsTable).values({ accountId: id });
};

/**
 * gets the number of points an account
 * @param id ID Of the account
 * @returns the points owned by the account if the accounts exists, else null
 */
export const getPointsForAccount = async (id: number) => {
  const [record] = await db
    .select({ points: accountsTable.points })
    .from(accountsTable)
    .where(eq(accountsTable.id, id));

  if (!record) throw new BadRequestError();

  return record.points;
};

/**
 * Throws an InSufficientBalance Error if the user does not have enough points to make a purchase
 * @param accountId The ID of the account making the purchase
 * @param pointsRequired The Points To be made
 */
export const guardSufficientBalanceAvailableForPurchase = async (
  accountId: number,
  pointsRequired: number
) => {
  const pointsAvailable = await getPointsForAccount(accountId);
  if (pointsAvailable < pointsRequired) throw new InsufficientBalanceError();
  // TODO: dues / checks
};
