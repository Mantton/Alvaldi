import { TEST_USER_1, createTestUser } from "@/__tests__/utils/users";
import app from "@/app";
import { runMigrations } from "@/db/migrate";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import type { CreateRecordLabelResponse } from "@alvaldi/common";
import supertest from "supertest";

describe("Record Label Routes", () => {
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
  describe("PUT /v1/labels", () => {
    it("should respond with  `201` created & a json containing the id of the newly created record label", async () => {
      await createTestUser();
      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({ name: "YG Entertainment" })
        .expect(201)
        .expect((res) => {
          const body: CreateRecordLabelResponse = res.body;
          expect(body.data.id).toBe(1);
          expect(body.data.name).toBe("YG Entertainment");
        });
    });

    it("should respond with `401` authenticated", async () => {
      await supertest(app)
        .put("/v1/labels")
        .send({ name: "YG Entertainment" })
        .expect(401);
    });

    it("should respond with `400` bad request", async () => {
      await createTestUser();

      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({ name: "s" })
        .expect(400);
    });

    it("should respond with `400` bad request", async () => {
      await createTestUser();

      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({
          name: "this name is too long to be a record label",
        })
        .expect(400);
    });

    it("should respond with `400` bad request", async () => {
      await createTestUser();

      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({
          name: "YG 엔터테인먼트",
        })
        .expect(400);
    });
  });
});
