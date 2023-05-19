import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

import { BadRequest } from "../../errors/index.js";
import { findPwdByEmail, updateDeletedDate } from "../../repository/user-repository.js";
import { updateDeviceOwnerByEmail, getDeviceListUsingEmail } from "../../repository/device-repository.js";
import { initializeDeviceData } from "../../repository/data-repository.js";
import { deleteTokenIntoRedis } from "../../utils/auth/index.js";

const userDeleteService = async (email, password, refreshToken) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!password) {
      throw new BadRequest("Missing required fields");
    }

    const rows = await findPwdByEmail(email);
    if (rows.length === 0 || rows[0]?.deleted_at) {
      throw new BadRequest("Already deleted");
    }

    const matchFlag = await bcrypt.compare(password, rows[0]?.password);

    if (!matchFlag) {
      throw new BadRequest("Current password does not match");
    }

    await updateDeletedDate(email, new Date());
    const deviceList = await getDeviceListUsingEmail(email);
    await updateDeviceOwnerByEmail(email, new Date());
    if (deviceList[0]?.deviceId) {
      deviceList.map(async (device) => {
        const { deviceId } = device;
        await initializeDeviceData(deviceId);
      });
    }
    await deleteTokenIntoRedis(refreshToken);
    processResult.statusCode = 200;
    processResult.message = "User delete complete";

    return processResult;
  } catch (err) {
    throw err;
  }
};

export default userDeleteService;
