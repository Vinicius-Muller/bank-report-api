const express = require("express");
const { signIn } = require("../controllers/signIn");
const router = express.Router();

router.post("/", signIn);

module.exports = router;
