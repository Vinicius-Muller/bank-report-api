const express = require("express");
const {
  getCategories,
  getSingleCategory,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/categories");
const router = express.Router();

router.post("/", createCategories);
router.get("/", getCategories);
router.get("/:id", getSingleCategory);
router.delete("/:id", deleteCategories);
router.put("/:id", updateCategories);

module.exports = router;
