const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "smart_farm",
});

connection.connect();

// 사용자 등록 API
app.post("/register", (req, res) => {
  const { email, password, phone, name } = req.body;
  // 필수 값 누락
  if (!email || !password || !phone || !name) {
    return res.status(400).send("Missing requiered fields");
  }
  // 최소 길이 불충족
  if (password.length < 6) {
    return res.status(400).send("Password is too short");
  }
  // 중복된 이메일
  const checkEmailQuery = `select * from user where email = '${email}'`;
  connection.query(checkEmailQuery, (err, result) => {
    if (err) {
      return res.status(500).send("Error");
    }
    if (result.length > 0) {
      return res.status(400).send("Email already exists");
    }
  });
  // 비밀번호 hashing
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      // MySQL에 새 사용자 추가
      const sql = `insert into user (email, password) values ('${email}', '${hash}')`;
      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500).send("Error");
        } else {
          res.status(201).send("User created");
        }
      });
    }
  });
});

// 로그인 API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  //필수 값 누락
  if (!email || !password) {
    return res.status(400).send("Missing required fields");
  }
  // MySQL에서 사용자 정보 가져오기
  const sql = `select * from users where email = '${email}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      if (result.length === 0) {
        // 이메일이 존재하지 않는 경우
        res.status(400).send("Email does not exist");
      } else {
        // 비밀번호 검증
        bcrypt.compare(password, result[0].password, (err, match) => {
          if (err) {
            res.status(500).send("Internal Server Error");
          } else if (!match) {
            // 비밀번호가 일치하지 않는 경우
            res.status(400).send("Password does not exist");
          } else {
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
          }
        });
      }
    }
  });
});
