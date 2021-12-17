const Cinema = require("../models/cinema");
const HTTPSTATUSCODE = require("../utils/httpStatusCode");

// READ OPERATIONS

function getAllCinemas(req, res, next) {
  Cinema.find()
    .then((cinema) => {
      return res.json(cinema);
    })
    .catch((error) => {
      next(error);
    });
}
function getById(req, res, next) {
  const id = req.params.id;
  // Con populate mongoose cambia los ids por la ifo de las peliculas
  Cinema.findById(id)
    .populate("movies")
    .then((cinema) => {
      if (!cinema) {
        const error = new Error(`Cinema ${id} not found`);
        error.status = 404;
        error.message = HTTPSTATUSCODE[404];
        return next(error);
      }
      return res.json(cinema);
    })
    .catch((error) => {
      next(error);
    });
}
function postCinema(req, res, next) {
  const newCinema = new Empresa({
    nombre: req.body.nombre,
    cif: req.body.cif,
    movies: req.body.empleados || [],
  });
  newCinema
    .save()
    .then(() => {
      return res.status(201).json(newCinema);
    })
    .catch((error) => {
      next(error);
    });
}
module.exports = { getAllCinemas, getById, postCinema };
