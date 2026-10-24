import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("GET /todos", () => {
  it("should return all todos", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  });

  it("should filter by status", async () => {
    const res = await request(app).get("/todos?status=done");
    expect(res.body).toEqual([{ id: 1, title: "Set up repo", status: "done" }]);
  });
});

describe("POST /todos", () => {
  it("should return 400 when title is missing", async () => {
    const res = await request(app).post("/todos").send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "title is required" });
  });

  it("should return 400 when title is empty", async () => {
    const res = await request(app).post("/todos").send({ title: "" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "title is required" });
  });
});