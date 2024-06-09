import { Router } from "express";
import allTodosListCN from "../Controllers/todos/allTodosListCN.js";
import addNewTodoCN from "../Controllers/todos/addNewTodoCN.js";
import updateTodoByIdCN from "../Controllers/todos/updateTodoByIdCN.js";
import deleteTodoByIdCN from "../Controllers/todos/deleteTodoByIdCN.js";
const router = Router();
export default router;

// @Disc: get all todos list controller
// @From folder controllers > todos
router.get("/api/todos", allTodosListCN);

// @Disc: add new todo
// @From folder controllers > todos
router.post("/api/todos", addNewTodoCN);

// @Disc: update todo by id
// @From folder controllers > todos
router.patch("/api/todos/:id", updateTodoByIdCN);

// @Disc: delete todo by id
// @From folder controllers > todos
router.delete("/api/todos/:id", deleteTodoByIdCN);
