import express from "express";
import {
  addTask,
  deleteTask,
  editTask,
  getTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/").get(getTasks).post(addTask);
router.route("/:id").patch(editTask).delete(deleteTask);

export default router;
