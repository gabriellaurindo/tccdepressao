const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const usuario = require("../models/usuario")
const bcrypt = require("bcryptjs")


router.post('/cadastro',(req, res) =>{
    const {nome, email, senha, senha2} = req.body
    
    if(senha === senha2){
        usuario.findOne({email})
        .then((user) =>{
            if(user){
              
            }
            else{
                bcrypt.genSalt(13, function(err, salt) {
                    bcrypt.hash(senha, salt, function(err, hash) {
                
                        usuario.create({nome, email, senha: hash})
                        .then(user =>{ 
                            res.redirect("/login")
                        })
                        .catch(err =>{
                            res.redirect("/cadastro")
                        })
                    });
                });
                    
            }
        })
    }else{
        res.redirect("/cadastro")
    }
   
})

module.exports = router



