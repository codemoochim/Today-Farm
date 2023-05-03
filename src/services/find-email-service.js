import connection from "../models/index.js";

const findEmail = async (name, phone) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    // 필수 값 누락
    if (!name || !phone) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    // MySql에서 이름과 번호를 가진 사용자 정보 가져오기
    // sql injection에 취약
    const sql = `select email from users where name='${name}' and phone='${phone}'`;
    const [rows, fields] = await connection.query(sql);
    // 일치하는 정보가 없음
    if (result.length === 0) {
      processResult.statusCode = 400;
      processResult.message = "No match information";

      return processResult;
    } else {
      processResult.statusCode = 200;
      processResult.message = `email: '${rows[0].email}'`;

      return processResult;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default findEmail;
