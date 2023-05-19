import dotenv from "dotenv";
dotenv.config();

import { Unauthorized } from "../errors/index.js";
import { isExistAuthHeader, extractTokenFromHeader } from "../utils/auth/index.js";

export const isLoggedIn = async (req, res, next) => {
  const authHeader = isExistAuthHeader(req.headers);
  if (!authHeader) {
    next();
    return;
  }
  const authType = authHeader?.split(" ")[0];
  const accessToken = authHeader?.split(" ")[1];
  if (authType !== ("Bearer" || "bearer")) {
    next();
    return;
  }

  try {
    const decoded = validateToken(accessToken, process.env.JWT_SECRET);
    if (decoded) throw new Unauthorized("Already logged In");
    next();
    return;
  } catch (err) {
    next();
    return;
  }
};
