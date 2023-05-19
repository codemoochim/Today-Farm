import { mqttClientInstance } from "../../config/mqtt-client.js";
import { putSensorDataToDB } from "../../repository/data-repository.js";
import {
  isWorkingActuator,
  updateDeviceStatus,
  updateLedStatus,
  updatePumpStatus,
} from "../../repository/device-repository.js";

export const mqttSubscriber = async () => {
  mqttClientInstance.setMessageCallback(async (topic, message) => {
    const TOPIC_TYPE_INDEX = 0;
    try {
      const topicType = topic?.split("/")[TOPIC_TYPE_INDEX];
      if (topicType === "sensor") {
        const messageJson = JSON.parse(message);
        const { deviceId, temperature, humidity, lux, solid, led, pump } = messageJson;

        // 잘못된 디바이스 아이디가 들어왔을 경우
        if (deviceId === null) {
          return;
        }

        const currentDeviceStatus = await isWorkingActuator(deviceId);
        if (currentDeviceStatus.length === 0) {
          return;
        }
        if (currentDeviceStatus[0]?.led !== led) {
          await updateLedStatus(deviceId, led);
        } else if (currentDeviceStatus[0]?.pump !== pump) {
          await updatePumpStatus(deviceId, pump);
        }

        const roundTemperature = Math.round(temperature);
        await putSensorDataToDB(deviceId, roundTemperature, humidity, lux, solid);
        await updateDeviceStatus(deviceId, 1);
      }
    } catch (err) {
      throw err;
    }
  });
};
