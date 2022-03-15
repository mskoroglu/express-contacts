const express = require("express");
const logger = require("morgan");
const authMiddleware = require("./lib/auth-middleware");

const orm = require("./config/orm/models");
orm.sequelize.sync();

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authMiddleware);

app.use("/auth", require("./routes/auth-router"));
app.use("/contacts", require("./routes/contact-router"));

module.exports = app;
