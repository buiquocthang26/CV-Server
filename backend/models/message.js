const mongoose = require('mongoose');
//define a schema for the message form data
const messageSchema = new mongoose.Schema({
    room: String,
    text: String,
    senderID: String,
    timestamp: Date
}); //create a model include text, senderID and timestamp

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
