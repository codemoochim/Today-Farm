// src/index.js
import dotenv from "dotenv";
import MqttClient from "./utils/mqtt-client.js";

dotenv.config();

// mqtt클라이언트 옵션
const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};

const mqttClientInstance = new MqttClient(mqttOptions, ["data/#"]); // 토픽 설정
// mqttClientInstance.connect(); // 클라이언트 객체 연결

export default mqttClientInstance;
