import app from "../app";
import supertest from "supertest";

describe("Basic App Tests", () => {
  describe("GET /", () => {
    it("should respond with a `404` status code", async () => {
      const { status } = await supertest(app).get("/");
      expect(status).toBe(404);
    });
  });

  describe("GET /ping", () => {
    it("should respond with a `200` status code & a simple 'pong' message.", async () => {
      const { status, text } = await supertest(app).get("/ping");
      expect(status).toBe(200);
      expect(text).toBe("pong");
    });
  });
});
