const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const post = require("../models/post")
const usuario = require("../models/usuario")

router.post('/adminAprovar',(req, res) =>{
   const {id} = req.body
   post.findByIdAndUpdate(id,{ative:1}).then(() =>{
    res.redirect("/adminAprovar")    
   })
})

router.post('/adminReprovar',(req, res) =>{
    const {id} = req.body
    post.findByIdAndUpdate(id,{ative:2}).then(() =>{
     res.redirect("/adminAprovar")    
    })
 })





module.exports = router



