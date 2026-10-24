import { Router } from "express";

export const todos = Router();

const items = [
  { id: 1, title: "Set up repo", status: "done" },
  { id: 2, title: "Add status filter", status: "open" },
  { id: 3, title: "Write docs", status: "open" },
];

todos.get("/", (req, res) => {
  const { status } = req.query;
  const result = status ? items.filter((t) => t.status === status) : items;
  res.json(result);
});

todos.post("/", (req, res) => {
  const title = req.body?.title;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }
  const item = { id: items.length + 1, title, status: "open" };
  items.push(item);
  res.status(201).json(item);
});


// curl -fsSL https://claude.ai/install.sh | bash

// irm https://claude.ai/install.ps1 | iex