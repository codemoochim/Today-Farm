const express = require("express");
const app = express();

const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const logoutRouter = require("./routes/logout");
app.use("/logout", logoutRouter);
