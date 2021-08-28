const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const Persona = require('../models/persona');
const Paciente = require('../models/paciente');
const Medico = require('../models/medico');
const { enviarEmailClass } = require('../controllers/verificar');





// const { notificarUserUpdated } = require('../controllers/notificaciones');

const verificarKeyUnica = async(req, res) => {
    var email = req.query.email;
    console.log(email);
    try {
        const existeKey = await Usuario.findOne({ email });
        if (existeKey) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


const actualizarUsuario = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        if (usuarioDB.estado !== campos.estado) {
            enviarEmailClass(`Cuenta de usuario ${campos.estado}`, email, 'actualiza');

        }


        //verificar que se ha cambiado el ROL. 
        //enviar email, cuenta habilitada




        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        //    await notificarUserUpdated(uid, usuario.estado, campos.estado);
        // await notificarUserUpdated(uid, 'Titulo', 'Mensaje Actulizado', 'valuess');



        res.json({
            ok: true,
            usuario: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const crearUsuario = async(req, res = response) => {
    const { email, password, role } = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }



        var usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.estado = getEstadoFromRole(role);

        // Guardar usuario
        console.log('usuario');
        console.log(usuario);
        const newususario = await usuario.save();
        console.log(newususario);;

        const persona = new Persona({
            usuario: usuario.id,
            ...req.body
        });

        usuario.nombre = persona.nombre + ' ' + persona.apellido;

        // Guardar persona
        await persona.save();
        const data = await saveByRol(role, persona.id, req);

        res.json({
            ok: true,
            usuario,
            persona,
            data
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


const saveByRol = async(role, id, req) => {
    var data;
    console.log('campos');
    const { persona, ...campos } = req.body;
    console.log(campos);
    switch (role) {
        // case 'MEDICO_ROLE':

        //     data = new Medico({
        //         persona: id,
        //         ...campos
        //     })
        //     break;
        case 'PACIENTE_ROLE':
            // TODO
            console.log(campos);
            console.log('enviar correo');
            enviarEmailClass("Confirmar Correo", campos.email, 'confirma');
            // enviar correo para cambiar el estado de inhabilitado
            data = new Paciente({
                persona: id,
                ...campos
            });
            break;
    }
    if (data != undefined) await data.save();

    return data;
}


const getByRol = async(role, id) => {
    var data;
    switch (role) {
        case 'MEDICO_ROLE':
            data = await Medico.findOne({ persona: id });
            break;
        case 'PACIENTE_ROLE':
            data = await Paciente.findOne({ persona: id });
            break;
        case 'ADMIN_ROLE':
            break;

    }
    return data;
}


const getEstadoFromRole = (role) => {

    switch (role) {
        case 'PACIENTE_ROLE':
            return 'pendiente'
            break;
        case 'MEDICO_ROLE':
            return 'pendiente'
            break;
        case 'ADMIN_ROLE':
            return 'pendiente'
            break;
        case 'USER_ROLE':
            return 'pendiente'
            break;
        default:
            return 'inhabilitado'
            break;
    }


}

const getUsuarios = async(req, res) => {

    var { desde, entrada, sort, ...consulta } = req.query;

    desde = Number(desde) || 0;
    entrada = Number(entrada) || 5;
    sort = Number(sort) || 1;


    const [usuarios, total] = await Promise.all([
        Usuario
        .find(consulta, 'nombre email img role estado createdAt')
        .skip(desde)
        .limit(entrada)
        .sort({ createdAt: sort }),
        Usuario
        .find(consulta, 'nombre email img role estado createdAt').countDocuments()
    ]);
    // total = usuarios.length;

    res.json({
        ok: true,
        usuarios,
        total
    });

}

// const getUsuario = async(req, res) => {
//     const uid = req.params.id;
//     const { role } = req.body;

//     try {

//         const personaDB = await Persona.findOne({ "role": role });

//         if (!personaDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'No existe una persona por ese id'
//             });
//         }


//         res.json({
//             ok: true,
//             persona,

//         });


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Error inesperado'
//         })
//     }



//     // var role = req.role;
//     console.log('role');
//     // console.log(role);
//     const desde = Number(req.query.desde) || 0;
//     const entrada = Number(req.query.entrada) || 5;

//     const [usuarios] = await Promise.all([
//         Usuario
//         .find({ role: 'USER_ROLE' }, 'nombre email role')
//         .skip(desde)
//         .limit(entrada),

//         Usuario.countDocuments()
//     ]);
//     total = usuarios.length;

//     res.json({
//         ok: true,
//         usuarios,
//         total
//     });

// }

const getUsuario = async(req, res) => {
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        const personaDB = await Persona.findOne({ usuario: uid });

        if (!personaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una persona por ese id'
            });
        }

        const data = await getByRol(usuarioDB.role, personaDB.id);


        res.json({
            ok: true,
            usuario: usuarioDB,
            persona: personaDB,
            data

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    actualizarUsuario,
    crearUsuario,
    verificarKeyUnica,
    getUsuarios,
    getUsuario
}