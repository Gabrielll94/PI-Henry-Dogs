const { Router } = require('express');
require('dotenv').config();

// Importar todos los routers;
const dogs = require('./dogs');
const temperaments = require('../routes/temperments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogs);
router.use('/', temperaments);

module.exports = router;
