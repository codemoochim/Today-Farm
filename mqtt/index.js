import dotenv from "dotenv";
import MqttClient from "./mqtt-client.js";
dotenv.config();

const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};

// 클라이언트 인스턴스 생성. 모든 데이터 토픽
const mqttClient = new MqttClient(mqttOptions, ["data/#"]); // 토픽 설정
// 클라이언트 객체 연결
mqttClient.connect();

// 메시지 이벤트 콜백 = 구독
mqttClient.setMessageCallback(async (topic, message) => {
  console.log(topic, message.toString());
  // const topicType = topic.split("/")[0];
  // const messageJson = JSON.parse(message);

  // try {
  //   switch (topicType) {
  //     case "data":
  //       // 디비에 저장
  //       db.insertData({
  //         // deviceId: messageJson.device_id,
  //         // temp: messageJson.temp,
  //         // humid: messageJson.humid,
  //         // createdAt: new Date(messageJson.timestamp),
  //       });
  //       break;
  //     default:
  //       console.log("확인되지 않은 토픽");
  //       break;
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
});
