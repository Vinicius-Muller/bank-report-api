const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const uploadRoute = require("./routes/upload.js");
const usersRoute = require("./routes/users.js");

dotenv.config();

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/upload", uploadRoute);
app.use("/api/users", usersRoute);

module.exports = app;
