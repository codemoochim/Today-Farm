import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

import { BadRequest } from "../../errors/index.js";
import { issuingToken, setTokenIntoRedis } from "../../utils/auth/index.js";
import { findUserByEmail } from "../../repository/user-repository.js";

const loginService = async (email, password) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!email || !password) {
      throw new BadRequest("Missing required fields");
    }

    const rows = await findUserByEmail(email);
    if (rows[0]?.deleted_at) {
      throw new BadRequest("Inability to log in");
    }

    if (rows.length === 0) {
      throw new BadRequest("Email does not exist");
    }

    const matchFlag = await bcrypt.compare(password, rows[0].password);
    if (!matchFlag) {
      throw new BadRequest("Password is not correct");
    }

    const secret = process.env.JWT_SECRET;
    const secretSecond = process.env.JWT_SECRET_SECOND;
    const accessTokenLimit = 7200; // 2시간
    const refreshTokenExpires = 1209600; // 14일

    const accessToken = issuingToken(email, secret, accessTokenLimit);
    const refreshToken = issuingToken(email, secretSecond, refreshTokenExpires);
    await setTokenIntoRedis(refreshToken, email, refreshTokenExpires);

    processResult.statusCode = 200;
    return { ...processResult, accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

export default loginService;
