import express from "express";
const router = express.Router();

import { getDevice, addDevice, removeDevice, controlLED, controlPump } from "../controller/device-control.js";
import { responseTemperatureAndHumidity, responseLux, responseSolid } from "../controller/data-control.js";

// Path: /devices

router.route("/").get(getDevice).post(addDevice).put(removeDevice);

router.get("/dht", responseTemperatureAndHumidity);
router.get("/lux", responseLux);
router.get("/solid", responseSolid);

router.post("/lux", controlLED);
router.post("/solid", controlPump);

export default router;
