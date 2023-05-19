import { NotFound } from "../errors/index.js";
import { oneTemperatureAndHumidityData, oneLuxData, oneSolidData } from "../repository/data-repository.js";
import { isWorkingActuator } from "../repository/device-repository.js";
import { convertSolidRawToPercent } from "../utils/convertSolidData.js";

export const getTemperatureAndHumidity = async (deviceId) => {
  const processResult = { statusCode: 200, message: "Success" };
  try {
    if (!deviceId) {
      throw new NotFound("No devices available");
    }

    const searchData = await oneTemperatureAndHumidityData(deviceId);
    const deviceStatus = await isWorkingActuator(deviceId);

    if (searchData?.length === 0) {
      processResult.message = "No data available";
      processResult.deviceStatus = deviceStatus;

      return processResult;
    }

    const message = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, message };
  } catch (err) {
    throw err;
  }
};

export const getLux = async (deviceId) => {
  const processResult = { statusCode: 200, message: "Success" };
  try {
    if (!deviceId) {
      throw new NotFound("No devices available");
    }

    const searchData = await oneLuxData(deviceId);
    const deviceStatus = await isWorkingActuator(deviceId);

    if (searchData?.length === 0) {
      processResult.message = "No data available";
      processResult.deviceStatus = deviceStatus;

      return processResult;
    }
    const message = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, message };
  } catch (err) {
    throw err;
  }
};

export const getSolid = async (deviceId) => {
  const processResult = { statusCode: 200, message: "Success" };
  try {
    if (!deviceId) {
      throw new NotFound("No devices available");
    }

    const searchData = await oneSolidData(deviceId);
    const deviceStatus = await isWorkingActuator(deviceId);
    if (searchData?.length === 0) {
      processResult.message = "No data available";
      processResult.deviceStatus = deviceStatus;

      return processResult;
    }

    const solidPercentage = convertSolidRawToPercent(searchData[0]?.solid);
    searchData[0].solid = solidPercentage;

    const message = {
      searchData,
      deviceStatus,
    };

    return { ...processResult, message };
  } catch (err) {
    throw err;
  }
};
