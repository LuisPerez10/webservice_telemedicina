const Consulta = require('../models/consulta');
const { response, request } = require('express');
const Receta = require('../models/receta');
const Persona = require('../models/persona');




const createReceta = async(req = request, res = response) => {
    
    const consulta = req.body.consulta;

    const consultaDB = await Consulta.findById(consulta);

    try {
        if (!consultaDB) {
            return res.status(404).json({
                ok: true,
                msg: 'consulta no encontrada por id',
            });
        }

        const receta = new Receta(req.body);
    
        //console.log(receta);
        await receta.save((err, recetaDB) => {
           
            if (err) {
                 res.json({ ok: false, err })};
    
            res.json({
                ok: true,
                receta: recetaDB
            });
        });
        
    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs :v'
            });
        
    }

}

const getRecetas = async(req = request, res = response) => {

    const id = req.params.id;
    var index = 0;
    var recetas = [];
    var medico = [];

    try {
        const consultas = await Consulta.find({ paciente: id });

        consultas.forEach(async(consulta) => {
         //   console.log(consulta);
            const receta = await Receta.findOne({ "consulta": consulta }).sort({ fecha: 1 });

            if(receta){
                // console.log(receta);
                const medicoDB = await Persona.findOne({_id: consulta.medico}, 'nombre apellido');
                medico.push(medicoDB);
                recetas.push(receta);
            }
            index = index + 1;
            
            if (index == (consultas.length)) {

                return res.json({
                    ok: true,
                    recetas,
                    medico
                });
            }

        });




          

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }

}

// const getSalabyFicha = async(req = request, res = response) => {
//     const id = req.params.id;

//     const consulta = await Consulta.findOne({ fichamedica: id });

//     res.json(
//         consulta.sala
//     )


// };


// const updateEstadoSala = async(req = request, res = response) => {
//     const id = req.params.id;

//     await Consulta.findOne({ fichamedica: id }, (err, consultaDB) => {
//         if (err) { res.json({ ok: false, err }); }


//         consultaDB.sala.estado = "habilitado";
//         consultaDB.save((err, updated) => {
//             res.json({
//                 ok: true,
//                 sala: updated.sala
//             })
//         });
//     });

// };


module.exports = {
    createReceta,
    getRecetas
  
}