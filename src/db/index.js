require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
  console.log("Bando de dados conectado");
});

pool.on("error", (err) => {
  console.error("Erro ao conectar bando de dados ", err.stack);
});

module.exports = pool;
