const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const {isAuthenticated} = require('../middlewares/jwt.middleware');

router.get('/get-users', async(req,res)=>{
    const user = req.payload;
    try {
        
            const allUsers = await User.find({}, "-password");
            return res.status(200).json(allUsers);
        
       
    } catch (error) {
        res.status(500).json({description: "Erro ao solicitar usuários"})
    }
    
})



module.exports = router;