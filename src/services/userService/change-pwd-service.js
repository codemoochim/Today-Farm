import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { findPwdByEmail, updatePasswordQuery } from "../../repository/user-repository.js";

const changePwdService = async (email, currentPwd, newPwd) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    // 필수 값 누락
    if (!currentPwd || !newPwd) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";
      return processResult;
    } else if (newPwd.length < 6) {
      // 최소 길이 불충족
      processResult.statusCode = 400;
      processResult.message = "Password is too short";
    }

    // 비밀번호 확인
    const rows = await findPwdByEmail(email);
    const isMatch = await bcrypt.compare(currentPwd, rows[0].password);

    if (!isMatch) {
      processResult.statusCode = 400;
      processResult.message = "Current password does not match";

      return processResult;
    }

    // 새비밀번호로 변경
    const hashedNewPassword = await bcrypt.hash(newPwd, 10);
    await updatePasswordQuery(email, hashedNewPassword);

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default changePwdService;
