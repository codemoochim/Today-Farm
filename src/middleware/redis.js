import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redisClient = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient.on("connect", () => console.log("Redis connected!"));
redisClient.on("error", (err) => console.error("Redis Client Error", err));
// redisClient.connect();
// // redisClient.isReady ? console.log("레디스가 연결되었습니다.") : console.log("레디스가 연결에 실패하였습니다.");
// await redisClient.disconnect();
// redisClient.quit();
