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
  // async getConnection() {
  //   return await this.promisePool.getConnection();
  // }

  // async insertData({ id, temp, humid, lux, solid, time }) {
  //   const sql = `INSERT INTO datas (id, temp, humid, lux, solid, time) VALUES (?,?,?,?,?,?)`;
  //   const [rows] = await this.promisePool.execute(sql, [id, temp, humid, lux, solid, time]);
  //   return rows;
  // }
}
export default DB;
