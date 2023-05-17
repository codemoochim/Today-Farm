import { mqttClientInstance } from "../../config/mqtt-client.js";

export const mqttPublisher = async (targetMachine, active) => {
  try {
    const messageToDevice = parseInt(active) ? "on" : "off";
    await mqttClientInstance.sendCommand(`cmd/esp32/${targetMachine}`, messageToDevice);
  } catch (err) {
    console.error(err);
  }
};
