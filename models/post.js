const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    titulo:{
       type: String,
       require:true
    },
    conteudo:{
        type: String,
        require:true
    },
    ative:{
        type:Number,
        default:0
    },
    id_user:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    }
})

const post = mongoose.model("posts", postSchema)

module.exports = post

