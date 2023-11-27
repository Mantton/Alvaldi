import { TEST_USER_1 } from "@/__tests__/utils/users";
import app from "@/app";
import { runMigrations } from "@/db/migrate";
import { resetPostgresDatabase } from "@/utils/postgres";
import supertest from "supertest";

describe("Basic App Tests", () => {
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

  describe("GET /v1/accounts/me", () => {
    it("should respond with a `200` status code & an account json", async () => {
      const { status, body } = await supertest(app)
        .get("/v1/accounts/me")
        .set("Authorization", `Bearer ${TEST_USER_1}`);

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
