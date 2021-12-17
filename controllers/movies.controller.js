const { Error } = require("mongoose");
const Movie = require("../models/movie");
const HTTPSTATUSCODE = require("../utils/httpStatusCode");

function getAllMovies(req, res, next) {
  Movie.find().exec((error, movie) => {
    if (error) {
      next(error);
    }
    return res.json(movie);
  });
}
async function getByParams(req, res, next) {
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
}
function getById(req, res, next) {
  const id = req.params.id;
  Movie.findById(id).exec((error, movie) => {
    if (!movie) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(movie);
  });
}
async function postMovie(req, res, next) {
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
}
function putMovie(req, res, next) {
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
}
function deleteMovie(req, res, next) {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Movie with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
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
module.exports = {
  getAllMovies,
  getByParams,
  getById,
  postMovie,
  putMovie,
  deleteMovie,
};
