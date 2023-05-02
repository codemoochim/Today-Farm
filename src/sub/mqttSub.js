import { mysqlDB, mqttClient } from "../index.js";

const TOPIC_TYPE_INDEX = 0;

mqttClient.setMessageCallback(async (topic, message) => {
  // console.log(topic, message);
  console.log(topic, message.toString());
  const topicType = topic.split("/")[TOPIC_TYPE_INDEX];
  const messageJson = JSON.parse(message);
  try {
    switch (topicType) {
      case "data":
        // 디비에 저장
        mysqlDB.insertData({
          deviceId: messageJson.deviceId,
          temp: messageJson.temp,
          humid: messageJson.humid,
          lux: messageJson.lux,
          solid: messageJson.solid,
          time: new Date(messageJson.time),
        });
        break;
      default:
        console.log("확인되지 않은 토픽");
        break;
    }
  } catch (err) {
    console.log(err);
  }
});
