import { BadRequest } from "../errors/index.js";
import {
  getDeviceListUsingEmail,
  getDeviceListUsingDeviceId,
  assignOwnerToDevice,
  detachUserWithDevice,
  updateLedStatus,
  updatePumpStatus,
  isWorkingActuator,
  updateDeviceStatus,
} from "../repository/device-repository.js";
import { initializeDeviceData, selectRecentData } from "../repository/data-repository.js";

import { mqttPublisher } from "./mqtt/mqtt-publish.js";
import { mqttSubscriber } from "./mqtt/mqtt-subscriber.js";
import { mqttClientInstance } from "../config/mqtt-client.js";

// 디바이스 조회
export const deviceList = async (email) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    const deviceStatusCheckFlag = 20000; // 20초
    const currentTime = Date.now();
    const devices = await getDeviceListUsingEmail(email);
    devices.forEach(async (device) => {
      const [recentData] = await selectRecentData(device.deviceId);
      const timeInterval = currentTime - recentData?.time;
      if (isNaN(timeInterval) || timeInterval > deviceStatusCheckFlag) {
        await updateDeviceStatus(device.deviceId, 0);
      } else {
        await updateDeviceStatus(device.deviceId, 1);
      }
    });

    const renewalDeviceStatus = await getDeviceListUsingEmail(email);

    processResult.rows = renewalDeviceStatus;

    return processResult;
  } catch (err) {
    throw err;
  }
};

// 디바이스 등록
export const deviceNew = async (deviceId, name, email) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    const checkOwnerFlag = 1;
    if (!deviceId || !name || !email) {
      throw new BadRequest("Missing required fields");
    }
    const [rows] = await getDeviceListUsingDeviceId(deviceId);

    if (!rows) {
      throw new BadRequest("DeviceId is wrong");
    }
    if (rows.owner === checkOwnerFlag) {
      throw new BadRequest("DeviceId is not available");
    }

    await assignOwnerToDevice(deviceId, name, email, checkOwnerFlag);
    const assignedDevice = await getDeviceListUsingDeviceId(deviceId);

    processResult.statusCode = 201;
    processResult.message = {
      deviceId: assignedDevice[0].deviceId,
      name: assignedDevice[0].name,
    };

    return processResult;
  } catch (err) {
    throw err;
  }
};

// 디바이스 삭제
export const deviceNoMoreUse = async (deviceId, email) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    const checkOwnerFlag = 0;
    const [rows] = await getDeviceListUsingDeviceId(deviceId);
    if (!rows) {
      throw new BadRequest("DeviceId is wrong");
    }
    if (rows.email !== email) {
      throw new BadRequest("DeviceId is not available");
    }

    await detachUserWithDevice(deviceId, checkOwnerFlag, new Date());
    await initializeDeviceData(deviceId);

    processResult.statusCode = 200;
    processResult.message = {
      deviceId: rows.deviceId,
      name: rows.name,
    };

    return processResult;
  } catch (err) {
    throw err;
  }
};

// 생장LED 제어
export const responseLedStatus = async (deviceId, active) => {
  try {
    const targetMachine = "led";
    await mqttPublisher(targetMachine, active);

    return;
  } catch (err) {
    throw err;
  }
};

// 모터펌프 제어
export const responsePumpStatus = async (deviceId, active) => {
  try {
    const targetMachine = "pump";
    await mqttPublisher(targetMachine, active);

    return;
  } catch (err) {
    throw err;
  }
};
