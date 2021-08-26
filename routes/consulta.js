const { Router } = require('express');
const { createConsulta, getConsulta, getSalabyFicha, updateEstadoSala, getConsultaById, finalizarSala } = require('../controllers/consulta')

const router = Router();


router.post('/createconsulta', createConsulta);
router.get('/getconsulta/:id', getConsulta);
router.get('/getsala/:id', getSalabyFicha);
router.put('/updatesala/:id', updateEstadoSala);

router.put('/finalizar/:id', finalizarSala);
router.get('/consulta/:id', getConsultaById);

module.exports = router;