const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true,
        default: 'sin direccion'
    },
    celular: {
        type: String,
        required: true,
        default: 'sin celular'
    },
    genero: {
        type: String,
        required: true,
        default: 'sin genero'
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
        // default:'sin direccion'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

}, { collection: "personas" });


PersonaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Persona', PersonaSchema);