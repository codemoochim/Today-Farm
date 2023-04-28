const express = require("express");
const jwt = require("jsonwebtoken");

const connection = require("../db");

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  //필수 값 누락
  if (!email || !password) {
    return res.status(400).send("Missing required fields");
  }
  try {
    // MySQL에서 사용자 정보 가져오기
    const sql = `select * from users where email = '${email}'`;
    const result = await connection.query(sql);

    if (result.length === 0) {
      // 이메일이 존재하지 않는 경우
      return res.status(400).send("Email does not exist");
    }

    // 비밀번호 검증
    const match = await bcrypt.compare(password, result[0].password);
    if (!match) {
      // 비밀번호가 일치하지 않는 경우
      return res.status(400).send("Password does not exist");
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
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Error");
  }
});
