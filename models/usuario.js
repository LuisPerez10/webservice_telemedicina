//modelo

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: String,
        default: 'habilitado' //  disponible, inhabilitado,  inhabilitado 
    },
    role: {
        type: String,
        required: false,
        default: 'USER_ROLE'
    },
    password: {
        type: String,
        required: true,
    },
    img_perfil: {
        type: String
    },
    // timestamps: true
}, { collection: "usuarios" });


UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Usuario', UsuarioSchema);