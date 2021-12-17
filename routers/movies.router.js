const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getById,
  postMovie,
  putMovie,
  deleteMovie,
  getByParams,
} = require("../controllers/movies.controller");
const { isAuth } = require("../middleware/auth.middleware");
// READ OPERATIONS
router.get("/", [isAuth], getAllMovies);
router.get("/by", [isAuth], getByParams);
router.get("/:id", [isAuth], getById);
// CREATE OPERATION
router.post("/", [isAuth], postMovie);
// UPDATE OPERATION
router.put("/:id", [isAuth], putMovie);
// DELETE OPERATION
router.delete("/:id", [isAuth], deleteMovie);

module.exports = router;
