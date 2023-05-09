import mysqlDB from "../config/mysql.js";

export const createUserInfoIntoDB = async (email, password, name, phone) => {
  const sql = `INSERT INTO users (email, password, name, phone) VALUES (?,?,?,?)`;
  await mysqlDB.promisePool.execute(sql, [email, password, name, phone]);
  return;
};

export const findEmailByNameAndPhone = async (name, phone) => {
  const sql = `SELECT email FROM users WHERE name=? AND phone=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [name, phone]);
  return result;
};

export const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [email]);
  return result;
};
// [[{}, {}, {}]]
export const findUserByPhone = async (phone) => {
  const sql = `SELECT * FROM users WHERE phone=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [phone]);
  return result;
};

export const findPasswordByEmailAndPhone = async (email, phone) => {
  const sql = `SELECT password FROM users WHERE email=? AND phone=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [email, phone]);
  return result;
};

export const updatePasswordQuery = async (email, password) => {
  const sql = `UPDATE users SET password=? WHERE email=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [password, email]);
  return result;
};

export const findPwdByEmail = async (email) => {
  const sql = `SELECT password FROM users WHERE email=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [email]);
  return result;
};

export const updateDeletedDate = async (email, date) => {
  const sql = `UPDATE users SET deleted_at=? WHERE email=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [date, email]);
  return result;
};

export const findNameAndPhoneByEmail = async (email) => {
  const sql = `SELECT name, phone, email FROM users WHERE email=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [email]);
  return result;
};

export const updateNameAndPhone = async (email, name, phone) => {
  const sql = `UPDATE users SET name=?, phone=? WHERE email=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [name, phone, email]);
  return result;
};

export const updateName = async (email, name) => {
  const sql = `UPDATE users SET name=? WHERE email=?`;
  const [result] = await mysqlDB.promisePool.execute(sql, [name, email]);
  return result;
};
