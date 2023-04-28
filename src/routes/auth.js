import express from "express";
import registerCtrl from "../controller/registerCtrl";
import loginCtrl from "../controller/loginCtrl";
import logoutCtrl from "../controller/logoutCtrl";

const router = express.Router();

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/logout", logoutCtrl);

export default router;
