const {Schema,model} = require('mongoose');

const roomSchema = new Schema({
    name:String,
    capacity:Number,
    description:String
})

module.exports = model("Room",roomSchema);