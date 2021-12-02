const mongoose = require("mongoose");
const Movie = require("../models/movie");
const { dbConnection } = require("../db/db_atlas");
const movies = [
  {
    title: "The Matrix",
    director: "Hermanas Wachowski",
    year: 1999,
    genre: "Acción",
  },
  {
    title: "The Matrix Reloaded",
    director: "Hermanas Wachowski",
    year: 2003,
    genre: "Acción",
  },
  {
    title: "Buscando a Nemo",
    director: "Andrew Stanton",
    year: 2003,
    genre: "Animación",
  },
  {
    title: "Buscando a Dory",
    director: "Andrew Stanton",
    year: 2016,
    genre: "Animación",
  },
  {
    title: "Interestelar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Ciencia ficción",
  },
  {
    title: "50 primeras citas",
    director: "Peter Segal",
    year: 2004,
    genre: "Comedia romántica",
  },
];
const movieDocuments = movies.map((m) => new Movie(m));
dbConnection
  .then(async () => {
    const allMovies = await Movie.find();
    if (allMovies) {
      await Movie.collection.drop();
      console.log("Collection dropped");
    } else {
      console.log("Collection is empty");
    }
    Movie.insertMany(movieDocuments);
    console.log("Movies saved");
  })
  .catch((error) => console.error("[ERROR] Error insertando datos", error));
  //.finally(() => mongoose.disconnect())
