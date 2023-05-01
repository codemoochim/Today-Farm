import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbOptions = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const pool = mysql.createPool(dbOptions);

pool.getConnection((err) => {
  if (err) {
    console.error("데이터베이스 연결을 실패하였습니다.", err);
  } else {
    console.log("데이터베이스 연결에 성공하였습니다.");
  }
});

export default pool;
