
const { Verificador } = require('../classes/verificador');

const gcv = new Verificador();
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
        if(esVerificado){
            return res.json({
                ok:true,
                msg:'Codigo Verificado ok'
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


module.exports  = {
    enviarCodigo,
    verificarCodigo
}