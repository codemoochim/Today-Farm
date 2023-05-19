import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { morganMiddleware } from "./src/middleware/custom-morgan.js";

import { BadRequest, Unauthorized, Forbidden, NotFound, ServerError, JwtError } from "./src/errors/index.js";
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

app.use(morganMiddleware);

app.use("/api", authRouter);
app.use("/api/devices", validateUser, deviceRouter);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  const err = new NotFound(`${req.method} ${req.url} 찾을 수 없는 요청입니다`);
  next(err);
});

app.use((err, req, res, next) => {
  logger.info();
  logger.error(err.message);
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).send({ name: err.name, message: err.cause });
  } else if (err instanceof Unauthorized) {
    return res.status(err.statusCode).send({ name: err.name, message: err.cause });
  } else if (err instanceof Forbidden) {
    return res.status(err.statusCode).send({ name: err.name, message: err.cause });
  } else if (err instanceof NotFound) {
    return res.status(err.statusCode).send({ name: err.name, message: err.cause });
  } else if (err instanceof ServerError) {
    return res.status(err.statusCode).send({ name: err.name, message: err.cause });
  } else if (err instanceof JwtError) {
    return res.status(err.statusCode).send({ name: err.name, message: err.cause });
  } else {
    res.status(500).send({ err: err.name, message: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`[Express]: ${process.env.PORT}번 포트로 연결되었습니다.`);
});

export default app;
