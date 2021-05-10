const mongoose  = require('mongoose');
const Schema  = mongoose.Schema;

const ChatSchema = new Schema({
    username : String,
    msg : String,
    msgTo : String,
    msgFrom : String,
    msgToName : String,
    date : {
        type : Date,
        default: Date.now,
    }
    
});

module.exports = Chats = mongoose.model('chat',ChatSchema);