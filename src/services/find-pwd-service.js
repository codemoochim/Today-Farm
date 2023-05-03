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
<<<<<<< HEAD:src/services/findPwdSrvc.js
    const sql = `select email from users where email='${email}' and phone='${phone}'`;
=======
    const sql = `SELECT email FROM user WHERE email='${email}' AND phone='${phone}'`;
>>>>>>> a8aeb9f23fd0ae16f5ae0bd7439f7f97e71b52b0:src/services/find-pwd-service.js
    const result = await connection.query(sql);
    // 일치하는 정보가 없음
    if (result.length === 0) {
      processResult.statusCode = 400;
      processResult.message = "No match information";

      return processResult;
    } else {
      // 임시 비밀번호 6자리 발급
      const temporaryPassword = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);
<<<<<<< HEAD:src/services/findPwdSrvc.js
      const updatePasswordQuery = `update users set password='${hashedTemporaryPassword}' where email='${email}'`;
=======
      const updatePasswordQuery = `UPDATE user SET password='${hashedTemporaryPassword}' WHERE email='${email}'`;
>>>>>>> a8aeb9f23fd0ae16f5ae0bd7439f7f97e71b52b0:src/services/find-pwd-service.js
      await connection.query(updatePasswordQuery);
      processResult.statusCode = 200;
      processResult.message = "A temporary password has been issued";

      return processResult;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default findPwd;
