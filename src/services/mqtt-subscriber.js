import { mqttClientInstance } from "../config/mqtt-client.js";
import { putSensorDataToDB } from "../repository/data-repository.js";
import {
  isWorkingActuator,
  updateDeviceStatus,
  updateLedStatus,
  updatePumpStatus,
} from "../repository/device-repository.js";

export const mqttSubscriber = () => {
  mqttClientInstance.setMessageCallback(async (topic, message) => {
    const TOPIC_TYPE_INDEX = 0;
    try {
      const topicType = topic?.split("/")[TOPIC_TYPE_INDEX];
      if (topicType === "sensor") {
        const messageJson = JSON.parse(message);
        const { deviceId, temperature, humidity, lux, solid, led, pump } = messageJson;

        if (deviceId === null) {
          return;
        }

        const roundTemperature = Math.round(temperature);
        const currentDeviceStatus = await isWorkingActuator(deviceId);

        if (!roundTemperature || !humidity || !lux || !solid) {
          Promise.all([
            await updateDeviceStatus(deviceId, 0),
            await updateLedStatus(deviceId, 0),
            await updatePumpStatus(deviceId, 0),
          ]);
          return;
        }

        // 디바이스가 작동하지 않는다는것은 데이터를 보낼 수 없다는 의미. -> 데이터 값이 오지 않는걸 기준으로 디바이스 작동 여부를 판별할 수 없음
        // 디바이스는 작동하지만 디바이스 센서 값이 없을 수 있음. -> 이걸 정상 작동으로 볼 수 있는가?
        // 결국 데이터 값이 아예 오지 않는게 작동하지 않는거지만, 현재로서는 데이터값이 없는 값(null)이 올 때 작동하지 않는걸로 판단해야함

        Promise.all([
          putSensorDataToDB({
            deviceId,
            roundTemperature,
            humidity,
            lux,
            solid,
          }),
          updateDeviceStatus(deviceId, 1),
        ]);

        if (currentDeviceStatus[0]?.led !== led) {
          await updateLedStatus(deviceId, led);
        } else if (currentDeviceStatus[0]?.pump !== pump) {
          await updatePumpStatus(deviceId, pump);
        }

        return;
      }
    } catch (err) {
      console.log(err);
    }
  });
};
