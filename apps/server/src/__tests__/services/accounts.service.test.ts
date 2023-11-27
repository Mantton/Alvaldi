import {
  createAccount,
  isAdministratorByProvider,
  isAdministratorSerialID,
} from "@/v1/services/accounts.service";
import db from "@/clients/postgres";
import { accountsTable } from "@/db/schema/accounts";
import { eq } from "drizzle-orm";
import { runMigrations } from "@/db/migrate";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import { DEFAULT_USER_POINTS } from "@/config/constants";

describe("Accounts Service Tests", () => {
  beforeAll(async () => {
    // drop All
    await resetPostgresDatabase();
  });

  beforeEach(async () => {
    // recreate All
    await runMigrations();
  });

  afterEach(async () => {
    await resetPostgresDatabase();
  });

  describe("Create Account", () => {
    it("should create an account where the account id is `1` & the providerId is `8a912628-cfdc-4043-84cb-0e89c3b283a8`", async () => {
      const id = "8a912628-cfdc-4043-84cb-0e89c3b283a8";
      await createAccount(id);

      const [user] = await db
        .select()
        .from(accountsTable)
        .where(eq(accountsTable.id, 1));

      expect(user).not.toBe(undefined);
      expect(user.id).toBe(1);
      expect(user.providerId).toBe(id);
      expect(user.handle).toBe("collector1");
      expect(user.points).toBe(DEFAULT_USER_POINTS);
    });

    it("should create two accounts, one being a superuser and the other not.", async () => {
      const userOne = "8a912628-cfdc-4043-84cb-0e89c3b283a8";
      const userTwo = "user_2YkKmZL9FA64GaHlZsBahbTiPHm";
      await createAccount(userOne);
      await createAccount(userTwo);

      const isU1SuperUserBySerialID = await isAdministratorSerialID(1);
      const isU1SuperUserByProviderID = await isAdministratorByProvider(
        userOne
      );
      expect(isU1SuperUserBySerialID).toBe(true);
      expect(isU1SuperUserByProviderID).toBe(true);

      const isU2SuperUserBySerialID = await isAdministratorSerialID(2);
      const isU2SuperUserByProviderID = await isAdministratorByProvider(
        userTwo
      );
      expect(isU2SuperUserBySerialID).toBe(false);
      expect(isU2SuperUserByProviderID).toBe(false);
    });
  });
});
