import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { getTokenFromRedis } from "../utils/token/manage-token-with-redis.js";
import { issuingToken } from "../utils/token/issuing-token.js";

export const validateUser = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(401).send("Unauthorized access");

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded.email;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const { refreshToken } = req.cookies;
      const dataFromRedis = await getTokenFromRedis(refreshToken);
      const storedToken = dataFromRedis.split(":")[1];

      if (refreshToken !== storedToken) {
        return res.status(401).send("Unauthorized access");
      }

      const secretKey = process.env.JWT_SECRET_SECOND;
      const { email, userId } = jwt.verify(storedToken, secretKey);

      const newAccessToken = issuingToken(email, userId, process.env.JWT_SECRET, 60 * 0.2);

      res.locals.token = newAccessToken;
      res.cookie("accessToken", newAccessToken);
      req.user = email;
      next();
      return;
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).send("Invalid Token");
    } else if (err.name === "NotBeforeError") {
      res.status(401).send("NotBeforeError");
    }
    console.error(err);
    res.status(403).send("Forbidden access");
  }
};

// 최초 로그인시 accessToken을 payload로 응답함.
// 변수에 accessToken을 넣어둠.
// acess를 authorization 에더 barer 인코딩으로 넣어서 모든 요청값에 넣는다.

// 1. access payload
// 2. 리소스 요청 access 재발급
