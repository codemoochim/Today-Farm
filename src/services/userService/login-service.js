import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { issuingToken } from "../../utils/token/issuing-token.js";
import { setTokenIntoRedis } from "../../utils/token/manage-token-with-redis.js";
import { findUserByEmail } from "../../repository/user-repository.js";

const loginService = async (email, password) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };

    if (!email || !password) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }

    const rows = await findUserByEmail(email);
    if (rows[0].deleted_at) {
      processResult.statusCode = 400;
      processResult.message = "Inability to log in";

      return processResult;
    }

    if (rows.length === 0) {
      processResult.statusCode = 400;
      processResult.message = "Email does not exist";

      return processResult;
    }

    const matchFlag = await bcrypt.compare(password, rows[0].password);
    if (!matchFlag) {
      processResult.statusCode = 400;
      processResult.message = "Password is not correct";

      return processResult;
    }

    const secret = process.env.JWT_SECRET;
    const secretSecond = process.env.JWT_SECRET_SECOND;
    const accessTokenLimit = 60 * 60 * 2; // 2시간
    const refreshTokenExpires = 60 * 60 * 24 * 14; // 14일

    const accessToken = issuingToken(email, secret, accessTokenLimit);
    const refreshToken = issuingToken(email, secretSecond, refreshTokenExpires);
    await setTokenIntoRedis(refreshToken, email, refreshTokenExpires);

    processResult.statusCode = 200;
    return { ...processResult, accessToken, refreshToken };
  } catch (err) {
    throw new Error(err);
  }
};

export default loginService;
