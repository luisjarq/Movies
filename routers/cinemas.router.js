const express = require("express");
const router = express.Router();
const {
  getAllCinemas,
  getById,
  postCinema,
} = require("../controllers/cinemas.controller");
const { isAuth } = require("../middleware/auth.middleware");
// READ OPERATIONS
router.get("/", [isAuth], getAllCinemas);

router.get("/:id", [isAuth], getById);

// CREATE OPERATIONS
router.post("/", [isAuth], postCinema);

module.exports = router;
