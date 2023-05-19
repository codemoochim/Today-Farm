import mysqlDB from "../config/mysql-client.js";

export const searchTemperatureAndHumidityData = async (deviceId, currentTime, pastTime) => {
  const sql = `
  SELECT
    deviceId,
    temperature,
    humidity,
    DATE_FORMAT(CONVERT_TZ(time, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS time
  FROM
    data
  WHERE
    deviceId = ? AND time
  BETWEEN ? AND ?`;

  const fields = [deviceId, pastTime, currentTime];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const searchLuxData = async (deviceId, currentTime, pastTime) => {
  const sql = `
  SELECT 
    deviceId, 
    lux, 
    DATE_FORMAT(CONVERT_TZ(time, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS time 
  FROM 
    data 
  WHERE 
    deviceId = ? AND time 
  BETWEEN ? AND ?`;

  const fields = [deviceId, pastTime, currentTime];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const searchSolidData = async (deviceId, currentTime, pastTime) => {
  const sql = `
  SELECT
    deviceId,
    solid,
    DATE_FORMAT(CONVERT_TZ(time, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS time
  FROM
    data
  WHERE
    deviceId = ? AND time
  BETWEEN ? AND ?`;

  const fields = [deviceId, pastTime, currentTime];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const putSensorDataToDB = async (deviceId, temperature, humidity, lux, solid) => {
  const sql = `
  INSERT INTO
    data
    (
      deviceId,
      temperature,
      humidity,
      lux,
      solid
    )
  VALUES
    (?, ?, ?, ?, ?)`;

  const fields = [deviceId, temperature, humidity, lux, solid];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const oneTemperatureAndHumidityData = async (deviceId) => {
  const sql = `
  SELECT
    deviceId, 
    temperature, 
    humidity
  FROM
    data 
  WHERE
    deviceId = ?
  ORDER BY
    time DESC
  LIMIT 1`;

  const fields = [deviceId];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const oneLuxData = async (deviceId) => {
  const sql = `
  SELECT
    deviceId, 
    lux
  FROM
    data
  WHERE
    deviceId = ?
  ORDER BY
    time DESC
  LIMIT 1`;

  const fields = [deviceId];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const oneSolidData = async (deviceId) => {
  const sql = `
  SELECT
    deviceId, 
    solid
  FROM
    data 
  WHERE
    deviceId = ?
  ORDER BY
    time DESC
  LIMIT 1`;

  const fields = [deviceId];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const initializeDeviceData = async (deviceId) => {
  const sql = `
  DELETE FROM
    data 
  WHERE
    deviceId = ?`;

  const fields = [deviceId];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const selectRecentData = async (deviceId) => {
  const sql = `
  SELECT
    deviceId,
    time
  FROM
    data
  WHERE
    deviceId = ?
  ORDER BY
    time
  DESC
  LIMIT 1`;

  const fields = [deviceId];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};
