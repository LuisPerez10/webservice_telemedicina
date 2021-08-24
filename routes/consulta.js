const { Router } = require('express');
const { createConsulta, getConsulta, getSalabyFicha, updateEstadoSala } = require('../controllers/consulta')

const router = Router();


router.post('/createconsulta', createConsulta);
router.get('/getconsulta/:id', getConsulta);
router.get('/getsala/:id', getSalabyFicha);
router.put('/updatesala/:id', updateEstadoSala);

module.exports = router;