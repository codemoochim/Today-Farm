import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import { redisClient } from "../../config/redis-client.js";
import { Unauthorized } from "../../errors/index.js";

export const issuingToken = (email, secret, time) => {
  const token = jwt.sign(
    {
      email,
    },
    `${secret}`,
    { expiresIn: `${time}s` }, // 초단위
  );
  return token;
};

export const setTokenIntoRedis = async (token, email, time) => {
  try {
    // 레디스 expires 옵션 기본단위는 second
    const result = await redisClient.set(token, `${email}:${token}`, { EX: `${time}` }); // 초단위
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteTokenIntoRedis = async (token) => {
  try {
    const result = await redisClient.del(`${token}`);
    return result;
  } catch (err) {
    throw err;
  }
};

export const getTokenFromRedis = async (token) => {
  try {
    const result = await redisClient.get(`${token}`, (err, response) => {
      console.log(response);
      console.log(err);
      if (err) throw err;
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const isExistAuthHeader = (requestHeaders) => {
  return requestHeaders["authorization"];
};

export const extractTokenFromHeader = (authHeader) => {
  const [authType, accessToken] = authHeader?.split(" ");
  if (authType === ("Bearer" || "bearer")) {
    return accessToken;
  }
  return false;
};

export const compareRefreshToken = async (token) => {
  try {
    const valueFromRedis = await getTokenFromRedis(token);
    const storedToken = valueFromRedis?.split(":")[1];
    if (token === storedToken) return token;
  } catch (err) {
    throw err;
  }
};

export const checkRefreshAndIssueAccess = async (refreshToken) => {
  try {
    if (!refreshToken) throw new Unauthorized("No RefreshToken");

    const refreshTokenFlag = await compareRefreshToken(refreshToken);
    if (!refreshTokenFlag) throw new Unauthorized("Does not Match RefreshToken");

    const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET_SECOND);

    const { email } = decodedRefresh;

    const newAccessToken = issuingToken(email, process.env.JWT_SECRET, process.env.ACCESS_TOKEN_LIMIT);
    return { newAccessToken, email };
  } catch (err) {
    throw err;
  }
};
