const { Schema, model } = require('mongoose');


const horarioSchema = Schema({
    dias: {
        type: String,
        required: false
    },
    horaInicio: {
        type: String,
        required: false
    },
    horaCierre: {
        type: String,
        required: false
    },
    tiempo: {
        type: String,
        required: false
    }
}, { collection: "horarios" });


horarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})




module.exports = model('Horario', horarioSchema);