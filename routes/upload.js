const { Router } = require('express');
const expressFileUpload = require('express-fileupload');



const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUploadS3, fileUploadPDFS3, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());


// imagen de perfil
router.put('/img/:id', validarJWT, fileUploadS3);

// archivo (pdf) id->usuario
// corergir rruta
router.put('/file/:id', validarJWT, fileUploadPDFS3);

// router.put('/files', filesUploadS3);


// imagen default 
router.get('/:tipo/:foto', retornaImagen);
module.exports = router;