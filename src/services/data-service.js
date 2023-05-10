import { searchTemperatureAndHumidityData, searchLuxData, searchSolidData } from "../repository/data-repository.js";
import { isWorkingActuator } from "../repository/device-repository.js";
import { minutesToMillisecond, searchTimeFlag } from "../utils/time-utils.js";

export const getTemperatureAndHumidity = async (deviceId) => {
  const searchTime = searchTimeFlag(minutesToMillisecond(10));
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const searchData = await searchTemperatureAndHumidityData(deviceId, searchTime.currentTime, searchTime.pastTime);
    const deviceStatus = await isWorkingActuator(deviceId);
    const result = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, result };
  } catch (err) {
    throw new Error(err);
  }
};

export const getLux = async (deviceId) => {
  const searchTime = searchTimeFlag(minutesToMillisecond(10));
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const searchData = await searchLuxData(deviceId, searchTime.currentTime, searchTime.pastTime);
    const deviceStatus = await isWorkingActuator(deviceId);
    const result = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, result };
  } catch (err) {
    throw new Error(err);
  }
};

export const getSolid = async (deviceId) => {
  const searchTime = searchTimeFlag(minutesToMillisecond(10));
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const searchData = await searchSolidData(deviceId, searchTime.currentTime, searchTime.pastTime);
    const deviceStatus = await isWorkingActuator(deviceId);
    const result = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, result };
  } catch (err) {
    throw new Error(err);
  }
};
