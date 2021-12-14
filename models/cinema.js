const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
    nombre: { type: String, required: true },
    cif: { type: String, required: true },
    // Definimos la propiedad empleados como un array de ids
    // de Empleado creando un enlace entre ambas colecciones
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
}, {
    timestamps: true,
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;