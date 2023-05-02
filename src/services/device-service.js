import DB from "../models/index.js";
import { getDeviceList } from "../repository/device-repository.js";

// 디바이스 조회
const deviceList = async (email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    const result = await getDeviceList(email);
    processResult.rows = result;
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

// 디바이스 등록
const deviceNew = async (id, name, email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };

    const [[rows]] = await DB.execute(`SELECT * from devices where id = ?`, [id]);

    if (!rows) {
      processResult.statusCode = 400;
      processResult.message = "DeviceId is wrong";
      return processResult;
    }
    if (rows.email !== null) {
      // 기할당 디바이스 = 사용자 등록
      processResult.statusCode = 400;
      processResult.message = "DeviceId is not available";
      return processResult;
    }
    // 미할당 디바이스 = 사용자 등록
    await DB.execute(`UPDATE devices SET name=?, email=?, date=? WHERE id=?`, [name, email, new Date(), id]);
    processResult.statusCode = 201;
    processResult.message = "Device saved";
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

// 디바이스 삭제
// 정상적인 유저의 요청이 맞는지 유저-디바이스 정보 확인해야함

export { deviceList, deviceNew };
