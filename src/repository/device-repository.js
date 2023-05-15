import mysqlDB from "../config/mysql-client.js";

// 사용자 디바이스 출력
export const getDeviceListUsingEmail = async (email) => {
  const sql = `
  SELECT
    deviceId,
    name,
    status
  FROM
    devices
  WHERE
    email = ? AND
    NOT owner = 0
  `;

  const fields = [email];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

// 디바이스의 사용자 할당값 출력
export const getDeviceListUsingDeviceId = async (deviceId) => {
  const sql = `
  SELECT
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
  const sql = `
  UPDATE
    devices
  SET
    name = ?,
    email = ?,
    date = ?,
    owner = ?,
    deleted_at = NULL
  WHERE
    deviceId = ?`;

  const fields = [name, email, new Date(), checkOwnerFlag, deviceId];
  await mysqlDB.promisePool.execute(sql, fields);
  return;
};

// 디바이스에 사용자 비할당
export const detachUserWithDevice = async (deviceId, checkOwnerFlag, date) => {
  const sql = `
  UPDATE
    devices
  SET
    owner = ?,
    deleted_at = ?
  WHERE
    deviceId = ?`;

  const fields = [checkOwnerFlag, date, deviceId];
  await mysqlDB.promisePool.execute(sql, fields);
  return;
};

// 생장 LED 제어상태 변경
export const updateLedStatus = async (deviceId, active) => {
  const sql = `
  UPDATE
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

export const updateDeviceStatus = async (deviceId, status) => {
  const sql = `
  UPDATE
    devices
  SET
    status = ?
  WHERE
    deviceId = ?`;

  const fields = [status, deviceId];
  await mysqlDB.promisePool.execute(sql, fields);
  return;
};

// 디바이스의 액츄에이터 작동유무
export const isWorkingActuator = async (deviceId) => {
  const sql = `
  SELECT
    led,
    pump,
    status
  FROM
    devices
  WHERE deviceId = ?`;

  const fields = [deviceId];
  const [[rows]] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};
