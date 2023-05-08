import {
  findNameAndPhoneByEmail,
  findUserByPhone,
  updateNameAndPhone,
  updateName,
} from "../../repository/user-repository.js";
import { checkPhoneForm } from "../../utils/form-check.js";

export const userEditService = async (email, newName, newPhone) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    if (!email || !newName || !newPhone) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    if (!checkPhoneForm(newPhone)) {
      processResult.statusCode = 400;
      processResult.message = "Invalid phone form";
    }

    const rows = await findNameAndPhoneByEmail(email);
    if (rows.length === 0) {
      // 이메일이 존재하지 않는 경우
      processResult.statusCode = 400;
      processResult.message = "Email does not exist";

      return processResult;
    }
    if (rows[0].phone === newPhone && rows[0].name === newName) {
      return processResult;
    } else if (rows[0].phone === newPhone) {
      await updateName(email, newName);
      return processResult;
    }

    // 전화번호 중복 체크
    const phoneRows = await findUserByPhone(newPhone);
    if (phoneRows.length > 0) {
      processResult.statusCode = 400;
      processResult.message = "You are already registered";

      return processResult;
    }
    await updateNameAndPhone(email, newName, newPhone);

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};
