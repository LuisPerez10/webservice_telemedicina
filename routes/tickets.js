const { Router } = require('express');
const router = Router();

const { getTicket, putTicket, removeTicket } = require('../controllers/tickets');

// router.get( '/', validarJWT , getUsuarios );

router.post('/obtenerticket', getTicket);
router.post('/', putTicket);
router.delete('/', removeTicket);


module.exports = router;