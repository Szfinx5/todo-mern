import bunyan from "bunyan";
import jwt from "jsonwebtoken";

export const MAX_AGE = 60 * 60 * 1000; // 1 hour

export const isEmpty = (objectName) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

export const logger = bunyan.createLogger({ name: "todo-app" });

export const formatBody = (body) => {
  const email = body?.email?.trim()?.toLowerCase();
  const password = body?.password?.trim();
  const name = body?.name?.trim();
  return { email, password, name };
};

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: MAX_AGE,
    }
  );
};
