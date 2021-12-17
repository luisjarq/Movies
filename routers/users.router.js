const express = require("express");
const router = express.Router();

const {
  createUser,
  autnethicateUser,
  logoutUser,
} = require("../controllers/user.controller");

const { isAuth } = require("../middleware/auth.middleware");

router.post("/register", createUser);
router.post("/login", autnethicateUser);
router.post("/logout", [isAuth], logoutUser);

module.exports = router;
