const express = require('express');
require('dotenv/config')
const logger = require('morgan');


const app = express();
app.use(express.json());
app.use(logger('dev'));
//db
require('./db');


//rotas
const userRoutes = require('./routes/user.routes');
const reservationRoutes = require('./routes/reservation.routes');
const roomsRoutes = require('./routes/rooms.routes');
const authRoutes = require('./routes/auth.routes');
app.use(authRoutes);
app.use(userRoutes);
app.use(reservationRoutes);
app.use(roomsRoutes);



app.use((req,res)=>{
    res.status(404).json("Not found")
})

module.exports = app;