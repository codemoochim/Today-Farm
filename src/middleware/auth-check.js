import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { getTokenFromRedis } from "../utils/token/manage-token-with-redis.js";
import { issuingToken } from "../utils/token/issuing-token.js";

export const validateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("Unauthorized access");
  }

  const [authType, accessToken] = authHeader?.split(" ");

  if (authType !== ("Bearer" || "bearer") || !accessToken) {
    return res.status(401).send("Unauthorized access");
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded.email;

    next();
  } catch (err) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(401).send("Unauthorized access");
      return;
    }
    if (err.name === "TokenExpiredError") {
      const dataFromRedis = await getTokenFromRedis(refreshToken);
      const storedToken = dataFromRedis?.split(":")[1];

      if (refreshToken !== storedToken) {
        res.status(401).send("Unauthorized access");

        return;
      }

      try {
        const secretKey = process.env.JWT_SECRET_SECOND;
        const decoded = jwt.verify(storedToken, secretKey);

        const { email } = decoded;

        const accessTokenLimit = 60 * 60 * 2; // 2시간
        const newAccessToken = issuingToken(email, process.env.JWT_SECRET, accessTokenLimit);

        res.locals.token = newAccessToken;
        req.user = email;
        next();

        return;
      } catch (err) {
        res.status(401).send("Unauthorized access");

        return;
      }
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).send("Invalid Token");

      return;
    } else if (err.name === "NotBeforeError") {
      res.status(401).send("NotBeforeError");

      return;
    }
    console.error(err);
    res.status(403).send("Forbidden access");
  }
};
