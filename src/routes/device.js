import express from "express";
const router = express.Router();
import { getDevices, addDevices } from "../controller/devicesCtrl.js";

router.route("/").get(getDevices).post(addDevices);

export default router;
