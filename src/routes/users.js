const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUsers,
  deleteUsers,
  updateUsers,
} = require("../controllers/users");
const router = express.Router();

router.post("/", createUsers);
router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUsers);
router.put("/:id", updateUsers);

module.exports = router;
