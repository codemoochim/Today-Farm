import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = winston.format;
const logDir = "./src/logs/";

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const loggerOptions = {
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    label({ label: "오늘농장" }),
    logFormat,
  ),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirName: logDir,
      filename: "./src/logs/%DATE%.combined.log",
      maxFiles: "3d",
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirName: logDir + "/error",
      filename: "./src/logs/%DATE%.error.log",
      maxFiles: "3d",
      zippedArchive: true,
    }),
  ],
  exceptionalHandlers: [
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirName: logDir,
      filename: "./src/logs/%DATE%.exception.log",
      maxFiles: "3d",
      zippedArchive: true,
    }),
  ],
};

const logger = winston.createLogger(loggerOptions);

if (process.env.NODE_STAGING_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      formant: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}

export { logger };
