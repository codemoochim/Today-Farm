import bcrypt from "bcrypt";
import { findPasswordByEmailAndPhone, updatePasswordQuery } from "../../repository/user-repository.js";

const findPwdService = async (email, phone) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };

    if (!email || !phone) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }

    const rows = await findPasswordByEmailAndPhone(email, phone);

    if (rows.length === 0) {
      processResult.statusCode = 400;
      processResult.message = "No match information";

      return processResult;
    } else {
      const temporaryPassword = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);
      await updatePasswordQuery(email, hashedTemporaryPassword);

      processResult.statusCode = 200;
      processResult.message = `temporary password: '${temporaryPassword}'`;

      return processResult;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default findPwdService;
