// src/index.js
import dotenv from "dotenv";
import MqttClient from "./utils/mqtt-client.js";

dotenv.config();

// mqtt클라이언트 옵션
const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};

export const mqttClientInstance = new MqttClient(mqttOptions, ["esp32/topic"]); // 토픽 설정
