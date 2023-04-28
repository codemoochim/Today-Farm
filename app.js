import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connection from "./src/models/db.js";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
// app.use(cookieParser(process.env.SECERET_COOKIE))
app.use(
  cors({
    orogin: "*",
  }),
);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 찾을 수 없음`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`${process.env.PORT}번 포트로 연결되었습니다.`);
});

export default app;
