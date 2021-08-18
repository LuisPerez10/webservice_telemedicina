/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const { getUsuarios, crearUsuario, verificarKeyUnica, actualizarUsuario, getUsuario } = require('../controllers/usuarios');

const { enviarCodigo, verificarEmail } = require('../controllers/verificar');
const { sendEmail } = require('../helpers/send-email');


const router = Router();



router.get('/verificado', verificarEmail)


router.get('/keyunica', verificarKeyUnica);

// router.get('/', verificarKeyUnica);

router.get('/usuario/:id', getUsuario);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('celular', 'El Numero de celular es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
);



router.get('/',
    validarJWT,
    getUsuarios
);


router.put('/:id', [
        validarJWT,
        varlidarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

// router.delete( '/:id',
//     [ validarJWT, varlidarADMIN_ROLE ],
//     borrarUsuario
// );



module.exports = router;