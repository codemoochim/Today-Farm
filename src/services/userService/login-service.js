import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import mysqlDB from "../../config/mysql.js";
import { issuingToken } from "../../utils/token/issuing-token.js";
import { setTokenIntoRedis } from "../../utils/token/manage-token-with-redis.js";
import { findUserByEmail } from "../../repository/user-repository.js";

const login = async (email, password) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    // 필수 값 누락
    if (!email || !password) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    // MySQL에서 사용자 정보 가져오기
    const rows = await findUserByEmail(email);

    if (rows.length === 0) {
      // 이메일이 존재하지 않는 경우
      processResult.statusCode = 400;
      processResult.message = "Email does not exist";

      return processResult;
    }

    // 비밀번호 검증
    // result[0] === rows
    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) {
      // 비밀번호가 일치하지 않는 경우
      processResult.statusCode = 400;
      processResult.message = "Password is not correct";

      return processResult;
    }

    // JWT 발급
    const userId = rows[0].id;
    const secret = process.env.JWT_SECRET;
    const secretSecond = process.env.JWT_SECRET_SECOND;
    const shortTime = 60 * 0.2; // 5분
    const longTime = 60 * 10;
    // accessToken 발급 -> 짧은 수명
    // refreshToken 발급 -> 긴 수명
    const accessToken = issuingToken(email, userId, secret, shortTime);
    const refreshToken = issuingToken(email, userId, secretSecond, longTime);
    await setTokenIntoRedis(refreshToken, email, longTime);

    processResult.statusCode = 200;
    return { ...processResult, accessToken, refreshToken };
  } catch (err) {
    throw new Error(err);
  }
};

// accessToken 만료 시 재발급
const refreshAccessToken = async (refreshToken) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    // refreshToken 검증
    const decoded = jwt.verify(refreshToken, "refresh-secret");
    const sql = `select * from users where id=?`;
    const result = await mysqlDB.promisePool.query(sql, [decoded.userId]);
    // refreshToken이 만료된 경우
    // if (result.length === 0) {
    //   processResult.statusCode = 400;
    //   processResult.message = "Unauthorized";

    //   return processResult;
    // }
    const accessToken = jwt.sign(
      {
        email: result[0].email,
        userId: result[0].id,
      },
      "secret",
      { expiresIn: "2h" },
    );
    return { ...processResult, accessToken };
  } catch (err) {
    throw new Error(err);
  }
};

export { login, refreshAccessToken };
