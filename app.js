import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import { mqttSubscriber } from "./src/services/mqtt/mqtt-subscriber.js";
import authRouter from "./src/routes/auth-router.js";
import deviceRouter from "./src/routes/device-router.js";
import { validateUser } from "./src/middleware/auth-check.js";
import { logger } from "./src/config/logger.js";

const app = express();
mqttSubscriber();

const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://34.64.88.23", "https://reactjs.kr"],
    credentials: true,
  }),
);

if (process.env.NODE_STATUS === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use("/api", authRouter);
app.use("/api/devices", validateUser, deviceRouter);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 찾을 수 없는 요청입니다`);
  error.status = 404;
  logger.info();
  logger.error(error.message);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message;
  res.status(statusCode).send(errorMessage);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`[Express]: ${process.env.PORT}번 포트로 연결되었습니다.`);
});

export default app;
