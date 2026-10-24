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

  it("should send the total count of matching items", async () => {
    const res = await request(app).get("/todos");
    expect(res.headers["x-total-count"]).toBe("3");
  });

  it("should page with limit and offset", async () => {
    const first = await request(app).get("/todos?limit=2");
    expect(first.body.map((t) => t.id)).toEqual([1, 2]);
    expect(first.headers["x-total-count"]).toBe("3");

    const second = await request(app).get("/todos?limit=2&offset=2");
    expect(second.body.map((t) => t.id)).toEqual([3]);
    expect(second.headers["x-total-count"]).toBe("3");
  });

  it("should return an empty page when offset is past the end", async () => {
    const res = await request(app).get("/todos?offset=10");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
    expect(res.headers["x-total-count"]).toBe("3");
  });

  it("should paginate within the status filter", async () => {
    const res = await request(app).get("/todos?status=open&limit=1&offset=1");
    expect(res.body).toEqual([{ id: 3, title: "Write docs", status: "open" }]);
    expect(res.headers["x-total-count"]).toBe("2");
  });

  it("should cap limit at 100", async () => {
    const res = await request(app).get("/todos?limit=500");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  });

  it.each(["0", "abc", "-1", "1.5"])("should return 400 for limit=%s", async (limit) => {
    const res = await request(app).get(`/todos?limit=${limit}`);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "limit must be a positive integer" });
  });

  it.each(["abc", "-1", "1.5"])("should return 400 for offset=%s", async (offset) => {
    const res = await request(app).get(`/todos?offset=${offset}`);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "offset must be a non-negative integer" });
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