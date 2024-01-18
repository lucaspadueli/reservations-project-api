const router = require('express').Router();
const Room = require('../models/Room.model');
const User = require('../models/User.model');

router.get('/rooms', async(req,res)=>{
    try {
        const roomsFromDb = await Room.find();
        res.status(200).json(roomsFromDb);
    } catch (error) {
        res.status(400).json({descriptrion: "Rooms not found"})
    }
})

router.get('/rooms/:roomId', async(req,res)=>{
   const {roomId} = req.params;
    try {
        const roomFromDb = await Room.findById(roomId);
        res.status(200).json(roomFromDb);
    } catch (error) {
        res.status(400).json("room not found");
        console.error(error);
    }
})

router.put('/rooms/:roomId/:userId', async (req,res)=> {
    const {roomId,userId} = req.params;
    const {name,capacity,description} = req.body;
    try {
        const roomFromDb = await Room.findById(roomId);
        const user = await User.findById(userId);
        if(user.role !== "Admin"){
            return res.json("Apenas Admnistradores podem fazer alterações");
        }
        await Room.findByIdAndUpdate(roomId,{name:name,capacity:capacity,description:description});
        res.status(200).json("Sala alterado com sucesso!");
    } catch (error) {
        res.status(300).json({message: "erro ao editar sala."})
    }
})





module.exports = router;