const { json } = require('body-parser');
const Ticket = require('../models/tickes');

const getTicket = async(req, res) => {

    const medico = req.body.medico;
    const fecha = req.body.fecha;

    try {
        const ticketDB = await Ticket.findOne({ 'medico': medico, }).getQuery('');
        // var ticketParse = json.(ticketDB.tickets);

        // let myMap = new Map(Object.entries(this.props.json));
        var tickets = ticketDB.tickets;

        // ticketDB.tickets = JSON.stringify(ticketDB.tickets);
        console.log(ticketDB.tickets);
        res.json({
            ok: true,
            tickets
            // ticketParse
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
};
const putTicket = async(req, res) => {

    const medico = req.body.medico;

    console.log(medico);

    var json = {
        "inicio": "21/05/10",
        "fin": "21/05/11",
        "tiempo": "1",
    }

    var ele = new Map([
        ["21/05/2020", json]
    ]);
    console.log(ele);
    try {
        var ticketDB = new Ticket();

        ticketDB.medico = medico;
        ticketDB.tickets = new Map([
            ['key', 'value']
        ]);

        console.log(ticketDB.tickets);

        const newTicket = await ticketDB.save();

        console.log(ticketDB.tickets);

        console.log(newTicket.tickets);


        res.json({
            ok: true,
            ticketDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
};

module.exports = { getTicket, putTicket }