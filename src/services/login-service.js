import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../models/index.js";
import { minutesToMillisecond } from "../utils/setTimeForSearchData.js";
import { redisClient } from "../middleware/redis.js";

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
    const sql = `select * from users where email=?`;
    const [rows, _] = await connection.promisePool.query(sql, [email]);
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

    const tokenExpiresDate = {
      accessToken: minutesToMillisecond(2),
      refreshToken: minutesToMillisecond(3),
    };
    // JWT 발급
    // accessToken 발급 -> 짧은 수명
    const accessToken = jwt.sign(
      {
        email: rows[0].email,
        userId: rows[0].id,
      },
      "secret",
      { expiresIn: `${tokenExpiresDate.accessToken * 60}` },
    );
    // refreshToken 발급 -> 긴 수명
    const refreshToken = jwt.sign(
      {
        email: rows[0].email,
        userId: rows[0].id,
      },
      "refresh-secret",
      { expiresIn: `${tokenExpiresDate.refreshToken * 60}` },
    );

    await redisClient.connect();
    await redisClient.set(refreshToken, rows[0].email, {
      // 레디스 expires 옵션 기본단위는 second
      EX: tokenExpiresDate.refreshToken / 60,
    });
    await redisClient.QUIT();

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
    const result = await connection.promisePool.query(sql, [decoded.userId]);
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
