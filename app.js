import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
dotenv.config();

import authRouter from "./src/routes/auth-router.js";
import deviceRouter from "./src/routes/device-router.js";
import { mqttClientInstance } from "./src/index.js";
import { mqttSubscriber } from "./src/sub/mqtt-subscriber.js";

const app = express();
mqttClientInstance.connect();
mqttSubscriber();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
// app.use(cookieParser(process.env.SECERET_COOKIE))
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/", authRouter);
app.use("/devices", deviceRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 찾을 수 없음`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message;
  res.status(statusCode).send(errorMessage);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`${process.env.PORT}번 포트로 연결되었습니다.`);
});

export default app;
