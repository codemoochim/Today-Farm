// import mysqlDB from "../models/index.js";
import mysqlDB from "../config/mysql-client.js";

export const searchTemperatureAndHumidityData = async (deviceId, currentTime, pastTime) => {
  const sql = `SELECT
    deviceId, 
    temperature, 
    humidity, 
    DATE_FORMAT(CONVERT_TZ(time, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS time 
  FROM
    data 
  WHERE
    deviceId = ? AND 
    time BETWEEN ? AND
    ?`;

  const fields = [deviceId, pastTime, currentTime];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const searchLuxData = async (deviceId, currentTime, pastTime) => {
  const sql = `SELECT 
    deviceId, 
    lux, 
    DATE_FORMAT(CONVERT_TZ(time, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS time 
  FROM 
    data 
  WHERE 
    deviceId = ? AND
    time BETWEEN ? AND
    ?`;

  const fields = [deviceId, pastTime, currentTime];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

export const searchSolidData = async (deviceId, currentTime, pastTime) => {
  const sql = `SELECT
    deviceId,
    solid,
    DATE_FORMAT(CONVERT_TZ(time, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS time
  FROM
    data
  WHERE
    deviceId = ? AND
    time BETWEEN ? AND
    ?`;

  const fields = [deviceId, pastTime, currentTime];
  const [rows] = await mysqlDB.promisePool.execute(sql, fields);
  return rows;
};

// 테스트로 데이터 집어넣을 떄 사용함
export const putSensorDataToDB = async ({ deviceId, temperature, humidity, lux, solid }) => {
  const sql = `INSERT INTO
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
