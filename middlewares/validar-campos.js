const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) => {
    console.log('validando...');
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        console.log('No entro');
        console.log(errores.mapped());
        console.log(errores);
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}