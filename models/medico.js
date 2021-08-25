const { Schema, model } = require('mongoose');


const medicoSchema = Schema({
    licMedica: {
        type: String,
        required: false,
        default: "Sin licencia"
    },
    titulo: {
        type: String,
        required: false,
        default: 'Sin titulo'
    },
    nosocomio: {
        type: String,
        required: false,
        default: "Sin nosocomio"
    },
    direccionNosocomio: {
        type: String,
        required: false,
        default: "Sin direccion"
    },
    calificacion: {
        type: Number,
        required: false,
        default: 0
    },

    descripcion: {
        type: String,
        default: 'Sin descripcion',
        required: false
    },
    cv: {
        type: String,
        required: false
    },
    credencialMedico: {
        type: String,
        required: false
    },
    especialidad: {
        type: String,
        required: false
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    horario: {
        type: Schema.Types.ObjectId,
        ref: 'Horario',
        required: false
    }
});


medicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Medico', medicoSchema);