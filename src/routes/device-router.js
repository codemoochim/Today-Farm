import express from "express";
const router = express.Router();

import { getDevice, addDevice, removeDevice } from "../controller/device-control.js";
import { responseTemperatureAndHumidity, responseLux, responseSolid } from "../controller/data-control.js";

router.route("/").get(getDevice).post(addDevice).put(removeDevice);
router.get("/dht", responseTemperatureAndHumidity);
router.get("/lux", responseLux);
router.get("/solid", responseSolid);

export default router;
