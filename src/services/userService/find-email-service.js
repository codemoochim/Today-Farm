import { BadRequest } from "../../errors/index.js";
import { findEmailByNameAndPhone } from "../../repository/user-repository.js";

const findEmailService = async (name, phone) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!name || !phone) {
      throw new BadRequest("Required parameter(s) missing");
    }
    const rows = await findEmailByNameAndPhone(name, phone);

    if (rows[0]?.deleted_at) {
      throw new BadRequest("No available");
    }

    if (rows.length === 0) {
      throw new BadRequest("No match information");
    } else if (rows.length === 1) {
      processResult.message = `email: '${rows[0].email}'`;
      return processResult;
    } else {
      throw new BadRequest(`사용자가 왜 ${rows.length} 명이나 있을까요?`);
    }
  } catch (err) {
    throw err;
  }
};

export default findEmailService;
