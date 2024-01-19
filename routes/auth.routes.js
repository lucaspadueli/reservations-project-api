const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/signup', async (req,res) => {
    let {username,email,password,role} = req.body;
    try {
        if(!username || !email || !password){
            return res.status(400).json({description:"Campos Obrigatórios!"});
        }
        else if(!role){
            role = "user"
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json("Email inválido")
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])[a-zA-Z\d!@#$&*]{6,}$/;
        if(!passwordRegex.test(password)){
           return res.json("A senha deve conter no minimo 6 caracteres incluindo uma letra maiscula e um caracter especial")
        }
        const passwordHash = await bcrypt.hash(password,10);
       await User.create({username,email,password:passwordHash,role})
        res.status(200).json("Usuário criado com sucesso!");
    } catch (error) {
        if(error.code === 11000){
           return res.status(409).json("usuário ou email já cadastrados")
        }
           res.status(400).json({message:"Erro ao criar usuário!"});
           console.error(error);
    }
})


router.post('/login', async(req,res)=>{
    const{username,password} = req.body;
    try {
       const user = await User.findOne({username});
       console.log(user);
       if(!user){
        return res.json("usuario nao cadastrado")
       }
       const passwordHash = user.password;
       const authentication = await bcrypt.compare(password,passwordHash);
       if(!authentication){
        return res.status(400).json('Senha ou usuário incorretos');
       }
       const payload = {
        _id: user._id,
        username:user.username,
        email: user.email,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET, {algorithm:'HS256', expiresIn:"8h"});
       res.status(200).json({authToken : token});
    } catch (error) {
        res.status(400).json({description: "erro ao fazer o login"})
        console.error(error);
    }
})




module.exports = router;