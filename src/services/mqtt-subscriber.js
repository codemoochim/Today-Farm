import { mqttClientInstance } from "../config/mqtt-client.js";
import { putSensorDataToDB } from "../repository/data-repository.js";
import {
  isWorkingActuator,
  updateDeviceStatus,
  updateLedStatus,
  updatePumpStatus,
} from "../repository/device-repository.js";

export const mqttSubscriber = () => {
  mqttClientInstance.setMessageCallback(async (topic, message) => {
    const TOPIC_TYPE_INDEX = 0;
    try {
      const topicType = topic?.split("/")[TOPIC_TYPE_INDEX];
      if (topicType === "sensor") {
        const messageJson = JSON.parse(message);
        const { deviceId, temperature, humidity, lux, solid, led, pump } = messageJson;

        if (deviceId === null) {
          return;
        }

        const roundTemperature = Math.round(temperature);
        const currentDeviceStatus = await isWorkingActuator(deviceId);

        if (!roundTemperature || !humidity || !lux || !solid) {
          Promise.all([
            await updateDeviceStatus(deviceId, 0),
            await updateLedStatus(deviceId, 0),
            await updatePumpStatus(deviceId, 0),
          ]);
          return;
        }

        Promise.all([
          putSensorDataToDB({
            deviceId,
            roundTemperature,
            humidity,
            lux,
            solid,
          }),
          updateDeviceStatus(deviceId, 1),
        ]);

        if (currentDeviceStatus[0]?.led !== led) {
          await updateLedStatus(deviceId, led);
        } else if (currentDeviceStatus[0]?.pump !== pump) {
          await updatePumpStatus(deviceId, pump);
        }

        return;
      }
    } catch (err) {
      console.log(err);
    }
  });
};
