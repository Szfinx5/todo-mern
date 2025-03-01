import bcrypt from "bcryptjs";
import { formatBody, generateToken, logger } from "../utils/helpers.js";
import { errorResponse, successResponse } from "../utils/response.js";
import User from "../models/user.js";

/* Registering a new user */
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = formatBody(req.body);

    if (!email || !password || !name) {
      throw new Error("Email, name and password are required");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    if (!user) {
      throw new Error("User not registered");
    }

    successResponse({ data: user, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 400, error, res });
  }
};

/* Logging in an existing user */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = formatBody(req.body);

    if (!email || !password) {
      throw new Error("Email, name and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = generateToken(user);

    successResponse({ data: token, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 400, error, res });
  }
};

/* Verifying the logged in user */
export const verifyUser = async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.userId);
    successResponse({ data: { _id, name, email }, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 400, error, res });
  }
};
