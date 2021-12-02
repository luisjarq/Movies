const express = require("express");
const Movie = require("../models/movie");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.json(movies);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        const error = new Error(`Id ${id} no encontrada`);
        error.status = 404;
        next(error);
      }
      return res.json(movie);
    })
    .catch((error) => next(error));
});

module.exports = router;
