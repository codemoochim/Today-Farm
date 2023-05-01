import express from "express";
import registerCtrl from "../controller/registerCtrl.js";
import loginCtrl from "../controller/loginCtrl.js";
import logoutCtrl from "../controller/logoutCtrl.js";
import findEmailCtrl from "../controller/findEmailCtrl.js";
import findPwdCtrl from "../controller/findPwdCtrl.js";

const router = express.Router();

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/logout", logoutCtrl);
router.post("/email", findEmailCtrl);
router.post("/password", findPwdCtrl);

export default router;
