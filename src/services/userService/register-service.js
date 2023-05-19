import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { BadRequest } from "../../errors/index.js";
import { createUserInfoIntoDB, findUserByEmail, findUserByPhone } from "../../repository/user-repository.js";
import { checkEmailForm, checkPhoneForm } from "../../utils/form-check.js";
import { issuingToken, setTokenIntoRedis } from "../../utils/auth/index.js";

const registerService = async (email, password, phone, name) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    if (!email || !password || !phone || !name) {
      throw new BadRequest("Missing required fields");
    } else if (name.length < 2) {
      throw new BadRequest("Name is too short");
    } else if (password.length < 8) {
      throw new BadRequest("Password is too short");
    } else if (!checkEmailForm(email)) {
      throw new BadRequest("Invalid email form");
    } else if (!checkPhoneForm(phone)) {
      throw new BadRequest("Invalid phone form");
    }
    // HACK: 회원가입 테스트 용이성을 위해 잠시 주석처리
    // else if (!checkPwdForm(password)) {
    // throw new BadRequest("Invalid password form")
    // }

    const emailRows = await findUserByEmail(email);
    if (emailRows.length > 0 || emailRows[0]?.deleted_at) {
      throw new BadRequest("Email is not available");
    }
    const phoneRows = await findUserByPhone(phone);
    if (phoneRows.length > 0) {
      throw new BadRequest("You are already registered");
    }

    const hash = await bcrypt.hash(password, 10);
    const rows = await createUserInfoIntoDB(email, hash, name, phone);

    const secret = process.env.JWT_SECRET;
    const secretSecond = process.env.JWT_SECRET_SECOND;
    const accessTokenLimit = 7200; // 2시간
    const refreshTokenExpires = 1209600; // 14일

    const accessToken = issuingToken(email, secret, accessTokenLimit);
    const refreshToken = issuingToken(email, secretSecond, refreshTokenExpires);
    await setTokenIntoRedis(refreshToken, email, refreshTokenExpires);

    processResult.statusCode = 201;
    processResult.message = "User created";

    return { ...processResult, accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

export default registerService;
