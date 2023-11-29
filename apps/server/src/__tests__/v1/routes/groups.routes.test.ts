import { TEST_USER_1, createDefaultUser } from "@/__tests__/utils/users";
import app from "@/app";
import { runMigrations } from "@/db/migrate";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import supertest from "supertest";
import cache from "@/clients/cache";
import { createRecordLabel } from "@/v1/services/recordLabels.service";

const data: CreateGroupRequest = {
  label: 1,
  name: "BLACKPINK",
};

import { createArtistRecord } from "@/v1/services/artists.service";
import { CreateGroupRequest } from "@alvaldi/common";
import { getGroupInfo } from "@/v1/services/groups.service";

describe("Groups Routes", () => {
  beforeAll(async () => {
    // drop All
    await cache.connect();
    await resetPostgresDatabase();
    await runMigrations();
    await createDefaultUser(); // create user
    await createRecordLabel(1, "YG Entertainment"); // create label
    await createArtistRecord({ stageName: "Lisa", label: 1 }, 1);
    await createArtistRecord({ stageName: "Rosé", label: 1 }, 1);
  }, 20000);

  afterAll(async () => {
    await cache.disconnect();
  });

  describe("PUT /v1/groups", () => {
    it("[Groups] should respond with a `401` status", async () => {
      await supertest(app).put("/v1/groups").expect(401);
    });
    it("should respond with a `201` status code & the id of a newly created group named `BLACKPINK` with no icon or banner image & no groups", async () => {
      const {
        body: { id: groupID },
      } = await supertest(app)
        .put("/v1/groups")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send(data)
        .expect(201);

      const group = await getGroupInfo(groupID);
      expect(group).not.toBeNull();
      expect(group?.name).toBe("BLACKPINK");
    });

    it("respond with `201` & Create a New Group called `BLACKPINK` with two members; Rosé & Lisa", async () => {
      const {
        body: { id: groupID },
      } = await supertest(app)
        .put("/v1/groups")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send({ ...data, artists: [1, 2] })
        .expect(201);

      const group = await getGroupInfo(groupID);
      expect(group).not.toBeNull();
      expect(group?.name).toBe("BLACKPINK");
      expect(group?.artists).not.toHaveLength(0);
      expect(group?.artists.map((v) => v.id)).toStrictEqual([1, 2]);
    });
  });
});
