import bcrypt from "bcrypt";
import { BadRequest } from "../../errors/index.js";
import { findPasswordByEmailAndPhone, updatePasswordQuery } from "../../repository/user-repository.js";

const findPwdService = async (email, phone) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!email || !phone) {
      throw new BadRequest("Missing required fields");
    }

    const rows = await findPasswordByEmailAndPhone(email, phone);

    if (rows[0]?.deleted_at) {
      throw new BadRequest("Email is not available");
    }

    if (rows.length === 0) {
      throw new BadRequest("No match information");
    } else {
      const temporaryPassword = Math.floor(10000000 + Math.random() * 900000).toString();
      const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);
      await updatePasswordQuery(email, hashedTemporaryPassword);

      processResult.statusCode = 200;
      processResult.message = `temporary password: '${temporaryPassword}'`;

      return processResult;
    }
  } catch (err) {
    throw err;
  }
};

export default findPwdService;
