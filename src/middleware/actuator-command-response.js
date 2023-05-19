import { mqttClientInstance } from "../config/mqtt-client.js";
import {
  updateLedStatus,
  updatePumpStatus,
  updateDeviceStatus,
  isWorkingActuator,
} from "../repository/device-repository.js";

export const standByResponseFromDevice = async (req, res, next) => {
  try {
    mqttClientInstance.setMessageCallback(async (topic, message) => {
      const TOPIC_TYPE_INDEX = 0;
      const topicType = topic?.split("/")[TOPIC_TYPE_INDEX];
      if (topicType === "actuator") {
        res.locals.messageJson = JSON.parse(message);
        next();
        return;
      }
    });
  } catch (err) {
    next(err);
  }
};

export const responseCurrentActuatorStatus = async (req, res, next) => {
  try {
    const { messageJson } = res.locals;
    const [device, commandResult] = Object.entries(messageJson);

    if (commandResult[0] === "led") {
      await updateLedStatus(device[1], commandResult[1]);
      await updateDeviceStatus(device[1], 1);
      const { led, pump, status } = await isWorkingActuator(device[1]);
      res.status(200).json({ led });

      return;
    } else if (commandResult[0] === "pump") {
      await updatePumpStatus(device[1], commandResult[1]);
      await updateDeviceStatus(device[1], 1);
      const { led, pump, status } = await isWorkingActuator(device[1]);
      res.status(200).json({ pump });

      return;
    }
  } catch (err) {
    next(err);
  }
};
