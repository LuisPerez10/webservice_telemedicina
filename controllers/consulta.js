const Consulta = require('../models/consulta');
const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');



const createConsultaLC = async(data) => {
    const roomName = `${ uuidv4() }`;
    try {
        var sala = {
            room: roomName,
        };

        var consulta = new Consulta({
            ...data,
            sala: sala
        });

        await consulta.save();
        console.log('consulta creada');
        console.log(consulta);
        return true;
    } catch (error) {
        return false;
    }
}


const createConsulta = async(req = request, res = response) => {

    const roomName = `${ uuidv4() }`;
    try {

        var sala = {
            room: roomName,
        };

        const consulta = new Consulta(data);



        await consulta.save(consultaDB => {

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

const getConsultaByStatus = async(req = request, res = response) => {

    const id = req.params.id;
    const status = req.params.status;

    try {
        const consulta = await Consulta.find({ paciente: id, estado: status });



        res.json({

            consulta
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const getSalabyFicha = async(req = request, res = response) => {
    const id = req.params.id;

    const consulta = await Consulta.findOne({ fichamedica: id });

    res.json(
        consulta.sala
    )


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


const updateConsultaStatus = async(req = request, res = response) => {
    const id = req.params.id;
    const status = req.params.status;

    await Consulta.findOne({ _id: id }, (err, consultaDB) => {
        if (err) { res.json({ ok: false, err }); }


        consultaDB.estado = status;
        consultaDB.save((err, updated) => {
            res.json({
                ok: true,
                estado: updated.estado
            })
        });
    });

};

const finalizarSala = async(req = request, res = response) => {
    const id = req.params.id;
    await Consulta.findOne({ fichamedica: id }, (err, consultaDB) => {
        if (err) { res.json({ ok: false, err }); }


        consultaDB.sala.estado = "terminado";;
        consultaDB.save((err, updated) => {
            res.json({
                ok: true,
                sala: updated.sala
            })
        });
    });

};

const getConsultaById = async(req = request, res = response) => {
    const id = req.params.id; // id fichamedica

    const consulta = await Consulta.findOne({ fichamedica: id });

    res.json(
        consulta
    )


};
module.exports = {
    createConsulta,
    getConsulta,
    getSalabyFicha,
    updateEstadoSala,
    createConsultaLC,
    getConsultaById,
    finalizarSala,
    getConsultaByStatus,
    updateConsultaStatus
}