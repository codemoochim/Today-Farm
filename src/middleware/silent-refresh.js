import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { getTokenFromRedis } from "../utils/token/manage-token-with-redis.js";
import { issuingToken } from "../utils/token/issuing-token.js";

export const issuingAccessToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.status(401).send("Unauthorized access");

    return;
  }

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
    const accessTokenLimit = 60 * 20;
    const newAccessToken = issuingToken(email, process.env.JWT_SECRET, accessTokenLimit);

    res.locals.token = newAccessToken;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized access");
    return;
  }
};
