import { mqttClientInstance } from "../config/mqtt.js";
import { putSensorDataToDB } from "../repository/data-repository.js";

const TOPIC_TYPE_INDEX = 0;

export const mqttSubscriber = () => {
  mqttClientInstance.setMessageCallback(async (topic, message) => {
    const topicType = topic.split("/")[TOPIC_TYPE_INDEX];
    try {
      if (topicType === "sensor") {
        const messageJson = JSON.parse(message);
        await putSensorDataToDB({
          deviceId: messageJson.deviceId,
          temperature: messageJson.temperature,
          humidity: messageJson.humidity,
          lux: messageJson.lux,
          solid: messageJson.solid,
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  });
};
