import connection from "../models/db.js";
import bcrypt from "bcrypt";

const register = async (email, password, phone, name) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    // 필수 값 누락
    if (!email || !password || !phone || !name) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    // 최소 길이 불충족
    if (password.length < 6) {
      processResult.statusCode = 400;
      processResult.message = "Password is too short";

      return processResult;
    }
    // 중복된 이메일 확인
    const checkEmailQuery = `select * from user where email = '${email}'`;
    const result = connection.query(checkEmailQuery);
    if (result.length > 0) {
      processResult.statusCode = 400;
      processResult.message = "Email is not available";

      return processResult;
    }
    // 비밀번호 hashing
    const hash = await bcrypt.hash(password, 10);

    // MySQL에 새 사용자 추가
    const insertUserQuery = `insert into user (email, password, phone, name) values ('${email}', '${hash}', '${phone}', '${name})`;
    connection.query(insertUserQuery);

    processResult.statusCode = 201;
    processResult.message = "User created";

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default register;
