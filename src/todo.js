import { Router } from "express";

export const todos = Router();

const items = [
  { id: 1, title: "Set up repo", status: "done" },
  { id: 2, title: "Add status filter", status: "open" },
  { id: 3, title: "Write docs", status: "open" },
];

todos.get("/", (req, res) => {
  const { state } = req.query;
  const result = state ? items.filter((t) => t.status === state) : items;
  res.json(result);
});

todos.post("/", (req, res) => {
  const item = { id: items.length + 1, title: req.body.title, status: "open" };
  items.push(item);
  res.status(201).json(item);
});