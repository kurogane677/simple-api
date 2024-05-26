const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api", authMiddleware, userRoutes);

sequelize.sync();

module.exports = app;
