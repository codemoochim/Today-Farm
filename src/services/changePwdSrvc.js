import connection from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const changePwd = async (currentPwd, newPwd) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    // 로그인 한 유저의 정보를 가져와야함
    // const id = 로그인한 유저의 아이디;

    // 필수 값 누락
    if (!currentPwd || !newPwd) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    const getUserPasswordQuery = `select password from user where id = ${id}`;
    const [rows] = await connection.query(getUserPasswordQuery);
    const isMatch = await bcrypt.compare(currentPwd, rows[0].password);

    if (!isMatch) {
      processResult.statusCode = 400;
      processResult.message = "Current password does not match";

      return processResult;
    }
    // 새비밀번호로 변경
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updatePasswordQuery = `update user set password = '${hashedNewPassword}' where id = ${id}`;

    await connection.query(updatePasswordQuery);

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default changePwd;
