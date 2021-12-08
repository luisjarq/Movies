const express = require("express");
const { Error } = require("mongoose");
const Movie = require("../models/movie");

const router = express.Router();

router.get("/", (req, res, next) => {
  Movie.find().exec((error, movie) => {
    if (error) {
      next(error);
    }
    return res.json(movie);
  });
});
router.get("/by", async (req, res, next) => {
  const title = req.query.title;
  const genre = req.query.genre;
  const year = req.query.year;
  if (title) {
    res.json(await findOneByParameter("title", title, next));
  } else if (genre) {
    const movies = await findMultipleByParameter("genre", genre, next);
    res.json(movies);
  } else if (year) {
    const movies = await findMultipleGreaterByParameter("year", year, next);
    res.json(movies);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id).exec((error, movie) => {
    if (!movie) {
      const notFound = new Error(`[ERROR] Id ${id} no encontrado`);
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(movie);
  });
});
router.get("/byTitle/:title", async (req, res, next) => {
  const title = req.params.title;
  Movie.findOne({ title: title }).exec((error, movie) => {
    if (!movie) {
      next(new Error(`[ERROR] Titulo ${title} no encontrado`));
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(movie);
  });
});
router.get("/byGenre/:genre", async (req, res, next) => {
  const genre = req.params.genre;
  Movie.find({ genre: genre }).exec((error, movie) => {
    if (!movie) {
      next(new Error(`[ERROR] Genre ${genre} no encontrado`));
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(movie);
  });
});
async function findOneByParameter(parameterName, parameterValue, next) {
  const movie = Movie.findOne({ [parameterName]: parameterValue }).exec();
  if (!movie) {
    next(new Error(`[ERROR] ${parameterName} ${parameterValue} no encontrado`));
  }
  return movie;
}
async function findMultipleByParameter(parameterName, parameterValue, next) {
  const movies = Movie.find({ [parameterName]: parameterValue }).exec();
  if (!movies) {
    next(new Error(`[ERROR] ${parameterName} ${parameterValue} no encontrado`));
    return;
  }
  return movies;
}
async function findMultipleGreaterByParameter(parameterName, parameterValue, next) {
  const movies = Movie.find({ [parameterName]: {$gte:parameterValue} }).exec();
  if (!movies) {
    next(new Error(`[ERROR] ${parameterName} ${parameterValue} no encontrado`));
    return;
  }
  return movies;
}
module.exports = router;
