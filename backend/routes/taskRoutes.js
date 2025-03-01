import express from "express";
import {
  addTask,
  deleteTask,
  editTask,
  getTasks,
} from "../controllers/taskController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(auth, getTasks).post(auth, addTask);
router.route("/:id").patch(auth, editTask).delete(auth, deleteTask);

export default router;
