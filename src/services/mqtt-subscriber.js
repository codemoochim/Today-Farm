import { mqttClientInstance } from "../config/mqtt-client.js";
import { putSensorDataToDB } from "../repository/data-repository.js";
import { isWorkingActuator, updateLedStatus, updatePumpStatus } from "../repository/device-repository.js";
import { checkRequiredParams } from "../utils/check-required-params.js";

const TOPIC_TYPE_INDEX = 0;

export const mqttSubscriber = () => {
  mqttClientInstance.setMessageCallback(async (topic, message) => {
    const topicType = topic.split("/")[TOPIC_TYPE_INDEX];
    try {
      if (topicType === "sensor") {
        const messageJson = JSON.parse(message);
        const { deviceId, temperature, humidity, lux, solid, led, pump } = messageJson;
        if (deviceId === null) {
          return;
        }

        await putSensorDataToDB({
          deviceId,
          temperature,
          humidity,
          lux,
          solid,
        });

        const currentDeviceStatus = await isWorkingActuator(deviceId);

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
