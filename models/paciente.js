const { Schema, model } = require('mongoose');

const pacienteSchema = Schema({
    seguroMedico: {
        type: String,
        required: false,
        default: "Sin seguro"
    },
    grupoSanguineo: {
        type: String,
        required: false,
        default: "Sin grupo sanguineo"
    },
    factorSanguineo: {
        type: String,
        required: false,
        default: "Sin factor sanguineo"
    },
    vacunas: [{
        type: String,
        required: false,
    }],
    enfermedades: [{
        type: String,
        required: false
    }],
    alergias: [{
        type: String,
        required: false
    }],
    peso: {
        type: String,
        required: false
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },

});


pacienteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Paciente', pacienteSchema);