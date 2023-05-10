import {
  deviceList,
  deviceNew,
  deviceNoMoreUse,
  responseLedStatus,
  responsePumpStatus,
} from "../services/device-service.js";

// 디바이스 조회
export const getDevice = async (req, res, next) => {
  try {
    const email = req.user;
    const processResult = await deviceList(email);

    return res.status(processResult.statusCode).json({ data: processResult.rows });
  } catch (err) {
    next(err);
  }
};

// 디바이스 등록
export const addDevice = async (req, res, next) => {
  try {
    const { deviceId, name } = req.body;
    const email = req.user;
    const processResult = await deviceNew(deviceId, name, email);

    return res.status(processResult.statusCode).json({ data: processResult.message });
  } catch (err) {
    next(err);
  }
};

//  디바이스 삭제
export const removeDevice = async (req, res, next) => {
  try {
    const { deviceId } = req.body;
    const email = req.user;
    const processResult = await deviceNoMoreUse(deviceId, email);

    return res.status(processResult.statusCode).json({ data: processResult.message });
  } catch (err) {
    next(err);
  }
};

// 생장LED 제어
export const controlLED = async (req, res, next) => {
  try {
    const { deviceId, active } = req.query;
    const processResult = await responseLedStatus(deviceId, active);

    return res.status(processResult.statusCode).json({ data: processResult.message });
  } catch (err) {
    next(err);
  }
};

// 모터펌프 제어
export const controlPump = async (req, res, next) => {
  try {
    const { deviceId, active } = req.query;
    const processResult = await responsePumpStatus(deviceId, active);

    return res.status(processResult.statusCode).json({ data: processResult.message });
  } catch (err) {
    next(err);
  }
};
