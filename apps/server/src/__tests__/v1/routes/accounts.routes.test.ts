import { TEST_USER_1 } from "@/__tests__/utils/users";
import app from "@/app";
import { runMigrations } from "@/db/migrate";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import { createAccount } from "@/v1/services/accounts.service";
import supertest from "supertest";

describe("Account Routes", () => {
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

  describe("GET /v1/accounts/me", () => {
    it("should respond with a `200` status code & an account json", async () => {
      await createAccount(TEST_USER_1.id);
      const { status, body } = await supertest(app)
        .get("/v1/accounts/me")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`);

      expect(status).toBe(200);
      expect(body.points).toBe(1000);
      expect(body.handle).toBe("collector1");
    });
  });

  describe("GET  /v1/accounts/me", () => {
    it("should respond with a `401` status code.", async () => {
      const { status } = await supertest(app).get("/v1/accounts/me");
      expect(status).toBe(401);
    });
  });
});
