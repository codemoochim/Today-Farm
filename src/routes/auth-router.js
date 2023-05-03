import express from "express";
import registerCtrl from "../controller/register-control.js";
import loginCtrl from "../controller/login-control.js";
import logoutCtrl from "../controller/logout-control.js";
import findEmailCtrl from "../controller/find-email-control.js";
import findPwdCtrl from "../controller/find-pwd-control.js";
import changePwdCtrl from "../controller/change-pwd-control.js";
import userDeleteCtrl from "../controller/user-delete-control.js";

const router = express.Router();

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/logout", logoutCtrl);
router.post("/email", findEmailCtrl);
router.post("/pwd", findPwdCtrl);
router.put("/pwd", changePwdCtrl);
router.put("/users", userDeleteCtrl);

export default router;
