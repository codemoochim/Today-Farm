import { redisClient } from "../../config/redis-client.js";

export const setTokenIntoRedis = async (token, email, time) => {
  try {
    await redisClient.set(token, `${email}:${token}`, {
      // 레디스 expires 옵션 기본단위는 second
      EX: `${time}`, // 초단위
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteTokenIntoRedis = async (token) => {
  try {
    await redisClient.del(`${token}`, (err, response) => {
      if (err) throw err;
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const getTokenFromRedis = async (token) => {
  try {
    const result = await redisClient.get(`${token}`, (err, response) => {
      console.log(err);
      if (err) throw err;
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

// 리프레시 토큰
// 쿠키 14일(ms) - 레디스 14일(s) - JWT 14일(s)
// 액세스 토큰
// JWT 2시간(s)
