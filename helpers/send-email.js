//Requerimos el paquete
var nodemailer = require('nodemailer');

//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'losinges1@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});


function sendEmail(subject, to, html) {

    var mailOptions = {
        from: 'losinges@gmail.com',
        to: to,
        subject: subject,
        // text: mensaje
        html: html

        // html: `<h1>${mensaje}</h1>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

module.exports = {
    sendEmail
}