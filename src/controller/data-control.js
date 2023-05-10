import { getTemperatureAndHumidity, getLux, getSolid } from "../services/data-service.js";

export const responseTemperatureAndHumidity = async (req, res) => {
  const { deviceId } = req.query;
  const processResult = await getTemperatureAndHumidity(deviceId);

  return res.status(processResult.statusCode).json({ data: processResult.result });
};

export const responseLux = async (req, res) => {
  const { deviceId } = req.query;
  const processResult = await getLux(deviceId);

  return res.status(processResult.statusCode).json({ data: processResult.result });
};

export const responseSolid = async (req, res) => {
  const { deviceId } = req.query;
  const processResult = await getSolid(deviceId);

  return res.status(processResult.statusCode).json({ data: processResult.result });
};

// BUG: 현재 로그인 한 사용자가 타인이 등록한 디바이스의 데이터에 접근할 수 있음
// req.user 와 요청된 deviceId 의 email과 동일한지 확인해야함
