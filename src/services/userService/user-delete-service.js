import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { findPwdByEmail, updateDeletedDate } from "../../repository/user-repository.js";
import { updateDeviceOwnerByEmail, getDeviceListUsingEmail } from "../../repository/device-repository.js";
import { initializeDeviceData } from "../../repository/data-repository.js";
import { deleteTokenIntoRedis } from "../../utils/token/manage-token-with-redis.js";

const userDeleteService = async (email, password, refreshToken) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };

    if (!password) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }

    const rows = await findPwdByEmail(email);
    if (rows.length === 0 || rows[0]?.deleted_at) {
      processResult.statusCode = 400;
      processResult.message = "Already deleted";

      return processResult;
    }

    const matchFlag = await bcrypt.compare(password, rows[0].password);

    if (!matchFlag) {
      processResult.statusCode = 400;
      processResult.message = "Current password does not match";

      return processResult;
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
    throw new Error(err);
  }
};

export default userDeleteService;
