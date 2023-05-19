import { getTemperatureAndHumidity, getLux, getSolid } from "../services/data-service.js";

export const responseTemperatureAndHumidity = async (req, res, next) => {
  try {
    const { deviceId } = req.query;
    const processResult = await getTemperatureAndHumidity(deviceId);
    res.status(processResult.statusCode).json({ data: processResult.message, device: processResult.deviceStatus });

    return;
  } catch (err) {
    next(err);
  }
};

export const responseLux = async (req, res, next) => {
  try {
    const { deviceId } = req.query;
    const processResult = await getLux(deviceId);
    res.status(processResult.statusCode).json({ data: processResult.message, device: processResult.deviceStatus });

    return;
  } catch (err) {
    next(err);
  }
};

export const responseSolid = async (req, res, next) => {
  try {
    const { deviceId } = req.query;
    const processResult = await getSolid(deviceId);
    res.status(processResult.statusCode).json({ data: processResult.message, device: processResult.deviceStatus });

    return;
  } catch (err) {
    next(err);
  }
};
