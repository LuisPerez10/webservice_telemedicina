const { response } = require('express');

const Medico = require('../models/medico');
const Persona = require('../models/persona');
const Usuario = require('../models/usuario');



const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('persona', 'nombre apellido img')
    res.json({
        ok: true,
        medicos
    })
}

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
            .populate('persona', 'nombre apellido img')

        res.json({
            ok: true,
            medico
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearMedico = async(req, res = response) => {

    //id persona
    const { persona, ...campos } = req.body;

    const medico = new Medico({
        persona,
        ...campos
    });


    try {

        const medicoDB = await medico.save();


        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        const cambiosMedico = {
            ...req.body,
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });


        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



const getMedicoByEspecialidad = async(req, res = response) => {

    const nombreEspecialidad = req.params.especialidad;

    await Medico.find({especialidad: nombreEspecialidad}, 'calificacion especialidad').populate('persona', 'nombre apellido')
    .exec( (err, medicosDB) =>{
        if (err) {
          return res.status(400).json({
             ok:false,
             msg:"hable con el administrador"
           });
         }
         res.json({
           ok: true,
           medicosDB
         })
      })

  
}


// const getMedicoByNombre = async(req, res = response) => {

//     const nombre = req.body.nombre;
//      const regexName = new RegExp(nombre, 'i');

//     try {
//         const   personasDB = await Persona.find( { nombre: regexName}, 'nombre apellido').sort('nombre')
//            .populate({path: 'usuario',  match: {role:"MEDICO_ROLE", estado: "habilitado"}, select: 'estado email role id'});

         
//       if (!personasDB) {
//           return res.status(404).json({
//               ok: false,
//               msg: 'No existe una persona por ese nombre'
//           });
//       }
 
//    var listamedicos = [];  
//    if(personasDB.length == 0){
//     return res.status(200).json({
//         ok: false,
//         listamedicos
//     });
//    }
//        //console.log(personasDB);
//     var index = 0;


//    var data = {
//         usuario:usuario,
//         persona:personaDB
//     }
//     personasDB.forEach( async(data) =>  {
        
//         if(personasDB[index].usuario){
//             const medico =  await Medico.findOne({ "persona": data._id}, 'calificacion especialidad descripcion')
//             .populate({path: 'persona', select: 'nombre apellido', populate:{path:'usuario', select: 'img email'}} );   
//             console.log(medico);
//             if(medico ){
//                 listamedicos.push(medico);
//             }
//         }
//         index = index + 1;
       
//             if(index == (personasDB.length )){

//                 return  res.json({
//                     ok: true,
//                     listamedicos,
//                 });
//             }
        
//       });
//   } catch (error) {
//       console.log(error);
//       res.status(500).json({
//           ok: false,
//           msg: 'Error inesperado'
//       })
//   }

  
// }

const getMedicoByNombre = async(req, res = response) => {

    const nombre = req.body.nombre;
     const regexName = new RegExp(nombre, 'i');

    try {
        const usuarioDB = await Usuario.find(
             { nombre: regexName, role: 'MEDICO_ROLE', estado: "habilitado"}, 
             'nombre img email').sort('nombre');
       

   var listamedicos = [];  
    var index = 0;

        usuarioDB.forEach( async(usuario) =>  {
        
            const personaDB =  await Persona.findOne({ "usuario": usuario._id}, 'nombre apellido celular');

            const medicoDB =  await Medico.findOne({ "persona": personaDB._id}, 'calificacion especialidad descripcion');
            
           // console.log(medicoDB);
                var data = {
                    usuario:usuario,
                    persona:personaDB,
                    medico:medicoDB
                }

                listamedicos.push(data);
           console.log(listamedicos);
        
        index = index + 1;
       
            if(index == (usuarioDB.length )){

                return  res.json({
                    ok: true,
                    listamedicos,
                });
            }
        
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById,
    getMedicoByEspecialidad,
    getMedicoByNombre
}