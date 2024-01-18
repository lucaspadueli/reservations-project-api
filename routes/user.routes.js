const router = require('express').Router();
const User = require('../models/User.model');

router.post("/create-user", async (req,res)=>{
    const{name,email,role} = req.body;
    try {
        if(!email || !name){
            return res.status(400).json("Preencha todos os campos");
        }
        const userRole = role || "user";
        const newUser = await User.create({name,email,role:userRole});
        res.status(201).json("usuário criado com sucesso")
    } catch (error) {
        res.status(500).json('erro ao criar usuario')
    }
})


router.get('/get-users', async(req,res)=>{
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({description: "Erro ao solicitar usuários"})
    }
    
})



module.exports = router;