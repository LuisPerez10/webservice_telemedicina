var Guid = require('./generador');
const Usuario = require('../models/usuario');

const { sendEmail } = require('../helpers/send-email');

const { request } = require('express');

class Verificador {
    constructor() {
        this.emailVerificacion = new Map();
    }

    enviar(subjet, email, tipo) {
        let codigo = Guid.Generador();

        // const fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl + "api/usuarios/verificado?codigo=" + codigo;
        const fullUrl = "https://telemedicina-topicos.herokuapp.com/api/usuarios/verificado?email=" + email + "&codigo=" + codigo;
        console.log('enviar');

        var html;
        switch (tipo) {
            case 'confirma':
                html = `<div bgcolor="#f1f1f1" style="direction:ltr"> <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f1f1f1"> <tbody> <tr height="25"> <td dir="ltr"></td><td dir="ltr"></td><td dir="ltr"></td></tr><tr> <td dir="ltr" valign="top"></td><td dir="ltr" valign="middle" style="font-family:'Helvetica Neue',helvetica,sans-serif;font-size:30px;font-weight:300;color:#262e33;line-height:48px;padding-left:10px"> <a href="${fullUrl}" style="text-decoration:none;color:#262e33;border:0" target="_blank" data-saferedirecturl="${fullUrl}"></a> </td><td dir="ltr" valign="top"></td></tr><tr height="25"> <td dir="ltr"></td><td dir="ltr"></td><td dir="ltr"></td></tr><tr> <td dir="ltr"></td><td dir="ltr" width="800" id="m_-9096461129907794984m_-5316948002340022160main" bgcolor="#ffffff" style="border-top:10px solid #3f6d98;line-height:1.5"> <table width="100%" cellpadding="20"> <tbody> <tr> <td dir="ltr" style="font-family:'Helvetica Neue',helvetica,sans-serif;font-size:15px;color:#333333;line-height:21px"><span class="im"><strong style="font-size:17px">Hola... </strong><br>Gracias por registrarte. Clic en el botón para validar tu cuenta.<br><br><table width="100%" cellpadding="15" cellspacing="0" border="0" style="background:#f9f9f9"><tbody><tr><td dir="ltr" align="center"><a href="${fullUrl}" style="color:#ffffff;font-family:'Helvetica Neue',helvetica,sans-serif;text-decoration:none;font-size:14px;background:#3f6d98;line-height:32px;padding:0 10px;display:inline-block;border-radius:3px" target="_blank" data-saferedirecturl="${fullUrl}">Validar mi dirección de email</a></td></tr></tbody></table><br><br></span> <em style="color:#8c8c8c">— Telemedicina-Topicos</em> </td></tr></tbody> </table> </td><td dir="ltr"></td></tr><tr height="25"> <td dir="ltr"></td><td dir="ltr"></td><td dir="ltr"></td></tr><tr> <td dir="ltr" valign="top"></td><td dir="ltr" valign="top" width="800" align="center" style="font-family:'Helvetica Neue',helvetica,sans-serif;font-size:12px;color:#bdbdbd;line-height:18px;padding-left:10px"> </td><td dir="ltr" valign="top"></td></tr><tr> <td dir="ltr" valign="top"></td><td dir="ltr" valign="top" width="800" align="center" style="font-family:'Helvetica Neue',helvetica,sans-serif;font-size:12px;color:#bdbdbd;line-height:18px;padding-left:10px">Telemedicina-Topicos</td><td dir="ltr" valign="top"></td></tr></tbody> </table></div>`;
                break;
            case 'actualiza':
                html = `<div bgcolor="#f1f1f1" style="direction:ltr"> <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f1f1f1"> <tbody> <tr height="25"> <td dir="ltr"></td><td dir="ltr"></td><td dir="ltr"></td></tr><tr> <td dir="ltr" valign="top"></td><td dir="ltr" valign="middle" style="font-family:'Helvetica Neue',helvetica,sans-serif;font-size:30px;font-weight:300;color:#262e33;line-height:48px;padding-left:10px"> <a href="${fullUrl}" style="text-decoration:none;color:#262e33;border:0" target="_blank" data-saferedirecturl="${fullUrl}"></a> </td><td dir="ltr" valign="top"></td></tr><tr height="25"> <td dir="ltr"></td><td dir="ltr"></td><td dir="ltr"></td></tr><tr> <td dir="ltr"></td><td dir="ltr" width="800" id="m_-9096461129907794984m_-5316948002340022160main" bgcolor="#ffffff" style="border-top:10px solid #3f6d98;line-height:1.5"> <table width="100%" cellpadding="20"> <tbody> <tr> <td dir="ltr" style="font-family:'Helvetica Neue',helvetica,sans-serif;font-size:15px;color:#333333;line-height:21px"><span class="im"><strong style="font-size:17px">Hola... </strong><br>El estado de tu cuenta de usuario ${email} ha sido modificado.<br><br><table width="100%" cellpadding="15" cellspacing="0" border="0" style="background:#f9f9f9"><tbody><tr><td dir="ltr" align="center"></td></tr></tbody></table><br><br></span> <em style="color:#8c8c8c">— Telemedicina-Topicos</em> </td></tr></tbody> </table> </td><td dir="ltr"></td></tr><tr height="25"> <td dir="ltr"></td><td dir="ltr"></td><td dir="ltr"></td></tr><tr> <td dir="ltr" valign="top"></td><td dir="ltr" valign="top" width="800" align="center" style="font-family:'Helvetica Neue',helvetica,sans-serif;font-size:12px;color:#bdbdbd;line-height:18px;padding-left:10px"> </td><td dir="ltr" valign="top"></td></tr><tr> <td dir="ltr" valign="top"></td><td dir="ltr" valign="top" width="800" align="center" style="font-family:'Helvetica Neue',helvetica,sans-serif;font-size:12px;color:#bdbdbd;line-height:18px;padding-left:10px">Telemedicina-Topicos</td><td dir="ltr" valign="top"></td></tr></tbody> </table></div>`;
                break;
            default:
                html = '';
        }

        console.log('enviar antes');
        sendEmail(subjet, email, html);


        this.emailVerificacion.set(email, codigo);

        return true;
    }

    async verificar(email, codigo) {
        var codigoconfirmar = this.emailVerificacion.get(email);

        if (codigoconfirmar != undefined) {
            if (codigoconfirmar == codigo) {

                const usuarioDB = await Usuario.findOne({ email });
                usuarioDB.estado = "habilitado";
                usuarioDB.save();

                this.emailVerificacion.delete(email);

                return true;
            }
        }

        return false;
    }
}

module.exports = { Verificador }