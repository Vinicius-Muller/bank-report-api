const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const uploadRoute = require("./routes/upload.js");

dotenv.config();

const cors = require("cors");
const app = express();

const db = require("./db/index.js");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/upload", uploadRoute);

module.exports = app;
