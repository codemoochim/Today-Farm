// src/repository/mysql-client.js
import mysql from "mysql2";

class DB {
  constructor({
    host,
    user,
    password,
    database,
    port,
    waitForConnections,
    connectionLimit,
    maxIdle,
    idleTimeout,
    queueLimit,
  }) {
    this.pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections,
      connectionLimit,
      maxIdle,
      idleTimeout,
      queueLimit,
    });
    this.promisePool = this.pool.promise();
  }
}
export default DB;
