const { response } = require('express');
const axios = require('axios');
const Notificacion = require('../models/notificacion');
const Usuario = require('../models/usuario');

const notificar = async(uid, title, mensaje, value) => {
    const data = {
        "title": title,
        "mensaje": mensaje,
        "value": value,
    };
    const tokens = await getTokensFromUID(uid);
    pushnotificacion(data, tokens);
}

const notificarNuevaReserva = (uid) => {
    notificar(uid, "π Nueva reserva", "Haz recibido una nueva solicitud de reservaπ");
}
const notificarReservaRechazada = (uid) => {
    notificar(uid, "π¨ββοΈ Reserva rechazada", "Tu solicitud de reserva no ha sido aceptadaπ©ββοΈ");
}
const notificarReservaAceptada = (uid) => {
    notificar(uid, "ππ¨ββοΈ Reserva aceptada", "Tu solicitud de reserva  ha sido aceptadaπ¨ββοΈπ");
}

const notificarUserUpdated = (uid, estado, nuevoestado) => {

    if (estado == "pendiente" && nuevoestado == "habilitado") {
        notificar(uid, "Solicitud de registro Aceptada π π", "Tu solicitud ha sido aceptada π, ahora puedes iniciar sesionπͺ ", "habilitado")
        return;
    }

    switch (nuevoestado) {
        case estado:
            notificar(uid, "Usuario Actualizado π", "Tu cuenta de usuario ha sido actualizada π", "")
            return
            break;
        case 'inhabilitado':
            notificar(uid, "β  Usuario suspendido! β ", "Tu cuenta de usuario ha sido suspendida temporalmente", "inhabilitado")


            break;
        case 'habilitado':
            notificar(uid, "Usuario habilitado! π", "Tu solicitud ha sido aceptada, ahora puedes iniciar autenticarte", "habilitado")
            break;
        case 'pendiente':
            notificar(uid, "Usuario suspendido! β ", "Tu cuenta de usuario esta siendo evaluada, Tu cuenta de usuario ha sido suspendida temporalmente ", "pendiente")
            break;
        default:
            notificar(uid, "Usuario Actualizado π ", "Tu cuenta de usuario ha sido actualizada")
            break;
    }
    return;
}

const pushnotificacion = async(data, to) => {

    const body = {
        "data": {
            "uid": "ABC",
            "click_action": "FLUTTER_NOTIFICATION_CLICK",
            "value": data.value,
            "id": "1"
        },
        "priority": "high",
        "notification": {
            "title": data.title,
            "body": data.mensaje
        },
        "registration_ids": to
            // "to": 
    };

    axios({
            method: 'POST', // or 'PUT'
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
                'Authorization': 'key=' + process.env.CM_AUTHORIZATION,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(body),
        })
        .then(response => {})
        .catch((error) => {
            console.error('Error:', error);
        });
}
const borrarTokenFCM = async(req, res) => {

    const uid = req.uid;
    const tokenFCM = req.body.tokenFCM;


    try {

        await Notificacion.findOneAndUpdate({ 'usuario': uid }, { $pull: { tokens: tokenFCM } }, { new: true });

        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el admin'
        })
    }
}
const guardarTokenFCM = async(req, res) => {
    const uid = req.uid;
    const tokenFCM = req.body.tokenFCM;

    // await getTokensFromUID(uid);
    // await notificar(uid, 'Titulo', 'Mensaje', 'value');

    const notificacion = await Notificacion.findOne({ 'usuario': uid });
    try {

        if (!notificacion) {

            const nuevaNotificacion = new Notificacion({
                usuario: uid,
                tokens: [tokenFCM]
            });
            await nuevaNotificacion.save();
        } else {
            //nin  verificar que no exista ese token en el array
            await Notificacion.findOneAndUpdate({ 'usuario': uid, tokens: { $nin: tokenFCM } }, { $push: { tokens: tokenFCM } }, { new: true });
        }

        res.json({
            ok: true,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el admin'
        })
    }
}

const guardarTokenFCMByEmail = async(req, res) => {
    const tokenFCM = req.body.tokenFCM;
    const email = req.body.email;

    const usuario = await Usuario.findOne({ email: email });
    const notificacion = await Notificacion.findOne({ 'usuario': usuario.id });
    try {

        if (!notificacion) {

            const nuevaNotificacion = new Notificacion({
                usuario: usuario.id,
                tokens: [tokenFCM]
            });
            await nuevaNotificacion.save();
        } else {
            await Notificacion.findOneAndUpdate({ 'usuario': usuario.id }, { $push: { tokens: tokenFCM } }, { new: true });
        }

        res.json({
            ok: true,
            // categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el admin'
        })
    }
}

// programar el get token from uid de otro, 
// testear en 2 telefonos, funciono con registratrion id
// TODO

const getTokensFromUID = async(uid) => {
    try {
        const notificacion = await Notificacion.findOne({ 'usuario': uid });
        return notificacion.tokens;
    } catch (error) {
        return [];
    }

}

const guardarTokenFCM2 = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const estudio = await Estudio.findById(id);

        if (!estudio) {
            return res.status(404).json({
                ok: true,
                msg: 'Estudio no encontrado por id',
            });
        }

        const cambiosEstudio = {
            ...req.body,
            usuario: uid
        }

        const estudioActualizado = await Estudio.findByIdAndUpdate(id, cambiosEstudio, { new: true });


        res.json({
            ok: true,
            estudio: estudioActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const notificarFCM = async(req, res) => {
    const uid = req.uid;

    notificar(uid, "Notificar Ejemplo", "Mensjae del ", "");
    res.json({
        ok: true
    });

}



module.exports = {
    notificarNuevaReserva,
    notificarReservaAceptada,
    notificarReservaRechazada,
    notificar,
    notificarUserUpdated,
    guardarTokenFCM,
    borrarTokenFCM,
    guardarTokenFCMByEmail,
    notificarFCM
}