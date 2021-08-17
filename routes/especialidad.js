const { Router } = require('express');


const {crearEspecialidad, getEspecialidades} = require('../controllers/especialidad');


const router = Router();

router.post('/crearespecialidad', crearEspecialidad);
router.get('/getespecialidades', getEspecialidades);

module.exports = router;