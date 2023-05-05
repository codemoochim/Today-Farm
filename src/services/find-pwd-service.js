import connection from "../models/index.js";
import bcrypt from "bcrypt";

const findPwd = async (email, phone) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    // 필수 값 누락
    if (!email || !phone) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    // MySql에서 이름과 번호를 가진 사용자 정보 가져오기
    const sql = `select email from users where email=? and phone=?`;
    const [rows, _] = await connection.promisePool.query(sql, [email, phone]);
    // 일치하는 정보가 없음
    if (rows.length === 0) {
      processResult.statusCode = 400;
      processResult.message = "No match information";

      return processResult;
    } else {
      // 임시 비밀번호 6자리 발급
      const temporaryPassword = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);
      const updatePasswordQuery = `update users set password=? where email=?`;
      await connection.promisePool.query(updatePasswordQuery, [hashedTemporaryPassword, email]);
      processResult.statusCode = 200;
      processResult.message = `temporary password: '${temporaryPassword}'`;

      return processResult;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default findPwd;
