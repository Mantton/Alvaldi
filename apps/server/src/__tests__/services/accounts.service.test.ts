import { createAccount } from "@/v1/services/accounts.service";
import db from "@/clients/postgres";
import { accounts } from "@/db/schema/accounts";
import { eq } from "drizzle-orm";
import { runMigrations } from "@/db/migrate";
import { resetPostgresDatabase } from "@/utils/postgres";

describe("Accounts Service Tests", () => {
  beforeAll(async () => {
    // drop All
    await resetPostgresDatabase();
  });

  beforeEach(async () => {
    // recreate All
    await runMigrations();
  });

  afterAll(async () => {
    await resetPostgresDatabase();
  });

  describe("Create Account", () => {
    it("should create an account where the account id is `1` & the providerId is `8a912628-cfdc-4043-84cb-0e89c3b283a8`", async () => {
      const id = "8a912628-cfdc-4043-84cb-0e89c3b283a8";
      await createAccount(id);

      const [user] = await db.select().from(accounts).where(eq(accounts.id, 1));
      expect(user).not.toBe(undefined);
      expect(user.id).toBe(1);
      expect(user.providerId).toBe(id);
      expect(user.handle).toBe("collector1");
    });
  });
});
