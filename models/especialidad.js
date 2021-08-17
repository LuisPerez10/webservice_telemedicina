const { Schema, model } = require('mongoose');


const especialidadSchema = Schema({
   nombre:{
       type: String,
       required:true
   }
},{ collection: "especialidades", timestamps: true});


especialidadSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Especialidad', especialidadSchema);