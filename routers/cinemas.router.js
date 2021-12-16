const express = require("express");

const Cinema = require("../models/cinema");

const router = express.Router();

// READ OPERATIONS
router.get("/", (req, res, next) => {
  Cinema.find()
    .then((cinema) => {
      return res.json(cinema);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  // Con populate mongoose cambia los ids por la ifo de las peliculas
  Cinema.findById(id)
    .populate("movies")
    .then((cinema) => {
      if (!cinema) {
        const error = new Error(`Cinema ${id} not found`);
        error.status = 404;
        return next(error);
      }
      return res.json(cinema);
    })
    .catch((error) => {
      next(error);
    });
});

// CREATE OPERATIONS
router.post('/', (req, res, next) => {
    const newCinema = new Empresa({
        nombre: req.body.nombre,
        cif: req.body.cif,
        movies: req.body.empleados || [],
    });

    newCinema.save()
        .then(() => {
            return res.status(201).json(newCinema);
        }).catch((error) => {
            next(error);
        });
});

module.exports = router;

