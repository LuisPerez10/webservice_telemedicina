const { response } = require('express');
const Especialidad = require('../models/especialidad');


const crearEspecialidad = async (req,res)=>{

    const {nombre} =  req.body;

    const existeEspecialidad = await Especialidad.findOne({ nombre});


    try {
        if (existeEspecialidad) {
            return res.status(400).json({
                ok: false,
                msg: 'La especialidad ya fue registrada'
            });
        }

        const especialidad = new Especialidad(req.body);
        
        await especialidad.save();

        res.json({
            ok: true,
            especialidad,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}
const getEspecialidades = async(req, res) => {
    Especialidad.find({}, 'nombre').exec( (err, especialidades) =>{
        if (err) {
          return res.status(400).json({
             ok:false,
             err:err
           });
         }
         res.json({
           ok: true,
           especialidades
         })
      })
}


module.exports = {
   crearEspecialidad,
   getEspecialidades
}