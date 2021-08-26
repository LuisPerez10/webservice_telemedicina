const { Router } = require('express');
const {
    createConsulta,
    getConsulta,
    getSalabyFicha,
    updateEstadoSala,
    getConsultaByStatus,
    updateConsultaStatus
} = require('../controllers/consulta')

const router = Router();


router.post('/createconsulta', createConsulta);
router.get('/getconsulta/:id', getConsulta);
router.get('/getsala/:id', getSalabyFicha);
router.put('/updatesala/:id', updateEstadoSala);
router.get('/getconsultastatus/:id/:status', getConsultaByStatus);
router.put('/updateconsultastatus/:id/:status', updateConsultaStatus);

module.exports = router;