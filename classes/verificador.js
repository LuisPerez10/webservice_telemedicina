// var Guid = require('./generador');
// var twilio = require('../helpers/twilio');


// class Verificador {
//     constructor() {
//         this.codigoVerificacion = new Map();
//     }

//     enviarSmS(nroTelefono) {
//         //aqui meto el generador
//         let value = Guid.Generador();
//         console.log(value);

//         //uso twilio para enviar el mensaje
//         twilio.enviarSmS(nroTelefono, value);

//         this.codigoVerificacion.set(nroTelefono, value);
//         console.log(this.codigoVerificacion.size);

//         return true;
//     }

//     verificar(nroTelefono, codigo) {
//         let codigoconfirmar = this.codigoVerificacion.get(nroTelefono);

//         if (codigoconfirmar != undefined) {
//             if (codigoconfirmar == codigo) {
//                 console.log('entro ok');
//                 this.codigoVerificacion.delete(nroTelefono);
//                 return true;
//             }
//         }
//         console.log('Nooo entro ok');
//         return false;
//     }
// }

// module.exports = { Verificador }