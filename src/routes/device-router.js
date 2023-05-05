import express from "express";
const router = express.Router();

import { getDevice, addDevice, removeDevice, controlLED, controlMotor } from "../controller/device-control.js";
import { responseTemperatureAndHumidity, responseLux, responseSolid } from "../controller/data-control.js";

// endpoint: /devices
router.route("/").get(getDevice).post(addDevice).put(removeDevice);
router.get("/dht", responseTemperatureAndHumidity);
router.get("/lux", responseLux);
router.get("/solid", responseSolid);

router.post("/lux", controlLED);
router.post("/solid", controlMotor);

export default router;
