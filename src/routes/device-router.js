import express from "express";
const router = express.Router();

import {
  getDevice,
  addDevice,
  removeDevice,
  publishLedControl,
  publishPumpControl,
} from "../controller/device-control.js";
import { responseTemperatureAndHumidity, responseLux, responseSolid } from "../controller/data-control.js";
import { standByResponseFromDevice, responseCurrentActuatorStatus } from "../middleware/actuator-command-response.js";

// Path: /devices

router.route("/").get(getDevice).post(addDevice).put(removeDevice);

router.get("/dht", responseTemperatureAndHumidity);
router.get("/lux", responseLux);
router.get("/solid", responseSolid);

router.post("/lux", publishLedControl, standByResponseFromDevice, responseCurrentActuatorStatus);
router.post("/solid", publishPumpControl, standByResponseFromDevice, responseCurrentActuatorStatus);

export default router;
