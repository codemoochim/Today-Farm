import * as mqtt from "mqtt";

import config from "./db.config.js";
const mqttOptions = config.mqtt;

class MqttClient {
  #options;
  #client;
  #topics;

  constructor(options, topics) {
    this.#options = options;
    this.#topics = topics;
  }

  connect() {
    const self = this;
    self.#client = mqtt.connect(self.#options);

    self.#client.on("connect", () => {
      console.log("[MQTT]: Connected on Mosquitto");
    });

    // 토픽을 구독하는 코드
    self.#client.subscribe(self.#topics, (error) => {
      if (!error) {
        console.log("[MQTT]: 구독이 성공하였습니다.");
      } else {
        console.log("[MQTT]: 구독이 실패하였습니다.");
      }
    });

    // 에러
    self.#client.on("error", (error) => {
      console.log(error);
    });
  }

  // 작동 제어 명령 발행
  async sendCommand(topic, message) {
    this.#client.publish(topic, message, (error) => {
      if (error) {
        console.error("[MQTT]: 메시지 전송 실패:", error);
      } else {
        console.log("[MQTT]: 메시지 전송 성공:", message);
      }
    });
  }

  async setMessageCallback(cb) {
    // 메시지 이벤트 콜백을 등록
    this.#client.on("message", cb);
  }
}

export const mqttClientInstance = new MqttClient(mqttOptions, ["esp32/topic"]); // 토픽 설정
