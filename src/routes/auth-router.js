import express from "express";
const router = express.Router();

import {
  changePwdControl,
  findEmailControl,
  findPwdControl,
  loginControl,
  logoutControl,
  registerControl,
  userInfoControl,
  userEditControl,
  userDeleteControl,
} from "../controller/userController/index.js";
import { validateUser } from "../middleware/auth-check.js";
import { issuingAccessToken } from "../middleware/silent-refresh.js";

// Path: /

router.get("/", (req, res) => {
  res.send("Hello Universe!");
});
router.post("/register", registerControl);
router.post("/login", loginControl);
router.get("/logout", logoutControl);

router.post("/email", findEmailControl);
router.post("/pwd", findPwdControl);
router.put("/pwd", validateUser, changePwdControl);

router.get("/users", validateUser, userInfoControl);

router.patch("/users", validateUser, userEditControl);
router.put("/users", validateUser, userDeleteControl);

router.post("/silent-refresh", issuingAccessToken, (req, res) => {
  res.json({ accessToken: res.locals.token });
});
export default router;

// 삭제 되었으면 더이상 회원의 기능을 할 수 없도록 만들어야함
// 로그인, 로그아웃, 이메일찾기, 비밀번호찾기변경조회수정탈퇴조회 ~
