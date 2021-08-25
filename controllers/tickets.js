const Ticket = require('../models/tickets');

// obtenerticket from route
const getTicket = async(req, res) => {

    const medico = req.body.medico;
    const fecha = req.body.fecha;

    try {
        const ticketDB = await Ticket.findOne({ medico: medico });
        var tiques = ticketDB.tiques[fecha];

        res.json({
            ok: true,
            fecha,
            tiques
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
};


const putTicketLocal = async(medico, horaInicio, horaFin, fecha, tiempo) => {
    console.log(fecha);
    console.log(horaInicio);
    console.log(horaFin);
    console.log(tiempo);




    // const fechaFormat = fecha;
    // const HoraFormat = horaInicio;
    // const HoraFormatF = horaFin;



    const detalle = {
        horaInicio: horaInicio,
        horaFin: horaFin,
        tiempo: tiempo + '',
    };

    var ticketDB;
    ticketDB = await Ticket.findOne({ medico });
    if (!ticketDB) {
        ticketDB = new Ticket({ medico });
        // asi funcionar ejecutar el postmand y ver ejemplo
        ticketDB.tiques = {};
        ticketDB.tiques[fecha] = [detalle];
    } else {

        if (!ticketDB.tiques[fecha]) {
            ticketDB.tiques[fecha] = [detalle];
        } else {
            ticketDB.tiques[fecha].push(detalle);
        }
    }

    ticketDB.markModified('tiques');

    await ticketDB.save(true);
    return true;
}


const putTicket = async(req, res) => {

    const { medico, horaFin, horaInicio, fecha, tiempo } = req.body;
    const detalle = {
        horaInicio: horaInicio,
        horaFin: horaFin,
        tiempo: tiempo
    };

    var ticketDB;
    ticketDB = await Ticket.findOne({ medico });
    if (!ticketDB) {
        ticketDB = new Ticket({ medico });
        // asi funcionar ejecutar el postmand y ver ejemplo
        ticketDB.tiques = {};
        ticketDB.tiques[fecha] = [detalle];
    } else {

        if (!ticketDB.tiques[fecha]) {
            ticketDB.tiques[fecha] = [detalle];
        } else {
            ticketDB.tiques[fecha].push(detalle);
        }
    }

    ticketDB.markModified('tiques');

    await ticketDB.save(true);
    res.json({
        ticketDB
    })
}

const removeTicket = async(req, res) => {
    const { medico, horaFin, horaInicio, fecha, tiempo } = req.body;

    const ticketDB = await Ticket.findOne({ medico });
    if (!ticketDB) {
        return res.status(400).json({
            ok: false
        })
    }

    if (!ticketDB.tiques[fecha]) {
        return res.status(400).json({
            ok: false,
            msg: "no existe registrado para este dia"
        })
    }
    const detalle = {
        horaInicio: horaInicio,
        horaFin: horaFin,
        tiempo: tiempo
    };
    var index = -1;
    ticketDB.tiques[fecha].map((a, idx) => {
        let isEqual = (JSON.stringify(a) == JSON.stringify(detalle));

        if (isEqual) index = idx;
    });

    if (index != -1) {
        ticketDB.tiques[fecha].splice(index, 1);
    }

    ticketDB.markModified('tiques');
    await ticketDB.save();
    res.json({
        ok: true
    })

}


module.exports = { getTicket, putTicket, removeTicket, putTicketLocal }