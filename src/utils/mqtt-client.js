import * as mqtt from "mqtt";

class MqttClient {
  #options;
  #client;
  #topics;

  constructor(options, topics) {
    this.#options = options;
    this.#topics = topics;
  }

  // connect 메서드. mqtt 에 연결을 하고 구독을 하는 코드를 작성한다.
  connect() {
    const self = this; // 화설표 함수에서 this 를 사용할 때 인스턴스가 아닌 그 상위의 함수를 가르키기 때문에 이와같이 this를 사전에 지정해주어야함
    self.#client = mqtt.connect(self.#options);

    self.#client.on("connect", () => {
      console.log("Connected on MQTT");
    });

    // 토픽을 구독하는 코드
    self.#client.subscribe(self.#topics, (error) => {
      if (!error) {
        console.log("MQTT 구독이 성공하였습니다.");
      } else {
        console.log("MQTT 구독이 실패하였습니다.");
      }
    });

    // 에러
    self.#client.on("error", (error) => {
      console.log(error);
    });
  }

  // 작동 제어 명령 발행
  async sendCommand(topic, message) {
    this.#client.publish(topic, JSON.stringify(message));
  }

  async setMessageCallback(cb) {
    // 메시지 이벤트 콜백을 등록
    this.#client.on("message", cb);
  }
}

export default MqttClient;
