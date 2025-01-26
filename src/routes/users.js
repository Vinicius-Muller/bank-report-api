const express = require("express");
const { signIn } = require("../controllers/users");
const router = express.Router();

router.get("/", signIn);

module.exports = router;
