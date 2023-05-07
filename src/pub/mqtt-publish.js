import { mqttClientInstance } from "../index.js";

export const mqttPublisher = async (targetMachine, active) => {
  const messageToDevice = parseInt(active) ? "on" : "off";
  try {
    const topicType = targetMachine;
    const messageJson = JSON.stringify(messageToDevice);
    await mqttClientInstance.sendCommand(`esp32/${topicType}`, `${messageJson}`);
  } catch (err) {
    console.error(err);
  }
};
