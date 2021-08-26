const { Router } = require('express');
const { createReceta, getRecetas } = require('../controllers/receta')

const router = Router();


router.post('/createreceta', createReceta);
router.get('/getrecetas/:id', getRecetas);

// router.get('/getconsulta/:id', getConsulta);
// router.get('/getsala/:id', getSalabyFicha);
// router.put('/updatesala/:id', updateEstadoSala);

module.exports = router;