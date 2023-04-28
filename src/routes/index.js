import express from "express";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";

const app = express();

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
