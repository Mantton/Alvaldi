import { TEST_USER_1, createDefaultUser } from "@/__tests__/utils/users";
import app from "@/app";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import supertest from "supertest";
import { createRecordLabel } from "@/v1/services/recordLabels.service";
import { z } from "zod";
import { CreateArtistRequestSchema } from "@alvaldi/common";
import { getArtistWithID } from "@/v1/services/artists.service";

describe("Artists Routes", () => {
  afterEach(async () => {
    await resetPostgresDatabase();
  });

  describe("PUT /v1/artists", () => {
    it("should respond with a `401` status ", async () => {
      await supertest(app).put("/v1/artists").expect(401);
    });
    it("should respond with a `201` status code & the id of a newly created artist named `Lisa` with no icon or banner image & no groups", async () => {
      const userID = await createDefaultUser(); // create user
      const { id: labelId } = await createRecordLabel(
        userID,
        "YG Entertainment"
      ); // create label
      const data: z.infer<typeof CreateArtistRequestSchema> = {
        label: labelId,
        stageName: "Lisa",
      };

      const {
        body: { id: artistID },
      } = await supertest(app)
        .put("/v1/artists")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send(data)
        .expect(201);

      expect(artistID).toBe(1);
      const artist = await getArtistWithID(artistID);
      expect(artist).not.toBeNull();
      expect(artist?.stageName).toBe("Lisa");
    });
  });
});
