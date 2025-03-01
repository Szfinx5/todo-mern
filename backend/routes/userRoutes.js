import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Defining the /api/user/ endpoint's routes. Only the /me route needs authentication */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", auth, verifyUser);

export default router;
