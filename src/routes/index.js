import express from "express";
import registerCtrl from "../controller/registerCtrl";

import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
const router = express.Router();

router.post("/register", registerCtrl);
router.post("/login", loginRouter);
router.get("/logout", logoutRouter);

export default router;
