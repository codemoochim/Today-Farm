<<<<<<< HEAD
import mysql from "mysql2/promise";
=======
// src/models/index.js
import DB from "../repository/mysql-client.js";
>>>>>>> 42b70daf54b60700b195e22c30e78fbf824343cc
import dotenv from "dotenv";
dotenv.config();

const dbOptions = {
<<<<<<< HEAD
  host: process.env.HOST,
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const pool = mysql.createPool(dbOptions);

pool.getConnection((err) => {
  console.log(dbOptions);
  if (err) {
    console.error("데이터베이스 연결을 실패하였습니다.", err);
  } else {
    console.log("데이터베이스 연결에 성공하였습니다.");
  }
});

export default pool;
=======
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // 연결이 유휴 상태로 유지되는 최대 시간
  idleTimeout: 60000, // 연결이 유휴 상태로 유지되는 시간
  queueLimit: 1, // 대기열의 최대 길이
};

const instance = new DB(dbOptions);
const checkConnection = async () => {
  instance.pool.getConnection((err, connect) => {
    try {
      if (!err) {
        console.log("mySQL 데이터베이스가 정상적으로 연결되었습니다.");
        connect.release();
      }
    } catch (err) {
      switch (err.code) {
        case "PROTOCOL_CONNECTION_LOST":
          console.error("Database connection was closed.");
          break;
        case "ER_CON_COUNT_ERROR":
          console.error("Database has too many connections.");
          break;
        case "ECONNREFUSED":
          console.error("Database connection was refused.");
          break;
        default:
          console.error("Unknown error occurred while connecting to the database.", err);
          break;
      }
    }
  });
};
checkConnection();

export default instance;
>>>>>>> 42b70daf54b60700b195e22c30e78fbf824343cc
