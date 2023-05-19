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
    res.status(processResult.statusCode).json({ data: processResult.rows });

    return;
  } catch (err) {
    next(err);
  }
};

// 디바이스 등록
export const addDevice = async (req, res, next) => {
  try {
    const email = req.user;
    const { deviceId, name } = req.body;
    const processResult = await deviceNew(deviceId, name, email);
    res.status(processResult.statusCode).json({ data: processResult.message });

    return;
  } catch (err) {
    next(err);
  }
};

//  디바이스 삭제
export const removeDevice = async (req, res, next) => {
  try {
    const email = req.user;
    const { deviceId } = req.body;
    // HACK 웹사이트 시연 용도 공개 디바이스 삭제 불가
    if (parseInt(deviceId) === 1) {
      res.status(400).send("삭제할 수 없죠");
      return;
    }
    const processResult = await deviceNoMoreUse(deviceId, email);
    res.status(processResult.statusCode).json({ data: processResult.message });

    return;
  } catch (err) {
    next(err);
  }
};

// 생장LED 제어
export const publishLedControl = async (req, res, next) => {
  try {
    const { deviceId, active } = req.query;
    await responseLedStatus(deviceId, active);
    next();

    return;
  } catch (err) {
    next(err);
  }
};

// 모터펌프 제어
export const publishPumpControl = async (req, res, next) => {
  try {
    const { deviceId, active } = req.query;
    await responsePumpStatus(deviceId, active);
    next();

    return;
  } catch (err) {
    next(err);
  }
};
