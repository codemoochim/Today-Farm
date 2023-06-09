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
      console.log(response);
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const getTokenFromRedis = async (token) => {
  try {
    const result = await redisClient.get(`${token}`, (err, response) => {
      if (err) return console.error(err);
      console.log(response);
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
