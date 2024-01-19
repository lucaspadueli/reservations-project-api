const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

router.get('/get-users', async(req,res)=>{
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({description: "Erro ao solicitar usuários"})
    }
    
})



module.exports = router;