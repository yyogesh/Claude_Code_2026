import express from "express";
import { todos } from "./todos.js";

export const app = express();
app.use(express.json());
app.use("/todos", todos);