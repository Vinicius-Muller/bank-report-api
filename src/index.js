const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const uploadRoute = require("./routes/upload.js");
const usersRoute = require("./routes/users.js");
const signInRoute = require("./routes/signIn.js");
const categoriesRoute = require("./routes/categories.js");
const movimentsRoute = require("./routes/moviments.js");
const jwtValidation = require("./middlewares/jwtValidation.js");

dotenv.config();

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/upload", uploadRoute);
app.use("/api/users", usersRoute);
app.use("/api/categories", jwtValidation, categoriesRoute);
app.use("/api/moviments", jwtValidation, movimentsRoute);
app.use("/api/signIn", signInRoute);

module.exports = app;
