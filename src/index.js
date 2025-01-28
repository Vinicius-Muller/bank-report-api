const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const uploadRoute = require("./routes/upload.js");
const usersRoute = require("./routes/users.js");
const signInRoute = require("./routes/signIn.js");
const jwtValidation = require("./middlewares/jwtValidation.js");

dotenv.config();

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/upload", jwtValidation, uploadRoute);
app.use("/api/users", jwtValidation, usersRoute);
app.use("/api/signIn", signInRoute);

module.exports = app;
