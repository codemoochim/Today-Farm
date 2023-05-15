import mysql from "mysql2";
import config from "./db.config.js";

const { host, user, password, database, port } = config.mysql;

class MySQL {
  constructor() {
    this.pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
    });
    this.promisePool = this.pool.promise();
    this.checkConnection();
  }

  async checkConnection() {
    try {
      const connection = await this.promisePool.getConnection();
      console.log("[MYSQL]: 데이터베이스가 정상적으로 연결되었습니다.");
      connection.release();
    } catch (err) {
      switch (err.code) {
        case "PROTOCOL_CONNECTION_LOST":
          console.error("[MYSQL]: Database connection was closed.");
          break;
        case "ER_CON_COUNT_ERROR":
          console.error("[MYSQL]: Database has too many connections.");
          break;
        case "ECONNREFUSED":
          console.error("[MYSQL]: Database connection was refused.");
          break;
        default:
          console.error("[MYSQL]: Unknown error occurred while connecting to the database.", err);
          break;
      }
    }
  }
}

export default new MySQL();
