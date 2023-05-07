import mysqlDB from "../config/mysql.js";

// 사용자 디바이스 출력
export const getDeviceListUsingEmail = async (email) => {
  const sql = "SELECT * from devices WHERE email = ?";
  const [rows] = await mysqlDB.promisePool.execute(sql, [email]);
  return rows;
};

// 디바이스의 사용자 할당값 출력
export const getDeviceListUsingDeviceId = async (deviceId) => {
  const sql = `SELECT * from devices WHERE deviceId = ?`;
  const [rows] = await mysqlDB.promisePool.execute(sql, [deviceId]);
  return rows;
};

// 디바이스에 사용자 할당
export const assignOwnerToDevice = async (deviceId, name, email, checkOwnerFlag) => {
  const sql = `UPDATE devices SET name=?, email=?, date=?, owner=? WHERE deviceId=?`;
  await mysqlDB.promisePool.execute(sql, [name, email, new Date(), checkOwnerFlag, deviceId]);
  return;
};

// 디바이스에 사용자 비할당
export const detachUserWithDevice = async (deviceId, checkOwnerFlag) => {
  const sql = `UPDATE devices SET owner=? WHERE deviceId=?`;
  await mysqlDB.promisePool.execute(sql, [checkOwnerFlag, deviceId]);
  return;
};

// 생장 LED 제어상태 변경
export const updateLedStatus = async (deviceId, led) => {
  const sql = `UPDATE devices SET led=? WHERE deviceId=?`;
  await mysqlDB.promisePool.execute(sql, [led, deviceId]);
  return;
};

// 생장 LED 제어상태 변경
export const updateMotorStatus = async (deviceId, motor) => {
  const sql = `UPDATE devices SET motor=? WHERE deviceId=?`;
  await mysqlDB.promisePool.execute(sql, [motor, deviceId]);
  return;
};
