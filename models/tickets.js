const { Schema, model } = require('mongoose');

const ext = Schema({
    tiques: [{
        type: String
    }]
});
const TicketSchema = Schema({


    tiques: {},
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: false
    }

}, { collection: "tickets", strict: false });


TicketSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model('Ticket', TicketSchema);


// id fecha
// type: Object,
// properties: [{
//     "horaInicio": {
//         type: String,
//     },
//     "horaFin": {
//         type: String
//     },
//     "tiempo": {
//         type: String,
//     }
// }]