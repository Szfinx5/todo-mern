import jwt from "jsonwebtoken";
import { logger } from "../utils/helpers.js";
import { errorResponse } from "../utils/response.js";

export const auth = async (req, res, next) => {
  if (!req?.headers?.authorization) {
    throw new Error("No token provided");
  }
  try {
    const userToken = req?.headers?.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(userToken, process.env.SECRET);

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    logger.error(error);
    errorResponse({ code: 401, error, res });
  }
};
