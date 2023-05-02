import instance from "../models/index.js";

// export default {
export const getDeviceList = async (email) => {
  const sql = "SELECT * from devices where email = ?";
  const [rows] = await instance.promisePool.execute(sql, [email]);
  return rows;
};
