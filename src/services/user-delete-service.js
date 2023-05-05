import connection from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userDelete = async (token, password) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    // 로그인 한 유저의 정보를 가져와야함
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    // 필수 값 누락
    if (!password) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    // 비밀번호 확인
    const getUserPasswordQuery = `select password from users where id=?}`;
    const [rows] = await connection.promisePool.query(getUserPasswordQuery, [userId]);
    const isMatch = await bcrypt.compare(password, rows[0].password);

    if (!isMatch) {
      processResult.statusCode = 400;
      processResult.message = "Current password does not match";

      return processResult;
    }
    // 데이터베이스에서 해당 사용자 정보 삭제
    const sql = `delete from users where id=?`;
    await connection.promisePool.query(sql, [userId]);
    processResult.statusCode = 200;
    processResult.message = "User delete complete";

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default userDelete;
