import {
  getDeviceListUsingEmail,
  getDeviceListUsingDeviceId,
  assignOwnerToDevice,
  detachUserWithDevice,
  updateLedStatus,
  updatePumpStatus,
  isWorkingActuator,
} from "../repository/device-repository.js";
import { initializeDeviceData } from "../repository/data-repository.js";

import { mqttPublisher } from "./mqtt/mqtt-publish.js";

// 디바이스 조회
export const deviceList = async (email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    const result = await getDeviceListUsingEmail(email);
    // 디바이스를 조회할 때, 디바이스 ID 에 대한 데이터를 조회해서 그 데이터의 최근 값이 20초 이내 있으면
    // 디바이스가 켜져있는거고 아니면 디바이스가 꺼져있는거임.
    // 사용자의 디바이스가 여러개일 때 이메일로 디바이스 아이디 다 가져온다음에,
    // 그 디바이스 아이디로 각각 데이터를 조회한다음에,
    // 데이터의 시간값을 요청시간과 확인하여
    // 디바이스 상태값을 업데이트하고 응답해준다.

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
    if (!deviceId || !name || !email) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
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
    await initializeDeviceData(deviceId);

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
    if (!result.changedRows) {
      processResult.statusCode = 400;
      processResult.message = "Actuator control failed";

      return processResult;
    }

    const { led, pump, status } = await isWorkingActuator(deviceId);
    processResult.message = { led };

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
    if (!result.changedRows) {
      processResult.statusCode = 400;
      processResult.message = "Actuator control failed";

      return processResult;
    }

    const { led, pump, status } = await isWorkingActuator(deviceId);
    processResult.message = { pump };

    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};
