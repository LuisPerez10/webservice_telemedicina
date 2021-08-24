const { Schema, model } = require('mongoose');
var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

var SalaSchema = Schema({
    room: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: false,
        default: "inhabilitado"
    },

});

const ConsultaSchema = Schema({
    motivo: {
        type: String,
        required: false,
        default: "No reason"
    },
    costo: {
        type: Float,
        required: false,
        default: 0.0,
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
        default: "pendiente"
            //estado -> pendiente, rechazada, aceptada, atendida.
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
    fichamedica: {
        type: Schema.Types.ObjectId,
        ref: 'FichaMedica',
        required: false
    },
    sala: SalaSchema,

});


ConsultaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Consulta', ConsultaSchema);