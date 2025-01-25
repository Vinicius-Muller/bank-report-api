const express = require("express");
const { signIn } = require("../controllers/users.js");
const router = express.Router();

router.get("/", signIn);

module.exports = router;
