import dotenv from "dotenv";
import DB from "./db/db.js";
import MqttClient from "./utils/mqtt-client.js";

dotenv.config();

// sql 연결
const mysqlDB = new DB({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// mqtt클라이언트 옵션
const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};

const mqttClient = new MqttClient(mqttOptions, ["data/#"]); // 토픽 설정
mqttClient.connect(); // 클라이언트 객체 연결

export { mysqlDB, mqttClient };
