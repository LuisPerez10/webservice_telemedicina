const { Router } = require('express');
const { notificarFCM, guardarTokenFCMByEmail, guardarTokenFCM, borrarTokenFCM } = require('../controllers/notificaciones');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/tokenfcm',
    validarJWT,
    guardarTokenFCM
)
router.post('/tokenfcmemail',
    guardarTokenFCMByEmail
)
router.post('/eliminar',
    validarJWT,
    borrarTokenFCM
)
router.post('/',
    validarJWT,
    notificarFCM
)






module.exports = router;