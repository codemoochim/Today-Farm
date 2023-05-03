import connection from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const changePwd = async (token, currentPwd, newPwd) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    // 로그인 한 유저의 정보를 가져와야함
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // 필수 값 누락
    if (!currentPwd || !newPwd) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    // 비밀번호 확인
<<<<<<< HEAD:src/services/changePwdSrvc.js
    const getUserPasswordQuery = `select password from users where id = ${userId}`;
=======
    const getUserPasswordQuery = `SELECT password FROM user WHERE id = ${userId}`;
>>>>>>> a8aeb9f23fd0ae16f5ae0bd7439f7f97e71b52b0:src/services/change-pwd-service.js
    const [rows] = await connection.query(getUserPasswordQuery);
    const isMatch = await bcrypt.compare(currentPwd, rows[0].password);

    if (!isMatch) {
      processResult.statusCode = 400;
      processResult.message = "Current password does not match";

      return processResult;
    }
    // 새비밀번호로 변경
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
<<<<<<< HEAD:src/services/changePwdSrvc.js
    const updatePasswordQuery = `update users set password = '${hashedNewPassword}' where id = ${userId}`;
=======
    const updatePasswordQuery = `UPDATE user SET password = '${hashedNewPassword}' WHERE id = ${userId}`;
>>>>>>> a8aeb9f23fd0ae16f5ae0bd7439f7f97e71b52b0:src/services/change-pwd-service.js

    await connection.query(updatePasswordQuery);

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default changePwd;
