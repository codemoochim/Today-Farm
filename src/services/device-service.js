import {
  getDeviceListUsingEmail,
  getDeviceListUsingDeviceId,
  assignOwnerToDevice,
  detachUserWithDevice,
  updateLedStatus,
  updatePumpStatus,
} from "../repository/device-repository.js";

import { mqttPublisher } from "./mqtt-publish.js";

// 디바이스 조회
export const deviceList = async (email) => {
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
export const deviceNew = async (deviceId, name, email) => {
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
export const deviceNoMoreUse = async (deviceId, email) => {
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
      processResult.statusCode = 400;
      processResult.message = "DeviceId is not available";

      return processResult;
    }

    await detachUserWithDevice(deviceId, checkOwnerFlag, new Date());
    processResult.statusCode = 200;
    processResult.message = "Device deleted";

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

// 생장LED 제어
export const responseLedStatus = async (deviceId, active) => {
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const targetMachine = "led";
    await mqttPublisher(targetMachine, active);

    const result = await updateLedStatus(deviceId, active);
    processResult.message = result;

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

// 모터펌프 제어
export const responsePumpStatus = async (deviceId, active) => {
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const targetMachine = "pump";
    await mqttPublisher(targetMachine, active);

    const result = await updatePumpStatus(deviceId, active);
    processResult.rows = result;

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};
