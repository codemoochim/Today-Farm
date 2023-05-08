import { mqttClientInstance } from "../config/mqtt.js";

// mosquitto_pub -t esp32/topic -m "LED on"
export const mqttPublisher = async (targetMachine, active) => {
  try {
    const messageToDevice = parseInt(active) ? `${targetMachine} on` : `${targetMachine} off`;
    await mqttClientInstance.sendCommand(`esp32/topic`, messageToDevice);
  } catch (err) {
    console.error(err);
  }
};
