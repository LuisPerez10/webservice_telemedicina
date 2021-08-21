const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearFichaMedica,
    actualizarFichaMedica,
    borrarFichaMedica,
    getFichaMedicaById,
    getFichaMedicas
} = require('../controllers/ficha-medicas')


const router = Router();

router.get('/', getFichaMedicas);

router.post('/', crearFichaMedica);

router.put('/:id', actualizarFichaMedica);

router.delete('/:id', borrarFichaMedica);

router.get('/:id', getFichaMedicaById);



module.exports = router;