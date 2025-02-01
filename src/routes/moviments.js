const express = require("express");
const {
  getMoviments,
  getSingleMoviments,
  createMoviments,
  updateMoviments,
  deleteMoviments,
} = require("../controllers/moviments.js");
const router = express.Router();

router.post("/", createMoviments);
router.get("/", getMoviments);
router.get("/:id", getSingleMoviments);
router.delete("/:id", deleteMoviments);
router.put("/:id", updateMoviments);

module.exports = router;
