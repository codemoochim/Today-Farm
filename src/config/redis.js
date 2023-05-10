import { createClient } from "redis";
import config from "./db.config.js";

class Redis {
  constructor() {
    const { username, password, host, port } = config.redis;
    this.client = createClient({
      socket: {
        host,
        port,
        username,
        password,
        connectTimeout: 10000,
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
      },
    });
    this.client.connect();
  }

  async connect() {
    this.client.on("connect", () => console.log("[Redis]: connected!"));
    this.client.on("error", (err) => console.error("[Redis]: Client Error", err));
  }
}

export { Redis };
