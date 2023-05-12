import dotenv from "dotenv";
import mqtt from "mqtt";
dotenv.config();
// import { mqttClientInstance } from "./src/config/mqtt.js";

const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};
const client = mqtt.connect(mqttOptions);

const createMessage = () => {
  return {
    deviceId: "1",
    temperature: Math.round(100 * Math.random()),
    humidity: Math.round(100 * Math.random()),
    lux: Math.round(100 * Math.random()),
    solid: Math.round(1000 * Math.random()),
    led: Math.round(Math.random()),
    pump: Math.round(Math.random()),
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

// export const testPub = () => {
//   client.on("connect", (connack) => {
//     console.log("## published");
//     setInterval(() => {
//       const message = createMessage();
//       client.publish("sensor/esp32/data", JSON.stringify(message));
//       // mqttClientInstance.sendCommand("sensor/esp32/data", JSON.stringify(message));
//     });
//   });
// };

// testPub();
