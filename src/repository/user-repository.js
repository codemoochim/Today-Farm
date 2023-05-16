import mysqlDB from "../config/mysql-client.js";

export const createUserInfoIntoDB = async (email, password, name, phone) => {
  const sql = `
  INSERT INTO
    users
    (email, password, name, phone)
  VALUES
    (?, ?, ?, ?)`;

  const fields = [email, password, name, phone];
  const result = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const findEmailByNameAndPhone = async (name, phone) => {
  const sql = `
  SELECT
    email,
    deleted_at
  FROM
    users
  WHERE
    name = ? AND
    phone = ?`;

  const fields = [name, phone];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const findUserByEmail = async (email) => {
  const sql = `
  SELECT
    *
  FROM
    users
  WHERE
    email = ?`;

  // 탈퇴한 회원 -> deletedAt not null
  // 기존 회원 -> deletedAt null

  const fields = [email];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const findUserByPhone = async (phone) => {
  const sql = `
  SELECT
    *
  FROM
    users
  WHERE
    phone = ?`;

  const fields = [phone];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const findPasswordByEmailAndPhone = async (email, phone) => {
  const sql = `
  SELECT
    password,
    deleted_at
  FROM
    users
  WHERE
    email = ? AND
    phone = ?`;

  const fields = [email, phone];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const updatePasswordQuery = async (email, password) => {
  const sql = `
  UPDATE
    users
  SET
    password = ?
  WHERE
    email = ?`;

  const fields = [password, email];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const findPwdByEmail = async (email) => {
  const sql = `
  SELECT
    password,
    deleted_at
  FROM
    users
  WHERE
    email = ?`;

  const fields = [email];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const updateDeletedDate = async (email, date) => {
  const sql = `
  UPDATE 
    users
  SET
    deleted_at = ?
  WHERE
    email = ?`;

  const fields = [date, email];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const findNameAndPhoneByEmail = async (email) => {
  const sql = `
  SELECT
    name,
    phone,
    email,
    deleted_at
  FROM
    users
  WHERE
    email = ?`;

  const fields = [email];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const updateNameAndPhone = async (email, name, phone) => {
  const sql = `
  UPDATE
    users
  SET
    name = ?,
    phone = ?
  WHERE
    email = ?`;

  const fields = [name, phone, email];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};

export const updateName = async (email, name) => {
  const sql = `
  UPDATE
    users
  SET
    name = ?
  WHERE
    email = ?`;

  const fields = [name, email];
  const [result] = await mysqlDB.promisePool.execute(sql, fields);
  return result;
};
