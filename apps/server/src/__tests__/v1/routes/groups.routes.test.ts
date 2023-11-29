import { TEST_USER_1, createDefaultUser } from "@/__tests__/utils/users";
import app from "@/app";
import supertest from "supertest";
import { createRecordLabel } from "@/v1/services/recordLabels.service";

import { createArtistRecord } from "@/v1/services/artists.service";
import { getGroupInfo } from "@/v1/services/groups.service";
import { CreateGroupRequest } from "@alvaldi/common";

describe("Groups Routes", () => {
  beforeAll(async () => {
    await createDefaultUser(); // create user
    await createRecordLabel(1, "YG Entertainment"); // create label
    await createArtistRecord({ stageName: "Lisa", label: 1 }, 1);
    await createArtistRecord({ stageName: "Rosé", label: 1 }, 1);
  });

  describe("PUT /v1/groups", () => {
    const data: CreateGroupRequest = {
      label: 1,
      name: "BLACKPINK",
    };

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
