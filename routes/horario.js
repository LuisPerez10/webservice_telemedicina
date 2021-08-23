const { Router } = require('express');
const router = Router();

const { obtenerHorario, actualizarHorario, crearHorario } = require('../controllers/horarios');

// router.get( '/', validarJWT , getUsuarios );

router.post('/', crearHorario);
router.put('/:medico', actualizarHorario);
router.get('/horario/:medico', obtenerHorario);



module.exports = router;