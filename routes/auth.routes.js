const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {isAuthenticated} = require("../middlewares/jwt.middleware");

router.post('/signup', async (req,res) => {
    let {username,email,password,role} = req.body;
    try {
        if(!username || !email || !password){
            return res.status(400).json({description:"Campos Obrigatórios!"});
        }
        else if(!role){
            role = "user"
        }
        const existsUser = await User.findOne({ $or: [{ username }, { email }] });
        if(existsUser){
           return res.status(409).json({description:"email ou usuario ja cadastrados!"})
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({description:"Email inválido"})
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])[a-zA-Z\d!@#$&*]{6,}$/;
        if(!passwordRegex.test(password)){
           return res.status(400).json({description:"A senha deve conter no minimo 6 caracteres incluindo uma letra maiscula e um caracter especial"})
        }
        const passwordHash = await bcrypt.hash(password,10);
       await User.create({username,email,password:passwordHash,role})
        res.status(200).json({description:"Usuário criado com sucesso!"});
    } catch (error) {
            console.log(error);
           return res.status(500).json({description:"Erro ao criar usuário!"});
           
    }
})


router.post('/login', async(req,res)=>{
    const{username,password} = req.body;
    try {
       const user = await User.findOne({username});
       console.log(user);
       if(!user){
        return res.status(400).json({description: "usuario nao cadastrado"})
       }
       const passwordHash = user.password;
       const authentication = await bcrypt.compare(password,passwordHash);
       if(!authentication){
        return res.status(401).json({description:'Senha ou usuário incorretos!!'});
       }
       const payload = {
        _id: user._id,
        username:user.username,
        email: user.email,
        role:user.role
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET, {algorithm:'HS256', expiresIn:"8h"});
       res.status(200).json({authToken : token});
    } catch (error) {
        res.status(400).json({description: "erro ao fazer o login"})
        console.error(error);
    }
})

router.get('/verify', isAuthenticated, (req,res)=>{
    res.json(req.payload);
})




module.exports = router;