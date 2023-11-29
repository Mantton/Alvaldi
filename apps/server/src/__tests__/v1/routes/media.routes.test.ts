import { TEST_USER_1 } from "@/__tests__/utils/users";
import app from "@/app";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import { createAccount } from "@/v1/services/accounts.service";
import supertest from "supertest";

describe("Media Routes", () => {
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
