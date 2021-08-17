const { Router } = require('express');
const router = Router();

const { getTicket, putTicket } = require('../controllers/tickes');

// router.get( '/', validarJWT , getUsuarios );

router.post('/obtenerticket', getTicket);
router.post('/', putTicket);


module.exports = router;