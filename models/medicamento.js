const { Schema, model } = require('mongoose');


const medicamentoSchema = Schema({
    marca: {
        type: String,
        required: false,
        default: 'Sin marca'
    },
    cantidad: {
        type: Number,
        required: false,
        default: "Sin cantidad"
    },
    via: {
        type: String,
        required: false,
        default: "Sin via"
    },
    frecuencia: {
        type: Number,
        required: false,
        default: 0
    },
    duracion: {
        type: String,
        required: false,
        default: 0
    },
});


medicamentoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Medicamento', medicamentoSchema);