import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import { Unauthorized } from "../errors/index.js";

export const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
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
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (decoded) throw new Unauthorized("Already logged In");
    else {
      next();

      return;
    }
  } catch (err) {
    next();
    return;
  }
};
