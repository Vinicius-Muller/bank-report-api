const express = require("express");
const multer = require("multer");
const { getData } = require("../controllers/upload");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/", upload.single("file"), getData);

module.exports = router;
