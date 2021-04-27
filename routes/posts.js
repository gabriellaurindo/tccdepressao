const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const post = require("../models/post")
const usuario = require("../models/usuario")

router.post('/criar-relato',(req, res) =>{
    const {titulo, conteudo, link} = req.body
    id = req.session.user._id
    console.log(req.session.user)
    post.create({titulo, conteudo, id_user: id, link})
    res.redirect("/user")   
})

router.post('/criar-relato-adm' ,(req, res) =>{
    const {titulo, conteudo, link} = req.body
    id = req.session.user._id
    console.log(req.session.user)
    post.create({ative:1 ,titulo, conteudo, id_user: id, link})
    
    res.redirect("/admin")  
})     

module.exports = router



