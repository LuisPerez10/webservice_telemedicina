const { response } = require('express');
const FichaMedica = require('../models/ficha-medica');
const Persona = require('../models/persona');
const Medico = require('../models/medico');
const { createConsultaLC } = require('./consulta');
const Usuario = require('../models/usuario');
var Guid = require('../classes/generador');
var { notificarNuevaReserva, notificarReservaRechazada, notificarReservaAceptada } = require('./notificaciones');
const Tickets = require('./tickets');
const { formatDate, formatDateTime } = require('../helpers/parse-date');



const crearFichaMedica = async(req, res = response) => {

    //id persona
    const {...campos } = req.body;

    const fichaMedica = new FichaMedica({
        nroFicha: Guid.Generador(),
        estado: "pendiente",
        ...campos
    });
    const persona = req.body.medico;
    const tiempo = parseInt(req.body.tiempo);
    var horaInicio = req.body.horaInicio;
    var horaIniciodate = new Date(horaInicio);
    var fecha = req.body.fecha;



    try {
        const personaDB = await Persona.findById(persona);

        const usuarioMedico = await Usuario.findById(personaDB.usuario);

        const fichaMedicaDB = await fichaMedica.save();
        // TODO parsear las fechas para guardar en la base de datos.
        const medicoDB = await Medico.findOne({ 'persona': personaDB.id });

        var horaFin = new Date(horaIniciodate.setMinutes(horaIniciodate.getMinutes() + tiempo));

        var fechaStr = formatDate(fecha);
        var horaInicioStr = formatDateTime(horaInicio);
        var horaFinStr = formatDateTime(horaFin.toISOString());

        await Tickets.putTicketLocal(medicoDB.id, horaInicioStr, horaFinStr, fechaStr, tiempo.toString());

        notificarNuevaReserva(usuarioMedico.id);


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

const rechazarFichaMedica = async(req, res = response) => {
    const id = req.params.id;

    try {

        var fichaMedica = await FichaMedica.findById(id);

        if (!fichaMedica) {
            return res.status(404).json({
                ok: true,
                msg: 'Ficha medica no encontrado por id',
            });
        }

        fichaMedica.estado = "rechazado";
        fichaMedica.nota = req.body.nota;

        const fichaMedicaActualizada = await fichaMedica.save();

        const usuarioPaciente = await Persona.findById(fichaMedica.paciente);



        // Borrar tiquet
        const personaMedico = await Persona.findById(fichaMedica.medico);
        const medicoDB = await Medico.findOne({ persona: personaMedico.id });

        var fecha = formatDate(fichaMedica.fecha);
        var horaInicio = formatDateTime(fichaMedica.horaInicio.toISOString());

        var medico = medicoDB.id;



        await Tickets.removeTicketLC(medico, horaInicio, fecha);


        // TODO notificar

        notificarReservaRechazada(usuarioPaciente.usuario);

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

const aceptarFichaMedica = async(req, res = response) => {
    console.log('aceptado');
    const id = req.params.id;

    try {

        var fichaMedica = await FichaMedica.findById(id);

        if (!fichaMedica) {
            return res.status(404).json({
                ok: true,
                msg: 'Ficha medica no encontrado por id',
            });
        }

        fichaMedica.estado = "aceptado";
        //crear consulta
        var data = {
            fichamedica: fichaMedica.id,
            paciente: fichaMedica.paciente,
            medico: fichaMedica.medico,
            horaInicio: fichaMedica.horaInicio

        }
        await createConsultaLC(data);

        const fichaMedicaActualizada = await fichaMedica.save();



        // TODO notificar
        const usuarioPaciente = await Persona.findById(fichaMedica.paciente);

        notificarReservaAceptada(usuarioPaciente.usuario);

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
        .sort({ fecha: sort }),
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
            .sort({ fecha: sort }),
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
    var index = 0;
    var medico = [];

    try {

        const fichaMedicas = await
        FichaMedica
            .find({ 'paciente': personaDB.id, estado: 'aceptado' }, 'nroFicha fecha horaInicio estado').populate({ path: 'paciente', select: 'nombre apellido celular', populate: { path: 'usuario', select: '_id ' } }).populate({ path: 'medico', select: 'nombre apellido celular', populate: { path: 'usuario', select: '_id img' } })
            .sort({ fecha: 1 });

        fichaMedicas.forEach(async(usuario) => {
            const medicoDB = await Medico.findOne({ "persona": usuario.medico._id }, 'calificacion especialidad');

            medico.push(medicoDB);

            index = index + 1;

            if (index == (fichaMedicas.length)) {

                return res.json({
                    ok: true,
                    fichaMedicas,
                    medico
                });
            }
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
    getFichaMedicasPaciente,
    aceptarFichaMedica,
    rechazarFichaMedica
}