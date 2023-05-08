import bcrypt from "bcrypt";

import { createUserInfoIntoDB, findUserByEmail, findUserByPhone } from "../../repository/user-repository.js";
import { checkEmailForm, checkPhoneForm } from "../../utils/form-check.js";

const registerService = async (email, password, phone, name) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    // 필수 값 누락
    if (!email || !password || !phone || !name) {
      return {
        statusCode: 400,
        message: "Missing required fields",
      };
    } else if (name.length < 2) {
      processResult.statusCode = 400;
      processResult.message = "name is too short";
    } else if (password.length < 6) {
      // 최소 길이 불충족
      processResult.statusCode = 400;
      processResult.message = "Password is too short";
    } else if (!checkEmailForm(email)) {
      processResult.statusCode = 400;
      processResult.message = "Invalid email form";
    } else if (!checkPhoneForm(phone)) {
      processResult.statusCode = 400;
      processResult.message = "Invalid phone form";
    }

    // 중복된 이메일 확인
    const emailRows = await findUserByEmail(email);
    if (emailRows.length > 0) {
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

    // 비밀번호 hashing
    const hash = await bcrypt.hash(password, 10);
    // MySQL에 새 사용자 추가
    await createUserInfoIntoDB(email, hash, name, phone);
    processResult.statusCode = 201;
    processResult.message = "User created";
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default registerService;
