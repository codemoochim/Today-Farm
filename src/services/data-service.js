import { oneTemperatureAndHumidityData, oneLuxData, oneSolidData } from "../repository/data-repository.js";
import { isWorkingActuator } from "../repository/device-repository.js";
import { convertSolidRawToPercent } from "../utils/convertSolidData.js";

export const getTemperatureAndHumidity = async (deviceId) => {
  const processResult = { statusCode: 200, message: "성공" };
  try {
    if (!deviceId)
      return {
        statusCode: 404,
        message: "조회할 수 있는 디바이스가 없습니다.",
      };

    const searchData = await oneTemperatureAndHumidityData(deviceId);

    if (searchData?.length === 0) {
      processResult.message = "조회할 수 있는 데이터가 없습니다";
      processResult.deviceStatus = deviceStatus;

      return processResult;
    }
    const deviceStatus = await isWorkingActuator(deviceId);

    const message = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, message };
  } catch (err) {
    throw new Error(err);
  }
};

export const getLux = async (deviceId) => {
  const processResult = { statusCode: 200, message: "성공" };
  try {
    if (!deviceId)
      return {
        statusCode: 404,
        message: "조회할 수 있는 디바이스가 없습니다.",
      };

    const searchData = await oneLuxData(deviceId);

    if (searchData?.length === 0) {
      processResult.message = "조회할 수 있는 데이터가 없습니다";
      processResult.deviceStatus = deviceStatus;

      return processResult;
    }
    const deviceStatus = await isWorkingActuator(deviceId);
    const message = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, message };
  } catch (err) {
    throw new Error(err);
  }
};

export const getSolid = async (deviceId) => {
  const processResult = { statusCode: 200, message: "성공" };
  try {
    if (!deviceId)
      return {
        statusCode: 404,
        message: "조회할 수 있는 디바이스가 없습니다.",
      };

    const searchData = await oneSolidData(deviceId);
    if (searchData?.length === 0) {
      processResult.message = "조회할 수 있는 데이터가 없습니다";
      processResult.deviceStatus = deviceStatus;

      return processResult;
    }

    const solidPercentage = convertSolidRawToPercent(searchData[0]?.solid);
    searchData[0].solid = solidPercentage;
    const deviceStatus = await isWorkingActuator(deviceId);

    const message = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, message };
  } catch (err) {
    throw new Error(err);
  }
};
