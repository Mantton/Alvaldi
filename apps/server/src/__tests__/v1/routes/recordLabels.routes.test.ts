import { TEST_USER_1, createDefaultUser } from "@/__tests__/utils/users";
import app from "@/app";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import type {
  CreateRecordLabelResponse,
  GetRecordLabelListResponse,
} from "@alvaldi/common";
import supertest from "supertest";
import { createRecordLabel } from "@/v1/services/recordLabels.service";

describe("Record Label Routes", () => {
  beforeEach(() => resetPostgresDatabase());

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

  describe("GET /v1/labels", () => {
    it("should fetch a list of record labels", async () => {
      await createDefaultUser();

      await createRecordLabel(1, "YG Entertainment");
      await createRecordLabel(1, "SM Entertainment");
      await createRecordLabel(1, "HYBE");
      await createRecordLabel(1, "Starship");

      const { body }: { body: GetRecordLabelListResponse } = await supertest(
        app
      )
        .get("/v1/labels")
        .expect(200);

      expect(body.hasNext).toBe(false);
      expect(body.data.map((v) => v.name)).toContain("YG Entertainment");
      expect(body.data).toHaveLength(4);
      expect(body.data?.[0].name).toBe("HYBE");
    });
  });
});
