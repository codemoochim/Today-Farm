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
router.route("/pwd").post(findPwdControl).put(validateUser, changePwdControl);

router
  .route("/users")
  .get(validateUser, userInfoControl)
  .patch(validateUser, userEditControl)
  .put(validateUser, userDeleteControl);

router.post("/silent-refresh", issuingAccessToken, (req, res) => {
  res.json({ accessToken: res.locals.token });
});

export default router;
