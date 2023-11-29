import { TEST_USER_1 } from "@/__tests__/utils/users";
import app from "@/app";
import { runMigrations } from "@/db/migrate";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import { createAccount } from "@/v1/services/accounts.service";
import supertest from "supertest";
import cache from "@/clients/cache";

describe("Media Routes", () => {
  beforeAll(async () => {
    // drop All
    await resetPostgresDatabase();
    await cache.connect();
  });

  beforeEach(async () => {
    // recreate All
    await runMigrations();
  });

  afterEach(async () => {
    await resetPostgresDatabase();
  });

  describe("POST /v1/media/upload", () => {
    it("should respond with a `201` status code & a nanoid of the image to be sent in consequent requests", async () => {
      await createAccount(TEST_USER_1.id);
      await supertest(app)
        .post("/v1/media/upload")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .attach("media", "./src/__tests__/assets/asset.jpeg")
        .expect(201);
    });
  });
});
