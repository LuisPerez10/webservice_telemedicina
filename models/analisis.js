const { Schema, model } = require('mongoose');


const analisisSchema = Schema({
    tipo_analisis: {
        type: String,
        required: false,
        default: "Sin analisis"
    },
    fecha_entrega: {
        type: Date,
        required: false,
        default: 'sin fecha'
    },
    fecha_pedido: {
        type: Date,
        required: false,
        default: "Sin fecha"
    },
    consulta: {
        type: Schema.Types.ObjectId,
        ref: 'Consulta',
        required: false
    }

});


analisisSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Analisis', analisisSchema);