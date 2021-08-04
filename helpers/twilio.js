

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 

const twiliosms = require('twilio')(accountSid, authToken);

var from = process.env.FROM_NUMBER;

function enviarSmS(nroTelefono, codigo){
    msj = 'Su Codigo de verificacion es: ' + codigo;
    console.log(nroTelefono);
    twiliosms.messages.create({
        from:from,
        to:`+${nroTelefono}`,
        body: msj
    }, function (err){
        console.log(err);
    });
}

module.exports = {enviarSmS}

