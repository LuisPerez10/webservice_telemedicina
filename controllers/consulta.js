const Consulta = require('../models/consulta');
const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');



const createConsulta = async(req = request, res = response) => {
    const roomName = `${ uuidv4() }`;

    try {

        var sala = {
            room: roomName,
        };

        const consulta = new Consulta(req.body);



        await consulta.save((err, consultaDB) => {
            if (err) { res.json({ ok: false, err }); }

            consultaDB.sala = sala;

            consultaDB.save((err, consultaDBB) => {
                res.json({
                    ok: true,
                    consulta: consultaDBB
                });
            });

        });




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs :v'
        });
    }

}

const getConsulta = async(req = request, res = response) => {

    const id = req.params.id;

    try {
        const consulta = await Consulta.find({ paciente: id });

        res.json({
            ok: true,
            consulta
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }

}

const getSalabyFicha = async(req = request, res = response) => {
    const id = req.params.id;

    const consulta = await Consulta.findOne({ fichamedica: id });

    res.json({
        ok: true,
        sala: consulta.sala
    })


};


const updateEstadoSala = async(req = request, res = response) => {
    const id = req.params.id;

    await Consulta.findOne({ fichamedica: id }, (err, consultaDB) => {
        if (err) { res.json({ ok: false, err }); }


        consultaDB.sala.estado = "habilitado";
        consultaDB.save((err, updated) => {
            res.json({
                ok: true,
                sala: updated.sala
            })
        });
    });

};


module.exports = {
    createConsulta,
    getConsulta,
    getSalabyFicha,
    updateEstadoSala
}