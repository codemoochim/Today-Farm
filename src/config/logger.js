import { createLogger, format, transports } from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, label, json, printf, errors, splat } = format;

const loggerOptions = {
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    errors({ stack: true }),
    splat(),
    json(),
  ),
  defaultMeta: { service: "smart-farm-be" },
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      filename: "./src/logs/%DATE%.combined.log",
      maxFiles: "3d",
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      filename: "./src/logs/%DATE%.error.log",
      maxFiles: "3d",
    }),
  ],
};

export const logger = createLogger(loggerOptions);
