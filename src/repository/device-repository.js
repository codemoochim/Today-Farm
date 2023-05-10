import mysqlDB from "../config/mysql.js";

// 사용자 디바이스 출력
export const getDeviceListUsingEmail = async (email) => {
  const sql = `SELECT
    *
  FROM
    devices
  WHERE email = ?`;

  const fields = [email];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

// 디바이스의 사용자 할당값 출력
export const getDeviceListUsingDeviceId = async (deviceId) => {
  const sql = `SELECT
    *
  FROM
    devices
  WHERE deviceId = ?`;

  const fields = [deviceId];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

// 디바이스에 사용자 할당
export const assignOwnerToDevice = async (deviceId, name, email, checkOwnerFlag) => {
  const sql = `UPDATE
    devices
  SET
    name = ?,
    email = ?,
    date = ?,
    owner = ?
  WHERE
    deviceId = ?`;

  const fields = [name, email, new Date(), checkOwnerFlag, deviceId];
  await mysqlDB.promisePool.execute(sql, fields);
  return;
};

// 디바이스에 사용자 비할당
export const detachUserWithDevice = async (deviceId, checkOwnerFlag) => {
  const sql = `UPDATE
    devices
  SET
    owner = ?
  WHERE
    deviceId = ?`;

  const fields = [checkOwnerFlag, deviceId];
  await mysqlDB.promisePool.execute(sql, fields);
  return;
};

// 생장 LED 제어상태 변경
export const updateLedStatus = async (deviceId, active) => {
  const sql = `UPDATE
    devices
  SET
    led = ?
  WHERE
    deviceId = ?`;

  const fields = [active, deviceId];
  await mysqlDB.promisePool.execute(sql, fields);
  return;
};

// 생장 LED 제어상태 변경
export const updatePumpStatus = async (deviceId, pump) => {
  const sql = `
  UPDATE
    devices
  SET
    pump = ?
  WHERE
    deviceId = ?`;

  const fields = [pump, deviceId];
  await mysqlDB.promisePool.execute(sql, fields);
  return;
};
