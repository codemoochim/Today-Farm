import dotenv from "dotenv";
import mqtt from "mqtt";
dotenv.config();

const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};
const client = mqtt.connect(mqttOptions);

const createMessage = () => {
  return {
    deviceId: "1",
    temperature: Math.round(10 * Math.random()),
    humidity: Math.round(10 * Math.random()),
    lux: Math.round(10 * Math.random()),
    solid: Math.round(10 * Math.random()),
  };
};

client.on("connect", (connack) => {
  console.log("## test publisher connected");

  setInterval(() => {
    console.log("## published");
    const message = createMessage();
    client.publish("sensor/esp32/data", JSON.stringify(message));
  }, 5000);
});
