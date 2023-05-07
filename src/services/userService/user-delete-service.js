import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { findPwdByEmail, updateDeletedDate } from "../../repository/user-repository.js";
import { deleteTokenIntoRedis } from "../../utils/token/manage-token-with-redis.js";

const userDeleteService = async (email, password, refreshToken) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    // 필수 값 누락
    if (!password) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    // 비밀번호 확인
    const rows = await findPwdByEmail(email);
    const isMatch = await bcrypt.compare(password, rows[0].password);

    if (!isMatch) {
      processResult.statusCode = 400;
      processResult.message = "Current password does not match";
      return processResult;
    }
    // 데이터베이스에서 해당 사용자 정보 삭제

    await updateDeletedDate(email, new Date());
    await deleteTokenIntoRedis(refreshToken);
    processResult.statusCode = 200;
    processResult.message = "User delete complete";

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default userDeleteService;
