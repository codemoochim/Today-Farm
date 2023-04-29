import connection from "../models/db.js";

const login = async (email, password) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    // 필수 값 누락
    if (!email || !password) {
      processResult.statusCode = 400;
      processResult.message = "Missing required fields";

      return processResult;
    }
    // MySQL에서 사용자 정보 가져오기
    const sql = `select * from users where email = '${email}'`;
    const result = await connection.query(sql);

    if (result.length === 0) {
      // 이메일이 존재하지 않는 경우
      processResult.statusCode = 400;
      processResult.message = "Email does not exist";

      return processResult;
    }

    // 비밀번호 검증
    const match = await bcrypt.compare(password, result[0].password);
    if (!match) {
      // 비밀번호가 일치하지 않는 경우
      processResult.statusCode = 400;
      processResult.message = "Password is not correct";

      return processResult;
    }

    // JWT 발급
    const token = jwt.sign(
      {
        email: result[0].email,
        userId: result[0].id,
      },
      "secret",
      { expiresIn: "1h" },
    );
    processResult.status = 200;
    return { ...processResult, token };
  } catch (err) {
    throw new Error(err);
  }
};

export default login;
