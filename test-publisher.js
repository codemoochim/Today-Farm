import dotenv from "dotenv";
import mqtt from "mqtt";
dotenv.config();

const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};

const client = mqtt.connect(mqttOptions);

client.on("connect", (connack) => {
  console.log("## test publisher connected");

  setInterval(() => {
    console.log("## published");
    // client.publish("data/test-01", "test");
    client.publish(
      "data/test-01",
      JSON.stringify({
        id: "1",
        temp: Math.round(10 * Math.random()),
        humid: Math.round(10 * Math.random()),
        lux: Math.round(10 * Math.random()),
        solid: Math.round(10 * Math.random()),
        time: Date.now(),
      }),
    );
  }, 1000);
});
