import { createClient, createCluster } from "redis";
import config from "./db.config.js";
const { password, host, port } = config.redis;
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  // url: `redis://${username}:${password}@${host}:${port}`,
  password,
  socket: {
    port,
    host,
    connectTimeout: 10000,
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
});
await redisClient.connect();

redisClient.on("connect", () => console.log("[Redis]: connected!"));
redisClient.on("error", (err) => console.error("[Redis]: Client Error", err));
export { redisClient };
