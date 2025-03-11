import bcrypt from "bcryptjs";
import {
  formatBody,
  generateToken,
  logger,
  MAX_AGE,
} from "../utils/helpers.js";
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

    const token = generateToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: MAX_AGE,
      sameSite: "none",
      secure: true,
    });

    const returnUser = { id: user._id, name: user.name, email: user.email };
    successResponse({ data: returnUser, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 404, error, res });
  }
};

/* Logging in an existing user */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = formatBody(req.body);

    if (!email || !password) {
      throw new Error("Email and password are required");
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
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: MAX_AGE,
      sameSite: "none",
      secure: true,
    });

    const returnUser = { id: user._id, name: user.name, email: user.email };
    logger.info(`${returnUser.name} logged in with token ${token}`);
    successResponse({ data: returnUser, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 404, error, res });
  }
};

/* Logging out the current user */
export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, sameSite: "none", secure: true });
    successResponse({ data: "Logged out", res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 400, error, res });
  }
};

/* Verifying the logged in user */
export const verifyUser = async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.userId);
    logger.info(`${name} verified`);
    successResponse({ data: { _id, name, email }, res });
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 400, error, res });
  }
};
