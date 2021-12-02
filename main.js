// Middlewares importacion
const express = require("express");
const moviesRouter = require('./routers/movies.router')
// Variables
const server = express();
const { PORT } = require('./config/config');
const { DB_URL } = require('./db/db_atlas');
// Middlewares para entender los json bodys
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// Middleware enrutador
server.use('/movies', moviesRouter);
// Middleware de enrutado para rutas no existentes
server.use("*", (req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});
// Manejador/Middleware de errores, siempre se define con los 4 parametros (err, req, res, next)
server.use((error,req, res, next ) => {
  console.error("[ERROR] Ha ocurrido un error", error.status, error.message);
  res
    .status(error.status || 500)
    .json(error.message || "Ha ocurrido un error en el servidor");
});
server.listen(PORT, () =>
  console.log(`Servidor levantado en el puerto ${PORT}`)
);
