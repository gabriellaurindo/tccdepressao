const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    nome:{
       type: String,
       require:true
    },
    email:{
        type: String,
        require:true
    },
    eAdmin:{
        type:Number,
        default:0
    },
    senha:{
        type:String,
        require:true
    }
})

const usuario = mongoose.model("usuarios", usuarioSchema)

module.exports = usuario

