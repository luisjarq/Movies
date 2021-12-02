const express = require("express");
const router = express.Router();

router.use("/movies", (req, res, next) => {
    res.send('peliculas de la API');
});

module.exports = router;
