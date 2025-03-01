import jwt from "jsonwebtoken";
import { logger } from "../utils/helpers.js";
import { errorResponse } from "../utils/response.js";

/*  Middleware to authenticate the user based on a httponly cookie. 
    If the authentication is successful, 
    the userId will be added to the res object for further use. */
export const auth = async (req, res, next) => {
  try {
    if (!req?.cookies?.jwt) {
      throw new Error("No token provided");
    }

    const userToken = req?.cookies?.jwt;
    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);

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
