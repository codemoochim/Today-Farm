import { BadRequest } from "../../errors/index.js";
import {
  findNameAndPhoneByEmail,
  findUserByPhone,
  updateNameAndPhone,
  updateName,
} from "../../repository/user-repository.js";
import { checkPhoneForm } from "../../utils/form-check.js";

export const userEditService = async (email, newName, newPhone) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    if (!email || !newName || !newPhone) {
      throw new BadRequest("Missing required fields");
    }
    if (!checkPhoneForm(newPhone)) {
      throw new BadRequest("Invalid phone form");
    }

    const rows = await findNameAndPhoneByEmail(email);
    if (rows.length === 0 || rows[0]?.deleted_at) {
      throw new BadRequest("Email does not exist");
    }
    // 폰, 이름같은경우 재 저장
    if (rows[0]?.phone === newPhone && rows[0]?.name === newName) {
      return processResult;
      // 폰이 같을경우. 이름만 변경
    } else if (rows[0].phone === newPhone) {
      await updateName(email, newName);
      return processResult;
    } else {
      // 이름이 같은경우 폰만 변경
      const phoneRows = await findUserByPhone(newPhone);
      if (phoneRows.length > 0) {
        throw new BadRequest("You are already registered");
      }
      await updateNameAndPhone(email, newName, newPhone);

      return processResult;
    }
  } catch (err) {
    throw err;
  }
};
