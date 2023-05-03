import express from "express";
import { getDevice, addDevice, removeDevice } from "../controller/device-control.js";
const router = express.Router();

router.route("/").get(getDevice).post(addDevice).put(removeDevice);

export default router;
