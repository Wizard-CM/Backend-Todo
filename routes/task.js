import express from "express";
import {
  deleteTask,
  myTasks,
  newTask,
  updateTask,
} from "../controller/task.js";
import { isAuthendicated } from "../middlewares/Auth.js";
const router = express.Router();

// Get Route
router.get("/myTasks", isAuthendicated, myTasks);

// Post Route
router.post("/new", isAuthendicated, newTask);

// put and Delete Route
router
  .route("/:id")
  .put(isAuthendicated, updateTask)
  .delete(isAuthendicated, deleteTask);

export default router;
