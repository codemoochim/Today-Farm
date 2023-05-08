import { mqttClientInstance } from "../config/mqtt.js";
import { putSensorDataToDB } from "../repository/data-repository.js";

const TOPIC_TYPE_INDEX = 0;

export const mqttSubscriber = () => {
  mqttClientInstance.setMessageCallback(async (topic, message) => {
    if (Buffer.isBuffer(message)) return;
    try {
      const topicType = topic.split("/")[TOPIC_TYPE_INDEX];
      const messageJson = JSON.parse(message);
      switch (topicType) {
        case "esp32":
          // 디비에 저장
          await putSensorDataToDB({
            deviceId: messageJson.deviceId,
            temperature: messageJson.temperature,
            humidity: messageJson.humidity,
            lux: messageJson.lux,
            solid: messageJson.solid,
          });

          const currentTime = new Date();
          const koreanTime = currentTime.toLocaleString("ko-KR");
          console.log("[MQTT]: ", koreanTime, "센서 데이터가 저장되었습니다.");
          break;
        default:
          console.log("확인되지 않은 토픽입니다");
          break;
      }
    } catch (err) {
      console.log(err);
      // console.log(err.message);
    }
  });
};
