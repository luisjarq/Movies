const mongoose = require('mongoose');
const Cinema = require('../models/cinema');
const { dbConnection } = require('../db/db_atlas');

const cinemas = [
    {
        "nombre": "Cinesa La Gavia",
        "cif": "B123456789"
    },
    {
        "nombre": "Yelmo Planetocio",
        "cif": "B456789123",
    },
];

const cinemaDocuments = cinemas.map(cinema => new Cinema(cinema));

dbConnection
    .then(async () => {
        const allCinemas = await Cinema.find();
        if (allCinemas.length > 0) {
            await Cinema.collection.drop();
        }
    })
    .catch((error) => console.error('Error eliminando colección Cines:', error))
    .then(async () => {
        await Cinema.insertMany(cinemaDocuments)
    })
    .catch((error) => console.error('Error al insertar en Cine:', error))
    .finally(() => mongoose.disconnect());
