import bcrypt from "bcrypt";
import DB from "../models/index.js";

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
    // const checkEmailQuery = `select * from user where email = '${email}'`;
    const [rows] = await DB.execute(`select * from users where email = ?`, [email]);
    // const checkEmailQuery = `select * from user where email = '${email}'`;
    // const result = await DB.query(checkEmailQuery);
    console.log(rows);
    if (rows.length > 0) {
      processResult.statusCode = 400;
      processResult.message = "Email is not available";

      return processResult;
    }
    // 비밀번호 hashing
    const hash = await bcrypt.hash(password, 10);

    // MySQL에 새 사용자 추가
    const insertUserQuery = `Insert into users (email, password, name, phone) values ('${email}', '${hash}', '${name}', '${phone}')`;
    await DB.query(insertUserQuery);

    processResult.statusCode = 201;
    processResult.message = "User created";

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default register;
