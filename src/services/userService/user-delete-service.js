import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { findPwdByEmail, updateDeletedDate } from "../../repository/user-repository.js";
import { deleteTokenIntoRedis } from "../../utils/token/manage-token-with-redis.js";

const userDeleteService = async (email, password, refreshToken) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!password) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }

    const rows = await findPwdByEmail(email);
    const matchFlag = await bcrypt.compare(password, rows[0].password);

    if (!matchFlag) {
      processResult.statusCode = 400;
      processResult.message = "Current password does not match";

      return processResult;
    }

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
