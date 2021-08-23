const { response } = require('express');
const Especialidad = require('../models/especialidad');
const Medico = require('../models/medico');
const Horario = require('../models/horario');

const crearHorario = async(req, res) => {

    const medico = req.body.medico;

    try {

        var medicoDB = await Medico.findById(medico)
        if (!medicoDB) {
            return res.status(400).json({
                ok: false,
                msg: "No existe medico con esa id"
            })
        }
        const horarioDB = new Horario(req.body);
        medicoDB.horario = horarioDB.id;

        await medicoDB.save();
        await horarioDB.save();

        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}
const actualizarHorario = async(req, res) => {
    const medico = req.params.medico;
    console.log(req.body);
    try {

        var medicoDB = await Medico.findById(medico);
        if (!medicoDB) {
            return res.status(400).json({
                ok: false,
                msg: "No existe medico con esa id"
            })
        }
        var horarioDB = await Horario.findById(medicoDB.horario);

        horarioDB.tiempo = req.body.tiempo;
        horarioDB.horaInicio = req.body.horaInicio;
        horarioDB.horaCierre = req.body.horaCierre;
        horarioDB.dias = req.body.dias;

        const newhorario = await horarioDB.save();

        res.json({
            ok: true,
            horario: newhorario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const obtenerHorario = async(req, res) => {
    const medico = req.params.medico;

    try {

        var medicoDB = await Medico.findById(medico)
        if (!medicoDB) {
            return res.status(400).json({
                ok: false,
                msg: "No existe medico con esa id"
            })
        }
        var horarioDB = await Horario.findById(medicoDB.horario);


        res.json({
            ok: true,
            horario: horarioDB
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
    crearHorario,
    actualizarHorario,
    obtenerHorario,
}