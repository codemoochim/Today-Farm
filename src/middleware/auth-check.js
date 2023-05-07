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
    // if (err.name === "TokenExpiredError") {
    //   const { refreshToken } = req.cookies;
    //   const dataFromRedis = await getTokenFromRedis(refreshToken);
    //   const storedToken = dataFromRedis.split(":")[1];

    //   console.log("리프레시", refreshToken);
    //   console.log("스토어드", storedToken);
    //   if (refreshToken !== storedToken) {
    //     return res.status(401).send("Unauthorized access");
    //   }
    //   const secretKey = process.env.JWT_SECRET_SECOND;
    //   const { email, userId } = jwt.verify(storedToken, secretKey);

    //   const newAccessToken = issuingToken(email, userId, secretKey, 60 * 5);
    //   console.log(1212);

    //   console.log(newAccessToken);
    //   res.locals.token = newAccessToken;
    //   next();
    // }
    console.error(err);
    res.status(403).send("Forbidden access");
  }
};
