import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbOptions = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connection = mysql.createConnection(dbOptions);

connection.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결을 실패하였습니다.", err);
  } else {
    console.log("데이터베이스 연결에 성공하였습니다.");
  }
});

export default connection;
