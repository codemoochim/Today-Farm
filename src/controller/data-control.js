import { getTemperatureAndHumidity, getLux, getSolid } from "../services/data-service.js";

export const responseTemperatureAndHumidity = async (req, res) => {
  const { deviceId } = req.query;
  const processResult = await getTemperatureAndHumidity(deviceId);
  res.status(processResult.statusCode).json({ data: processResult.result });
};
export const responseLux = async (req, res) => {
  const { deviceId } = req.query;
  const processResult = await getLux(deviceId);
  res.status(processResult.statusCode).json({ data: processResult.result });
};
export const responseSolid = async (req, res) => {
  const { deviceId } = req.query;
  const processResult = await getSolid(deviceId);
  res.status(processResult.statusCode).json({ data: processResult.result });
};
