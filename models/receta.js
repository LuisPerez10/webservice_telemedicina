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
        type: String,
        required: false,
        default: 0
    },
    duracion: {
        type: String,
        required: false,
        default: 0
    },
});

const recetaSchema = Schema({
    prescripcion: {
        type: String,
        required: false,
        default: "Sin prescripcion"
    },
    estado: {
        type: String,
        required: false,
        default: "Habilitado"
    },
    numero: {
        type: String,
        required: false,
        default: 0
    },
    fecha:{
        type: Date,
        required: false,
        default:Date.now(),
    },        
    medicamentos: [medicamentoSchema],
    
    consulta: {
        type: Schema.Types.ObjectId,
        ref: 'Consulta',
        required: false
    }

  
});


recetaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Receta', recetaSchema);