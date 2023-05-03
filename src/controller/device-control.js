import { deviceList, deviceNew, deviceNoMoreUse } from "../services/device-service.js";

// 디바이스 조회
const getDevice = async (req, res, next) => {
  try {
    // 로그인 토큰 페이로드 req.user
    // const email = req.user;
    const { email } = req.body;
    const processResult = await deviceList(email);
    res.status(processResult.statusCode).json({ data: processResult.rows });
  } catch (err) {
    next(err);
  }
};

// 디바이스 등록
const addDevice = async (req, res, next) => {
  try {
    const { deviceId, name } = req.body;
    // 로그인 정보로 토큰 페이로드 req.user
    const email = req.user;
    const processResult = await deviceNew(deviceId, name, email);
    res.status(processResult.statusCode).json({ data: processResult.message });
  } catch (err) {
    next(err);
  }
};

const removeDevice = async (req, res, next) => {
  try {
    const { deviceId } = req.body;
    // 로그인 정보로 토큰 페이로드 req.user
    const email = req.user;
    const processResult = await deviceNoMoreUse(deviceId, email);
    res.status(processResult.statusCode).json({ data: processResult.message });
  } catch (err) {
    next(err);
  }
};

export { getDevice, addDevice, removeDevice };
