const express = require("express");
const router = express.Router();
const middlewareCountries = require("./countries");
const middlewareActivities = require("./activity");
const middlewareFavorites = require("./favorites");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
router.use("/countries", middlewareCountries);
router.use("/activity", middlewareActivities);
router.use("/favorites", middlewareFavorites);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
