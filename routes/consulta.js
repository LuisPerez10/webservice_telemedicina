const { Router } = require('express');
const { createConsulta, getConsulta, getSalabyFicha, updateEstadoSala, getConsultaById, updateConsultaStatus, getConsultaByStatus, finalizarSala } = require('../controllers/consulta')


const router = Router();


router.post('/createconsulta', createConsulta);
router.get('/getconsulta/:id', getConsulta);
router.get('/getsala/:id', getSalabyFicha);
router.put('/updatesala/:id', updateEstadoSala);
router.get('/getconsultastatus/:id/:status', getConsultaByStatus);
router.put('/updateconsultastatus/:id/:status', updateConsultaStatus);

router.put('/finalizar/:id', finalizarSala);
router.get('/consulta/:id', getConsultaById);

module.exports = router;