const { Verificador } = require("../classes/verificador_email");

// const { enviarSmS, verificar } = require('../classes/verificador');
const gcv = new Verificador();
/*

const enviarCodigo = async(req, res) => {
    const nrotelefono = req.query.nrotelefono;
    console.log(nrotelefono);
    try {
        gcv.enviarSmS(nrotelefono);
        //console.log('entro -----');
        return res.status(400).json({
            ok: true,
            msg: 'Se envio el codigo'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


const verificarCodigo = async(req, res) => {
    const nrotelefono = req.query.nrotelefono;
    const codigo = req.query.codigo
    try {
        const esVerificado = gcv.verificar(nrotelefono, codigo);
        if (esVerificado) {
            return res.json({
                ok: true,
                msg: 'Codigo Verificado ok'
            })
        }
        return res.json({
            ok: false,
            msg: 'Codigo de verificacion incorrecto'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}
*/
const enviarEmailClass = async(subject, email, tipo) => {
    gcv.enviar(subject, email, tipo);
}



const enviarEmail = async(req, res) => {
    const email = req.query.email;
    console.log(email);
    try {
        gcv.enviar("Confirmar Correo", email);
        //console.log('entro -----');
        return res.status(400).json({
            ok: true,
            msg: 'Se envio el codigo'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const verificarEmail = async(req, res) => {
    const email = req.query.email;
    const codigo = req.query.codigo
    try {
        const esVerificado = await gcv.verificar(email, codigo);
        if (esVerificado) {
            return res.json({
                ok: true,
                msg: 'Codigo Verificado ok'
            })
        }
        return res.json({
            ok: false,
            msg: 'Codigo de verificacion incorrecto'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


module.exports = {
    enviarEmail,
    verificarEmail,
    enviarEmailClass
}