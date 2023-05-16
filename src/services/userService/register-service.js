import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { createUserInfoIntoDB, findUserByEmail, findUserByPhone } from "../../repository/user-repository.js";
import { checkEmailForm, checkPhoneForm } from "../../utils/form-check.js";
import { issuingToken } from "../../utils/token/issuing-token.js";
import { setTokenIntoRedis } from "../../utils/token/manage-token-with-redis.js";

const registerService = async (email, password, phone, name) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    if (!email || !password || !phone || !name) {
      return {
        statusCode: 400,
        message: "Missing required fields",
      };
    } else if (name.length < 2) {
      processResult.statusCode = 400;
      processResult.message = "name is too short";

      return processResult;
    } else if (password.length < 8) {
      processResult.statusCode = 400;
      processResult.message = "Password is too short";

      return processResult;
    } else if (!checkEmailForm(email)) {
      processResult.statusCode = 400;
      processResult.message = "Invalid email form";

      return processResult;
    } else if (!checkPhoneForm(phone)) {
      processResult.statusCode = 400;
      processResult.message = "Invalid phone form";

      return processResult;
    }
    // HACK: 회원가입 테스트 용이성을 위해 잠시 주석처리
    // else if (!checkPwdForm(password)) {
    //   processResult.statusCode = 400;
    //   processResult.message = "Invalid password form";
    //
    // return processResult;
    // }

    const emailRows = await findUserByEmail(email);
    if (emailRows.length > 0 || emailRows[0]?.deleted_at) {
      processResult.statusCode = 400;
      processResult.message = "Email is not available";

      return processResult;
    }
    const phoneRows = await findUserByPhone(phone);
    if (phoneRows.length > 0) {
      processResult.statusCode = 400;
      processResult.message = "You are already registered";

      return processResult;
    }

    const hash = await bcrypt.hash(password, 10);
    const rows = await createUserInfoIntoDB(email, hash, name, phone);

    const secret = process.env.JWT_SECRET;
    const secretSecond = process.env.JWT_SECRET_SECOND;
    const accessTokenLimit = 60 * 20; // 30분
    const refreshTokenExpires = 60 * 60;

    const accessToken = issuingToken(email, secret, accessTokenLimit);
    const refreshToken = issuingToken(email, secretSecond, refreshTokenExpires);
    await setTokenIntoRedis(refreshToken, email, refreshTokenExpires);

    processResult.statusCode = 201;
    processResult.message = "User created";

    return { ...processResult, accessToken, refreshToken };
  } catch (err) {
    throw new Error(err);
  }
};

export default registerService;
