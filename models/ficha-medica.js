const { Schema, model } = require('mongoose');


const FichaMedicaSchema = Schema({
    nroFicha: {
        type: String,
        required: false,
        default: "nroFicha"
    },
    fecha: {
        type: Date,
        required: false,
        default: Date.now(),
    },
    horaInicio: {
        type: Date,
        required: false,
        // default: Date.now()
    },
    horaCierre: {
        type: Date,
        required: false,
        // default: Date.now()
    },
    estado: {
        type: String,
        required: false,
        //estado -> pendiente, rechazada, aceptada, atendida.
    },
    nota: {
        type: String,
        required: false
    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },

}, { collection: 'fichaMedicas' });


FichaMedicaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('FichaMedica', FichaMedicaSchema);