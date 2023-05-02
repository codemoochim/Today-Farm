import express from "express";
import registerControl from "../controller/register-control.js";
import loginControl from "../controller/login-control.js";
import logoutControl from "../controller/logout-control.js";

const router = express.Router();

router.post("/register", registerControl);
router.post("/login", loginControl);
router.get("/logout", logoutControl);

export default router;
