import MqttClient from "./src/utils/mqtt-client";

const mqttClient = new MqttClient(mqttOptions, ["cmd/#"]); // 토픽 설정
const TOPIC_TYPE_INDEX = 1;

mqttClient.setMessageCallback(async (topic, message) => {
  console.log(topic, message.toString());
  const topicType = topic.split("/")[TOPIC_TYPE_INDEX];
  const messageJson = JSON.parse(message);

  try {
    switch (topicType) {
      case "cmd":
        try {
          await mqttClient.sendCommand(`cmd/${device[0].id}/pump`, {
            id: device[0].serial_num,
            command,
          });
        } catch (error) {}
        break;
      default:
        console.log("확인되지 않은 토픽");
        break;
    }
  } catch (err) {
    console.log(err);
  }
});
