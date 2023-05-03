import instance from "../models/index.js";

export const getDeviceList = async (email) => {
  const sql = "SELECT * from devices WHERE email = ?";
  const [rows] = await instance.promisePool.execute(sql, [email]);
  return rows;
};
