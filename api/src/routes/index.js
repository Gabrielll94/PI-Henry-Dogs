const { Router } = require('express');
const dogRoutes = require('./dogs');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogRoutes)

module.exports = router;
