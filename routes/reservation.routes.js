const router = require('express').Router();
const Reservation = require('../models/Reservation.model');
const User = require("../models/User.model");

router.post('/create-reservation', async (req,res)=>{
    const {roomId,userId,date,timeslot} = req.body;
    try {
        const existingReservation = await Reservation.findOne({roomId,date,timeslot});
        if(existingReservation){
           return res.status(400).json({message: "a sala já está reservada para essa data"});
        }
        await Reservation.create({roomId,userId,date,timeslot});
        res.status(201).json("reserva criada com sucesso")
    } catch (error) {
        console.error(error);
        res.status(500).json("erro ao criar a reserva")
    }
})

router.get('/get-reservations/:userId', async(req,res)=>{
    const {userId} = req.params;
    try {
        const userRevervations = await Reservation.find({userId});
        if(userRevervations.length == 0){
            return res.status(400).json("Usuário não possui reservas.")
        }
        res.status(200).json(userRevervations);
    } catch (error) {
        res.status(400).json({message: "Reservas não encontradas."})
    }
    
})

module.exports = router;