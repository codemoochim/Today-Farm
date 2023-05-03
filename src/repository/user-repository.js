import instance from "../models/index.js";

export const createUserInfoIntoDB = async (email, password, name, phone) => {
  const sql = `INSERT INTO users (email, password, name, phone) VALUES ('${email}', '${password}', '${name}', '${phone}')`;
  await instance.promisePool.execute(sql, [email, password, name, phone]);
  return;
};
