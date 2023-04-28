const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const connection = require("../db");

router.post("/", async (req, res) => {
  const { email, password, phone, name } = req.body;

  try {
    // 필수 값 누락
    if (!email || !password || !phone || !name) {
      return res.status(400).send("Missing required fields");
    }

    // 최소 길이 불충족
    if (password.length < 6) {
      return res.status(400).send("Password is too short");
    }

    // 중복된 이메일 확인
    const checkEmailQuery = `SELECT * FROM user WHERE email = '${email}'`;
    const result = await connection.query(checkEmailQuery);

    if (result.length > 0) {
      return res.status(400).send("Email already exists");
    }

    // 비밀번호 hashing
    const hash = await bcrypt.hash(password, 10);

    // MySQL에 새 사용자 추가
    const insertUserQuery = `INSERT INTO user (email, password) VALUES ('${email}', '${hash}')`;
    await connection.query(insertUserQuery);

    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = router;
