const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById,
    getMedicoByEspecialidad,
    getMedicoByNombre
} = require('../controllers/medicos')


const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/', [
        // validarJWT,
        check('persona', 'El campo persona es requerido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id', [
        validarJWT,
        check('persona', 'El campo persona es requerido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete('/:id',
    validarJWT,
    borrarMedico
);

router.get('/:id',
    validarJWT,
    getMedicoById
);

router.get('/getmedico/:especialidad', getMedicoByEspecialidad);
router.post('/getmedicobynombre', getMedicoByNombre);



module.exports = router;