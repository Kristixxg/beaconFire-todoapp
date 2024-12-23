import express from "express";
import {
  getAllTodos,
  postTodo,
  updateTodo,
} from "../controllers/TodoController.js";

const todoRouter = express.Router();

todoRouter.get("/todos", getAllTodos);
todoRouter.post("/todos", postTodo);
todoRouter.patch("/todo/:id", updateTodo);

export default todoRouter;
