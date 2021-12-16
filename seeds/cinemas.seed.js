const mongoose = require("mongoose");
const Cinema = require("../models/cinema");
const Movie = require("../models/movie");
const { dbConnection } = require("../db/db_atlas");

const cinemas = [
  {
    name: "Cinesa La Gavia",
    movies: [],
  },
  {
    name: "Ciudad de la imagen",
    movies: [],
  },
  {
    name: "Cinesa Tres Cantos",
    movies: [],
  },
  {
    name: "Yelmo Planetocio",
    movies: [],
  },
  {
    name: "Yelmo Rivas",
    movies: [],
  },
  {
    name: "Yelmo Vicalvaro",
    movies: [],
  },
];

async function getRandomMovies() {
  return Movie.aggregate(
    [{ $match: {} }, { $sample: { size: 10 } }],
    (err, docs) => {
      return docs;
    }
  );
}

async function main() {
  const cinemaDocuments = [];
  for (const cinema of cinemas) {
    const nCinema = new Cinema(cinema);
    const movies = (await getRandomMovies()).map((movie) => movie._id);
    nCinema.movies = movies;
    cinemaDocuments.push(nCinema);
  }
  console.log(`Randomly filled ${cinemaDocuments.length} cinemas movies collection`);
  dbConnection
    .then(async () => {
      const allCinemas = await Cinema.find();
      if (allCinemas.length > 0) {
        await Cinema.collection.drop();
      }
    })
    .catch((error) => console.error("Error deleting cinemas collection: ", error))
    .then(async () => {
      await Cinema.insertMany(cinemaDocuments);
    })
    .catch((error) => console.error("Error creating cinema: ", error))
    .finally(() => mongoose.disconnect());
}
main();

// Consultar las peliculas random para meterlas ne cada cine
