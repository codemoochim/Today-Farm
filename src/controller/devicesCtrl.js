import { devicesList, devicesNew } from "../services/devicesSrvc.js";

// 디바이스 조회
const getDevices = async (req, res, next) => {
  try {
    // 로그인 정보로 부트 email 값 받아옴.
    // const { email } = req.body;
    const email = "sando@naver.com";
    const processResult = await devicesList(email);
    return res.status(processResult.statusCode).json({ data: processResult.rows });
  } catch (err) {
    next(err);
  }
};

// 디바이스 등록
const addDevices = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const { email } = res.locals;
    const processResult = await devicesNew(id, name, email);
    return res.status(processResult.statusCode).json({ data: processResult.rows });
  } catch (err) {
    next(err);
  }
};

export { getDevices, addDevices };
