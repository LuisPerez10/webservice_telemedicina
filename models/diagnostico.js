const { Schema, model } = require('mongoose');


const diagnosticoSchema = Schema({
    sintoma: {
        type: String,
        required: false,
        default: "Sin sintomas"
    },
    tipo_enfermedad: {
        type: String,
        required: false,
        default: 'Sin enfermedad'
    },
    cuadro_clinico: {
        type: String,
        required: false,
        default: "Sin sin cuadro"
    },
    
    consulta: {
        type: Schema.Types.ObjectId,
        ref: 'Consulta',
        required: false
    }

});


diagnosticoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Medico', diagnosticoSchema);