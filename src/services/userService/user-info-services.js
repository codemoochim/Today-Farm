import { BadRequest } from "../../errors/index.js";
import { findNameAndPhoneByEmail } from "../../repository/user-repository.js";

export const userInfoService = async (email) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!email) {
      throw new BadRequest("Login required");
    }
    const rows = await findNameAndPhoneByEmail(email);
    if (rows.length === 0 || rows[0]?.deleted_at) {
      throw new BadRequest("Email does not exist");
    }
    processResult.message = rows;

    return processResult;
  } catch (err) {
    throw err;
  }
};
