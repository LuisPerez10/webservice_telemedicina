const { Schema, model } = require('mongoose');


const ConsultaSchema = Schema({
    motivo: {
        type: String,
        required: false,
        default: "nroFicha"
    },
    costo: {
        type: Date,
        required: false,
        default: Date.now(),
    },
    duracion: {
        type: Date,
        required: false,
        // default: Date.now()
    },
    horaInicio: {
        type: Date,
        required: false,
        // default: Date.now()
    },
    estado: {
        type: String,
        required: false,
        //estado -> pendiente, rechazada, aceptada, atendida.
    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    consulta: {
        type: Schema.Types.ObjectId,
        ref: 'Consulta',
        required: false
    },

});


ConsultaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Consulta', ConsultaSchema);