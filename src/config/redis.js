import { createClient } from "redis";
import config from "./db.config.js";
const { username, password, host, port } = config.redis;

class Redis {
  constructor() {
    this.client = createClient({
      url: `redis://:${password}@${host}:${port}`,
    });
    this.client.connect();
  }
  async connect() {
    this.client.on("connect", () => console.log("[Redis]: connected!"));
    this.client.on("error", (err) => console.error("[Redis]: Client Error", err));
  }
}

export const redisInstance = new Redis();
