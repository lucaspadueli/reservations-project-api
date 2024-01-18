const router = require('express').Router();
const Reservation = require('../models/Reservation.model');


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
        res.status(500).json("erro ao criar a sala")
    }
})


module.exports = router;