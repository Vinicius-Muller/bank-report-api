const express = require("express");
const {
  getMoviments,
  getSingleMoviments,
  createMoviments,
  updateMoviments,
  deleteMoviments,
} = require("../controllers/moviments.js");
const router = express.Router();

const cacheControl = require("../middlewares/cacheControl");

router.post("/", createMoviments);
router.get("/", cacheControl(getMoviments));
router.get("/:id", cacheControl(getSingleMoviments));
router.delete("/:id", deleteMoviments);
router.put("/:id", updateMoviments);

module.exports = router;
