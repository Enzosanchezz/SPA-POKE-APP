const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const functions = require('../controllers/functions')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', functions.getPokemons) 
router.get('/pokemons/:id', functions.getPokeId) 
router.get('/types', functions.getTypes) 
router.post('/pokemons', functions.postPoke) 
router.put('/pokemons/:id', functions.putPoke) 



module.exports = router;
