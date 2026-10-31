import { Router } from "express";

export const todos = Router();

const items = [
  { id: 1, title: "Set up repo", status: "done" },
  { id: 2, title: "Add status filter", status: "open" },
  { id: 3, title: "Write docs", status: "open" },
];
// A counter rather than items.length + 1, so IDs aren't reused after a delete.
let nextId = items.length + 1;

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

// Parses a query value made only of digits; returns NaN for anything else.
const parseNonNegativeInt = (value) =>
  typeof value === "string" && /^\d+$/.test(value) ? Number(value) : NaN;

// Query params: state (filter), limit (default 20, max 100), offset (default 0).
todos.get("/", (req, res) => {
  const { state, limit, offset } = req.query;

  const pageSize = limit === undefined ? DEFAULT_LIMIT : parseNonNegativeInt(limit);
  if (!(pageSize >= 1)) {
    return res.status(400).json({ error: "limit must be a positive integer" });
  }
  const start = offset === undefined ? 0 : parseNonNegativeInt(offset);
  if (Number.isNaN(start)) {
    return res.status(400).json({ error: "offset must be a non-negative integer" });
  }

  const matching = state ? items.filter((t) => t.status === state) : items;
  res.set("X-Total-Count", String(matching.length));
  res.json(matching.slice(start, start + Math.min(pageSize, MAX_LIMIT)));
});

todos.post("/", (req, res) => {
  const title = req.body?.title;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }
  const item = { id: nextId++, title, status: "open" };
  items.push(item);
  res.status(201).json(item);
});

todos.delete("/:id", (req, res) => {
  const id = parseNonNegativeInt(req.params.id);
  if (!(id >= 1)) {
    return res.status(400).json({ error: "id must be a positive integer" });
  }
  const index = items.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "todo not found" });
  }
  items.splice(index, 1);
  res.status(204).end();
});


// curl -fsSL https://claude.ai/install.sh | bash

// irm https://claude.ai/install.ps1 | iex