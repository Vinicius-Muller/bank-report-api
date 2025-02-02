const express = require("express");
const {
  getCategories,
  getSingleCategory,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/categories");
const router = express.Router();

const cacheControl = require("../middlewares/cacheControl");

router.post("/", createCategories);
router.get("/:user_id", cacheControl(getCategories));
router.get("/:id", cacheControl(getSingleCategory));
router.delete("/:id", deleteCategories);
router.put("/:id", updateCategories);

module.exports = router;
