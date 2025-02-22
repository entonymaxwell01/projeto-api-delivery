const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./src/routers/auth.routes");
const userRoutes = require("./src/routers/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/usuarios", userRoutes);

app.get("/", (req, res) => {
  res.send("Bem vindo a API do sistema de delivery");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo deu errado!" });
});

module.exports = app;
