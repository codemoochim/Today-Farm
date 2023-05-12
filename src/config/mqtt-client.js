import * as mqtt from "mqtt";

import config from "./db.config.js";
const mqttOptions = config.mqtt;

class MqttClient {
  constructor(options, topics) {
    this.options = options;
    this.topics = topics;
  }

  connect() {
    this.client = mqtt.connect(this.options);

    this.client.on("connect", () => {
      console.log("[MQTT]: Connected on Mosquitto");
    });

    this.client.on("error", (error) => {
      console.log(error);
    });

    this.client.subscribe(this.topics, (error) => {
      if (!error) {
        console.log("[MQTT]: 구독이 성공하였습니다.");
      } else {
        console.log("[MQTT]: 구독이 실패하였습니다.");
      }
    });
  }

  sendCommand(topic, message) {
    this.client.publish(topic, message);
  }

  setMessageCallback(cb) {
    this.client.on("message", cb);
  }
}

let mqttClientInstance = null;

if (!mqttClientInstance) {
  mqttClientInstance = new MqttClient(mqttOptions, ["sensor/esp32/data", "cmd/esp32/#"]);
  mqttClientInstance.connect();
}

export { mqttClientInstance };
