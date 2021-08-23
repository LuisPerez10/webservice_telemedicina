const { Schema, model } = require('mongoose');


const tratamientoSchema = Schema({
    fecha_inicio: {
        type: Date,
        required: false,
        default: "Sin fecha"
    },
    fecha_fin: {
        type: Date,
        required: false,
        default: 'Sin fecha'
    },
    enfermedad: {
        type: String,
        required: false,
        default: "Sin sin enfermedad"
    },
    
    consulta: {
        type: Schema.Types.ObjectId,
        ref: 'Consulta',
        required: false
    }

});


tratamientoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Tratamiento', tratamientoSchema);