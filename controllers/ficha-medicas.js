const { response } = require('express');

const FichaMedica = require('../models/ficha-medica');
const Persona = require('../models/persona');


const crearFichaMedica = async(req, res = response) => {

    //id persona
    const {...campos } = req.body;

    const fichaMedica = new FichaMedica({
        estado: "pendiente",
        ...campos
    });


    try {

        const fichaMedicaDB = await fichaMedica.save();


        res.json({
            ok: true,
            fichaMedica: fichaMedicaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const getFichaMedicaById = async(req, res) => {
    const id = req.params.id;

    try {
        const fichaMedicaDB = FichaMedica.findById(id);
        if (!fichaMedicaDB) {
            return res.status(404), json({
                ok: true,
                msg: "No existe ficha medica con ese ID"
            })
        }

        res.json({
            ok: true,
            fichaMedica: fichaMedicaDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarFichaMedica = async(req, res = response) => {

    const id = req.params.id;

    try {

        const fichaMedica = await FichaMedica.findById(id);

        if (!fichaMedica) {
            return res.status(404).json({
                ok: true,
                msg: 'Ficha medica no encontrado por id',
            });
        }

        const cambiosFichaMedica = {
            ...req.body,
        }

        const fichaMedicaActualizada = await FichaMedica.findByIdAndUpdate(id, cambiosFichaMedica, { new: true });


        res.json({
            ok: true,
            fichaMedica: fichaMedicaActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarFichaMedica = async(req, res = response) => {

    const id = req.params.id;

    try {

        const fichaMedica = await FichaMedica.findById(id);

        if (!fichaMedica) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        await FichaMedica.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'ficha medica borrada'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const getFichaMedicas = async(req, res) => {

    var { desde, entrada, sort, ...consulta } = req.query;

    desde = Number(desde) || 0;
    entrada = Number(entrada) || 5;
    sort = Number(sort) || 1;

    const [fichaMedicas, total] = await Promise.all([
        FichaMedica
        .find(consulta, 'nroFicha fecha horaInicio estado').populate({ path: 'paciente', select: 'nombre apellido celular', populate: { path: 'usuario', select: '_id' } }).populate({ path: 'medico', select: 'nombre apellido celular', populate: { path: 'usuario', select: '_id' } })
        .skip(desde)
        .limit(entrada)
        .sort({ createdAt: sort }),
        FichaMedica
        .find(consulta, 'estado').countDocuments()
    ]);
    // total = usuarios.length;

    res.json({
        fichaMedicas,
        total
    });

}
const getFichaMedicasMedico = async(req, res) => {
    const uid = req.uid;
    const personaDB = await Persona.findOne({ usuario: uid });

    var { desde, entrada, sort, ...consulta } = req.query;

    desde = Number(desde) || 0;
    entrada = Number(entrada) || 5;
    sort = Number(sort) || 1;
    try {
        const [fichaMedicas, total] = await Promise.all([
            FichaMedica
            .find({...consulta, 'medico': personaDB.id }, 'nroFicha fecha horaInicio estado').populate({ path: 'paciente', select: 'nombre apellido celular', populate: { path: 'usuario', select: '_id' } }).populate({ path: 'medico', select: 'nombre apellido celular', populate: { path: 'usuario', select: '_id' } })
            .skip(desde)
            .limit(entrada)
            .sort({ createdAt: sort }),
            FichaMedica
            .find(consulta, 'estado').countDocuments()
        ]);
        // total = usuarios.length;

        res.json({
            fichaMedicas,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const getFichaMedicasPaciente = async(req, res) => {
    const uid = req.uid;
    const personaDB = await Persona.findOne({ usuario: uid });

    try {

        const fichaMedicas = await
        FichaMedica
            .find({ 'paciente': personaDB.id, estado: 'aceptado' }, 'nroFicha fecha horaInicio estado').populate({ path: 'paciente', select: 'nombre apellido celular', populate: { path: 'usuario', select: '_id' } }).populate({ path: 'medico', select: 'nombre apellido celular', populate: { path: 'usuario', select: '_id' } })
            .sort({ createdAt: 1 });
        // total = usuarios.length;

        res.json({
            fichaMedicas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}



module.exports = {
    crearFichaMedica,
    actualizarFichaMedica,
    borrarFichaMedica,
    getFichaMedicaById,
    getFichaMedicas,
    getFichaMedicasMedico,
    getFichaMedicasPaciente
}