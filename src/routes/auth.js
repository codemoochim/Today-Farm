import express from "express";
import registerCtrl from "../controller/registerCtrl.js";
import loginCtrl from "../controller/loginCtrl.js";
import logoutCtrl from "../controller/logoutCtrl.js";

const router = express.Router();

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/logout", logoutCtrl);

export default router;
