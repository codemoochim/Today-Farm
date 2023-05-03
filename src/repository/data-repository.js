import instance from "../models/index.js";

// export default {
export const putSensorDataToDB = async ({ deviceId, temperature, humidity, lux, solid, time }) => {
  const sql = "INSERT INTO datas (deviceId, temperature, humidity, lux, solid, time) VALUES (?,?,?,?,?,?)";
  const [rows] = await instance.promisePool.execute(sql, [deviceId, temperature, humidity, lux, solid, time]);
  return rows;
};
