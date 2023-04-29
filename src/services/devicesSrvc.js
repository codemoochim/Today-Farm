import DB from "../models/index.js";

// 디바이스 조회
const devicesList = async (email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    if (!email) {
    }
    const [rows] = await DB.execute("SELECT * from devices where email = ?", [email]);
    processResult.rows = rows;
    console.log(processResult.rows);
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

// 디바이스 등록
const devicesNew = async (id, name, email) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };

    const [rows] = await DB.execute(`SELECT * from devices where id = ?`, [id]);

    // 미할당 디바이스 = 사용자 등록
    if (rows.email === null) {
      rows.name = name;
      rows.email = email;
    } else {
      processResult.statusCode = 403;
    }

    processResult.rows;
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export { devicesList, devicesNew };
