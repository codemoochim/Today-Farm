import {
  getDeviceListUsingEmail,
  getDeviceListUsingDeviceId,
  assignOwnerToDevice,
  detachUserWithDevice,
} from "../repository/device-repository.js";

// 디바이스 조회
const deviceList = async (email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    const result = await getDeviceListUsingEmail(email);
    processResult.rows = result;
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

// 디바이스 등록
const deviceNew = async (deviceId, name, email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    const checkOwnerFlag = 1;
    const [rows] = await getDeviceListUsingDeviceId(deviceId);

    if (!rows) {
      processResult.statusCode = 400;
      processResult.message = "DeviceId is wrong";
      return processResult;
    }
    if (rows.owner === checkOwnerFlag) {
      // 이미 할당된 디바이스
      processResult.statusCode = 400;
      processResult.message = "DeviceId is not available";
      return processResult;
    }

    await assignOwnerToDevice(deviceId, name, email, checkOwnerFlag);
    processResult.statusCode = 201;
    processResult.message = "Device saved";
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

// 디바이스 삭제
const deviceNoMoreUse = async (deviceId, email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    const checkOwnerFlag = 0;
    const [rows] = await getDeviceListUsingDeviceId(deviceId);
    if (!rows) {
      processResult.statusCode = 400;
      processResult.message = "DeviceId is wrong";
      return processResult;
    }
    if (rows.email !== email) {
      // 이미 할당된 디바이스
      processResult.statusCode = 400;
      processResult.message = "DeviceId is not available";
      return processResult;
    }

    await detachUserWithDevice(deviceId, checkOwnerFlag);
    processResult.statusCode = 200;
    processResult.message = "Device deleted";
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};
export { deviceList, deviceNew, deviceNoMoreUse };
