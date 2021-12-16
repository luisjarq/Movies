const express = require("express");
const { Error } = require("mongoose");
const Movie = require("../models/movie");

const router = express.Router();

// READ OPERATIONS
router.get("/", (req, res, next) => {
  Movie.find().exec((error, movie) => {
    if (error) {
      next(error);
    }
    return res.json(movie);
  });
});
router.get("/random/:limit", async (req, res, next) => {
  const limit = req.params.limit;
  const docsCount = await Movie.find()
    .estimatedDocumentCount()
    .then((result) => {
      return {
        total: result,
        random: Math.floor(Math.random()*10),
      };
    });
  Movie.find()
    .skip(docsCount.total - docsCount.random)
    .exec((error, movie) => {
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
      const notFound = new Error(`[ERROR] Id ${id} not found`);
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
      next(new Error(`[ERROR] Titulo ${title} not found`));
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
      next(new Error(`[ERROR] Genre ${genre} not found`));
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(movie);
  });
});

// CREATE OPERATION
router.post("/", async (req, res, next) => {
  const newMovie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
  });
  newMovie
    .save()
    .then(() => res.status(201).json(newMovie))
    .catch((error) => {
      next(error);
    });
});

// UPDATE OPERATION
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const newMovie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
    _id: id,
  });
  Movie.findByIdAndUpdate(id, newMovie)
    .then(() => res.status(200).json(newMovie))
    .catch((error) => {
      next(error);
    });
});

// DELETE OPERATION
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Movie with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
});
// functions, mover a otro archivo
async function findOneByParameter(parameterName, parameterValue, next) {
  const movie = Movie.findOne({ [parameterName]: parameterValue }).exec();
  if (!movie) {
    next(new Error(`[ERROR] ${parameterName} ${parameterValue} not found`));
  }
  return movie;
}
async function findMultipleByParameter(parameterName, parameterValue, next) {
  const movies = Movie.find({ [parameterName]: parameterValue }).exec();
  if (!movies) {
    next(new Error(`[ERROR] ${parameterName} ${parameterValue} not found`));
    return;
  }
  return movies;
}
async function findMultipleGreaterByParameter(
  parameterName,
  parameterValue,
  next
) {
  const movies = Movie.find({
    [parameterName]: { $gte: parameterValue },
  }).exec();
  if (!movies) {
    next(new Error(`[ERROR] ${parameterName} ${parameterValue} not found`));
    return;
  }
  return movies;
}
module.exports = router;
