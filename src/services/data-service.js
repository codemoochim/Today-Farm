import { searchTemperatureAndHumidityData, searchLuxData, searchSolidData } from "../repository/data-repository.js";
import { isWorkingActuator } from "../repository/device-repository.js";
import { minutesToMillisecond, searchTimeFlag } from "../utils/time-utils.js";

export const getTemperatureAndHumidity = async (deviceId) => {
  const searchTime = searchTimeFlag(minutesToMillisecond(10));
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const searchData = await searchTemperatureAndHumidityData(deviceId, searchTime.currentTime, searchTime.pastTime);
    const deviceStatus = await isWorkingActuator(deviceId);

    if (searchData.length === 0) {
      processResult.message = "조회할 수 있는 데이터가 없습니다";

      return processResult;
    }

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
  const searchTime = searchTimeFlag(minutesToMillisecond(10));
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const searchData = await searchLuxData(deviceId, searchTime.currentTime, searchTime.pastTime);
    const deviceStatus = await isWorkingActuator(deviceId);

    if (searchData.length === 0) {
      processResult.message = "조회할 수 있는 데이터가 없습니다";

      return processResult;
    }
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
  const searchTime = searchTimeFlag(minutesToMillisecond(10));
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const searchData = await searchSolidData(deviceId, searchTime.currentTime, searchTime.pastTime);
    const deviceStatus = await isWorkingActuator(deviceId);

    if (searchData.length === 0) {
      processResult.message = "조회할 수 있는 데이터가 없습니다";

      return processResult;
    }

    const message = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, message };
  } catch (err) {
    throw new Error(err);
  }
};
