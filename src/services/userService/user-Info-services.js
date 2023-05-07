import { findNameAndPhoneByEmail } from "../../repository/user-repository.js";

export const userInfoService = async (email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    if (!email) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    const rows = await findNameAndPhoneByEmail(email);
    if (rows.length === 0) {
      // 이메일이 존재하지 않는 경우
      processResult.statusCode = 400;
      processResult.message = "Email does not exist";

      return processResult;
    }
    processResult.message = rows;

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};
