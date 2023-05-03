import { searchTemperatureAndHumidityData, searchLuxData, searchSolidData } from "../repository/data-repository.js";
import { minutesToMillisecond, searchTimeFlag } from "../utils/setTimeForSearchData.js";

export const getTemperatureAndHumidity = async (deviceId) => {
  const searchTime = searchTimeFlag(minutesToMillisecond());
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const result = await searchTemperatureAndHumidityData(deviceId, searchTime.currentTime, searchTime.pastTime);
    return { ...processResult, result };
  } catch (err) {
    throw new Error(err);
  }
};

export const getLux = async (deviceId) => {
  const searchTime = searchTimeFlag(minutesToMillisecond());
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const result = await searchLuxData(deviceId, searchTime.currentTime, searchTime.pastTime);
    return { ...processResult, result };
  } catch (err) {
    throw new Error(err);
  }
};

export const getSolid = async (deviceId) => {
  const searchTime = searchTimeFlag(minutesToMillisecond());
  const processResult = { statusCode: 200, message: "성공" };
  try {
    const result = await searchSolidData(deviceId, searchTime.currentTime, searchTime.pastTime);
    return { ...processResult, result };
  } catch (err) {
    throw new Error(err);
  }
};
