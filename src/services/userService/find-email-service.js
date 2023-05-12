import { findEmailByNameAndPhone } from "../../repository/user-repository.js";
import { checkRequiredParams } from "../../utils/check-required-params.js";

const findEmailService = async (name, phone) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };

    const requestParams = ["name", "phone"];
    if (!checkRequiredParams({ name, phone }, requestParams)) {
      processResult.statusCode = 400;
      processResult.message = "Required parameter(s) missing";

      return processResult;
    }

    const rows = await findEmailByNameAndPhone(name, phone);

    if (rows.length === 0) {
      processResult.statusCode = 400;
      processResult.message = "No match information";

      return processResult;
    } else if (rows.length === 1) {
      processResult.statusCode = 200;
      processResult.message = `email: '${rows[0].email}'`;

      return processResult;
    } else {
      processResult.statusCode = 500;
      processResult.message = `사용자가 왜 ${rows.length} 명이나 있을까요?`;

      return processResult;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default findEmailService;
