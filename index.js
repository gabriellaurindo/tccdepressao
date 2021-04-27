//Importação dos módulos 
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const usuario = require("./routes/usuarios")
const session = require("express-session")
const usuariomongo = require("./models/usuario")
const bcrypt = require("bcryptjs")
const posts = require("./routes/posts")
const postmongo = require("./models/post")
const aprovarRouter = require("./routes/aprovarPost")

//Cofig banco mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db', {
    useNewUrlParser: true , 
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Conectado...");
}).catch((err)=>{
    console.log("Houve um erro: " + err);
});

//Config template e express
app.set("view engine", "ejs")
app.use('/public', express.static('public'));

//Config BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Rotas
app.get('/', function(req, res){
    //bcrypt.genSalt(13, function(err, salt) {
       // senha = "123"
      //  bcrypt.hash(senha, salt, function(err, hash) {
      //      usuariomongo.create({nome:"Gabriel", email:"gabrielvitor@gmail.com", senha: hash, eAdmin:1})
     //   })
   // })
    res.render("pages/home") 
})

app.get('/quemsomos', function(req, res){
    res.render("pages/Quemsomos")
})

app.get('/cadastro', (req,res)=>{
    res.render('pages/cadastro')
})

app.get('/login', (req,res) =>{
    
    res.render('pages/login')
})

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 3600000 }
}))

app.post("/login", (req,res)=>{
    const {email, senha} = req.body
    usuariomongo.findOne({email}).then(user =>{
        if(user){
            bcrypt.compare(senha, user.senha, (err, success)=>{
                if(success){
                    user.senha = null
                    req.session.user = user
                    if(user.eAdmin == 1){
                        res.redirect("/admin")
                    }else{
                        res.redirect("/user")
                    }
                }else{
                   
                }
            })    
        }else{
            
        }
        
    })
})

function auth(req,res,next){
    if(req.session.user){
        next()
    }else{
        res.redirect("/login")
    }
   
}

function admin(req,res,next){
    if(req.session.user.eAdmin == 1){
        next()
    }else{
        res.redirect("/")
    } 
}

app.get("/user", auth, (req,res)=>{
    var dados = req.session.user
    id_user = req.session.user._id
    postmongo.find({id_user, ative:1}).then(posts =>{
        res.render("pages/user", {dados,posts})
    })
})

app.get("/users", auth, (req,res)=>{
    var dados = req.session.user
    postmongo.find({ative:1}).then(posts =>{
        usuariomongo.find().then(users =>{
            res.render("pages/users", {dados, posts, users})
        })
    })
})

app.post("/userspost", auth, (req, res)=>{
    const {id} = req.body
    var dados = req.session.user
    postmongo.findById(id).then(post =>{
      usuariomongo.findOne({_id:post.id_user}).then(user =>{
        nome = user.nome
        res.render("pages/post", {dados, post, nome})
        
      })  
    }) 
})

app.post("/userspostadm", auth, admin, (req, res)=>{
    const {id} = req.body
    var dados = req.session.user
    postmongo.findById(id).then(post =>{
      usuariomongo.findOne({_id:post.id_user}).then(user =>{
        nome = user.nome
        res.render("pages/postadm", {dados, post, nome})
       
      })  
    }) 
})

app.post("/alterar-perfil", auth, (req, res) =>{
    const {nome, senha, email, senhaantiga} = req.body
    id = req.session.user._id
    console.log(id)
    usuariomongo.findById(id).then(user =>{
        password = user.senha
        bcrypt.compare(senhaantiga, password, (err, sucess) =>{
            if(sucess){
                bcrypt.genSalt(13, function(err, salt) {
                    bcrypt.hash(senha, salt, function(err, hash) {
                        usuariomongo.findByIdAndUpdate(id ,{nome, senha:hash, email})
                    })
                })
            }
        })  
    })
   
})

app.get("/perfil", auth, (req, res)=>{
    var dados = req.session.user
    res.render("pages/perfil", {dados})
})

app.get("/perfiladm", auth, admin, (req, res)=>{
    var dados = req.session.user
    res.render("pages/perfiladm", {dados})
})

app.get("/logout", (req, res) =>{
    req.session.user = undefined
    res.redirect("/")
})

app.get("/criar-relato", auth, (req,res)=>{
    dados =  req.session.user
    res.render("pages/createpost", {dados})
})

app.get("/criar-relato-adm", auth, admin, (req,res)=>{
    dados =  req.session.user
    res.render("pages/createpostadm", {dados})
})

app.get("/admin", auth, admin, (req,res)=>{
    var dados = req.session.user
    id_user = req.session.user._id
    postmongo.find({id_user, ative:1}).then(posts =>{
        res.render("pages/admin", {dados,posts})
    })
})


app.get("/admins", auth, admin, (req, res)=>{
    var dados = req.session.user
    postmongo.find({ative:1}).then(posts =>{
        res.render("pages/admins", {dados, posts})
    })
})

app.get("/adminAprovar", auth, admin, (req,res)=>{
    var dados = req.session.user
    postmongo.find({ative:0}).then(posts =>{
        res.render("pages/adminAprovar", {dados, posts})
    })
})



app.use("/", posts)

app.use("/", usuario)

app.use("/", aprovarRouter)

//Levantar servidor
app.listen(8080)