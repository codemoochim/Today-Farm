import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import { Unauthorized, Forbidden } from "../errors/index.js";
import { isExistAuthHeader, extractTokenFromHeader, checkRefreshAndIssueAccess } from "../utils/auth/index.js";

export const validateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // const authHeader = isExistAuthHeader(req.headers);
  if (!authHeader) throw new Unauthorized("No Authorization Headers");

  const authType = authHeader?.split(" ")[0];
  const accessToken = authHeader?.split(" ")[1];
  if (authType !== ("Bearer" || "bearer")) {
    throw new Unauthorized("No Authorization Headers");
  }

  if (!accessToken) throw new Unauthorized("Encoded different Type or No Token");
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (decoded) {
      req.user = decoded.email;
      next();
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const { refreshToken } = req.cookies;
      try {
        const newAccessToken = await checkRefreshAndIssueAccess(refreshToken);

        res.locals.token = newAccessToken;
        req.user = email;
        next();
      } catch (err) {
        next(err);
      }
    } else if (err.name === "JsonWebTokenError") {
      next(new Unauthorized("Invalid Token"));
    } else if (err.name === "NotBeforeError") {
      next(new Unauthorized("NotBeforeError"));
    } else {
      next(new Forbidden("Forbidden access"));
    }
  }
};
