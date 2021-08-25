const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearFichaMedica,
    actualizarFichaMedica,
    borrarFichaMedica,
    getFichaMedicaById,
    getFichaMedicas,
    getFichaMedicasMedico,
    getFichaMedicasPaciente,
    rechazarFichaMedica,
    aceptarFichaMedica
} = require('../controllers/ficha-medicas')


const router = Router();

router.get('/', getFichaMedicas);

router.post('/', crearFichaMedica);

router.put('/:id', actualizarFichaMedica);
router.put('/aceptar/:id', aceptarFichaMedica);
router.put('/rechazar/:id', rechazarFichaMedica);

router.delete('/:id', borrarFichaMedica);

router.get('/ficha/:id', getFichaMedicaById);

router.get('/medico', validarJWT, getFichaMedicasMedico)
router.get('/paciente', validarJWT, getFichaMedicasPaciente)



module.exports = router;