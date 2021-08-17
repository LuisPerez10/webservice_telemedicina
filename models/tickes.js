const { Schema, model } = require('mongoose');

const TicketSchema = Schema({
    // tickes: {
    //     type: Map,
    //     of: Object,
    //     required: true
    // },
    tickets: Map,
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    }

}, { collection: "tickets" });


TicketSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Ticket', TicketSchema);