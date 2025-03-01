import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", auth, verifyUser);

export default router;
