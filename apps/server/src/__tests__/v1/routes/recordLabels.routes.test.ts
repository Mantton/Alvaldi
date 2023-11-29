import { TEST_USER_1, createDefaultUser } from "@/__tests__/utils/users";
import app from "@/app";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import type { CreateRecordLabelResponse } from "@alvaldi/common";
import supertest from "supertest";

describe("Record Label Routes", () => {
  afterEach(async () => {
    await resetPostgresDatabase();
  });

  describe("PUT /v1/labels", () => {
    it("should respond with  `201` created & a json containing the id of the newly created record label", async () => {
      await createDefaultUser();
      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({ name: "YG Entertainment" })
        .expect(201)
        .expect((res) => {
          const body: CreateRecordLabelResponse = res.body;
          expect(body.id).toBe(1);
          expect(body.name).toBe("YG Entertainment");
        });
    });

    it("should respond with `401` authenticated", async () => {
      await supertest(app)
        .put("/v1/labels")
        .send({ name: "YG Entertainment" })
        .expect(401);
    });

    it("should respond with `400` bad request", async () => {
      await createDefaultUser();

      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({ name: "s" })
        .expect(400);
    });

    it("should respond with `400` bad request", async () => {
      await createDefaultUser();

      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({
          name: "this name is too long to be a record label",
        })
        .expect(400);
    });

    it("should respond with `400` bad request", async () => {
      await createDefaultUser();

      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({
          name: "YG 엔터테인먼트",
        })
        .expect(400);
    });

    it("should respond with `200` whilst creating a label with an icon image", async () => {
      await createDefaultUser();
      const { body } = await supertest(app)
        .post("/v1/media/upload")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .attach("media", "./src/__tests__/assets/asset.jpeg")
        .expect(201);

      await supertest(app)
        .put("/v1/labels")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({ name: "YG Entertainment", icon: body.id });
    });
  });
});
