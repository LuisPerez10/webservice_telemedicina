const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { uploadS3 } = require('../helpers/aws-s3');
const { actualizarImagen, actualizarMedico } = require('../helpers/actualizar-imagen');


const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    // const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    // imagen por defecto
    // if (fs.existsSync(pathImg)) {
    //     res.sendFile(pathImg);
    // } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
    // }

}

const fileUploadS3 = async(req, res) => {
    const id = req.params.id;
    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('no hay ningun archivo');
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
    if (!extensionesValidas.includes(extensionArchivo)) {

        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen

    var path = `${ nombreArchivo }`;

    // Mover la imagen
    try {
        const url = await uploadS3(path, file.data);
        var subio = await actualizarImagen(id, url);
        return res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo: url
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

// sube un file y se lo asigna a un medico 
const fileUploadPDFS3 = async(req, res) => {
    const id = req.params.id;
    console.log(id);
    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No hay ningún archivo');
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.file;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['pdf'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;


    var path = `${ nombreArchivo }`;

    try {
        const url = await uploadS3(path, file.data);
        var subio = await actualizarMedico(id, url);

        return res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo: url
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "sd"
        });
    }
}

module.exports = {
    fileUploadS3,
    fileUploadPDFS3,
    retornaImagen
}