import bcrypt from "bcrypt";
import { BadRequest } from "../../errors/index.js";
import { findPwdByEmail, updatePasswordQuery } from "../../repository/user-repository.js";

const changePwdService = async (email, currentPwd, newPwd) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!currentPwd || !newPwd) {
      throw new BadRequest("Missing required fields");
    }
    if (newPwd.length < 6) {
      throw new BadRequest("Password is too short");
    }

    const rows = await findPwdByEmail(email);

    if (rows[0]?.deleted_at) {
      throw new BadRequest("Email is not available");
    }
    const matchFlag = await bcrypt.compare(currentPwd, rows[0].password);

    if (!matchFlag) {
      throw new BadRequest("Current password does not match");
    }

    const hashedNewPassword = await bcrypt.hash(newPwd, 10);
    await updatePasswordQuery(email, hashedNewPassword);

    return processResult;
  } catch (err) {
    throw err;
  }
};

export default changePwdService;
