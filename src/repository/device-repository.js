import instance from "../models/index.js";

export const getDeviceList = async (email) => {
  const sql = "SELECT * from devices WHERE email = ?";
  const [rows] = await instance.promisePool.execute(sql, [email]);
  return rows;
};

export const checkValidDeviceId = async (deviceId) => {
  const sql = `SELECT * from devices WHERE deviceId = ?`;
  const [rows] = await instance.promisePool.execute(sql, [deviceId]);
  return rows;
};

export const assignUserToDevice = async (deviceId, name, email) => {
  const sql = `UPDATE devices SET name=?, email=?, date=? WHERE deviceId=?`;
  const [rows] = await instance.promisePool.execute(sql, [name, email, new Date(), deviceId]);
  return rows;
};
