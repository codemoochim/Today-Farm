import instance from "../models/index.js";

// 사용자 디바이스 출력
export const getDeviceListUsingEmail = async (email) => {
  const sql = "SELECT * from devices WHERE email = ?";
  const [rows] = await instance.promisePool.execute(sql, [email]);
  return rows;
};

// 디바이스의 사용자 할당값 출력
export const getDeviceListUsingDeviceId = async (deviceId) => {
  const sql = `SELECT * from devices WHERE deviceId = ?`;
  const [rows] = await instance.promisePool.execute(sql, [deviceId]);
  return rows;
};

// 디바이스에 사용자 할당
export const assignOwnerToDevice = async (deviceId, name, email, checkOwnerFlag) => {
  const sql = `UPDATE devices SET name=?, email=?, date=?, owner=? WHERE deviceId=?`;
  await instance.promisePool.execute(sql, [name, email, new Date(), checkOwnerFlag, deviceId]);
  return;
};

// 디바이스에 사용자 비할당
export const detachUserWithDevice = async (deviceId, checkOwnerFlag) => {
  const sql = `UPDATE devices SET owner=? WHERE deviceId=?`;
  await instance.promisePool.execute(sql, [checkOwnerFlag, deviceId]);
  return;
};
