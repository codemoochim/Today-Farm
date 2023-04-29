import { devicesList, devicesNew } from "../services/devicesSrvc.js";

// 디바이스 조회
const getDevices = async (req, res, next) => {
  try {
    // 로그인 토큰 페이로드 req.user
    const processResult = await devicesList(req.user);
    return res.status(processResult.statusCode).json({ data: processResult.rows });
  } catch (err) {
    next(err);
  }
};

// 디바이스 등록
const addDevices = async (req, res, next) => {
  try {
    // 로그인 정보로 토큰 페이로드 req.user
    const { id, name } = req.body;
    const processResult = await devicesNew(id, name, req.user);
    return res.status(processResult.statusCode).json({ data: processResult.message });
  } catch (err) {
    next(err);
  }
};

export { getDevices, addDevices };
