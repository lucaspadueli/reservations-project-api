const {Schema,model} = require('mongoose');

const reservationSchema = new Schema({
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    timeslot: { type: String, required: true, enum:["Manhã" , "Tarde" , "Noite"] }
})

module.exports = model("Reservation",reservationSchema);