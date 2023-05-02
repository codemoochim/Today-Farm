import express from "express";
const router = express.Router();
import { getDevice, addDevice, removeDevice } from "../controller/device-control.js";

router.route("/").get(getDevice).post(addDevice).put(removeDevice);

export default router;
