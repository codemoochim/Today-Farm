import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  socket: {
    connectTimeout: 50000,
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
});
await redisClient.connect();

redisClient.on("connect", () => console.log("[Redis]: connected!"));
redisClient.on("error", (err) => console.error("[Redis]: Client Error", err));
export { redisClient };
