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

      return processResult;
    }

    const rows = await findNameAndPhoneByEmail(email);
    if (rows.length === 0 || rows[0]?.deleted_at) {
      processResult.statusCode = 400;
      processResult.message = "Email does not exist";

      return processResult;
    }
    // 폰, 이름같은경우 재 저장
    if (rows[0].phone === newPhone && rows[0].name === newName) {
      return processResult;
      // 폰이 같을경우. 이름만 변경
    } else if (rows[0].phone === newPhone) {
      await updateName(email, newName);
      return processResult;
    } else {
      // 이름이 같은경우 폰만 변경
      const phoneRows = await findUserByPhone(newPhone);
      if (phoneRows.length > 0) {
        processResult.statusCode = 400;
        processResult.message = "You are already registered";

        return processResult;
      }
      await updateNameAndPhone(email, newName, newPhone);

      return processResult;
    }
  } catch (err) {
    throw new Error(err);
  }
};
