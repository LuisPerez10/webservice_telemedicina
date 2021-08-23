const { Schema, model } = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

var SalaSchema=Schema({
	uri:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: false,
        default: "inhabilitado"
    },
	
});

const ConsultaSchema = Schema({
    motivo: {
        type: String,
        required: false,
        default: "nroFicha"
    },
    costo: {
        type: Float,
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