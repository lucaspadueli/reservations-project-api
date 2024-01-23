const express = require('express');
require('dotenv/config')



const app = express();
app.use(express.json());

require('./config')(app);
//db
require('./db');

//middlewares
const {isAuthenticated} = require('./middlewares/jwt.middleware');

//rotas
const userRoutes = require('./routes/user.routes');
const reservationRoutes = require('./routes/reservation.routes');
const roomsRoutes = require('./routes/rooms.routes');
const authRoutes = require('./routes/auth.routes');

app.use(authRoutes);
//app.use(isAuthenticated);
app.use(userRoutes);
app.use(reservationRoutes);
app.use(roomsRoutes);



app.use((req,res)=>{
    res.status(404).json("Not found")
})

module.exports = app;