import bcrypt from "bcrypt";
import { findPwdByEmail, updatePasswordQuery } from "../../repository/user-repository.js";

const changePwdService = async (email, currentPwd, newPwd) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!currentPwd || !newPwd) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    } else if (newPwd.length < 6) {
      processResult.statusCode = 400;
      processResult.message = "Password is too short";
      return processResult;
    }

    const rows = await findPwdByEmail(email);
    if (rows[0]?.deleted_at) {
      processResult.statusCode = 400;
      processResult.message = "Email is not available";

      return processResult;
    }
    const matchFlag = await bcrypt.compare(currentPwd, rows[0].password);

    if (!matchFlag) {
      processResult.statusCode = 400;
      processResult.message = "Current password does not match";

      return processResult;
    }

    const hashedNewPassword = await bcrypt.hash(newPwd, 10);
    await updatePasswordQuery(email, hashedNewPassword);

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default changePwdService;
