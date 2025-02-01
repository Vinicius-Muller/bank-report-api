const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUsers,
  deleteUsers,
  updateUsers,
  resetPassword,
} = require("../controllers/users");
const router = express.Router();

router.post("/", createUsers);
router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUsers);
router.put("/:id", updateUsers);

router.post("/reset-password/:id", resetPassword);

module.exports = router;
